import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { isLowPower } from '../../lib/media';
import { cn } from '../../lib/cn';

/**
 * Poeira dourada flutuando na luz. Canvas leve: poucas partículas,
 * pausa fora da tela e em abas ocultas; desligada com "reduzir movimento".
 */
export function PoeiraDourada({ className, densidade = 1, cor = '205, 177, 134' }: { className?: string; densidade?: number; cor?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const fraco = isLowPower();
    const dpr = Math.min(window.devicePixelRatio || 1, fraco ? 1 : 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visivel = true;
    let mx = 0.5;
    let my = 0.5;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; fase: number; vel: number; prof: number };
    let ps: P[] = [];

    const criar = () => {
      const n = Math.round(((w * h) / 16000) * densidade * (fraco ? 0.45 : 1));
      ps = Array.from({ length: Math.min(n, 140) }, () => {
        const prof = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + prof * 1.9,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -0.05 - Math.random() * 0.22 * (0.4 + prof),
          a: 0.15 + Math.random() * 0.6,
          fase: Math.random() * Math.PI * 2,
          vel: 0.004 + Math.random() * 0.01,
          prof,
        };
      });
    };

    const redimensionar = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      criar();
    };

    const quadro = () => {
      ctx.clearRect(0, 0, w, h);
      const ox = (mx - 0.5) * 24;
      const oy = (my - 0.5) * 16;
      for (const p of ps) {
        p.fase += p.vel;
        p.x += p.vx + Math.sin(p.fase) * 0.12;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const brilho = p.a * (0.55 + 0.45 * Math.sin(p.fase * 1.7));
        const x = p.x + ox * p.prof;
        const y = p.y + oy * p.prof;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 3.2);
        g.addColorStop(0, `rgba(${cor}, ${brilho})`);
        g.addColorStop(1, `rgba(${cor}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(quadro);
    };

    const io = new IntersectionObserver(([e]) => {
      visivel = Boolean(e?.isIntersecting);
      cancelAnimationFrame(raf);
      if (visivel && !document.hidden) raf = requestAnimationFrame(quadro);
    });
    io.observe(canvas);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (visivel && !document.hidden) raf = requestAnimationFrame(quadro);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pointermove', onMove, { passive: true });
    const ro = new ResizeObserver(redimensionar);
    ro.observe(canvas);
    redimensionar();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce, densidade, cor]);

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}

/** Feixes de luz que atravessam a cena devagar (CSS puro, barato). */
export function FeixesDeLuz({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="feixe absolute -top-1/4 left-[30%] h-[150%] w-[38%] origin-top rotate-[18deg] opacity-[0.16] mix-blend-screen"
        style={{ background: 'linear-gradient(180deg, rgb(205 177 134 / 0.9), rgb(205 177 134 / 0.15) 55%, transparent 80%)', filter: 'blur(40px)' }}
      />
      <div
        className="feixe feixe-2 absolute -top-1/4 left-[55%] h-[150%] w-[22%] origin-top rotate-[24deg] opacity-[0.12] mix-blend-screen"
        style={{ background: 'linear-gradient(180deg, rgb(244 240 230 / 0.8), rgb(205 177 134 / 0.1) 50%, transparent 78%)', filter: 'blur(30px)' }}
      />
    </div>
  );
}
