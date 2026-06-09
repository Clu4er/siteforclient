import { NextResponse } from "next/server";

const FALLBACK_BTC_USD_RATE = 92000;
const FALLBACK_USD_RUB_RATE = 92;
const COINGECKO_PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true&precision=2";
const CBR_DAILY_XML_URL = "https://www.cbr.ru/scripts/XML_daily.asp";

export const revalidate = 3600;

async function fetchBtcUsdRate() {
  const response = await fetch(COINGECKO_PRICE_URL, {
    next: { revalidate },
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("CoinGecko request failed");
  }

  const data = await response.json();
  const rate = Number(data?.bitcoin?.usd);
  const updatedAt = Number(data?.bitcoin?.last_updated_at);

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid BTC/USD rate");
  }

  return {
    rate,
    updatedAt: Number.isFinite(updatedAt) ? updatedAt : null,
  };
}

function getXmlTagValue(xml, tagName) {
  return xml.match(new RegExp(`<${tagName}>([^<]+)<\\/${tagName}>`))?.[1] || null;
}

function parseCbrNumber(value) {
  return Number(value?.replace(",", "."));
}

function validateUsdRubRate(rate) {
  if (!Number.isFinite(rate) || rate <= 0 || rate < 20 || rate > 300) {
    throw new Error("Invalid USD/RUB rate");
  }

  return rate;
}

function parseCbrUsdRate(xml) {
  const valuteBlocks = xml.match(/<Valute\b[^>]*>[\s\S]*?<\/Valute>/g) || [];
  const usdBlock = valuteBlocks.find((block) => getXmlTagValue(block, "CharCode") === "USD");

  if (!usdBlock) {
    throw new Error("USD rate not found in CBR response");
  }

  const vunitRate = parseCbrNumber(getXmlTagValue(usdBlock, "VunitRate"));

  if (Number.isFinite(vunitRate) && vunitRate > 0) {
    return validateUsdRubRate(vunitRate);
  }

  const nominal = Number(getXmlTagValue(usdBlock, "Nominal") || 1);
  const value = parseCbrNumber(getXmlTagValue(usdBlock, "Value"));

  if (!Number.isFinite(value) || value <= 0 || !Number.isFinite(nominal) || nominal <= 0) {
    throw new Error("Invalid USD/RUB rate");
  }

  return validateUsdRubRate(value / nominal);
}

async function fetchUsdRubRate() {
  const response = await fetch(CBR_DAILY_XML_URL, {
    next: { revalidate },
    headers: {
      accept: "application/xml,text/xml,*/*",
    },
  });

  if (!response.ok) {
    throw new Error("CBR request failed");
  }

  const xml = await response.text();

  return {
    rate: parseCbrUsdRate(xml),
    updatedAt: null,
  };
}

export async function GET() {
  const [btcUsdResult, usdRubResult] = await Promise.allSettled([
    fetchBtcUsdRate(),
    fetchUsdRubRate(),
  ]);

  const btcUsd =
    btcUsdResult.status === "fulfilled" ? btcUsdResult.value.rate : FALLBACK_BTC_USD_RATE;
  const usdRub =
    usdRubResult.status === "fulfilled" ? usdRubResult.value.rate : FALLBACK_USD_RUB_RATE;
  const btcRub = btcUsd * usdRub;
  const fallback = {
    btcUsd: btcUsdResult.status !== "fulfilled",
    usdRub: usdRubResult.status !== "fulfilled",
  };

  return NextResponse.json({
    btcUsd,
    usdRub,
    btcRub,
    rate: btcRub,
    source: {
      btcUsd: fallback.btcUsd ? "fallback" : "coingecko",
      usdRub: fallback.usdRub ? "fallback" : "cbr",
    },
    fallback: fallback.btcUsd || fallback.usdRub,
    fallbackDetails: fallback,
    updatedAt: {
      btcUsd: btcUsdResult.status === "fulfilled" ? btcUsdResult.value.updatedAt : null,
      usdRub: usdRubResult.status === "fulfilled" ? usdRubResult.value.updatedAt : null,
    },
  });
}
