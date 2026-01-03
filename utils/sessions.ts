import { getCookie, setCookie } from "./cookies";

const SESSION_COOKIE = "session_id";
const LAST_ACTIVITY_COOKIE = "last_activity";
const SESSION_TIMEOUT_MIN = 30;


function now() {
  return Date.now();
}

function minutesSince(ts: number) {
  return (now() - ts) / 60000;
}

function createSession() {
  const id = crypto.randomUUID();
  setCookie(SESSION_COOKIE, id, 1); 
  setCookie(LAST_ACTIVITY_COOKIE, (now()).toString(), 1);
  return id;
}

function readSessionId() {
  return getCookie(SESSION_COOKIE);
}

function readLastActivity() {
  const value = getCookie(LAST_ACTIVITY_COOKIE);
  return value ? Number(value) : null;
}


export function getSessionId() {
  const sessionId = readSessionId();
  const lastActivity = readLastActivity();

  if (!sessionId || !lastActivity) {
    return createSession();
  }

  if (minutesSince(lastActivity) > SESSION_TIMEOUT_MIN) {
    return createSession();
  }

  setCookie(LAST_ACTIVITY_COOKIE, (now()).toString(), 1);
  return sessionId;
}
