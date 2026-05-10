import { NextResponse } from "next/server";

import { attachAdminSession, isValidAdminPassword } from "@/lib/admin-auth";

export async function POST(request) {
  const payload = await request.json();

  if (!isValidAdminPassword(payload.password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  attachAdminSession(response);

  return response;
}
