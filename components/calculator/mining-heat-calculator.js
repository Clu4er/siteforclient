"use client";

import { useEffect, useRef, useState } from "react";

import { formatNumber, formatRub, formatUsd } from "@/lib/formatters";

const FALLBACK_RATES = {
  btcUsd: 92000,
  usdRub: 92,
  btcRub: 92000 * 92,
};
const BTC_PER_TH_DAY = 0.00000038;
const HEAT_EFFICIENCY = 0.95;

// Базовый ориентир по хешрейту: Antminer S21, 200 TH/s.
// Мощность в сценариях задана как тепловая нагрузка объекта по текущей модели сайта.
const BASE_ASIC_HASHRATE = 200;
const DEFAULT_POWER_KW = 4.8;

const presets = [
  {
    id: "house",
    label: "Частный дом",
    values: {
      hashrate: BASE_ASIC_HASHRATE,
      powerKw: DEFAULT_POWER_KW,
      electricityRate: 4.8,
      heatEfficiency: HEAT_EFFICIENCY,
    },
  },
  {
    id: "hotel",
    label: "Гостиница / бизнес",
    values: {
      hashrate: BASE_ASIC_HASHRATE,
      powerKw: DEFAULT_POWER_KW,
      electricityRate: 4.8,
      heatEfficiency: HEAT_EFFICIENCY,
    },
  },
  {
    id: "gpu",
    label: "ГПУ",
    values: {
      hashrate: BASE_ASIC_HASHRATE,
      powerKw: DEFAULT_POWER_KW,
      electricityRate: 3.3,
      heatEfficiency: HEAT_EFFICIENCY,
    },
  },
];

const resultPeriods = [
  { key: "day", label: "День", multiplier: 1 },
  { key: "month", label: "Месяц", multiplier: 30 },
  { key: "year", label: "Год", multiplier: 365 },
];

const fieldFormat = {
  hashrate: 0,
  powerKw: 1,
  electricityRate: 1,
  heatEfficiency: 2,
};

const rateFieldFormat = {
  btcUsd: 2,
  btcRub: 0,
  usdRub: 2,
};

const defaultValues = {
  hashrate: BASE_ASIC_HASHRATE,
  powerKw: DEFAULT_POWER_KW,
  electricityRate: 4.8,
  heatEfficiency: HEAT_EFFICIENCY,
};

const defaultManualRates = {
  btcUsd: false,
  btcRub: false,
  usdRub: false,
};

function formatInputValue(key, value) {
  const digits = fieldFormat[key] ?? 0;
  const normalized = Number.isFinite(value) ? value : defaultValues[key];

  if (digits === 0) {
    return String(Math.round(normalized));
  }

  return normalized.toFixed(digits).replace(/\.?0+$/, "");
}

function formatRateInputValue(key, value) {
  const digits = rateFieldFormat[key] ?? 0;
  const normalized = Number.isFinite(value) ? value : FALLBACK_RATES[key];

  return formatNumber(normalized, {
    minimumFractionDigits: key === "usdRub" ? 2 : 0,
    maximumFractionDigits: digits,
  });
}

function createInputState(values) {
  return {
    hashrate: formatInputValue("hashrate", values.hashrate),
    powerKw: formatInputValue("powerKw", values.powerKw),
    electricityRate: formatInputValue("electricityRate", values.electricityRate),
    heatEfficiency: formatInputValue("heatEfficiency", values.heatEfficiency),
  };
}

function createRateInputState(values) {
  return {
    btcUsd: formatRateInputValue("btcUsd", values.btcUsd),
    btcRub: formatRateInputValue("btcRub", values.btcRub),
    usdRub: formatRateInputValue("usdRub", values.usdRub),
  };
}

function sanitizeDecimalInput(rawValue) {
  const normalized = String(rawValue)
    .replace(/[^\d,.]/g, "")
    .replace(",", ".");
  const [integer = "", ...fractionParts] = normalized.split(".");
  const fraction = fractionParts.join("");

  return fractionParts.length > 0 ? `${integer}.${fraction}` : integer;
}

