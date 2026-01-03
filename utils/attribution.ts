import { getCookie, setCookie } from "./cookies";

export function captureUTM() {
  const p = new URLSearchParams(window.location.search);

  if (p.get("utm_source") && !getCookie("utm_data")) {
    setCookie(
      "utm_data",
      JSON.stringify({
        utm_source: p.get("utm_source"),
        utm_medium: p.get("utm_medium"),
        utm_campaign: p.get("utm_campaign"),
        utm_term: p.get("utm_term"),
        utm_content: p.get("utm_content")
      }),
      90
    );
  }
}
