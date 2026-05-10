"use client";

import { useEffect, useMemo, useState } from "react";

function emptyStatus() {
  return {
    type: "",
    message: "",
  };
}

export function AdminDashboard() {
  const [session, setSession] = useState("loading");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(null);
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState(emptyStatus());
  const [loadingContent, setLoadingContent] = useState(false);

  const faqItems = useMemo(() => content?.faq || [], [content]);

  async function loadProtectedData() {
    setLoadingContent(true);
    try {
      const [contentResponse, leadsResponse] = await Promise.all([
        fetch("/api/admin/content", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }),
      ]);

      if (contentResponse.status === 401 || leadsResponse.status === 401) {
        setSession("guest");
        return;
      }

      const contentPayload = await contentResponse.json();
      const leadsPayload = await leadsResponse.json();

      setContent(contentPayload);
      setLeads(leadsPayload.items || []);
      setSession("authenticated");
    } finally {
      setLoadingContent(false);
    }
  }

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        if (payload.authenticated) {
          loadProtectedData();
        } else {
          setSession("guest");
        }
      })
      .catch(() => setSession("guest"));
  }, []);

  const onLogin = async (event) => {
    event.preventDefault();
    setStatus(emptyStatus());

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setStatus({
        type: "error",
        message: "Неверный пароль администратора.",
      });
      return;
    }

    setPassword("");
    setSession("authenticated");
    await loadProtectedData();
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setSession("guest");
    setContent(null);
    setLeads([]);
  };

  const updateContentValue = (path, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      const parts = path.split(".");
      let cursor = next;

      for (let index = 0; index < parts.length - 1; index += 1) {
        cursor = cursor[parts[index]];
      }

      cursor[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const updateFaqItem = (index, key, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      next.faq[index][key] = value;
      return next;
    });
  };

  const addFaqItem = () => {
    setContent((current) => ({
      ...current,
      faq: [...current.faq, { question: "", answer: "" }],
    }));
  };

  const removeFaqItem = (index) => {
    setContent((current) => ({
      ...current,
      faq: current.faq.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const onSave = async () => {
    setStatus(emptyStatus());
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      setStatus({
        type: "error",
        message: "Не удалось сохранить изменения.",
      });
      return;
    }

    const payload = await response.json();
    setContent(payload);
    setStatus({
      type: "success",
      message: "Контент сохранён. Страницы переиндексируются через revalidatePath.",
    });
  };

  if (session === "loading") {
    return <div className="admin-card">Проверяем сессию администратора...</div>;
  }

  if (session === "guest") {
    return (
      <div className="admin-card admin-card--login">
        <span className="eyebrow">Админка</span>
        <h1>Вход в CMS</h1>
        <p>
          Это серверная админка без localStorage. Авторизация строится на HTTP-only
          cookie, а данные хранятся на сервере.
        </p>
        <form className="admin-login" onSubmit={onLogin}>
          <label>
            <span>Пароль администратора</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="ADMIN_PASSWORD"
            />
          </label>
          <button className="btn btn--primary" type="submit">
            Войти
          </button>
        </form>
        {status.message ? (
          <div className={`form-message form-message--${status.type}`}>{status.message}</div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-toolbar">
        <div>
          <span className="eyebrow">Админка</span>
          <h1>Контент и заявки</h1>
        </div>
        <div className="admin-toolbar__actions">
          <button className="btn btn--ghost" type="button" onClick={onLogout}>
            Выйти
          </button>
          <button className="btn btn--primary" type="button" onClick={onSave}>
            Сохранить изменения
          </button>
        </div>
      </div>

      {status.message ? (
        <div className={`form-message form-message--${status.type}`}>{status.message}</div>
      ) : null}

      {loadingContent || !content ? (
        <div className="admin-card">Загружаем контент...</div>
      ) : (
        <>
          <section className="admin-card">
            <h2>Контакты компании</h2>
            <div className="form-grid">
              <label>
                <span>Название</span>
                <input
                  type="text"
                  value={content.company.name}
                  onChange={(event) => updateContentValue("company.name", event.target.value)}
                />
              </label>
              <label>
                <span>Телефон</span>
                <input
                  type="text"
                  value={content.company.phone}
                  onChange={(event) => updateContentValue("company.phone", event.target.value)}
                />
              </label>
              <label>
                <span>WhatsApp</span>
                <input
                  type="text"
                  value={content.company.whatsapp}
                  onChange={(event) =>
                    updateContentValue("company.whatsapp", event.target.value)
                  }
                />
              </label>
              <label>
                <span>Telegram</span>
                <input
                  type="text"
                  value={content.company.telegram}
                  onChange={(event) =>
                    updateContentValue("company.telegram", event.target.value)
                  }
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="text"
                  value={content.company.email}
                  onChange={(event) => updateContentValue("company.email", event.target.value)}
                />
              </label>
              <label>
                <span>Часы работы</span>
                <input
                  type="text"
                  value={content.company.hours}
                  onChange={(event) => updateContentValue("company.hours", event.target.value)}
                />
              </label>
            </div>
            <label>
              <span>Адрес / география</span>
              <input
                type="text"
                value={content.company.address}
                onChange={(event) => updateContentValue("company.address", event.target.value)}
              />
            </label>
            <label>
              <span>Теглайн</span>
              <textarea
                value={content.company.tagline}
                onChange={(event) => updateContentValue("company.tagline", event.target.value)}
              />
            </label>
          </section>

          <section className="admin-card">
            <h2>Главный экран</h2>
            <label>
              <span>Eyebrow</span>
              <input
                type="text"
                value={content.hero.eyebrow}
                onChange={(event) => updateContentValue("hero.eyebrow", event.target.value)}
              />
            </label>
            <label>
              <span>Заголовок</span>
              <textarea
                value={content.hero.title}
                onChange={(event) => updateContentValue("hero.title", event.target.value)}
              />
            </label>
            <label>
              <span>Подзаголовок</span>
              <textarea
                value={content.hero.subtitle}
                onChange={(event) => updateContentValue("hero.subtitle", event.target.value)}
              />
            </label>
            <div className="form-grid">
              <label>
                <span>Основная CTA</span>
                <input
                  type="text"
                  value={content.hero.primaryCta}
                  onChange={(event) =>
                    updateContentValue("hero.primaryCta", event.target.value)
                  }
                />
              </label>
              <label>
                <span>Вторая CTA</span>
                <input
                  type="text"
                  value={content.hero.secondaryCta}
                  onChange={(event) =>
                    updateContentValue("hero.secondaryCta", event.target.value)
                  }
                />
              </label>
            </div>
          </section>

          <section className="admin-card">
            <h2>Калькулятор</h2>
            <div className="form-grid">
              <label>
                <span>TH/s</span>
                <input
                  type="number"
                  value={content.calculatorDefaults.hashrate}
                  onChange={(event) =>
                    updateContentValue(
                      "calculatorDefaults.hashrate",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
              <label>
                <span>BTC курс, ₽</span>
                <input
                  type="number"
                  value={content.calculatorDefaults.btcRate}
                  onChange={(event) =>
                    updateContentValue(
                      "calculatorDefaults.btcRate",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
              <label>
                <span>Мощность, кВт</span>
                <input
                  type="number"
                  value={content.calculatorDefaults.powerKw}
                  onChange={(event) =>
                    updateContentValue(
                      "calculatorDefaults.powerKw",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
              <label>
                <span>Электричество, ₽/кВт·ч</span>
                <input
                  type="number"
                  value={content.calculatorDefaults.electricityRate}
                  onChange={(event) =>
                    updateContentValue(
                      "calculatorDefaults.electricityRate",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
              <label>
                <span>BTC / TH / сутки</span>
                <input
                  type="number"
                  value={content.calculatorDefaults.btcPerThDay}
                  onChange={(event) =>
                    updateContentValue(
                      "calculatorDefaults.btcPerThDay",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
              <label>
                <span>КПД тепла</span>
                <input
                  type="number"
                  value={content.calculatorDefaults.heatEfficiency}
                  onChange={(event) =>
                    updateContentValue(
                      "calculatorDefaults.heatEfficiency",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
            </div>
          </section>

          <section className="admin-card">
            <h2>Форма заявки</h2>
            <label>
              <span>Заголовок формы</span>
              <input
                type="text"
                value={content.leadForm.title}
                onChange={(event) => updateContentValue("leadForm.title", event.target.value)}
              />
            </label>
            <label>
              <span>Текст формы</span>
              <textarea
                value={content.leadForm.subtitle}
                onChange={(event) =>
                  updateContentValue("leadForm.subtitle", event.target.value)
                }
              />
            </label>
            <label>
              <span>Кнопка формы</span>
              <input
                type="text"
                value={content.leadForm.buttonLabel}
                onChange={(event) =>
                  updateContentValue("leadForm.buttonLabel", event.target.value)
                }
              />
            </label>
          </section>

          <section className="admin-card">
            <div className="admin-card__header">
              <h2>FAQ</h2>
              <button className="btn btn--ghost" type="button" onClick={addFaqItem}>
                Добавить вопрос
              </button>
            </div>
            <div className="faq-editor">
              {faqItems.map((item, index) => (
                <article className="faq-editor__item" key={`${item.question}-${index}`}>
                  <label>
                    <span>Вопрос</span>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(event) =>
                        updateFaqItem(index, "question", event.target.value)
                      }
                    />
                  </label>
                  <label>
                    <span>Ответ</span>
                    <textarea
                      value={item.answer}
                      onChange={(event) =>
                        updateFaqItem(index, "answer", event.target.value)
                      }
                    />
                  </label>
                  <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => removeFaqItem(index)}
                  >
                    Удалить
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="admin-card">
            <h2>Входящие заявки</h2>
            <div className="leads-list">
              {leads.length === 0 ? (
                <p>Пока заявок нет.</p>
              ) : (
                leads.map((lead) => (
                  <article className="lead-row" key={lead.id}>
                    <div>
                      <strong>{lead.name}</strong>
                      <span>{lead.phone}</span>
                    </div>
                    <div>
                      <strong>{lead.source}</strong>
                      <span>{lead.objectType || "Без типа объекта"}</span>
                    </div>
                    <div>
                      <strong>{lead.createdAtLabel}</strong>
                      <span>{lead.email || "Без email"}</span>
                    </div>
                    <p>{lead.message || "Без комментария"}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
