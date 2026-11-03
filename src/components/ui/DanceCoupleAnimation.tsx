'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  interactive?: boolean;
  showControls?: boolean;
};

interface ClothPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angleOffset: number;
  baseRadius: number;
}

export default function DanceCoupleAnimation({
  className = '',
  interactive = true,
  showControls = true
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [danceSpeed, setDanceSpeed] = useState(1);
  const isPlayingRef = useRef(true);
  const danceSpeedRef = useRef(1);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  isPlayingRef.current = isPlaying;
  danceSpeedRef.current = danceSpeed;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastTime = performance.now();

    // 16 points simulating the flowing rim of the ballroom gown
    const skirtPointCount = 20;
    const skirtPoints: ClothPoint[] = [];
    for (let i = 0; i < skirtPointCount; i++) {
      const angle = (i / skirtPointCount) * Math.PI * 2;
      skirtPoints.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        angleOffset: angle,
        baseRadius: 46 + (i % 2 === 0 ? 6 : -4)
      });
    }

    // Sparkles / stage dust particles floating in the spotlight
    const sparkles = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 1 + Math.random() * 2.5,
      speedY: 0.15 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nx * 30;
      mouseRef.current.targetY = ny * 15;
    };

    const onMouseEnter = () => {
      mouseRef.current.isHovering = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const cElem = canvas;
    cElem.addEventListener('mousemove', onMouseMove);
    cElem.addEventListener('mouseenter', onMouseEnter);
    cElem.addEventListener('mouseleave', onMouseLeave);

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isPlayingRef.current) {
        time += dt * danceSpeedRef.current;
      }

      // Smooth mouse tilt
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // ----------------------------------------------------
      // A. ARENA / STAGE BACKGROUND
      // ----------------------------------------------------
      const stageGrad = ctx.createRadialGradient(
        width * 0.5 + mouseRef.current.x * 0.5,
        height * 0.35 + mouseRef.current.y * 0.3,
        20,
        width * 0.5,
        height * 0.55,
        Math.max(width, height) * 0.75
      );
      stageGrad.addColorStop(0, '#1B467A'); // Logo Royal Navy center
      stageGrad.addColorStop(0.45, '#12325A');
      stageGrad.addColorStop(0.85, '#0A1B30');
      stageGrad.addColorStop(1, '#061120'); // Deep dark perimeter
      ctx.fillStyle = stageGrad;
      ctx.fillRect(0, 0, width, height);

      // Overhead Spotlight Beam
      ctx.save();
      const spotGrad = ctx.createLinearGradient(
        width * 0.5 + mouseRef.current.x,
        0,
        width * 0.5,
        height * 0.85
      );
      spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      spotGrad.addColorStop(0.3, 'rgba(237, 1, 138, 0.09)'); // Subtle magenta shimmer
      spotGrad.addColorStop(0.7, 'rgba(27, 70, 122, 0.15)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.moveTo(width * 0.5 + mouseRef.current.x, -20);
      ctx.lineTo(width * 0.5 - width * 0.42, height * 0.88);
      ctx.lineTo(width * 0.5 + width * 0.42, height * 0.88);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Polished Floor Horizon Line
      const floorY = height * 0.78;
      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, floorY, 0, height);
      floorGrad.addColorStop(0, 'rgba(27, 70, 122, 0.55)');
      floorGrad.addColorStop(0.15, 'rgba(10, 25, 45, 0.85)');
      floorGrad.addColorStop(1, 'rgba(4, 12, 22, 0.98)');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, floorY, width, height - floorY);

      // Floor sheen line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(width, floorY);
      ctx.stroke();
      ctx.restore();

      // Ambient Sparkles in the Spotlight
      ctx.save();
      for (const sp of sparkles) {
        if (isPlayingRef.current) {
          sp.y -= sp.speedY * dt * 0.5;
          sp.x += sp.speedX * dt * 0.5;
          if (sp.y < 0) sp.y = 1;
          if (sp.x < 0) sp.x = 1;
          if (sp.x > 1) sp.x = 0;
        }
        const sx = sp.x * width;
        const sy = sp.y * (floorY + 20);
        const alpha = Math.sin(time * 2 + sp.phase) * 0.3 + sp.opacity * 0.7;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha * 0.65)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ----------------------------------------------------
      // B. DANCE KINEMATICS & DYNAMICS (Waltz 3/4 Rhythm)
      // ----------------------------------------------------
      const scale = Math.min(width, height) / 380;
      const centerX = width * 0.5 + mouseRef.current.x * 0.8;
      const centerY = floorY - 6 * scale;

      // Waltz Cycle: 1 = step & lower, 2 = rise, 3 = high & sway
      const waltzBeat = (time * 1.6) % (Math.PI * 2);
      const riseAndFall = Math.sin(waltzBeat * 2) * (14 * scale);
      const coupleRotation = time * 1.1; // Gentle continuous rotation
      const sway = Math.sin(time * 1.6) * 0.1; // Lateral body poise tilt
      const travelX = Math.sin(time * 0.8) * (26 * scale); // Gliding across the floor
      const travelY = Math.cos(time * 0.8) * (8 * scale);

      const baseDanceX = centerX + travelX;
      const baseDanceY = centerY + travelY - riseAndFall;

      // ----------------------------------------------------
      // C. FLOOR SHADOW & SOFT REFLECTION
      // ----------------------------------------------------
      ctx.save();
      // Contact Shadow
      const shadowGrad = ctx.createRadialGradient(
        baseDanceX,
        floorY + 4,
        5,
        baseDanceX,
        floorY + 4,
        65 * scale
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(baseDanceX, floorY + 4, 65 * scale, 18 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Floor Reflection (Inverted drawing with gradient fade)
      ctx.save();
      ctx.translate(baseDanceX, floorY + 4);
      ctx.scale(1, -0.32);
      ctx.globalAlpha = 0.22;
      drawCouple(ctx, 0, 0, scale, coupleRotation, sway, time, skirtPoints, true);
      ctx.restore();
      ctx.restore();

      // ----------------------------------------------------
      // D. DRAW THE DANCING COUPLE
      // ----------------------------------------------------
      ctx.save();
      ctx.translate(baseDanceX, baseDanceY);
      drawCouple(ctx, 0, 0, scale, coupleRotation, sway, time, skirtPoints, false);
      ctx.restore();

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      cElem.removeEventListener('mousemove', onMouseMove);
      cElem.removeEventListener('mouseenter', onMouseEnter);
      cElem.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-navy-950 ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* Floating Badge / Live Status */}
      <div className="pointer-events-none absolute left-3.5 top-3.5 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/70 px-3 py-1 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mag opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mag" />
        </span>
        <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white">
          WDSF Standard · Vals
        </span>
      </div>

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center gap-1.5 rounded-lg border border-white/15 bg-navy-950/80 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pauza' : 'Davam et'}
            className="rounded px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-white transition-colors hover:bg-white/15"
          >
            {isPlaying ? '⏸ Pauza' : '▶ Başlat'}
          </button>
          <button
            type="button"
            onClick={() => setDanceSpeed(danceSpeed === 1 ? 1.4 : danceSpeed === 1.4 ? 0.7 : 1)}
            aria-label="Temp dəyiş"
            className="rounded px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-navy-200 transition-colors hover:bg-white/15 hover:text-white"
          >
            {danceSpeed === 1 ? '1.0x' : danceSpeed === 1.4 ? '1.4x (Sürətli)' : '0.7x (Zərif)'}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Procedural Ballroom Dance Couple Renderer
 * Anatomically proportioned WDSF couple in Standard hold:
 * - Gentleman: Formal black tailcoat (frak), white piqué vest & bow tie, crisp posture.
 * - Lady: Royal magenta layered satin gown with physical cloth physics, floats & elegant poise.
 */
function drawCouple(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  angle: number,
  sway: number,
  time: number,
  skirtPoints: ClothPoint[],
  isReflection: boolean
) {
  ctx.save();
  ctx.scale(scale, scale);

  // Rotation projection variables
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  // Height reference: Gentleman ~180px tall, Lady in heels ~172px tall
  const manHeight = 180;
  const ladyHeight = 172;

  // Hip pivot centers
  const manHipX = -12 * cosA;
  const manHipY = -76;
  const ladyHipX = 14 * cosA;
  const ladyHipY = -72;

  // ---------------------------------------------------------
  // 1. GENTLEMAN LEGS & DANCE STEPS
  // ---------------------------------------------------------
  const legCycle = Math.sin(time * 2.2);
  const manLeftLegX = manHipX - 10 + legCycle * 14 * cosA;
  const manRightLegX = manHipX + 8 - legCycle * 14 * cosA;
  const manFootY = 0;

  // Pants (Midnight navy-black with formal satin stripe reflection)
  ctx.save();
  ctx.strokeStyle = '#081220';
  ctx.lineWidth = 11;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Left leg
  ctx.beginPath();
  ctx.moveTo(manHipX - 6, manHipY);
  ctx.lineTo(manHipX - 8 + legCycle * 8, manHipY + 38);
  ctx.lineTo(manLeftLegX, manFootY);
  ctx.stroke();

  // Right leg
  ctx.beginPath();
  ctx.moveTo(manHipX + 6, manHipY);
  ctx.lineTo(manHipX + 8 - legCycle * 8, manHipY + 38);
  ctx.lineTo(manRightLegX, manFootY);
  ctx.stroke();

  // Patent leather shoes
  ctx.fillStyle = '#02060C';
  ctx.beginPath();
  ctx.ellipse(manLeftLegX + (cosA > 0 ? 5 : -5), manFootY, 8, 3.5, 0, 0, Math.PI * 2);
  ctx.ellipse(manRightLegX + (cosA > 0 ? 5 : -5), manFootY, 8, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 2. LADY GOWN (BALLROOM DRESS) - CLOTH PHYSICS & WAVES
  // ---------------------------------------------------------
  ctx.save();
  const gownWaistY = ladyHipY - 14;
  const gownWaistX = ladyHipX;

  // Dynamic Centrifugal flare calculation
  const spinSpeed = 1.1;
  const flareAmount = Math.min(38, 22 + Math.abs(spinSpeed) * 16);

  // Generate dynamic skirt rim coordinates
  const renderedPoints: { x: number; y: number }[] = [];
  for (let i = 0; i < skirtPoints.length; i++) {
    const pt = skirtPoints[i];
    // Radial angle in world space rotated by dance angle
    const ptAngle = pt.angleOffset + angle;
    const ptCos = Math.cos(ptAngle);
    const ptSin = Math.sin(ptAngle);

    // Wave lag based on momentum
    const wave = Math.sin(time * 3.5 + pt.angleOffset * 2) * 5;
    const rx = gownWaistX + ptCos * (pt.baseRadius + flareAmount + wave);
    const ry = (manFootY - 4) + ptSin * 10 - Math.abs(ptCos) * 4;

    renderedPoints.push({ x: rx, y: ry });
  }

  // Draw Deep Under-skirt (Shading layer)
  ctx.beginPath();
  ctx.moveTo(gownWaistX, gownWaistY);
  for (let i = 0; i < renderedPoints.length; i++) {
    ctx.lineTo(renderedPoints[i].x, renderedPoints[i].y);
  }
  ctx.closePath();
  const underSkirtGrad = ctx.createRadialGradient(
    gownWaistX,
    gownWaistY,
    10,
    gownWaistX,
    manFootY - 10,
    85
  );
  underSkirtGrad.addColorStop(0, '#8A0150');
  underSkirtGrad.addColorStop(0.5, '#560032');
  underSkirtGrad.addColorStop(1, '#2C0019');
  ctx.fillStyle = underSkirtGrad;
  ctx.fill();

  // Draw Main Outer Ballroom Gown (AzDSF Magenta #ED018A & Silk Satin Highlights)
  const gownGrad = ctx.createLinearGradient(
    gownWaistX - 40,
    gownWaistY,
    gownWaistX + 50,
    manFootY
  );
  gownGrad.addColorStop(0, '#FF4FAE');
  gownGrad.addColorStop(0.3, '#ED018A'); // Official AzDSF logo magenta
  gownGrad.addColorStop(0.7, '#C20170');
  gownGrad.addColorStop(1, '#7A0046');

  ctx.beginPath();
  ctx.moveTo(gownWaistX - 10, gownWaistY);
  // Elegant curved hip contour
  ctx.quadraticCurveTo(
    gownWaistX - flareAmount * 0.4,
    gownWaistY + 36,
    renderedPoints[0].x,
    renderedPoints[0].y
  );

  // Smooth Bezier skirt hemline
  for (let i = 0; i < renderedPoints.length; i++) {
    const nextPt = renderedPoints[(i + 1) % renderedPoints.length];
    const xc = (renderedPoints[i].x + nextPt.x) / 2;
    const yc = (renderedPoints[i].y + nextPt.y) / 2;
    ctx.quadraticCurveTo(renderedPoints[i].x, renderedPoints[i].y, xc, yc);
  }

  ctx.quadraticCurveTo(
    gownWaistX + flareAmount * 0.4,
    gownWaistY + 36,
    gownWaistX + 10,
    gownWaistY
  );
  ctx.closePath();
  ctx.fillStyle = gownGrad;
  ctx.fill();

  // Gown vertical silk pleat/crease highlights
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 1.2;
  for (let j = 0; j < renderedPoints.length; j += 3) {
    ctx.beginPath();
    ctx.moveTo(gownWaistX + (j - 10) * 1.5, gownWaistY + 6);
    ctx.quadraticCurveTo(
      gownWaistX + (j - 10) * 2.2,
      gownWaistY + 44,
      renderedPoints[j].x,
      renderedPoints[j].y
    );
    ctx.stroke();
  }

  // Sparkling Gown Hem Trim
  ctx.strokeStyle = 'rgba(255, 215, 235, 0.75)';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Lady Bodice / Corset
  ctx.fillStyle = '#ED018A';
  ctx.beginPath();
  ctx.moveTo(gownWaistX - 9, gownWaistY);
  ctx.lineTo(gownWaistX + 9, gownWaistY);
  ctx.lineTo(gownWaistX + 11 + sway * 10, gownWaistY - 26);
  ctx.lineTo(gownWaistX - 11 + sway * 10, gownWaistY - 26);
  ctx.closePath();
  ctx.fill();

  // Bodice Satin Gloss
  const bodiceGloss = ctx.createLinearGradient(
    gownWaistX - 10,
    gownWaistY - 26,
    gownWaistX + 10,
    gownWaistY
  );
  bodiceGloss.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
  bodiceGloss.addColorStop(0.5, 'rgba(237, 1, 138, 0)');
  bodiceGloss.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = bodiceGloss;
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 3. GENTLEMAN TORSO & FORMAL TAILCOAT (FRAK)
  // ---------------------------------------------------------
  ctx.save();
  const manShoulderY = manHipY - 50;
  const manShoulderX = manHipX;

  // Tailcoat tails hanging at the back
  ctx.fillStyle = '#060E18';
  ctx.beginPath();
  ctx.moveTo(manHipX - 12, manHipY);
  ctx.lineTo(manHipX - 16, manHipY + 54);
  ctx.lineTo(manHipX - 4, manHipY + 42);
  ctx.lineTo(manHipX - 2, manHipY);
  ctx.closePath();
  ctx.fill();

  // White Piqué Dress Shirt & Bow Tie (V-front)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(manShoulderX - 5, manShoulderY + 4);
  ctx.lineTo(manShoulderX + 5, manShoulderY + 4);
  ctx.lineTo(manShoulderX + 2, manHipY - 14);
  ctx.lineTo(manShoulderX - 2, manHipY - 14);
  ctx.closePath();
  ctx.fill();

  // Black Bow Tie
  ctx.fillStyle = '#081220';
  ctx.beginPath();
  ctx.moveTo(manShoulderX - 4, manShoulderY + 6);
  ctx.lineTo(manShoulderX + 4, manShoulderY + 6);
  ctx.lineTo(manShoulderX, manShoulderY + 9);
  ctx.closePath();
  ctx.fill();

  // Formal Tailcoat Jacket Body
  ctx.fillStyle = '#0B1728';
  ctx.beginPath();
  ctx.moveTo(manShoulderX - 22, manShoulderY + 6);
  ctx.lineTo(manShoulderX + 20, manShoulderY + 6);
  ctx.lineTo(manShoulderX + 13, manHipY);
  ctx.lineTo(manShoulderX - 14, manHipY);
  ctx.closePath();
  ctx.fill();

  // Jacket Lapel Satin Shine
  ctx.strokeStyle = '#1B467A'; // Logo Navy accent on gentlemen lapel
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(manShoulderX - 18, manShoulderY + 8);
  ctx.lineTo(manShoulderX - 4, manHipY - 12);
  ctx.moveTo(manShoulderX + 16, manShoulderY + 8);
  ctx.lineTo(manShoulderX + 4, manHipY - 12);
  ctx.stroke();
  ctx.restore();

  // ---------------------------------------------------------
  // 4. HEADS & HAIR (ELEGANT POSTURE & POISE)
  // ---------------------------------------------------------
  ctx.save();
  // Gentleman Head
  const manHeadX = manShoulderX - 1;
  const manHeadY = manShoulderY - 16;

  // Neck
  ctx.fillStyle = '#DAB8A2';
  ctx.fillRect(manHeadX - 4, manHeadY + 6, 8, 10);
  // White stiff collar
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(manHeadX - 5, manHeadY + 11, 10, 4);

  // Head/Face
  ctx.fillStyle = '#E8C5AF';
  ctx.beginPath();
  ctx.arc(manHeadX, manHeadY, 9, 0, Math.PI * 2);
  ctx.fill();

  // Gentleman Sleek Dark Hair
  ctx.fillStyle = '#10151E';
  ctx.beginPath();
  ctx.arc(manHeadX, manHeadY - 2, 9.5, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // Lady Head & Classical Head Poise (Tilted back-left in Standard style)
  const ladyNeckX = gownWaistX + sway * 12;
  const ladyNeckY = gownWaistY - 27;
  const ladyHeadX = ladyNeckX + 8;
  const ladyHeadY = ladyNeckY - 14;

  // Neck
  ctx.fillStyle = '#ECCDB8';
  ctx.beginPath();
  ctx.moveTo(ladyNeckX - 3, ladyNeckY);
  ctx.lineTo(ladyHeadX - 3, ladyHeadY + 6);
  ctx.lineTo(ladyHeadX + 3, ladyHeadY + 6);
  ctx.lineTo(ladyNeckX + 3, ladyNeckY);
  ctx.closePath();
  ctx.fill();

  // Face
  ctx.fillStyle = '#F5D7C4';
  ctx.beginPath();
  ctx.arc(ladyHeadX, ladyHeadY, 8, 0, Math.PI * 2);
  ctx.fill();

  // Lady Championship Hair Bun (Updo with decorative ribbon)
  ctx.fillStyle = '#422416';
  ctx.beginPath();
  ctx.arc(ladyHeadX - 3, ladyHeadY - 2, 8.5, 0, Math.PI * 2);
  ctx.fill();

  // Elegant Hair Bun
  ctx.beginPath();
  ctx.arc(ladyHeadX - 8, ladyHeadY - 4, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Bun crystal/magenta accessory
  ctx.fillStyle = '#ED018A';
  ctx.beginPath();
  ctx.arc(ladyHeadX - 8, ladyHeadY - 4, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 5. STANDARD DANCE ARMS & FRAME (THE HOLD)
  // ---------------------------------------------------------
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // A. Gentleman Left Arm + Lady Right Arm (Joined Hand raised in the air)
  const handJoinX = manShoulderX - 38 - Math.abs(cosA) * 6;
  const handJoinY = manShoulderY - 4;

  // Gentleman Left Arm (Black tailcoat sleeve)
  ctx.strokeStyle = '#0B1728';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(manShoulderX - 20, manShoulderY + 8);
  ctx.quadraticCurveTo(
    manShoulderX - 32,
    manShoulderY + 14,
    handJoinX,
    handJoinY
  );
  ctx.stroke();

  // White cuff
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(handJoinX + 2, handJoinY);
  ctx.lineTo(handJoinX - 2, handJoinY);
  ctx.stroke();

  // Lady Right Arm (Bare arm touching gentleman's hand)
  ctx.strokeStyle = '#F5D7C4';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(ladyNeckX + 10, ladyNeckY + 4);
  ctx.quadraticCurveTo(
    handJoinX + 16,
    manShoulderY - 14,
    handJoinX,
    handJoinY
  );
  ctx.stroke();

  // Clenched / Clasping Hands
  ctx.fillStyle = '#E8C5AF';
  ctx.beginPath();
  ctx.arc(handJoinX, handJoinY, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // B. Lady Left Arm (Resting on Gentleman's right shoulder)
  ctx.strokeStyle = '#ECCDB8';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(ladyNeckX - 8, ladyNeckY + 4);
  ctx.lineTo(manShoulderX + 14, manShoulderY + 12);
  ctx.stroke();

  // C. Gentleman Right Arm (Frame holding lady's shoulder blade)
  ctx.strokeStyle = '#0B1728';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(manShoulderX + 18, manShoulderY + 8);
  ctx.quadraticCurveTo(
    manShoulderX + 32,
    manShoulderY + 18,
    ladyNeckX + 2,
    ladyNeckY + 12
  );
  ctx.stroke();

  // ---------------------------------------------------------
  // 6. FLOATS / SILK RIBBONS (TRAILING FROM LADY'S ARMS)
  // ---------------------------------------------------------
  // Floats trailing from lady's wrists through the air with wave physics
  ctx.strokeStyle = 'rgba(237, 1, 138, 0.65)'; // Magenta chiffon floats
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  const floatLag = Math.sin(time * 3) * 12;
  ctx.moveTo(handJoinX, handJoinY + 2);
  ctx.bezierCurveTo(
    handJoinX + 15,
    handJoinY + 28 + floatLag,
    handJoinX - 20,
    handJoinY + 54 - floatLag,
    handJoinX - 5 + floatLag * 1.5,
    handJoinY + 85
  );
  ctx.stroke();

  // Second float from the right arm
  ctx.strokeStyle = 'rgba(255, 155, 209, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(ladyNeckX - 4, ladyNeckY + 6);
  ctx.bezierCurveTo(
    ladyNeckX - 18,
    ladyNeckY + 30 - floatLag,
    ladyNeckX - 8,
    ladyNeckY + 58 + floatLag,
    ladyNeckX - 22,
    ladyNeckY + 82
  );
  ctx.stroke();

  ctx.restore();
}
