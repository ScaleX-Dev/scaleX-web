'use client'
import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const Login = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "login",
      title: "Login - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "login"
        });
      }
    };

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone);
          trackEvent("scroll_depth", { depth: milestone, page: "login" });
        }
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/editor"); // Redirect to blog editor
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0c0d0e] overflow-hidden">
      <Metadata
        title="Login - ScaleX"
        description="Login to your ScaleX account to access exclusive features."
      />

      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00ff81]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1.2px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        {/* Logo / wordmark */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase mb-3">
            ScaleX
          </span>
          <h1 className="text-white font-medium text-2xl tracking-[-0.02em]">
            Admin access
          </h1>
          <p className="text-white/30 text-sm mt-1">Sign in to manage content</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-white/35 tracking-[0.18em] uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="you@scalex.global"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.07] transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-white/35 tracking-[0.18em] uppercase">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.07] transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-[#00ff81] text-[#0c0d0e] font-medium text-sm py-3 rounded-xl hover:bg-[#00e872] active:scale-[0.98] transition-all duration-200"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          ScaleX — internal use only
        </p>
      </div>
    </div>
  );
};

export default Login;
