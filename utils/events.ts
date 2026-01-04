import { getVisitorId } from "./identify";
import { getSessionId } from "./sessions";
import { getCookie } from "./cookies";

const ENDPOINT = process.env.NEXT_PUBLIC_GOOGLE_SHEET_SCRIPT_URL || "";

export function trackEvent(event: string, data = {}) {
  // Only run on client side
  if (typeof window === "undefined" || typeof fetch === "undefined") {
    console.log("Tracking: Not in browser environment");
    return;
  }

  try {
    const utmData = getCookie("utm_data");
    const utm = utmData ? JSON.parse(decodeURIComponent(utmData)) : null;
    
    const payload = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event,
      data: data,
      url: window.location.pathname,
      timestamp: new Date().toISOString(),
      utm
    };

    console.log("Sending tracking:", { event, payload });

    // Send via fetch with proper JSON content type
    fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload)
    })
    .then(() => console.log("Tracking sent successfully"))
    .catch(err => console.error("Tracking failed:", err));

  } catch (error) {
    console.error("Tracking error:", error);
  }
}
