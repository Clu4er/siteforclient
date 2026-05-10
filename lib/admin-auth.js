import crypto from "node:crypto";

const COOKIE_NAME = "btc_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "development-secret-change-me";
}

function sign(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function secureCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function isValidAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD || "change-me";
  return secureCompare(password || "", expected);
}

export function createAdminSessionToken() {
  const payload = Date.now().toString();
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  const isValid = secureCompare(sign(payload), signature);
  const isFresh = Number(payload) > Date.now() - SESSION_MAX_AGE * 1000;

  return isValid && isFresh;
}

export function isAdminRequest(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export function attachAdminSession(response) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: createAdminSessionToken(),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

export function clearAdminSession(response) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}
