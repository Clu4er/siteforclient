const formatterCache = new Map();

function getNumberFormatter(options = {}) {
  const key = JSON.stringify(options);

  if (!formatterCache.has(key)) {
    formatterCache.set(key, new Intl.NumberFormat("ru-RU", options));
  }

  return formatterCache.get(key);
}

export function formatNumber(value, options = {}) {
  const normalized = Number(value);
  const safeValue = Number.isFinite(normalized) ? normalized : 0;

  return getNumberFormatter({
    useGrouping: true,
    maximumFractionDigits: 0,
    ...options,
  }).format(safeValue);
}

export function formatRub(value, options = {}) {
  return `${formatNumber(value, {
    maximumFractionDigits: 0,
    ...options,
  })} ₽`;
}

export function formatUsd(value, options = {}) {
  return `$${formatNumber(value, {
    maximumFractionDigits: 0,
    ...options,
  })}`;
}

export function formatBtc(value, options = {}) {
  return `${formatNumber(value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
    ...options,
  })} BTC`;
}
