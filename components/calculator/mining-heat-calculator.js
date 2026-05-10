"use client";

import { useEffect, useState } from "react";

const presets = [
  {
    id: "house",
    label: "Частный дом",
    values: {
      hashrate: 200,
      btcRate: 8500000,
      powerKw: 3.5,
      electricityRate: 4.8,
      btcPerThDay: 0.00000038,
      heatEfficiency: 0.96,
    },
  },
  {
    id: "hotel",
    label: "Гостиница / бизнес",
    values: {
      hashrate: 400,
      btcRate: 8500000,
      powerKw: 7.2,
      electricityRate: 5.6,
      btcPerThDay: 0.00000038,
      heatEfficiency: 0.94,
    },
  },
  {
    id: "gpu",
    label: "GPU / техконтур",
    values: {
      hashrate: 300,
      btcRate: 8500000,
      powerKw: 6.3,
      electricityRate: 4.3,
      btcPerThDay: 0.00000038,
      heatEfficiency: 0.92,
    },
  },
];

const fieldFormat = {
  hashrate: 0,
  btcRate: 0,
  powerKw: 1,
  electricityRate: 1,
  btcPerThDay: 8,
  heatEfficiency: 2,
};

const fieldSuffix = {
  hashrate: " TH/s",
  btcRate: " ₽",
  powerKw: " кВт",
  electricityRate: " ₽/кВт·ч",
  btcPerThDay: " BTC",
  heatEfficiency: "",
};

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits,
  }).format(value);
}

function formatFieldValue(key, value) {
  return `${formatNumber(value, fieldFormat[key] ?? 0)}${fieldSuffix[key] ?? ""}`;
}

function createInputState(values) {
  return {
    hashrate: formatFieldValue("hashrate", values.hashrate),
    btcRate: formatFieldValue("btcRate", values.btcRate),
    powerKw: formatFieldValue("powerKw", values.powerKw),
    electricityRate: formatFieldValue("electricityRate", values.electricityRate),
    btcPerThDay: formatFieldValue("btcPerThDay", values.btcPerThDay),
    heatEfficiency: formatFieldValue("heatEfficiency", values.heatEfficiency),
  };
}