function normalizeFieldValue(key, value) {
  if (key === "heatEfficiency") {
    return Math.min(Math.max(value, 0), 1);
  }

  return Math.max(value, 0);
}

function normalizeRateValue(value) {
  return Math.max(value, 0);
}

function parseNumericInput(rawValue) {
  const normalized = sanitizeDecimalInput(rawValue);
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

export function MiningHeatCalculator({ defaults }) {
  const initialValues = {
    ...defaultValues,
    ...defaults,
    powerKw: defaults?.powerKw ?? DEFAULT_POWER_KW,
    heatEfficiency: HEAT_EFFICIENCY,
  };
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [form, setForm] = useState({
    hashrate: initialValues.hashrate,
    powerKw: initialValues.powerKw,
    electricityRate: initialValues.electricityRate,
    heatEfficiency: initialValues.heatEfficiency,
  });
  const [inputs, setInputs] = useState(() => createInputState(initialValues));
  const [apiRates, setApiRates] = useState(FALLBACK_RATES);
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [rateInputs, setRateInputs] = useState(() => createRateInputState(FALLBACK_RATES));
  const [manualRates, setManualRates] = useState(defaultManualRates);
  const manualRatesRef = useRef(manualRates);

  useEffect(() => {
    manualRatesRef.current = manualRates;
  }, [manualRates]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRates() {
      try {
        const response = await fetch("/api/btc-rate", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load rates");
        }

        const data = await response.json();
        const btcUsd = Number(data?.btcUsd);
        const usdRub = Number(data?.usdRub);
        const btcRub = btcUsd * usdRub;

        if (
          !Number.isFinite(btcUsd) ||
          !Number.isFinite(usdRub) ||
          !Number.isFinite(btcRub) ||
          btcUsd <= 0 ||
          usdRub <= 0 ||
          btcRub <= 0
        ) {
          throw new Error("Invalid rates");
        }

        const nextApiRates = { btcUsd, btcRub, usdRub };
        setApiRates(nextApiRates);
        setRates((current) => {
          const manual = manualRatesRef.current;
          const nextBtcUsd = manual.btcUsd ? current.btcUsd : nextApiRates.btcUsd;
          const nextUsdRub = manual.usdRub ? current.usdRub : nextApiRates.usdRub;
          const nextBtcRub = manual.btcRub ? current.btcRub : nextBtcUsd * nextUsdRub;
          const nextRates = {
            btcUsd: nextBtcUsd,
            btcRub: nextBtcRub,
            usdRub: nextUsdRub,
          };

          setRateInputs((currentInputs) => ({
            btcUsd: manual.btcUsd
              ? currentInputs.btcUsd
              : formatRateInputValue("btcUsd", nextRates.btcUsd),
            btcRub: manual.btcRub
              ? currentInputs.btcRub
              : formatRateInputValue("btcRub", nextRates.btcRub),
            usdRub: manual.usdRub
              ? currentInputs.usdRub
              : formatRateInputValue("usdRub", nextRates.usdRub),
          }));

          return nextRates;
        });
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
      }
    }

    loadRates();

    return () => controller.abort();
  }, []);

  const btcRate = rates.btcRub;
  const revenueDay = form.hashrate * BTC_PER_TH_DAY * btcRate;
  const powerCostDay = form.powerKw * 24 * form.electricityRate;
  const usefulHeatValueDay = powerCostDay * form.heatEfficiency;
  const netDay = revenueDay - powerCostDay;
  const benefitWithHeatDay = netDay + usefulHeatValueDay;
  const hasManualRates = Object.values(manualRates).some(Boolean);

  const handleChange = (key, rawValue) => {
    const nextInputValue = sanitizeDecimalInput(rawValue);

    setInputs((current) => ({
      ...current,
      [key]: nextInputValue,
    }));

    const parsedValue = parseNumericInput(nextInputValue);

    if (parsedValue === null) {
      return;
    }

    setForm((current) => ({
      ...current,
      [key]: normalizeFieldValue(key, parsedValue),
    }));
  };

  const handleBlur = (key) => {
    const parsedValue = parseNumericInput(inputs[key]);
    const nextValue = normalizeFieldValue(key, parsedValue ?? form[key]);

    setForm((current) => ({
      ...current,
      [key]: nextValue,
    }));
    setInputs((current) => ({
      ...current,
      [key]: formatInputValue(key, nextValue),
    }));
  };

  const handleRateChange = (key, rawValue) => {
    const nextInputValue = sanitizeDecimalInput(rawValue);
    const parsedValue = parseNumericInput(nextInputValue);

    setRateInputs((current) => ({
      ...current,
      [key]: nextInputValue,
    }));

    if (parsedValue === null) {
      return;
    }

    const nextValue = normalizeRateValue(parsedValue);

    setManualRates((current) => ({
      ...current,
      [key]: true,
      ...(key === "btcUsd" || key === "usdRub" ? { btcRub: false } : {}),
    }));
    setRates((current) => {
      const nextRates = {
        ...current,
        [key]: nextValue,
      };

      if (key === "btcUsd" || key === "usdRub") {
        nextRates.btcRub = nextRates.btcUsd * nextRates.usdRub;
        setRateInputs((currentInputs) => ({
          ...currentInputs,
          [key]: nextInputValue,
          btcRub: formatRateInputValue("btcRub", nextRates.btcRub),
        }));
      }

      return nextRates;
    });
  };

  const handleRateBlur = (key) => {
    const parsedValue = parseNumericInput(rateInputs[key]);
    const nextValue = normalizeRateValue(parsedValue ?? rates[key]);

    setRates((current) => {
      const nextRates = {
        ...current,
        [key]: nextValue,
      };

      if ((key === "btcUsd" || key === "usdRub") && !manualRatesRef.current.btcRub) {
        nextRates.btcRub = nextRates.btcUsd * nextRates.usdRub;
      }

      setRateInputs((currentInputs) => ({
        ...currentInputs,
        [key]: formatRateInputValue(key, nextRates[key]),
        ...((key === "btcUsd" || key === "usdRub") && !manualRatesRef.current.btcRub
          ? { btcRub: formatRateInputValue("btcRub", nextRates.btcRub) }
          : {}),
      }));

      return nextRates;
    });
  };

  const resetRatesToApi = () => {
    setManualRates(defaultManualRates);
    setRates(apiRates);
    setRateInputs(createRateInputState(apiRates));
  };

  const applyPreset = (preset) => {
    const nextValues = {
      ...preset.values,
    };

    setActivePreset(preset.id);
    setForm(nextValues);
    setInputs(createInputState(nextValues));
  };

  const rateCards = [
    {
      key: "btcUsd",
      label: "BTC/USD",
      unit: "$",
    },
    {
      key: "btcRub",
      label: "BTC/RUB",
      unit: "₽",
    },
    {
      key: "usdRub",
      label: "USD/RUB",
      unit: "₽",
    },
  ];

  const resultRows = [
    {
      label: "Доход от майнинга без учёта электроэнергии",
      values: resultPeriods.map((period) => formatRub(revenueDay * period.multiplier)),
    },
    {
      label: "Полезное тепло в рублях",
      values: resultPeriods.map((period) => formatRub(usefulHeatValueDay * period.multiplier)),
    },
    {
      label: "Выгода с учётом полезного тепла",
      values: resultPeriods.map((period) => formatRub(benefitWithHeatDay * period.multiplier)),
      accent: true,
    },
  ];

  return (
    <section className="calculator-shell">
      <div className="calculator-card calculator-card--split">
        <div className="calculator-panel calculator-panel--inputs">
          <div className="calculator-card__intro">
            <span className="eyebrow">Калькулятор</span>
            <h2>Доход от майнинга и полезное тепло</h2>
            <p>
              Калькулятор показывает ориентировочную модель. Фактический результат
              зависит от стоимости электроэнергии, модели оборудования, сложности сети
              Биткоин, курса, режима работы и других факторов.
            </p>
          </div>

          <div className="preset-row" aria-label="Сценарий расчёта">
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

          <div className="form-grid calculator-form-grid">
            <label className="parameter-card">
              <span className="field-label">
                <span>Хешрейт</span>
                <small>можно изменить</small>
              </span>
              <div className="input-with-unit">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  autoComplete="off"
                  value={inputs.hashrate}
                  onChange={(event) => handleChange("hashrate", event.target.value)}
                  onBlur={() => handleBlur("hashrate")}
                />
                <span>TH/s</span>
              </div>
            </label>
            <label className="parameter-card">
              <span className="field-label">
                <span>Потребление</span>
                <small>можно изменить</small>
              </span>
              <div className="input-with-unit">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  autoComplete="off"
                  value={inputs.powerKw}
                  onChange={(event) => handleChange("powerKw", event.target.value)}
                  onBlur={() => handleBlur("powerKw")}
                />
                <span>кВт</span>
              </div>
            </label>
            <label className="parameter-card">
              <span className="field-label">
                <span>Стоимость электроэнергии</span>
                <small>можно изменить</small>
              </span>
              <div className="input-with-unit">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  autoComplete="off"
                  value={inputs.electricityRate}
                  onChange={(event) => handleChange("electricityRate", event.target.value)}
                  onBlur={() => handleBlur("electricityRate")}
                />
                <span>₽/кВт·ч</span>
              </div>
            </label>
            <label className="parameter-card">
              <span className="field-label">
                <span>КПД утилизации тепла</span>
                <small>можно изменить</small>
              </span>
              <div className="input-with-unit">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  autoComplete="off"
                  value={inputs.heatEfficiency}
                  onChange={(event) => handleChange("heatEfficiency", event.target.value)}
                  onBlur={() => handleBlur("heatEfficiency")}
                />
                <span>доля</span>
              </div>
            </label>
          </div>

          <p className="calculator-note">
            Для проекта мы отдельно считаем тариф, тип оборудования, сезонность,
            тепловую нагрузку и схему передачи тепла по контурам.
          </p>
        </div>

        <div className="calculator-panel calculator-panel--results">
          <div className="calculator-results__top">
            <div>
              <span className="eyebrow">Результаты</span>
              <h3>Результаты расчёта</h3>
            </div>
          </div>

          <div className="rate-strip rate-strip--results" aria-label="Курсы валют">
            <p className="rate-strip__hint">
              Курс валют автоматически обновляется один раз в час.
            </p>
            <div className="rate-strip__cards">
              {rateCards.map((item) => (
                <article
                  className={`rate-card ${manualRates[item.key] ? "rate-card--manual" : ""}`}
                  key={item.key}
                >
                  <div className="rate-card__head">
                    <span>{item.label}</span>
                    <small>можно изменить</small>
                  </div>
                  <label className="rate-card__field">
                    <input
                      className="rate-card__input"
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9]*[.,]?[0-9]*"
                      autoComplete="off"
                      aria-label={`${item.label}, можно изменить вручную`}
                      value={rateInputs[item.key]}
                      onChange={(event) => handleRateChange(item.key, event.target.value)}
                      onBlur={() => handleRateBlur(item.key)}
                    />
                    <span>{item.unit}</span>
                  </label>
                </article>
              ))}
            </div>
            {hasManualRates ? (
              <div className="rate-strip__footer">
                <button className="rate-reset-btn" type="button" onClick={resetRatesToApi}>
                  Вернуть курс API
                </button>
              </div>
            ) : null}
          </div>

          <div className="result-matrix" aria-label="Результаты за день, месяц и год">
            {resultRows.map((row) => (
              <div
                className={`result-matrix__row ${row.accent ? "result-matrix__row--accent" : ""}`}
                key={row.label}
              >
                <span className="result-matrix__label">{row.label}</span>
                {row.values.map((value, index) => (
                  <div
                    className="result-matrix__value"
                    key={`${row.label}-${resultPeriods[index].key}`}
                  >
                    <span className="result-matrix__period">{resultPeriods[index].label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
