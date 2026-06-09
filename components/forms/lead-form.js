"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const defaultContactInfo = {
  title: "Контактная информация",
  phone: "+7 (903) 328-76-11",
  email: "Kav-spk@mail.ru",
  telegram: "",
  whatsapp: "",
  max: "",
  address: "410036, Саратов, Ростовская 38/50",
  hours: "Пн-Сб, 09:00-19:00",
};

function cleanPhone(value) {
  return String(value || "").replace(/\D/g, "");
}

function createTelegramHref(phone) {
  const cleanedPhone = cleanPhone(phone);

  return cleanedPhone ? `tg://resolve?phone=${cleanedPhone}` : "";
}

async function copyTextToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fallback below handles browsers that expose Clipboard API but deny it.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path
        d="M20.7 4.4 3.9 10.9c-1 .4-1 1.8.1 2.1l4.1 1.3 1.6 5c.3.9 1.5 1.1 2.1.4l2.3-2.8 4.3 3.1c.8.6 1.9.1 2.1-.9l2.5-13.3c.2-1-.8-1.8-1.8-1.4Zm-3.1 4.1-7 6.3-.4 2.4-.9-3.2 8.3-5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LeadForm({
  title = "Связаться с ВТС-ГРУПП",
  subtitle = "Позвоните, напишите на email или откройте чат в Telegram. Мы уточним вводные и подскажем следующий шаг.",
  eyebrow = "Контакты",
  contactInfo = defaultContactInfo,
}) {
  const [copiedField, setCopiedField] = useState("");
  const resetTimerRef = useRef(null);
  const resolvedContactInfo = {
    ...defaultContactInfo,
    ...contactInfo,
  };
  const phoneHref = `tel:+${cleanPhone(resolvedContactInfo.phone)}`;
  const telegramHref = createTelegramHref(resolvedContactInfo.phone);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy(event, field, value) {
    event.preventDefault();

    await copyTextToClipboard(value);
    setCopiedField(field);

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopiedField("");
    }, 1800);
  }

  return (
    <section className="lead-form-panel contact-showcase" id="contacts">
      <div className="contact-showcase__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <aside className="lead-contact-info" aria-label="Контактная информация">
        <div className="lead-contact-info__head">
          <h3>{resolvedContactInfo.title}</h3>
          <p>Выберите удобный канал связи.</p>
        </div>

        <div className="contact-action-grid">
          {telegramHref ? (
            <a className="contact-action contact-action--telegram" href={telegramHref}>
              <span className="contact-action__icon">
                <TelegramIcon />
              </span>
              <span>
                <strong>Telegram</strong>
                <small>{resolvedContactInfo.phone}</small>
              </span>
            </a>
          ) : null}

          <a
            className={`contact-action${copiedField === "phone" ? " contact-action--copied" : ""}`}
            href={phoneHref}
            onClick={(event) => handleCopy(event, "phone", resolvedContactInfo.phone)}
          >
            <span className="contact-action__label">
              {copiedField === "phone" ? "Скопировано" : "Телефон"}
            </span>
            <strong>{resolvedContactInfo.phone}</strong>
          </a>

          <a
            className={`contact-action${copiedField === "email" ? " contact-action--copied" : ""}`}
            href={`mailto:${resolvedContactInfo.email}`}
            onClick={(event) => handleCopy(event, "email", resolvedContactInfo.email)}
          >
            <span className="contact-action__label">
              {copiedField === "email" ? "Скопировано" : "Email"}
            </span>
            <strong>{resolvedContactInfo.email}</strong>
          </a>
        </div>

        <div className="lead-contact-info__meta">
          {resolvedContactInfo.address ? (
            <button
              className={copiedField === "address" ? "is-copied" : ""}
              type="button"
              onClick={(event) => handleCopy(event, "address", resolvedContactInfo.address)}
            >
              <span>{copiedField === "address" ? "Скопировано" : "Адрес"}</span>
              <p>{resolvedContactInfo.address}</p>
            </button>
          ) : null}
          {resolvedContactInfo.hours ? (
            <div>
              <span>Режим</span>
              <p>{resolvedContactInfo.hours}</p>
            </div>
          ) : null}
        </div>

        <Link className="lead-contact-info__subtle-link" href="/bearings">
          Подшипники
        </Link>
      </aside>
    </section>
  );
}
