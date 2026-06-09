"use client";

import { useMemo, useState } from "react";

export function BearingsCatalog({ importedBrands, domesticBrands }) {
  const [query, setQuery] = useState("");

  const filteredImported = useMemo(
    () =>
      importedBrands.filter((brand) =>
        brand.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [importedBrands, query],
  );
  const filteredDomestic = useMemo(
    () =>
      domesticBrands.filter((brand) =>
        brand.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [domesticBrands, query],
  );

  return (
    <aside className="bearings-sidebar" aria-label="Каталог подшипников">
      <label className="bearings-search">
        <span>Поиск</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Марка, номер или производитель"
        />
      </label>

      <div className="bearings-brand-group">
        <h3>Импортные подшипники</h3>
        <div className="bearings-brand-list">
          {filteredImported.map((brand) => (
            <a href="#contacts" key={brand}>
              {brand}
            </a>
          ))}
        </div>
      </div>

      <div className="bearings-brand-group">
        <h3>Отечественные подшипники</h3>
        <div className="bearings-brand-list">
          {filteredDomestic.map((brand) => (
            <a href="#contacts" key={brand}>
              {brand}
            </a>
          ))}
        </div>
      </div>

      {filteredImported.length === 0 && filteredDomestic.length === 0 ? (
        <p className="bearings-empty">Ничего не найдено. Напишите нам, подберём аналог.</p>
      ) : null}
    </aside>
  );
}
