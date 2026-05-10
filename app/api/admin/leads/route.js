import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/admin-auth";
import { getLeads } from "@/lib/cms";

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const leads = await getLeads();
  return NextResponse.json({ items: leads });
}
