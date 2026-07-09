'use client'
import React, { useEffect, useRef } from "react";

/**
 * SignalField — the hero's dot grid, made live.
 *
 * A lattice of dots (same 26px rhythm as the static grids used elsewhere on
 * the site) that responds to three signal sources, echoing the network/packet
 * motif from the Services section:
 *
 *  1. The pointer — nearby dots brighten to brand green and drift toward it.
 *  2. Ambient drifters — slow invisible agents keep the field alive when the
 *     cursor is idle or on touch devices.
 *  3. Pulse waves — every few seconds a ring expands from a random point and
 *     dots light up as the wavefront passes through them.
 *
 * Respects prefers-reduced-motion (renders a static grid) and pauses when the
 * hero is off-screen or the tab is hidden.
 *
 * Mobile performance notes:
 *  - Inactive dots are drawn in a single batched path per frame.
 *  - Touch devices run at 30fps with DPR capped at 1.5.
 *  - Resizes are debounced, and the mobile URL-bar height wobble (which fires
 *    ResizeObserver on every scroll) is ignored unless the change is real.
 */

const SPACING = 26;
const BASE_RADIUS = 1.3;
const POINTER_RADIUS = 210;
const AGENT_RADIUS = 150;
const PULSE_EVERY_MS = 2600;
const PULSE_DURATION_MS = 1900;
const PULSE_MAX_R = 260;
const PULSE_BAND = 22;

type Pulse = { x: number; y: number; born: number };

export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement as HTMLElement;

    let w = 0, h = 0;
    let gridX: number[] = [];
    let gridY: number[] = [];
    let raf = 0;
    let running = true;
    let visible = true;
    let lastFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const frameInterval = coarse ? 33 : 0; // ~30fps on touch devices
    const maxDpr = coarse ? 1.5 : 2;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0 };
    const pulses: Pulse[] = [];
    let lastPulse = 0;

    const applySize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridX = [];
      gridY = [];
      for (let x = SPACING / 2; x < w; x += SPACING) gridX.push(x);
      for (let y = SPACING / 2; y < h; y += SPACING) gridY.push(y);
      if (reduced) drawStatic();
    };

    // Debounced; ignores the mobile URL-bar height wobble that fires
    // ResizeObserver on every scroll and would thrash canvas reallocation.
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const rect = parent.getBoundingClientRect();
        if (Math.abs(rect.width - w) < 1 && Math.abs(rect.height - h) < 140) return;
        applySize();
      }, 200);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.beginPath();
      for (const y of gridY) {
        for (const x of gridX) {
          ctx.moveTo(x + BASE_RADIUS, y);
          ctx.arc(x, y, BASE_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (frameInterval && now - lastFrame < frameInterval) return;
      lastFrame = now;

      // Smooth pointer follow — gives the glow a trailing, fluid feel
      pointer.x += (pointer.tx - pointer.x) * 0.14;
      pointer.y += (pointer.ty - pointer.y) * 0.14;

      // Ambient drifters on lissajous paths
      const t = now * 0.001;
      const agents = [
        { x: w * (0.30 + 0.26 * Math.sin(t * 0.21)),        y: h * (0.42 + 0.30 * Math.sin(t * 0.157 + 1.4)) },
        { x: w * (0.72 + 0.22 * Math.sin(t * 0.166 + 3.1)), y: h * (0.55 + 0.28 * Math.sin(t * 0.203 + 0.6)) },
      ];

      // Spawn pulses from random grid points
      if (now - lastPulse > PULSE_EVERY_MS) {
        lastPulse = now;
        pulses.push({
          x: w * (0.12 + 0.76 * Math.random()),
          y: h * (0.15 + 0.7 * Math.random()),
          born: now,
        });
      }
      while (pulses.length && now - pulses[0].born > PULSE_DURATION_MS) pulses.shift();

      const hasPointer = pointer.strength > 0.01;

      ctx.clearRect(0, 0, w, h);

      // Pass 1: batch all inactive dots into a single path/fill,
      // collecting the few active ones for individual coloring.
      const active: { x: number; y: number; e: number }[] = [];
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.beginPath();

      for (const gy of gridY) {
        for (const gx of gridX) {
          let influence = 0;
          let dirX = 0, dirY = 0;

          if (hasPointer) {
            const pdx = pointer.x - gx, pdy = pointer.y - gy;
            const pd = Math.hypot(pdx, pdy);
            if (pd < POINTER_RADIUS) {
              const f = (1 - pd / POINTER_RADIUS) * pointer.strength;
              if (f > influence) influence = f;
              dirX += (pdx / (pd || 1)) * f;
              dirY += (pdy / (pd || 1)) * f;
            }
          }

          for (const a of agents) {
            const dx = a.x - gx, dy = a.y - gy;
            const d = Math.hypot(dx, dy);
            if (d < AGENT_RADIUS) {
              const f = (1 - d / AGENT_RADIUS) * 0.45;
              if (f > influence) influence = f;
            }
          }

          for (const p of pulses) {
            const age = (now - p.born) / PULSE_DURATION_MS;
            const r = age * PULSE_MAX_R;
            const d = Math.hypot(p.x - gx, p.y - gy);
            const band = Math.abs(d - r);
            if (band < PULSE_BAND) {
              const f = (1 - band / PULSE_BAND) * (1 - age) * 0.85;
              if (f > influence) influence = f;
            }
          }

          const e = influence * influence * (3 - 2 * influence); // smoothstep
          if (e > 0.02) {
            active.push({ x: gx + dirX * 6, y: gy + dirY * 6, e });
          } else {
            ctx.moveTo(gx + BASE_RADIUS, gy);
            ctx.arc(gx, gy, BASE_RADIUS, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();

      // Pass 2: the active (lit) dots, drawn individually
      for (const d of active) {
        const radius = BASE_RADIUS + d.e * 1.7;
        ctx.fillStyle = `rgba(0, ${Math.round(60 + 195 * d.e)}, ${Math.round(30 + 99 * d.e)}, ${0.1 + d.e * 0.9})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointer.strength = 0;
        return;
      }
      pointer.tx = x;
      pointer.ty = y;
      pointer.strength = 1;
    };

    applySize();
    const ro = new ResizeObserver(onResize);
    ro.observe(parent);

    if (reduced) {
      drawStatic();
      return () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        ro.disconnect();
      };
    }

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(parent);
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    if (!coarse) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (!coarse) window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
