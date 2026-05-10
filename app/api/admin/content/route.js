import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { isAdminRequest } from "@/lib/admin-auth";
import { getSiteContent, saveSiteContent } from "@/lib/cms";
import { allSiteRoutes } from "@/lib/site-routes";

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function POST(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = await request.json();
  const content = await saveSiteContent(payload);

  for (const route of allSiteRoutes) {
    revalidatePath(route.href);
  }

  return NextResponse.json(content);
}
