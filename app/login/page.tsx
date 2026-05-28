'use client'
import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const Login = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", { page: "login", title: "Login - ScaleX" });
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) trackEvent("click", { element: button.tagName.toLowerCase(), text: button.textContent?.trim() || '', href: button.getAttribute('href'), page: "login" });
    };
    const handleScroll = () => {
      const scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone);
          trackEvent("scroll_depth", { depth: milestone, page: "login" });
        }
      });
    };
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => { document.removeEventListener('click', handleClick); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials. Try again.");
      } else {
        router.push("/editor");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0c0d0e] overflow-hidden">
      <Metadata title="Login - ScaleX" description="Login to your ScaleX account to access exclusive features." />

      {/* Ambient glows */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#00ff81]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-1/4 w-[400px] h-[300px] bg-[#00ff81]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1.2px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto px-6">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-10 h-10 rounded-2xl bg-[#00ff81]/10 border border-[#00ff81]/20 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[#00ff81]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase mb-2">ScaleX</span>
          <h1 className="text-white font-medium text-2xl tracking-[-0.02em]">Admin access</h1>
          <p className="text-white/25 text-sm mt-1.5">Sign in to manage content</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 backdrop-blur-sm">

          {error && (
            <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-white/30 tracking-[0.18em] uppercase">Email</label>
              <input
                type="email"
                placeholder="you@scalex.global"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-white/15 outline-none focus:border-[#00ff81]/40 focus:bg-white/[0.06] transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-white/30 tracking-[0.18em] uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/15 outline-none focus:border-[#00ff81]/40 focus:bg-white/[0.06] transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors duration-200 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full flex items-center justify-center gap-2 bg-[#00ff81] text-[#0c0d0e] font-medium text-sm py-3 rounded-xl hover:bg-[#00e872] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0c0d0e]/20 border-t-[#0c0d0e] rounded-full animate-spin" />
                  Signing in…
                </>
              ) : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/15 text-xs mt-6 font-mono">
          SCALEX — INTERNAL USE ONLY
        </p>
      </div>
    </div>
  );
};

export default Login;
