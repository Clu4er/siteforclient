import crypto from "node:crypto";

import { NextResponse } from "next/server";

import { saveLead } from "@/lib/cms";

export async function POST(request) {
  const payload = await request.json();

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!payload.name || !payload.phone) {
    return NextResponse.json(
      { ok: false, error: "Имя и телефон обязательны" },
      { status: 400 }
    );
  }

  const now = new Date();
  const lead = {
    id: crypto.randomUUID(),
    name: payload.name,
    phone: payload.phone,
    email: payload.email || "",
    objectType: payload.objectType || "",
    message: payload.message || "",
    source: payload.source || "unknown",
    page: payload.page || "",
    utm: payload.utm || {},
    createdAt: now.toISOString(),
    createdAtLabel: new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(now),
  };

  await saveLead(lead);

  return NextResponse.json({ ok: true, id: lead.id });
}
