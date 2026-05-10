import fs from "node:fs/promises";
import path from "node:path";

import { defaultSiteContent } from "@/lib/default-site-content";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep(base, incoming) {
  if (Array.isArray(base)) {
    return Array.isArray(incoming) ? incoming : base;
  }

  if (!isObject(base)) {
    return incoming ?? base;
  }

  const result = { ...base };

  for (const key of Object.keys(incoming || {})) {
    if (key in result) {
      result[key] = mergeDeep(result[key], incoming[key]);
    } else {
      result[key] = incoming[key];
    }
  }

  return result;
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getSiteContent() {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return mergeDeep(clone(defaultSiteContent), parsed);
  } catch {
    return clone(defaultSiteContent);
  }
}

export async function saveSiteContent(nextContent) {
  await ensureDataDir();

  const merged = mergeDeep(clone(defaultSiteContent), nextContent || {});
  await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2), "utf8");

  return merged;
}

export async function getLeads() {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveLead(lead) {
  const leads = await getLeads();
  leads.unshift(lead);

  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");

  return lead;
}
