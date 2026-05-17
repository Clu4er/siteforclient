"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const defaultContactInfo = {
  title: "Контактная информация",
  phone: "+7 (903) 328-76-11",
  email: "Kav-spk@mail.ru",
  telegram: "",
  whatsapp: "",
  max: "",
  address: "Москва, выезды по России и СНГ",
  hours: "Пн-Сб, 09:00-19:00",
};

function cleanPhone(value) {
  return String(value || "").replace(/\D/g, "");
}

function trackEvent(name, payload) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  if (typeof window.ym === "function" && window.__YANDEX_METRIKA_ID) {
    window.ym(window.__YANDEX_METRIKA_ID, "reachGoal", name);
  }
}

export function LeadForm({
  source,
  title,
  subtitle,
  buttonLabel,
  eyebrow = "Заявка",
  objectLabel = "Тип объекта",
  objectPlaceholder = "Дом, теплица, гостиница, производство",
  messagePlaceholder = "Площадь, тип отопления сейчас, стоимость кВт·ч, задачи по объекту",
  footerText = "Отправляя форму, вы соглашаетесь на обратную связь по указанным контактам.",
  successText = "Заявка отправлена. Мы свяжемся с вами с уточняющими вопросами по объекту.",
  contactInfo = defaultContactInfo,
}) {
  const pathname = usePathname();
  const resolvedContactInfo =
    contactInfo === false
      ? null
      : {
          ...defaultContactInfo,
          ...contactInfo,
        };
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    objectType: "",
    message: "",
    website: "",
  });

  const onChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Укажите имя и телефон, чтобы мы могли связаться с вами.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const params =
        typeof window === "undefined"
          ? new URLSearchParams()
          : new URLSearchParams(window.location.search);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source,
          page: pathname,
          utm: {
            utm_source: params.get("utm_source") || "",
            utm_medium: params.get("utm_medium") || "",
            utm_campaign: params.get("utm_campaign") || "",
            utm_term: params.get("utm_term") || "",
            utm_content: params.get("utm_content") || "",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить форму");
      }

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        objectType: "",
        message: "",
        website: "",
      });

      trackEvent("lead_submit", { source, page: pathname });
    } catch (submitError) {
      setStatus("error");
      setError("Сейчас форма не отправилась. Попробуйте ещё раз или свяжитесь по телефону.");
    }
  };

  return (
    <section className="lead-form-panel" id="lead-form">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="lead-form__content">
        <form className="lead-form" onSubmit={onSubmit}>
          <input
            type="text"
            value={form.website}
            onChange={(event) => onChange("website", event.target.value)}
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="form-grid">
            <label>
              <span>Имя</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => onChange("name", event.target.value)}
                placeholder="Как к вам обращаться"
              />
            </label>
            <label>
              <span>Телефон</span>
              <input
                type="text"
                value={form.phone}
                onChange={(event) => onChange("phone", event.target.value)}
                placeholder="+7..."
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => onChange("email", event.target.value)}
                placeholder="name@example.ru"
              />
            </label>
            <label>
              <span>{objectLabel}</span>
              <input
                type="text"
                value={form.objectType}
                onChange={(event) => onChange("objectType", event.target.value)}
                placeholder={objectPlaceholder}
              />
            </label>
          </div>

          <label>
            <span>Комментарий</span>
            <textarea
              value={form.message}
              onChange={(event) => onChange("message", event.target.value)}
              placeholder={messagePlaceholder}
            />
          </label>

          <div className="lead-form__footer">
            <button className="btn btn--primary" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Отправляем..." : buttonLabel}
            </button>
            <p>{footerText}</p>
          </div>

          {error ? <div className="form-message form-message--error">{error}</div> : null}
          {status === "success" ? (
            <div className="form-message form-message--success">{successText}</div>
          ) : null}
        </form>

        {resolvedContactInfo ? (
          <aside className="lead-contact-info" aria-label="Контактная информация">
            <h3>{resolvedContactInfo.title}</h3>
            <div>
              <span>Телефон</span>
              <a href={`tel:+${cleanPhone(resolvedContactInfo.phone)}`}>
                {resolvedContactInfo.phone}
              </a>
              {(resolvedContactInfo.secondaryPhones || []).map((phone) => (
                <a href={`tel:+${cleanPhone(phone)}`} key={phone}>
                  {phone}
                </a>
              ))}
            </div>
            <div>
              <span>Email</span>
              <a href={`mailto:${resolvedContactInfo.email}`}>{resolvedContactInfo.email}</a>
            </div>
            {resolvedContactInfo.telegram || resolvedContactInfo.max ? (
              <div>
                <span>Мессенджеры</span>
                {resolvedContactInfo.telegram ? (
                  <a href={`https://t.me/${String(resolvedContactInfo.telegram).replace("@", "")}`}>
                    Telegram
                  </a>
                ) : null}
                {resolvedContactInfo.max ? (
                  <a href={resolvedContactInfo.max}>
                    MAX
                  </a>
                ) : null}
              </div>
            ) : null}
            {resolvedContactInfo.address ? <p>{resolvedContactInfo.address}</p> : null}
            {resolvedContactInfo.hours ? <small>{resolvedContactInfo.hours}</small> : null}
          </aside>
        ) : null}
      </div>
    </section>
  );
}
