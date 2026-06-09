"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const galleryItems = {
  private: [
    {
      src: "/images/use-cases/private/private-home-cryptoboiler.png",
      title: "Частный дом",
      description:
        "Сценарий для дома, где тепло уходит в отопление, теплый пол, бойлер и бытовой комфорт.",
      alt: "Семья в теплом доме рядом с инженерным помещением криптокотла",
    },
    {
      src: "/images/use-cases/private/pool-spa.webp",
      title: "Бассейн и SPA-зона",
      description:
        "Тепло можно направлять на подогрев воды и поддержание комфортной температуры.",
      alt: "Теплый бассейн на частном участке вечером",
    },
    {
      src: "/images/use-cases/private/greenhouse-equipment.webp",
      title: "Теплица на участке",
      description:
        "Криптокотел помогает использовать тепло для растений, зелени и сезонного выращивания.",
      alt: "Теплица с растениями и инженерным оборудованием",
    },
    {
      src: "/images/use-cases/private/home-equipment.webp",
      title: "Домовая система отопления",
      description:
        "Оборудование можно интегрировать в техническую зону частного дома.",
      alt: "Инженер показывает владельцам дома систему отопления",
    },
    {
      src: "/images/use-cases/private/family-warm-room.webp",
      title: "Жилые зоны",
      description:
        "Полезное тепло поддерживает комфорт в доме в холодный сезон.",
      alt: "Семья пьет чай в теплом зимнем саду",
    },
    {
      src: "/images/use-cases/private/private-house-family.webp",
      title: "Семейный дом",
      description:
        "Тепло криптокотла можно использовать для основных жилых помещений и повседневного комфорта семьи.",
      alt: "Семья отдыхает в теплом доме рядом с инженерной системой криптокотла",
    },
    {
      src: "/images/use-cases/private/winter-garden.webp",
      title: "Зимний сад",
      description:
        "Тепло можно использовать для стабильного микроклимата растений зимой.",
      alt: "Зимний сад с теплым освещением на частном участке",
    },
    {
      src: "/images/use-cases/private/pool-family.webp",
      title: "Теплый бассейн",
      description:
        "Подогрев воды делает бассейн понятным сценарием утилизации тепла.",
      alt: "Семья купается в теплом бассейне у частного дома",
    },
    {
      src: "/images/use-cases/private/pool-backyard.webp",
      title: "Бассейн на участке",
      description:
        "Избыточное тепло можно направлять на подогрев уличного бассейна в сезон.",
      alt: "Семья отдыхает у бассейна на частном участке",
    },
    {
      src: "/images/use-cases/private/garden-plot.webp",
      title: "Инфраструктура участка",
      description:
        "Отопление можно связать с домом, бассейном, теплицей и вспомогательными зонами.",
      alt: "Зеленый приусадебный участок с теплицей",
    },
  ],
  business: [
    {
      src: "/images/use-cases/business/business-production-cryptoboiler.png",
      title: "Производственные помещения",
      description:
        "Тепло можно направлять в рабочие зоны, цеха и технологические контуры.",
      alt: "Пищевое производство с упаковочной линией и отопительным оборудованием",
    },
    {
      src: "/images/use-cases/business/warehouse-logistics.webp",
      title: "Склады и логистика",
      description:
        "Поддержание комфортной температуры в складских помещениях и зонах обработки заказов.",
      alt: "Теплый склад со стеллажами и паллетами",
    },
    {
      src: "/images/use-cases/business/service-station.webp",
      title: "СТО и сервисные помещения",
      description:
        "Практичный сценарий для сервисных зон, автомоек и помещений с регулярной тепловой нагрузкой.",
      alt: "Автомобильный сервис с подъемниками",
    },
    {
      src: "/images/use-cases/business/woodworking.webp",
      title: "Мастерские",
      description:
        "Тепло можно направлять в мастерские и производственные линии с постоянной занятостью.",
      alt: "Деревообрабатывающий цех с материалами и рабочими",
    },
    {
      src: "/images/use-cases/business/warehouse-packing.webp",
      title: "Зоны упаковки",
      description:
        "Комфортная температура важна для сотрудников, упаковки и обработки заказов.",
      alt: "Складская зона упаковки с коробками",
    },
    {
      src: "/images/use-cases/business/food-production.webp",
      title: "Пищевое производство",
      description:
        "Подходит для пространств, где отопление нужно в течение сезона.",
      alt: "Пищевое производство с линией розлива",
    },
    {
      src: "/images/use-cases/business/cnc-metalworking.webp",
      title: "Металлообработка и CNC",
      description:
        "Решение для объектов, где рабочие зоны требуют стабильного микроклимата.",
      alt: "Цех металлообработки с CNC-станками",
    },
    {
      src: "/images/use-cases/business/electrical-assembly.webp",
      title: "Сборочные зоны",
      description:
        "Тепло можно использовать в чистых технических помещениях и сборочных участках.",
      alt: "Сборочная зона с электрощитами и специалистами",
    },
    {
      src: "/images/use-cases/business/industrial-workshop.webp",
      title: "Цеха и мастерские",
      description:
        "Практичное решение для объектов с постоянной потребностью в тепле.",
      alt: "Инженеры в промышленном цехе рядом с оборудованием",
    },
    {
      src: "/images/use-cases/business/packaging-printing.webp",
      title: "Упаковочные линии",
      description:
        "Тепло помогает поддерживать комфортную среду в производственных и упаковочных зонах.",
      alt: "Производственная линия упаковки и печати",
    },
  ],
};

