import { getCookie, setCookie } from "./cookies";

const VISITOR_COOKIE = "visitor_id";
const VISITOR_TTL_DAYS = 365;

function isValidUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(value);
}

function generateVisitorId() {
  return crypto.randomUUID();
}

export function getVisitorId() {
  let id = getCookie(VISITOR_COOKIE);

  if (!id || !isValidUUID(id)) {
    id = generateVisitorId();
    setCookie(VISITOR_COOKIE, id, VISITOR_TTL_DAYS);
  }

  return id;
}