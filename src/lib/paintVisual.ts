import type { VisualMode } from '@/types';

/**
 * Premium architectural & atmospheric canvas visuals for AzDSF DanceSport.
 * Styled after championship arena lighting, ballroom reflections, and the
 * noble deep navy (#1B467A) & magenta (#ED018A) tones of the federation logo.
 * Designed to feel authentic, stately, and non-synthetic.
 */

type Palette = {
  bg: [string, string, string];
  lights: string[];
  accent: string;
};

const PALETTES: Record<VisualMode, Palette> = {
  hero: {
    bg: ['#081729', '#112C4F', '#1B467A'],
    lights: ['#2864A8', '#1B467A', '#3C82CE', '#ED018A'],
    accent: '#ED018A'
  },
  brand: {
    bg: ['#0A1A2E', '#14355D', '#1B467A'],
    lights: ['#255C99', '#3B7FC4', '#1B467A', '#E11D85'],
    accent: '#ED018A'
  },
  mag: {
    bg: ['#1C0B22', '#2B1135', '#162F52'],
    lights: ['#8A0D52', '#C20F70', '#1B467A', '#ED018A'],
    accent: '#ED018A'
  },
  light: {
    bg: ['#EBF1F8', '#F5F8FC', '#DDE8F4'],
    lights: ['#AEC6E3', '#89AFDA', '#1B467A', '#FBCFE8'],
    accent: '#ED018A'
  }
};

function rng(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function paintVisual(canvas: HTMLCanvasElement, seed: number, mode: VisualMode): void {
  const box = canvas.getBoundingClientRect();
  if (box.width < 2 || box.height < 2) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(box.width * dpr);
  const h = Math.round(box.height * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const palette = PALETTES[mode] ?? PALETTES.brand;
  const random = rng(seed * 7919 + 131);
  const isLight = mode === 'light';

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // 1. Base Gradient — Rich Stage Atmosphere
  const bgGrad = ctx.createLinearGradient(0, 0, w * 0.8, h);
  bgGrad.addColorStop(0, palette.bg[0]);
  bgGrad.addColorStop(0.5, palette.bg[1]);
  bgGrad.addColorStop(1, palette.bg[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Arena Spotlight Cones / Atmospheric Beams (Championship Dance Floor lighting)
  const beamCount = 3;
  for (let b = 0; b < beamCount; b++) {
    const originX = w * (0.2 + random() * 0.6);
    const originY = -h * 0.2;
    const spread = w * (0.35 + random() * 0.45);
    const targetX = w * (0.1 + random() * 0.8);
    
    ctx.save();
    const beamGrad = ctx.createRadialGradient(
      originX,
      originY,
      10,
      targetX,
      h * 0.85,
      spread
    );
    const col = palette.lights[b % palette.lights.length];
    beamGrad.addColorStop(0, isLight ? 'rgba(27,70,122,0.12)' : 'rgba(255,255,255,0.18)');
    beamGrad.addColorStop(0.4, isLight ? 'rgba(59,127,196,0.06)' : `${col}33`);
    beamGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(targetX - spread * 0.6, h + 20);
    ctx.lineTo(targetX + spread * 0.6, h + 20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 3. Polished Ballroom Floor Reflection Line (Lower third horizon)
  const floorY = h * 0.72;
  ctx.save();
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, isLight ? 'rgba(255,255,255,0.45)' : 'rgba(27,70,122,0.3)');
  floorGrad.addColorStop(0.1, isLight ? 'rgba(219,231,245,0.35)' : 'rgba(10,24,44,0.6)');
  floorGrad.addColorStop(1, isLight ? 'rgba(200,215,235,0.5)' : 'rgba(6,16,30,0.88)');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Subtle gloss reflection line on the floor
  ctx.strokeStyle = isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)';
  ctx.lineWidth = Math.max(1, dpr);
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(w, floorY);
  ctx.stroke();
  ctx.restore();

  // 4. Elegant Dynamic Dance Satin Waves (Smooth architectural arcs, not random ribbons)
  const arcCount = 3;
  for (let i = 0; i < arcCount; i++) {
    const startY = h * (0.2 + (i * 0.22) + (random() - 0.5) * 0.1);
    const endY = h * (0.35 + (i * 0.22) + (random() - 0.5) * 0.1);
    const cp1x = w * (0.2 + random() * 0.25);
    const cp1y = startY - h * (0.15 + random() * 0.2);
    const cp2x = w * (0.55 + random() * 0.3);
    const cp2y = endY + h * (0.18 + random() * 0.2);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-w * 0.1, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, w * 1.1, endY);
    ctx.lineTo(w * 1.1, endY + h * 0.18);
    ctx.bezierCurveTo(cp2x, cp2y + h * 0.18, cp1x, cp1y + h * 0.18, -w * 0.1, startY + h * 0.18);
    ctx.closePath();

    const waveGrad = ctx.createLinearGradient(0, startY, w, endY);
    const c1 = palette.lights[i % palette.lights.length];
    const c2 = palette.lights[(i + 1) % palette.lights.length];
    waveGrad.addColorStop(0, isLight ? `${c1}20` : `${c1}26`);
    waveGrad.addColorStop(0.5, isLight ? `${c2}30` : `${c2}3A`);
    waveGrad.addColorStop(1, isLight ? `${c1}15` : `${c1}20`);

    ctx.fillStyle = waveGrad;
    ctx.fill();
    ctx.restore();
  }

  // 5. Signature AzDSF Magenta Accent Filament (Thin, laser-sharp royal precision)
  ctx.save();
  ctx.strokeStyle = palette.accent;
  ctx.globalAlpha = isLight ? 0.65 : 0.85;
  ctx.lineWidth = Math.max(1.2, 1.8 * dpr);
  ctx.beginPath();
  const fStartY = h * (0.32 + (random() - 0.5) * 0.15);
  const fEndY = h * (0.58 + (random() - 0.5) * 0.15);
  ctx.moveTo(-10, fStartY);
  ctx.bezierCurveTo(
    w * 0.35,
    fStartY - h * 0.18,
    w * 0.65,
    fEndY + h * 0.16,
    w + 10,
    fEndY
  );
  ctx.stroke();
  ctx.restore();

  // 6. Stage Bokeh & Dust Highlights (Soft, organic, glamorous sports gala feel)
  ctx.save();
  const bokehCount = 14;
  for (let k = 0; k < bokehCount; k++) {
    const bx = random() * w;
    const by = random() * (floorY + 20);
    const br = (2 + random() * 5) * dpr;
    const bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    const isMagSpot = k % 4 === 0;
    const spotCol = isMagSpot ? '237,1,138' : '255,255,255';
    bGrad.addColorStop(0, `rgba(${spotCol},${isLight ? 0.25 : 0.45})`);
    bGrad.addColorStop(1, `rgba(${spotCol},0)`);

    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 7. Subtle Framing Vignette
  ctx.save();
  const vignette = ctx.createRadialGradient(
    w * 0.5,
    h * 0.5,
    Math.min(w, h) * 0.3,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.85
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, isLight ? 'rgba(27,70,122,0.14)' : 'rgba(5,13,24,0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