const categories = [
  {
    id: "private",
    label: "Частные объекты",
    summary: "Дом, бассейн, теплица, зимний сад и инфраструктура участка.",
  },
  {
    id: "business",
    label: "Бизнес и производство",
    summary: "Цеха, склады, сервисные зоны, упаковка и производственные линии.",
  },
];

const galleryCopy = {
  all: {
    eyebrow: "Сценарии применения",
    title: "Где можно использовать криптокотел",
    description:
      "Листайте фото по категориям: отдельно частные объекты и отдельно бизнес-сценарии.",
  },
  private: {
    eyebrow: "Частные объекты",
    title: "Частные объекты",
    description:
      "Фото-сценарии для дома, бассейна, теплицы и инфраструктуры участка.",
  },
  business: {
    eyebrow: "Бизнес и производство",
    title: "Бизнес и производство",
    description:
      "Фото-сценарии для цехов, складов, сервиса и производственных помещений.",
  },
};

function getNextIndex(index, length, step = 1) {
  return (index + step + length) % length;
}

export function UseCasesGallery({ variant = "all" }) {
  const availableCategories =
    variant === "all" ? categories : categories.filter((item) => item.id === variant);
  const initialCategory = availableCategories[0]?.id || "private";
  const [category, setCategory] = useState(initialCategory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStart = useRef(null);
  const lightboxTouchStart = useRef(null);

  useEffect(() => {
    setCategory(initialCategory);
    setActiveIndex(0);
    setLightboxIndex(null);
  }, [initialCategory]);

  const copy = galleryCopy[variant] || galleryCopy.all;
  const items = galleryItems[category];
  const activeItem = items[activeIndex];
  const activeCategory = categories.find((item) => item.id === category);
  const showTabs = availableCategories.length > 1;
  const previewItems = useMemo(
    () =>
      Array.from({ length: Math.min(4, items.length - 1) }, (_, offset) => {
        const itemIndex = getNextIndex(activeIndex, items.length, offset + 1);
        return { ...items[itemIndex], itemIndex };
      }),
    [activeIndex, items],
  );

  const setNextSlide = (step) => {
    setActiveIndex((current) => getNextIndex(current, items.length, step));
  };

  const setNextLightboxSlide = (step) => {
    setLightboxIndex((current) =>
      current === null ? current : getNextIndex(current, items.length, step),
    );
  };

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    setActiveIndex(0);
    setLightboxIndex(null);
  };

  const handleTouchStart = (event, targetRef) => {
    const touch = event.touches[0];
    targetRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event, targetRef, onSwipe) => {
    const start = targetRef.current;
    targetRef.current = null;

    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    onSwipe(deltaX > 0 ? -1 : 1);
  };

  useEffect(() => {
    if (lightboxIndex === null) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setNextLightboxSlide(-1);
      }

      if (event.key === "ArrowRight") {
        setNextLightboxSlide(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, items.length]);

  return (
    <div className={`use-cases-gallery use-cases-gallery--${variant}`}>
      <div className="use-cases-gallery__header">
        <span className="eyebrow">{copy.eyebrow}</span>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        {showTabs ? (
          <div className="use-cases-gallery__tabs" role="tablist" aria-label="Категории объектов">
            {availableCategories.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={category === item.id}
                className={category === item.id ? "is-active" : ""}
                key={item.id}
                onClick={() => handleCategoryChange(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.summary}</small>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="use-cases-gallery__stage">
        <figure
          className="use-cases-gallery__main"
          key={`${category}-${activeItem.src}`}
          onTouchStart={(event) => handleTouchStart(event, touchStart)}
          onTouchEnd={(event) => handleTouchEnd(event, touchStart, setNextSlide)}
        >
          <button
            className="use-cases-gallery__image-button"
            type="button"
            onClick={() => setLightboxIndex(activeIndex)}
            aria-label={`Открыть изображение: ${activeItem.title}`}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1179px) 88vw, 58vw"
              priority={activeIndex === 0}
            />
          </button>
          <figcaption className="use-cases-gallery__caption">
            <span>
              {activeIndex + 1} / {items.length}
            </span>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
          </figcaption>
          <div className="use-cases-gallery__controls" aria-label="Навигация по изображениям">
            <button type="button" onClick={() => setNextSlide(-1)} aria-label="Предыдущий слайд">
              ‹
            </button>
            <button type="button" onClick={() => setNextSlide(1)} aria-label="Следующий слайд">
              ›
            </button>
          </div>
        </figure>

        <div className="use-cases-gallery__side">
          <div className="use-cases-gallery__category-note">
            <strong>{activeCategory.label}</strong>
            <span>{activeCategory.summary}</span>
          </div>
          <div className="use-cases-gallery__thumbs" aria-label="Следующие изображения">
            {previewItems.map((item) => (
              <button
                type="button"
                key={item.src}
                onClick={() => setActiveIndex(item.itemIndex)}
                className="use-cases-gallery__thumb"
              >
                <Image src={item.src} alt={item.alt} fill sizes="180px" loading="lazy" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="use-cases-gallery__dots" aria-label="Выбор слайда">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.src}
              aria-label={`Показать слайд ${index + 1}: ${item.title}`}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="use-cases-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображений"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxIndex(null);
            }
          }}
        >
          <div
            className="use-cases-lightbox__inner"
            onTouchStart={(event) => handleTouchStart(event, lightboxTouchStart)}
            onTouchEnd={(event) =>
              handleTouchEnd(event, lightboxTouchStart, setNextLightboxSlide)
            }
          >
            <button
              className="use-cases-lightbox__close"
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Закрыть просмотр"
            >
              ×
            </button>
            <button
              className="use-cases-lightbox__arrow use-cases-lightbox__arrow--prev"
              type="button"
              onClick={() => setNextLightboxSlide(-1)}
              aria-label="Предыдущее изображение"
            >
              ‹
            </button>
            <div className="use-cases-lightbox__media">
              <Image src={items[lightboxIndex].src} alt={items[lightboxIndex].alt} fill sizes="100vw" priority />
            </div>
            <button
              className="use-cases-lightbox__arrow use-cases-lightbox__arrow--next"
              type="button"
              onClick={() => setNextLightboxSlide(1)}
              aria-label="Следующее изображение"
            >
              ›
            </button>
            <div className="use-cases-lightbox__caption">
              <span>
                {lightboxIndex + 1} / {items.length}
              </span>
              <h3>{items[lightboxIndex].title}</h3>
              <p>{items[lightboxIndex].description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
