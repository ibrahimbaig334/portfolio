import React, { useEffect, useMemo, useRef } from "react";
import { useTheme } from "../../providers/ThemeProvider";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * MesmerizingBackground
 * - fixed full-screen canvas
 * - rotating 3D-ish sphere of dots + orbiting dots
 * - theme-aware palette
 * - respects prefers-reduced-motion
 */
export default function MesmerizingBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pausedRef = useRef(false);

  const { theme } = useTheme();

  const palette = useMemo(() => {
    if (theme === "dark") {
      return {
        bg0: "#050813",
        bg1: "#0b1220",
        glowA: "rgba(59, 130, 246, 0.45)", // blue
        glowB: "rgba(147, 51, 234, 0.45)", // purple
        glowC: "rgba(20, 184, 166, 0.35)", // teal
        dot: "rgba(255, 255, 255, 0.85)",
        dotDim: "rgba(255, 255, 255, 0.30)",
        line: "rgba(255, 255, 255, 0.10)",
        net: [
          "rgba(59, 130, 246, 0.55)",
          "rgba(147, 51, 234, 0.55)",
          "rgba(20, 184, 166, 0.45)",
          "rgba(236, 72, 153, 0.42)",
        ],
      };
    }
    return {
      bg0: "#f8fbff",
      bg1: "#eef6ff",
      glowA: "rgba(59, 130, 246, 0.28)",
      glowB: "rgba(236, 72, 153, 0.22)",
      glowC: "rgba(20, 184, 166, 0.18)",
      dot: "rgba(15, 23, 42, 0.65)",
      dotDim: "rgba(15, 23, 42, 0.18)",
      line: "rgba(15, 23, 42, 0.10)",
      net: [
        "rgba(59, 130, 246, 0.35)",
        "rgba(147, 51, 234, 0.30)",
        "rgba(20, 184, 166, 0.26)",
        "rgba(236, 72, 153, 0.22)",
      ],
    };
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();

    // --- geometry setup
    const DOT_COUNT = reduced ? 90 : 190;
    const ORBIT_COUNT = reduced ? 18 : 34;
    const LINKS_PER_DOT = 2;

    const STAR_COUNT = reduced ? 120 : 260;

    const NET_COUNT = reduced ? 90 : 220;

    const dots = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      // random points on sphere (uniform)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      dots.push({
        x,
        y,
        z,
        size: 0.9 + Math.random() * 1.2,
        tw: Math.random() * 2 * Math.PI,
        links: [],
      });
    }

    // pre-pick links (random graph) to avoid O(n^2)
    for (let i = 0; i < dots.length; i++) {
      const chosen = new Set();
      while (chosen.size < LINKS_PER_DOT) {
        const j = (Math.random() * dots.length) | 0;
        if (j !== i) chosen.add(j);
      }
      dots[i].links = Array.from(chosen);
    }

    const orbiters = [];
    for (let i = 0; i < ORBIT_COUNT; i++) {
      orbiters.push({
        a: Math.random() * Math.PI * 2,
        r: 0.95 + Math.random() * 0.45,
        sp: 0.25 + Math.random() * 0.35,
        tilt: (Math.random() - 0.5) * 0.8,
        size: 1.2 + Math.random() * 1.6,
      });
    }

    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.4 + Math.random() * 1.4,
        a: 0.08 + Math.random() * 0.22,
        spx: (Math.random() - 0.5) * 0.015,
        spy: (Math.random() - 0.5) * 0.015,
        tw: Math.random() * Math.PI * 2,
      });
    }

    const netPts = [];
    for (let i = 0; i < NET_COUNT; i++) {
      netPts.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.045,
        vy: (Math.random() - 0.5) * 0.045,
        r: 0.8 + Math.random() * 1.6,
        c: (Math.random() * 4) | 0,
        tw: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- render loop
    const start = performance.now();
    const render = (t) => {
      rafRef.current = requestAnimationFrame(render);
      if (pausedRef.current) return;

      const { w, h } = sizeRef.current;
      const time = (t - start) / 1000;

      // background gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, palette.bg0);
      g.addColorStop(1, palette.bg1);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // ambient starfield (fills the whole screen)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.spx;
        s.y += s.spy;
        if (s.x < -0.05) s.x = 1.05;
        if (s.x > 1.05) s.x = -0.05;
        if (s.y < -0.05) s.y = 1.05;
        if (s.y > 1.05) s.y = -0.05;

        const tw = 0.65 + 0.35 * Math.sin(time * 1.3 + s.tw);
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle =
          theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.55)";
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // big glows
      const glow = (x, y, r, c) => {
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, c);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };

      glow(w * 0.22, h * 0.18, Math.min(w, h) * 0.45, palette.glowA);
      glow(w * 0.82, h * 0.32, Math.min(w, h) * 0.42, palette.glowB);
      glow(w * 0.55, h * 0.78, Math.min(w, h) * 0.38, palette.glowC);

      // full-screen particle network (covers the whole viewport)
      const maxDist = Math.min(w, h) * 0.22;
      const cell = Math.max(60, maxDist);
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);

      const buckets = new Array(cols * rows);
      for (let i = 0; i < buckets.length; i++) buckets[i] = [];

      for (let i = 0; i < netPts.length; i++) {
        const p = netPts[i];
        // drift (in normalized space)
        p.x += (p.vx * (reduced ? 0.2 : 0.35)) / w;
        p.y += (p.vy * (reduced ? 0.2 : 0.35)) / h;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const px = p.x * w;
        const py = p.y * h;
        const ix = clamp(Math.floor(px / cell), 0, cols - 1);
        const iy = clamp(Math.floor(py / cell), 0, rows - 1);
        buckets[iy * cols + ix].push(i);
      }

      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1;
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const base = buckets[iy * cols + ix];
          if (!base.length) continue;

          for (let bi = 0; bi < base.length; bi++) {
            const i = base[bi];
            const a = netPts[i];
            const ax = a.x * w;
            const ay = a.y * h;

            let links = 0;
            for (let oy = -1; oy <= 1; oy++) {
              for (let ox = -1; ox <= 1; ox++) {
                const nx = ix + ox;
                const ny = iy + oy;
                if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
                const neigh = buckets[ny * cols + nx];
                for (let ni = 0; ni < neigh.length; ni++) {
                  const j = neigh[ni];
                  if (j <= i) continue;
                  const b = netPts[j];
                  const bx = b.x * w;
                  const by = b.y * h;
                  const dx = ax - bx;
                  const dy = ay - by;
                  const d2 = dx * dx + dy * dy;
                  if (d2 > maxDist * maxDist) continue;

                  const d = Math.sqrt(d2);
                  const tw = 0.7 + 0.3 * Math.sin(time * 1.4 + a.tw);
                  const alpha = clamp((1 - d / maxDist) * 0.28 * tw, 0, 0.22);
                  if (alpha <= 0) continue;

                  // pick a color (blend-ish)
                  const col = palette.net[(a.c + b.c) % palette.net.length];
                  ctx.strokeStyle = col.replace(/0\.[0-9]+\)$/, `${alpha})`);
                  ctx.beginPath();
                  ctx.moveTo(ax, ay);
                  ctx.lineTo(bx, by);
                  ctx.stroke();

                  links++;
                  if (links >= (reduced ? 2 : 4)) break;
                }
                if (links >= (reduced ? 2 : 4)) break;
              }
              if (links >= (reduced ? 2 : 4)) break;
            }
          }
        }
      }

      // draw network nodes
      for (let i = 0; i < netPts.length; i++) {
        const p = netPts[i];
        const px = p.x * w;
        const py = p.y * h;
        const tw = 0.6 + 0.4 * Math.sin(time * 1.8 + p.tw);
        const alpha = (theme === "dark" ? 0.55 : 0.35) * tw;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = palette.net[p.c];
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // sphere parameters (drift only — no mouse/parallax)
      const driftX =
        (Math.sin(time * 0.18) + Math.sin(time * 0.07) * 0.6) * 0.04;
      const driftY =
        (Math.cos(time * 0.15) + Math.sin(time * 0.09) * 0.7) * 0.035;

      const baseCx = 0.5 + driftX;
      const baseCy = 0.44 + driftY;

      const radiusMain = Math.min(w, h) * 0.27;
      const radiusSecondary = Math.min(w, h) * 0.18;
      const persp = 2.75;

      const projectFactory =
        (cx, cy, radius, cosy, siny, cosx, sinx) => (p) => {
          // rotate around Y
          let x = p.x * cosy + p.z * siny;
          let z = -p.x * siny + p.z * cosy;
          // rotate around X
          let y = p.y * cosx - z * sinx;
          z = p.y * sinx + z * cosx;

          const depth = (z + 1.9) / persp; // keep positive
          const sx = cx + (x * radius) / depth;
          const sy = cy + (y * radius) / depth;

          return { sx, sy, z, depth };
        };

      const drawSphere = ({
        cx,
        cy,
        radius,
        ry,
        rx,
        alphaMul = 1,
        drawLinks = false,
        orbitMul = 1,
      }) => {
        const cosy = Math.cos(ry);
        const siny = Math.sin(ry);
        const cosx = Math.cos(rx);
        const sinx = Math.sin(rx);
        const project = projectFactory(cx, cy, radius, cosy, siny, cosx, sinx);

        if (drawLinks) {
          ctx.lineWidth = 1;
          for (let i = 0; i < dots.length; i++) {
            const a = dots[i];
            const pa = project(a);
            if (pa.z < -0.9) continue;
            for (const j of a.links) {
              const b = dots[j];
              const pb = project(b);
              const dz = Math.abs(pa.z - pb.z);
              const alpha = clamp((0.14 - dz * 0.08) * alphaMul, 0, 0.12);
              if (alpha <= 0) continue;
              ctx.strokeStyle = palette.line.replace(/0\.10\)/, `${alpha})`);
              ctx.beginPath();
              ctx.moveTo(pa.sx, pa.sy);
              ctx.lineTo(pb.sx, pb.sy);
              ctx.stroke();
            }
          }
        }

        for (let i = 0; i < dots.length; i++) {
          const p = dots[i];
          const prj = project(p);
          const front = clamp((prj.z + 1) / 2, 0, 1);
          const twinkle = 0.65 + 0.35 * Math.sin(time * 2.0 + p.tw);
          const alpha = (0.12 + 0.78 * front) * twinkle * alphaMul;
          const r = p.size * (0.85 + front * 1.7);

          ctx.fillStyle = front > 0.35 ? palette.dot : palette.dotDim;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(prj.sx, prj.sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // orbiting dots (ring)
        const ringR = radius * 1.05;
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < orbiters.length; i++) {
          const o = orbiters[i];
          const a = o.a + time * o.sp * orbitMul;
          const x = Math.cos(a) * ringR * o.r;
          const z = Math.sin(a) * ringR * o.r;
          const y = Math.sin(a * 0.7) * ringR * o.tilt;

          const prj = project({ x: x / ringR, y: y / ringR, z: z / ringR });
          const front = clamp((prj.z + 1) / 2, 0, 1);
          const r = o.size * (0.7 + front * 1.25);
          const alpha = (0.14 + front * 0.55) * alphaMul;

          ctx.fillStyle =
            theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.55)";
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(prj.sx, prj.sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      };

      // main sphere
      drawSphere({
        cx: w * baseCx,
        cy: h * baseCy,
        radius: radiusMain,
        ry: reduced ? time * 0.12 : time * 0.2,
        rx: reduced ? time * 0.08 : time * 0.12,
        alphaMul: 1,
        drawLinks: !reduced,
        orbitMul: 1,
      });

      // secondary sphere (fills screen corners a bit)
      drawSphere({
        cx: w * (0.78 - driftX * 0.6),
        cy: h * (0.72 - driftY * 0.5),
        radius: radiusSecondary,
        ry: reduced ? time * 0.09 : time * 0.14,
        rx: reduced ? time * 0.06 : time * 0.1,
        alphaMul: 0.55,
        drawLinks: false,
        orbitMul: 0.9,
      });
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [palette, theme]);

  return (
    <div className="mesmerizing-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="mesmerizing-bg__canvas" />
      <div className="mesmerizing-bg__vignette" />
    </div>
  );
}
