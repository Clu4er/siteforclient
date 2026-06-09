"use client";

import { useEffect, useRef, useState } from "react";

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

export function ContactCopyGrid({ items }) {
  const [copiedTitle, setCopiedTitle] = useState("");
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy(item) {
    await copyTextToClipboard(item.copyValue);
    setCopiedTitle(item.title);

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopiedTitle("");
    }, 1800);
  }

  return (
    <div className="feature-grid feature-grid--3">
      {items.map((item) => {
        const isCopied = copiedTitle === item.title;

        return (
          <button
            className={`info-card info-card--copyable${isCopied ? " is-copied" : ""}`}
            key={item.title}
            type="button"
            onClick={() => handleCopy(item)}
          >
            <span className="info-card__badge">{isCopied ? "Скопировано" : item.badge}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </button>
        );
      })}
    </div>
  );
}