function parseNumericInput(rawValue) {
  const normalized = String(rawValue)
    .replace(/[^\d,.-]/g, "")
    .replace(/\s+/g, "")
    .replace(/,/g, ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrency(value) {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

export function MiningHeatCalculator({ defaults }) {
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [form, setForm] = useState({
    hashrate: defaults.hashrate,
    btcRate: defaults.btcRate,
    powerKw: defaults.powerKw,
    electricityRate: defaults.electricityRate,
    btcPerThDay: defaults.btcPerThDay,
    heatEfficiency: defaults.heatEfficiency,
  });
  const [inputs, setInputs] = useState(() => createInputState(defaults));
  const [btcRateState, setBtcRateState] = useState("idle");

  useEffect(() => {
    const controller = new AbortController();

    async function loadBtcRate() {
      setBtcRateState("loading");

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=rub",
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load BTC rate");
        }

        const data = await response.json();
        const rubRate = Number(data?.bitcoin?.rub);

        if (!Number.isFinite(rubRate) || rubRate <= 0) {
          throw new Error("Invalid BTC rate");
        }

        setForm((current) => ({
          ...current,
          btcRate: rubRate,
        }));
        setInputs((current) => ({
          ...current,
          btcRate: formatFieldValue("btcRate", rubRate),
        }));
        setBtcRateState("success");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setBtcRateState("error");
      }
    }

    loadBtcRate();

    return () => controller.abort();
  }, []);

  const revenueDay = form.hashrate * form.btcPerThDay * form.btcRate;
  const powerCostDay = form.powerKw * 24 * form.electricityRate;
  const usefulHeat = form.powerKw * form.heatEfficiency;
  const monthlyResult = (revenueDay - powerCostDay) * 30;

  const handleChange = (key, rawValue) => {
    setInputs((current) => ({
      ...current,
      [key]: rawValue,
    }));

    const parsedValue = parseNumericInput(rawValue);

    if (parsedValue === null) {
      return;
    }

    setForm((current) => ({
      ...current,
      [key]: parsedValue,
    }));

    if (key === "btcRate" && btcRateState === "success") {
      setBtcRateState("manual");
    }
  };

  const handleBlur = (key) => {
    const parsedValue = parseNumericInput(inputs[key]);
    const nextValue = parsedValue ?? form[key];

    setForm((current) => ({
      ...current,
      [key]: nextValue,
    }));
    setInputs((current) => ({
      ...current,
      [key]: formatFieldValue(key, nextValue),
    }));
  };

  const applyPreset = (preset) => {
    const nextValues = {
      ...preset.values,
      btcRate: form.btcRate,
    };

    setActivePreset(preset.id);
    setForm(nextValues);
    setInputs(createInputState(nextValues));
  };

  return (
    <section className="calculator-shell">
      <div className="calculator-card">
        <div className="calculator-card__intro">
          <span className="eyebrow">Калькулятор</span>
          <h2>
            Экономика{" "}
            <span className="text-highlight">отопления на базе майнинга</span>
          </h2>
          <p>
            Сценарий расчёта остаётся понятным: TH/s, курс BTC, мощность, цена
            электричества и ориентир по итогу в рублях.
          </p>
        </div>

        <div className="preset-row">
          {presets.map((preset) => (
            <button
              type="button"
              key={preset.id}
              className={`preset-btn ${activePreset === preset.id ? "is-active" : ""}`}
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="form-grid">
          <label>
            <span>Хешрейт, TH/s</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={inputs.hashrate}
              onChange={(event) => handleChange("hashrate", event.target.value)}
              onBlur={() => handleBlur("hashrate")}
            />
          </label>
          <label>
            <span>Курс BTC, ₽</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={inputs.btcRate}
              onChange={(event) => handleChange("btcRate", event.target.value)}
              onBlur={() => handleBlur("btcRate")}
            />
          </label>
          <label>
            <span>Потребление, кВт</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={inputs.powerKw}
              onChange={(event) => handleChange("powerKw", event.target.value)}
              onBlur={() => handleBlur("powerKw")}
            />
          </label>
          <label>
            <span>Стоимость электроэнергии, ₽/кВт·ч</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={inputs.electricityRate}
              onChange={(event) => handleChange("electricityRate", event.target.value)}
              onBlur={() => handleBlur("electricityRate")}
            />
          </label>
          <label>
            <span>BTC / TH / сутки</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={inputs.btcPerThDay}
              onChange={(event) => handleChange("btcPerThDay", event.target.value)}
              onBlur={() => handleBlur("btcPerThDay")}
            />
          </label>
          <label>
            <span>КПД утилизации тепла</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={inputs.heatEfficiency}
              onChange={(event) => handleChange("heatEfficiency", event.target.value)}
              onBlur={() => handleBlur("heatEfficiency")}
            />
          </label>
        </div>

        <div className="results-grid">
          <article className="result-card">
            <small>Выручка в сутки</small>
            <strong>{formatCurrency(revenueDay)}</strong>
          </article>
          <article className="result-card">
            <small>Электроэнергия в сутки</small>
            <strong>{formatCurrency(powerCostDay)}</strong>
          </article>
          <article className="result-card">
            <small>Полезное тепло</small>
            <strong>{formatNumber(usefulHeat, 2)} кВт</strong>
          </article>
          <article className="result-card result-card--accent">
            <small>Итог в месяц</small>
            <strong>{formatCurrency(monthlyResult)}</strong>
          </article>
        </div>

        <p className="calculator-note">
          Это ориентир для первого разговора. Для коммерческого решения мы считаем
          тариф, тип оборудования, сезонность и схему передачи тепла по контурам.
        </p>
      </div>
    </section>
  );
}
