'use client';

import { useEffect, useRef } from 'react';

/**
 * Highly Realistic Championship Ballroom Stage Background
 * - Lower Zone: Polished hardwood parquet floor with herringbone perspective & glossy reflections.
 * - Upper Zone: Championship winners' podium (pedestal 1-2-3) with gold accents & arena lighting.
 * - Sequential Alternating Performances ("Sıra ilə görünsün"):
 *     1. WDSF Standard Waltz Couple: Formal tailcoat & flowing magenta gown with 3D Z-sorted kinematics.
 *     2. WDSF Breaking Solo: Athletic B-Boy performing Toprock, Drop & Footwork, Windmill/Power-spin,
 *        and an Olympic Freeze with specular parquet reflections.
 * - Seamless cross-fade transitions and dynamic arena lighting.
 */
export default function BallroomStageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Ambient floating stage dust & mist
    const hazeBlobs = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      y: 0.6 + Math.random() * 0.4,
      size: 45 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.025,
      alpha: 0.04 + Math.random() * 0.07,
      phase: Math.random() * Math.PI * 2
    }));

    const sparkles = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.85,
      size: 1 + Math.random() * 2,
      speedY: 0.05 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2
    }));

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------
      // PERFORMANCE TIMING & SEQUENCE (24-SECOND CYCLES)
      // 0s - 12s: WDSF Standard Waltz Couple
      // 12s - 24s: WDSF Breaking Solo B-Boy
      // -----------------------------------------------------------------
      const cycleDuration = 24;
      const cycleTime = time % cycleDuration;
      const isBallroomPhase = cycleTime < 12;
      const phaseTime = isBallroomPhase ? cycleTime : cycleTime - 12;

      // Smooth cross-fade transition factor (0 to 1)
      let ballroomAlpha = 1;
      let breakdanceAlpha = 0;

      if (cycleTime < 11) {
        ballroomAlpha = 1;
        breakdanceAlpha = 0;
      } else if (cycleTime < 12) {
        // Transition from ballroom to breaking
        const t = cycleTime - 11;
        ballroomAlpha = 1 - t;
        breakdanceAlpha = t;
      } else if (cycleTime < 23) {
        ballroomAlpha = 0;
        breakdanceAlpha = 1;
      } else {
        // Transition from breaking to ballroom
        const t = cycleTime - 23;
        ballroomAlpha = t;
        breakdanceAlpha = 1 - t;
      }

      // -----------------------------------------------------------------
      // 1. ARENA BACKDROP
      // -----------------------------------------------------------------
      const floorHorizonY = height * 0.63;
      const isDesktop = width > 1024;
      // Positioned directly on the right side of the screen on desktop (hero right stage)
      const podCenterX = isDesktop ? width * 0.73 : width * 0.5;

      // Arena lighting shifts with dance style (Royal blue for ballroom, energetic electric navy/magenta for breaking)
      const arenaGrad = ctx.createRadialGradient(
        podCenterX,
        height * 0.35,
        40,
        podCenterX,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      if (isBallroomPhase) {
        arenaGrad.addColorStop(0, '#1A3F70');
        arenaGrad.addColorStop(0.35, '#102746');
        arenaGrad.addColorStop(0.75, '#09182C');
        arenaGrad.addColorStop(1, '#040B15');
      } else {
        arenaGrad.addColorStop(0, '#224880');
        arenaGrad.addColorStop(0.35, '#152C50');
        arenaGrad.addColorStop(0.75, '#0C1A30');
        arenaGrad.addColorStop(1, '#050C16');
      }
      ctx.fillStyle = arenaGrad;
      ctx.fillRect(0, 0, width, height);

      // Architectural stage curtains
      ctx.save();
      ctx.globalAlpha = 0.2;
      const curtainCount = 14;
      for (let c = 0; c < curtainCount; c++) {
        const cx = (c / (curtainCount - 1)) * width;
        const cGrad = ctx.createLinearGradient(cx, 0, cx + 45, 0);
        cGrad.addColorStop(0, '#060F1C');
        cGrad.addColorStop(0.5, '#1B467A');
        cGrad.addColorStop(1, '#050D18');
        ctx.fillStyle = cGrad;
        ctx.fillRect(cx - 20, 0, width / 12, floorHorizonY);
      }
      ctx.restore();

      // -----------------------------------------------------------------
      // 2. CHAMPIONSHIP WINNERS' PEDESTAL (PYEDESTAL 1 - 2 - 3)
      // -----------------------------------------------------------------
      const podBaseY = floorHorizonY + 12;
      drawPodium(ctx, podCenterX, podBaseY, width, height, time, !isBallroomPhase);

      // -----------------------------------------------------------------
      // 3. POLISHED HARDWOOD PARQUET FLOOR
      // -----------------------------------------------------------------
      drawParquetFloor(ctx, floorHorizonY, width, height, time, podCenterX);

      // -----------------------------------------------------------------
      // 4. ARENA SPOTLIGHT BEAMS
      // -----------------------------------------------------------------
      drawSpotlights(ctx, width, height, time, podCenterX, floorHorizonY, breakdanceAlpha > 0.5);

      // -----------------------------------------------------------------
      // 5. SEQUENTIAL PERFORMANCES (WALTZ COUPLE OR SOLO BREAKDANCER)
      // -----------------------------------------------------------------
      const baseScale = Math.min(width, height) / 520;

      // --- PERFORMANCE 1: WDSF BALLROOM COUPLE ---
      if (ballroomAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = ballroomAlpha;

        const waltzTempo = time * 0.95;
        const pathRadiusX = 110 * baseScale;
        const pathRadiusY = 28 * baseScale;
        const orbitAngle = waltzTempo * 0.75;
        const danceX = podCenterX + Math.cos(orbitAngle) * pathRadiusX;
        const danceY = floorHorizonY + 68 * baseScale + Math.sin(orbitAngle) * pathRadiusY;

        const depthZ = Math.sin(orbitAngle);
        const depthScale = baseScale * (1 + depthZ * 0.12);
        const rotationAngle = waltzTempo * 1.35;

        // Floor Reflection
        ctx.save();
        ctx.translate(danceX, danceY);
        ctx.scale(1, -0.42);
        ctx.globalAlpha = 0.24 * ballroomAlpha * (1 - depthZ * 0.15);
        render3DCouple(ctx, rotationAngle, depthScale, time, true);
        ctx.restore();

        // Contact Floor Shadow
        ctx.save();
        const shadowGrad = ctx.createRadialGradient(danceX, danceY + 2, 6, danceX, danceY + 2, 85 * depthScale);
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
        shadowGrad.addColorStop(0.5, 'rgba(4, 12, 22, 0.4)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(danceX, danceY + 2, 85 * depthScale, 22 * depthScale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Couple Body
        ctx.save();
        ctx.translate(danceX, danceY);
        render3DCouple(ctx, rotationAngle, depthScale, time, false);
        ctx.restore();

        ctx.restore();
      }

      // --- PERFORMANCE 2: WDSF BREAKING SOLO B-BOY ---
      if (breakdanceAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = breakdanceAlpha;

        // Centered dynamic battle stage position right in front of the pedestal
        const breakX = podCenterX + Math.sin(phaseTime * 0.6) * (35 * baseScale);
        const breakY = floorHorizonY + 74 * baseScale;
        const breakScale = baseScale * 1.05;

        // Specular Floor Reflection for Breakdancer
        ctx.save();
        ctx.translate(breakX, breakY);
        ctx.scale(1, -0.44);
        ctx.globalAlpha = 0.28 * breakdanceAlpha;
        drawBreakdancer(ctx, phaseTime, breakScale, true);
        ctx.restore();

        // Dynamic Ground Contact Shadow according to Breaking phase
        ctx.save();
        let shadowWidth = 65 * breakScale;
        let shadowHeight = 18 * breakScale;
        let shadowOffsetX = 0;

        if (phaseTime < 3.2) {
          // Standing toprock: tighter foot-level shadow
          shadowWidth = 46 * breakScale;
          shadowHeight = 12 * breakScale;
        } else if (phaseTime < 6.2) {
          // Footwork floor sweep
          shadowWidth = 64 * breakScale;
          shadowHeight = 18 * breakScale;
        } else if (phaseTime < 9.4) {
          // Windmill spin
          shadowWidth = 76 * breakScale;
          shadowHeight = 22 * breakScale;
        } else {
          // Freeze pose concentrated under support hand
          shadowWidth = 48 * breakScale;
          shadowHeight = 15 * breakScale;
          shadowOffsetX = -6 * breakScale;
        }

        const bShadow = ctx.createRadialGradient(
          breakX + shadowOffsetX, breakY + 2, 4,
          breakX + shadowOffsetX, breakY + 2, shadowWidth
        );
        bShadow.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
        bShadow.addColorStop(0.5, 'rgba(4, 12, 22, 0.5)');
        bShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bShadow;
        ctx.beginPath();
        ctx.ellipse(breakX + shadowOffsetX, breakY + 2, shadowWidth, shadowHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Solo B-Boy Figure
        ctx.save();
        ctx.translate(breakX, breakY);
        drawBreakdancer(ctx, phaseTime, breakScale, false);
        ctx.restore();

        ctx.restore();
      }

      // -----------------------------------------------------------------
      // 6. LOW-LYING STAGE HAZE & SPARKLES
      // -----------------------------------------------------------------
      ctx.save();
      for (const h of hazeBlobs) {
        h.x += h.vx * dt;
        if (h.x < -0.1) h.x = 1.1;
        if (h.x > 1.1) h.x = -0.1;

        const hx = h.x * width;
        const hy = h.y * height;
        const hazeGrad = ctx.createRadialGradient(hx, hy, 10, hx, hy, h.size);
        hazeGrad.addColorStop(0, `rgba(27, 70, 122, ${h.alpha * 1.5})`);
        hazeGrad.addColorStop(0.5, `rgba(237, 1, 138, ${h.alpha * 0.4})`);
        hazeGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = hazeGrad;
        ctx.beginPath();
        ctx.arc(hx, hy, h.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const sp of sparkles) {
        sp.y -= sp.speedY * dt * 0.4;
        if (sp.y < 0) sp.y = 0.85;

        const sx = sp.x * width;
        const sy = sp.y * height;
        const a = (Math.sin(time * 2.5 + sp.phase) * 0.5 + 0.5) * 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // -----------------------------------------------------------------
      // 7. CINEMATIC GRADIENT OVERLAY
      // -----------------------------------------------------------------
      const textShield = ctx.createLinearGradient(0, 0, width, 0);
      textShield.addColorStop(0, 'rgba(9, 23, 43, 0.92)');
      textShield.addColorStop(0.24, 'rgba(9, 23, 43, 0.75)');
      textShield.addColorStop(0.48, 'rgba(9, 23, 43, 0.12)');
      textShield.addColorStop(0.82, 'rgba(9, 23, 43, 0.42)');
      textShield.addColorStop(1, 'rgba(9, 23, 43, 0.7)');
      ctx.fillStyle = textShield;
      ctx.fillRect(0, 0, width, height);

      const vertVignette = ctx.createLinearGradient(0, 0, 0, height);
      vertVignette.addColorStop(0, 'rgba(5, 13, 24, 0.65)');
      vertVignette.addColorStop(0.15, 'rgba(5, 13, 24, 0)');
      vertVignette.addColorStop(0.85, 'rgba(5, 13, 24, 0.12)');
      vertVignette.addColorStop(1, 'rgba(5, 13, 24, 0.95)');
      ctx.fillStyle = vertVignette;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-navy-950">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

// =========================================================================
// REALISTIC SOLO BREAKDANCER (WDSF BREAKING B-BOY)
// Dynamic multi-joint kinematic street dance engine:
// - 0.0s - 3.2s: Phase 1: High-Groove Toprock (Rhythmic Indian steps & bounce)
// - 3.2s - 6.2s: Phase 2: Athletic Drop & 6-Step Footwork (Alternating hands)
// - 6.2s - 9.4s: Phase 3: Explosive Windmill & Flare Spin (3D centrifugal)
// - 9.4s - 12.0s: Phase 4: Olympic Inverted Nike Freeze (Tension & hold)
// =========================================================================

function drawBreakdancer(
  ctx: CanvasRenderingContext2D,
  phaseTime: number,
  scale: number,
  isReflection: boolean
) {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (phaseTime < 3.2) {
    // ---------------------------------------------------------------------
    // PHASE 1: HIGH-GROOVE TOPROCK (Rhythmic B-Boy battle stance)
    // ---------------------------------------------------------------------
    const beat = phaseTime * 7.0; // 105 BPM hip-hop groove
    const bounce = Math.pow(Math.abs(Math.sin(beat)), 1.4) * 12;
    const sway = Math.sin(beat * 0.5) * 10;
    const torsoLean = Math.sin(beat * 0.5) * 0.1;
    const armPhase = beat * 0.5;
    const armOpen = Math.sin(armPhase);

    // Dynamic step cycle (Indian step & cross-kick)
    const stepT = Math.sin(beat * 0.5);
    const leftFootX = -18 + sway * 0.6 + (stepT > 0 ? stepT * 26 : -4);
    const leftFootY = stepT > 0 ? -bounce * 0.5 : 0;
    const rightFootX = 18 + sway * 0.6 + (stepT < 0 ? stepT * 26 : 4);
    const rightFootY = stepT < 0 ? -bounce * 0.5 : 0;

    const hipX = sway;
    const hipY = -78 + bounce;
    const shoulderY = -128 + bounce;
    const shoulderX = hipX + torsoLean * 30;
    const headY = -148 + bounce;
    const headX = shoulderX + torsoLean * 15;

    // --- LEGS & JOGGER PANTS ---
    // Left Leg
    const lKneeX = (hipX - 10 + leftFootX) * 0.5 - 6;
    const lKneeY = (hipY + leftFootY) * 0.5 + 4;
    drawAnatomicLeg(ctx, hipX - 10, hipY, lKneeX, lKneeY, leftFootX, leftFootY, 14, 11, '#0B1728');
    drawStreetSneaker(ctx, leftFootX, leftFootY, stepT > 0 ? -0.25 : 0.05, 1.0, true);

    // Right Leg
    const rKneeX = (hipX + 10 + rightFootX) * 0.5 + 6;
    const rKneeY = (hipY + rightFootY) * 0.5 + 4;
    drawAnatomicLeg(ctx, hipX + 10, hipY, rKneeX, rKneeY, rightFootX, rightFootY, 14, 11, '#0B1728');
    drawStreetSneaker(ctx, rightFootX, rightFootY, stepT < 0 ? 0.25 : -0.05, 1.0, false);

    // --- TORSO / AZDSF ROYAL HOODIE ---
    ctx.save();
    ctx.translate(shoulderX, (shoulderY + hipY) * 0.5);
    ctx.rotate(torsoLean);

    // Hoodie body with soft 3D lighting
    const hoodieGrad = ctx.createLinearGradient(-22, -26, 22, 26);
    hoodieGrad.addColorStop(0, '#245999');
    hoodieGrad.addColorStop(0.5, '#1B467A');
    hoodieGrad.addColorStop(1, '#0E2849');
    ctx.fillStyle = hoodieGrad;
    ctx.beginPath();
    ctx.moveTo(-24, -26);
    ctx.lineTo(24, -26);
    ctx.lineTo(19, 26);
    ctx.lineTo(-19, 26);
    ctx.closePath();
    ctx.fill();

    // AzDSF Logo crest on chest
    ctx.fillStyle = '#ED018A';
    ctx.beginPath();
    ctx.arc(6, -6, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Hoodie drawstring swaying with inertia
    const drawLag = -torsoLean * 18;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-5, -20);
    ctx.quadraticCurveTo(-5 + drawLag, -5, -4 + drawLag * 1.5, 4);
    ctx.moveTo(5, -20);
    ctx.quadraticCurveTo(5 + drawLag, -5, 6 + drawLag * 1.5, 4);
    ctx.stroke();

    ctx.restore();

    // --- ARMS & STREET HANDS ---
    // Left Arm (Dynamic cross & snap)
    const lElbowX = shoulderX - 22 - armOpen * 14;
    const lElbowY = shoulderY + 16 + Math.cos(beat) * 8;
    const lWristX = shoulderX - 38 - armOpen * 22;
    const lWristY = shoulderY + 28 - armOpen * 12;
    drawAnatomicArm(ctx, shoulderX - 20, shoulderY, lElbowX, lElbowY, lWristX, lWristY, 11, 8.5, '#1B467A');
    drawHand(ctx, lWristX, lWristY, -0.4 + armOpen * 0.3, true);

    // Right Arm
    const rElbowX = shoulderX + 22 + armOpen * 14;
    const rElbowY = shoulderY + 16 - Math.cos(beat) * 8;
    const rWristX = shoulderX + 38 + armOpen * 22;
    const rWristY = shoulderY + 28 - armOpen * 12;
    drawAnatomicArm(ctx, shoulderX + 20, shoulderY, rElbowX, rElbowY, rWristX, rWristY, 11, 8.5, '#1B467A');
    drawHand(ctx, rWristX, rWristY, 0.4 - armOpen * 0.3, false);

    // --- HEAD & BEANIE / SNAPBACK ---
    // Neck
    ctx.fillStyle = '#DFBAA0';
    ctx.fillRect(shoulderX - 5, shoulderY - 10, 10, 12);

    // Face / Jaw
    ctx.fillStyle = '#ECCDB8';
    ctx.beginPath();
    ctx.ellipse(headX, headY + 3, 9, 10, torsoLean * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Street Beanie (AzDSF Magenta) with cuff and visor tilt
    ctx.fillStyle = '#ED018A';
    ctx.beginPath();
    ctx.arc(headX, headY - 2, 11, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();
    // Beanie cuff
    ctx.fillStyle = '#C80174';
    ctx.beginPath();
    ctx.ellipse(headX, headY - 1, 12, 4.5, torsoLean * 0.6, 0, Math.PI * 2);
    ctx.fill();

  } else if (phaseTime < 6.2) {
    // ---------------------------------------------------------------------
    // PHASE 2: ATHLETIC DROP & 6-STEP FOOTWORK / CCs (Alternating Hands)
    // ---------------------------------------------------------------------
    const ft = (phaseTime - 3.2) * 5.2; // Floorwork rotation tempo
    const cycle = ft % (Math.PI * 2);
    const handAlt = Math.sin(cycle);

    // Center of gravity stays low right above the parquet
    const pivotX = Math.cos(cycle) * 12;
    const pivotY = -34;

    // Weight transitions between Left and Right hands on floor
    const leftHandPlanted = handAlt >= 0;
    const plantWeight = Math.abs(handAlt);

    const lHandX = -18;
    const lHandY = leftHandPlanted ? 0 : -8 - (1 - plantWeight) * 14;
    const rHandX = 18;
    const rHandY = !leftHandPlanted ? 0 : -8 - plantWeight * 14;

    // Rotating 6-step sweeping legs
    const sweepAngle = cycle;
    const sweepRadius = 50;
    const sweepX = Math.cos(sweepAngle) * sweepRadius;
    const sweepY = Math.sin(sweepAngle) * 12;
    const sweepZ = Math.sin(sweepAngle); // Depth perspective

    const hookAngle = sweepAngle + Math.PI * 0.82;
    const hookRadius = 34;
    const hookX = Math.cos(hookAngle) * hookRadius;
    const hookY = Math.sin(hookAngle) * 9;

    // Support arms
    // Left Arm
    const lElbowX = (pivotX - 16 + lHandX) * 0.5 - 6;
    const lElbowY = (pivotY + lHandY) * 0.5 - 4;
    drawAnatomicArm(ctx, pivotX - 16, pivotY - 4, lElbowX, lElbowY, lHandX, lHandY, 11, 8.5, '#1B467A');
    drawPlantedPalm(ctx, lHandX, lHandY, leftHandPlanted);

    // Right Arm
    const rElbowX = (pivotX + 16 + rHandX) * 0.5 + 6;
    const rElbowY = (pivotY + rHandY) * 0.5 - 4;
    drawAnatomicArm(ctx, pivotX + 16, pivotY - 4, rElbowX, rElbowY, rHandX, rHandY, 11, 8.5, '#1B467A');
    drawPlantedPalm(ctx, rHandX, rHandY, !leftHandPlanted);

    // Torso angled toward the floor
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(Math.sin(cycle) * 0.35);

    const fwTorso = ctx.createLinearGradient(-20, -14, 20, 14);
    fwTorso.addColorStop(0, '#245999');
    fwTorso.addColorStop(1, '#0E2849');
    ctx.fillStyle = fwTorso;
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 15, Math.PI * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Magenta back stripe
    ctx.strokeStyle = '#ED018A';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-16, -2);
    ctx.lineTo(16, -2);
    ctx.stroke();

    ctx.restore();

    // Head watching footwork sweep
    const headX = pivotX + (leftHandPlanted ? 16 : -16);
    const headY = pivotY - 14;
    ctx.fillStyle = '#ECCDB8';
    ctx.beginPath();
    ctx.arc(headX, headY, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ED018A';
    ctx.beginPath();
    ctx.arc(headX, headY - 3, 10, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();

    // Sweeping legs with dynamic foreshortening
    // Hook leg
    const hKneeX = (pivotX + hookX) * 0.5;
    const hKneeY = (pivotY + hookY) * 0.5 - 8;
    drawAnatomicLeg(ctx, pivotX, pivotY + 4, hKneeX, hKneeY, hookX, hookY, 13, 10, '#0B1728');
    drawStreetSneaker(ctx, hookX, hookY, hookAngle, 0.9, false);

    // Sweep leg (Cuts wide in front with speed streak)
    const sKneeX = (pivotX + sweepX) * 0.5;
    const sKneeY = (pivotY + sweepY) * 0.5 - 6;
    const sweepScale = 0.95 + sweepZ * 0.22; // Closer to camera = larger!
    drawAnatomicLeg(ctx, pivotX, pivotY + 4, sKneeX, sKneeY, sweepX, sweepY, 14 * sweepScale, 11 * sweepScale, '#0B1728');
    drawStreetSneaker(ctx, sweepX, sweepY, sweepAngle + Math.PI * 0.5, sweepScale, true);

    // Parquet friction glide arc
    ctx.strokeStyle = 'rgba(237, 1, 138, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, sweepRadius, sweepAngle - 0.7, sweepAngle);
    ctx.stroke();

  } else if (phaseTime < 9.4) {
    // ---------------------------------------------------------------------
    // PHASE 3: EXPLOSIVE POWER MOVE: WINDMILL & FLARE (3D Spin & Flares)
    // ---------------------------------------------------------------------
    const spinT = (phaseTime - 6.2) * 8.6; // High-velocity spin
    const spinCenterY = -24; // Upper back & shoulders on parquet
    const spinAngle = spinT;

    const cosS = Math.cos(spinAngle);
    const sinS = Math.sin(spinAngle);

    // Centrifugal Flare Legs in wide 115-degree V-split
    const legLength = 62;
    const leg1Angle = spinAngle;
    const leg2Angle = spinAngle + Math.PI * 0.76;

    // 3D coordinates of feet
    const foot1X = Math.cos(leg1Angle) * legLength;
    const foot1Y = spinCenterY - Math.abs(Math.sin(leg1Angle)) * 46;
    const foot1Z = Math.sin(leg1Angle) * 40;

    const foot2X = Math.cos(leg2Angle) * legLength;
    const foot2Y = spinCenterY - Math.abs(Math.sin(leg2Angle)) * 46;
    const foot2Z = Math.sin(leg2Angle) * 40;

    // Draw rear leg first (Z < 0)
    const drawLeg = (fx: number, fy: number, fz: number, isLeft: boolean) => {
      const legScale = 0.95 + (fz / 160);
      const kneeX = fx * 0.52;
      const kneeY = (spinCenterY + fy) * 0.5 - 10;
      drawAnatomicLeg(ctx, 0, spinCenterY, kneeX, kneeY, fx, fy, 13 * legScale, 10 * legScale, '#0B1728');
      drawStreetSneaker(ctx, fx, fy, Math.atan2(fy - spinCenterY, fx), legScale, isLeft);
    };

    if (foot1Z <= foot2Z) {
      drawLeg(foot1X, foot1Y, foot1Z, true);
    } else {
      drawLeg(foot2X, foot2Y, foot2Z, false);
    }

    // Torso spinning along back
    ctx.save();
    ctx.translate(0, spinCenterY);
    ctx.rotate(spinAngle);

    // Torso gradient spinning
    const spinTorso = ctx.createLinearGradient(-22, -18, 22, 18);
    spinTorso.addColorStop(0, '#245999');
    spinTorso.addColorStop(0.5, '#1B467A');
    spinTorso.addColorStop(1, '#0C203B');
    ctx.fillStyle = spinTorso;
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    // White/Magenta AzDSF insignia spinning
    ctx.fillStyle = '#ED018A';
    ctx.fillRect(-6, -4, 12, 8);

    ctx.restore();

    // Head tucked close to center with spinning beanie
    ctx.fillStyle = '#ED018A';
    ctx.beginPath();
    ctx.arc(-cosS * 6, spinCenterY - 12, 9, 0, Math.PI * 2);
    ctx.fill();

    // Tucked arms maintaining rotation
    ctx.strokeStyle = '#1B467A';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, spinCenterY, 18, spinAngle - 0.5, spinAngle + 1.2);
    ctx.stroke();

    // Draw front leg (Z > 0)
    if (foot1Z > foot2Z) {
      drawLeg(foot1X, foot1Y, foot1Z, true);
    } else {
      drawLeg(foot2X, foot2Y, foot2Z, false);
    }

    // Centrifugal Speed Wind Trails (Double luminous ribbon)
    ctx.strokeStyle = 'rgba(237, 1, 138, 0.65)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, spinCenterY - 14, 58, spinAngle - 1.2, spinAngle);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, spinCenterY - 14, 55, spinAngle - 0.7, spinAngle);
    ctx.stroke();

  } else {
    // ---------------------------------------------------------------------
    // PHASE 4: OLYMPIC INVERTED NIKE / AIR FREEZE (Extreme core snap & hold)
    // ---------------------------------------------------------------------
    const snapT = phaseTime - 9.4;
    // Elastic micro-rebound on snap, then living human muscle tremor
    const snapRebound = Math.max(0, Math.exp(-snapT * 5) * Math.sin(snapT * 22) * 5);
    const muscleTremor = Math.sin(phaseTime * 26) * 0.45;

    const freezeY = -28 + snapRebound;

    // Single Arm planted firmly on the parquet floor
    const plantHandX = -10;
    const plantHandY = 0;
    const plantElbowX = -14;
    const plantElbowY = -15;

    // Support Arm (Engaged bicep & locked wrist)
    drawAnatomicArm(ctx, 4, freezeY, plantElbowX, plantElbowY, plantHandX, plantHandY, 13, 10, '#1B467A');
    drawPlantedPalm(ctx, plantHandX, plantHandY, true);

    // Torso locked horizontally/inverted at acute angle
    ctx.save();
    ctx.translate(6, freezeY);
    ctx.rotate(-Math.PI * 0.16 + muscleTremor * 0.02);

    const freezeTorso = ctx.createLinearGradient(-24, -16, 24, 16);
    freezeTorso.addColorStop(0, '#2862A8');
    freezeTorso.addColorStop(0.5, '#1B467A');
    freezeTorso.addColorStop(1, '#0C203B');
    ctx.fillStyle = freezeTorso;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Magenta competition number / crest
    ctx.fillStyle = '#ED018A';
    ctx.fillRect(-6, -5, 12, 10);
    ctx.restore();

    // Free arm held in stylized high balance
    const freeElbowX = 26;
    const freeElbowY = freezeY - 26;
    const freeWristX = 38;
    const freeWristY = freezeY - 42;
    drawAnatomicArm(ctx, 16, freezeY - 8, freeElbowX, freeElbowY, freeWristX, freeWristY, 11, 8.5, '#1B467A');
    drawHand(ctx, freeWristX, freeWristY, 0.6, false);

    // Head locked in deep concentration near floor
    const headX = 24;
    const headY = freezeY + 2;
    ctx.fillStyle = '#ECCDB8';
    ctx.beginPath();
    ctx.ellipse(headX, headY, 9, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ED018A';
    ctx.beginPath();
    ctx.arc(headX + 2, headY - 1, 11, Math.PI * 0.7, Math.PI * 2.1);
    ctx.fill();

    // --- LEGS LOCKED IN ICONIC NIKE FREEZE GEOMETRY ---
    // Left Leg: Extended pure vertical straight toward the lights
    const vertKneeX = -12;
    const vertKneeY = freezeY - 42;
    const vertFootX = -22 + muscleTremor;
    const vertFootY = freezeY - 88;
    drawAnatomicLeg(ctx, 0, freezeY, vertKneeX, vertKneeY, vertFootX, vertFootY, 14, 11, '#0B1728');
    drawStreetSneaker(ctx, vertFootX, vertFootY, -Math.PI * 0.48, 1.05, true);

    // Right Leg: Hooked across behind knee in acute triangle
    const hookKneeX = 20;
    const hookKneeY = freezeY - 36;
    const hookFootX = 4;
    const hookFootY = freezeY - 50;
    drawAnatomicLeg(ctx, 4, freezeY, hookKneeX, hookKneeY, hookFootX, hookFootY, 14, 11, '#0B1728');
    drawStreetSneaker(ctx, hookFootX, hookFootY, Math.PI * 0.25, 0.98, false);

    // Intense Arena Rim Light along the freeze silhouette
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(vertFootX, vertFootY);
    ctx.lineTo(vertKneeX, vertKneeY);
    ctx.lineTo(0, freezeY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(237, 1, 138, 0.9)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(vertFootX - 4, vertFootY - 6);
    ctx.lineTo(vertFootX + 4, vertFootY - 6);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Anatomical Muscular Limb Renderer with joint contours and light gradient
 */
function drawAnatomicLeg(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  thighW: number, calfW: number,
  color: string
) {
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Thigh
  ctx.strokeStyle = color;
  ctx.lineWidth = thighW;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Calf
  ctx.lineWidth = calfW;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  // Joint highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = calfW * 0.35;
  ctx.beginPath();
  ctx.moveTo(x1 + 1, y1);
  ctx.lineTo(x2 + 1, y2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Anatomical Arm Renderer
 */
function drawAnatomicArm(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  upperW: number, foreW: number,
  color: string
) {
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.strokeStyle = color;
  ctx.lineWidth = upperW;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.lineWidth = foreW;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  ctx.restore();
}

/**
 * Palm planted flat on parquet with finger splay
 */
function drawPlantedPalm(ctx: CanvasRenderingContext2D, x: number, y: number, isFirm: boolean) {
  ctx.save();
  ctx.translate(x, y);

  // Wristband (AzDSF Magenta)
  ctx.fillStyle = '#ED018A';
  ctx.fillRect(-5, -7, 10, 4);

  // Palm
  ctx.fillStyle = '#ECCDB8';
  ctx.beginPath();
  ctx.ellipse(0, 0, isFirm ? 7.5 : 5.5, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fingers gripping parquet
  ctx.strokeStyle = '#DFBAA0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.lineTo(-8, 2);
  ctx.moveTo(-2, 1);
  ctx.lineTo(-3, 3.5);
  ctx.moveTo(2, 1);
  ctx.lineTo(3, 3.5);
  ctx.moveTo(5, 0);
  ctx.lineTo(8, 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Free hand with articulated fingers
 */
function drawHand(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, isLeft: boolean) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Wristband
  ctx.fillStyle = '#ED018A';
  ctx.fillRect(-4, -4, 8, 3.5);

  // Hand
  ctx.fillStyle = '#ECCDB8';
  ctx.beginPath();
  ctx.arc(0, 3, 5, 0, Math.PI * 2);
  ctx.fill();

  // Knuckles / fingers
  ctx.fillStyle = '#DFBAA0';
  ctx.beginPath();
  ctx.arc(isLeft ? -2 : 2, 6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Detailed High-Top B-Boy Street Sneaker with AzDSF Magenta Racing Wave
 */
function drawStreetSneaker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  scale: number,
  isLeft: boolean
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale * (isLeft ? -1 : 1), scale);

  // Rubber tread outsole
  ctx.fillStyle = '#050C16';
  ctx.fillRect(-9, 4, 18, 2.5);

  // White cushioned midsole
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(-10, 1.5, 20, 3.5, 1.5);
  ctx.fill();

  // Leather upper
  ctx.fillStyle = '#F1F5F9';
  ctx.beginPath();
  ctx.moveTo(-8, 1.5);
  ctx.lineTo(9, 1.5);
  ctx.lineTo(8, -4);
  ctx.lineTo(2, -5);
  ctx.lineTo(-4, -9); // High-top collar
  ctx.lineTo(-8, -9);
  ctx.closePath();
  ctx.fill();

  // AzDSF Magenta racing swoosh
  ctx.fillStyle = '#ED018A';
  ctx.beginPath();
  ctx.moveTo(-5, -2);
  ctx.lineTo(5, -2);
  ctx.lineTo(2, -4.5);
  ctx.lineTo(-4, -4);
  ctx.closePath();
  ctx.fill();

  // Padded ankle collar & tongue
  ctx.fillStyle = '#0B1728';
  ctx.fillRect(-7, -10, 5, 2);

  // Crisp white laces
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-1, -4);
  ctx.lineTo(2, -6);
  ctx.moveTo(-2, -6);
  ctx.lineTo(1, -8);
  ctx.stroke();

  ctx.restore();
}

// =========================================================================
// 3D KINEMATIC DANCE COUPLE RENDERING ENGINE
// =========================================================================

interface RenderPart {
  z: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

function render3DCouple(
  ctx: CanvasRenderingContext2D,
  angle: number,
  scale: number,
  time: number,
  isReflection: boolean
) {
  ctx.save();
  ctx.scale(scale, scale);

  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  const project3D = (x: number, y: number, z: number) => ({
    x: x * cosA - z * sinA,
    y: y,
    z: x * sinA + z * cosA
  });

  const waltzRise = Math.sin(time * 2.8) * 7;
  const legSwing = Math.sin(time * 2.8);

  const manPos = project3D(-14, waltzRise, 0);
  const ladyPos = project3D(14, waltzRise, 0);

  const parts: RenderPart[] = [];

  // PART A: MAN'S LEGS & FEET
  const manLeftLeg = project3D(-18, waltzRise, legSwing * 18);
  const manRightLeg = project3D(-10, waltzRise, -legSwing * 18);

  parts.push({
    z: (manLeftLeg.z + manRightLeg.z) / 2,
    draw: (c) => {
      c.save();
      c.strokeStyle = '#070F1A';
      c.lineWidth = 12;
      c.lineCap = 'round';
      c.lineJoin = 'round';

      c.beginPath();
      c.moveTo(manPos.x - 4, -85 + waltzRise);
      c.lineTo(manPos.x - 6 + legSwing * 6, -42);
      c.lineTo(manLeftLeg.x, 0);
      c.stroke();

      c.beginPath();
      c.moveTo(manPos.x + 4, -85 + waltzRise);
      c.lineTo(manPos.x + 6 - legSwing * 6, -42);
      c.lineTo(manRightLeg.x, 0);
      c.stroke();

      c.fillStyle = '#02060C';
      c.beginPath();
      c.ellipse(manLeftLeg.x + 3, 0, 9, 3.5, 0, 0, Math.PI * 2);
      c.ellipse(manRightLeg.x + 3, 0, 9, 3.5, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = 'rgba(255, 255, 255, 0.45)';
      c.beginPath();
      c.arc(manLeftLeg.x + 1, -1.5, 1.5, 0, Math.PI * 2);
      c.arc(manRightLeg.x + 1, -1.5, 1.5, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  });

  // PART B: LADY'S GOWN
  parts.push({
    z: ladyPos.z - 2,
    draw: (c) => {
      c.save();
      const waistY = -92 + waltzRise;
      const flare = 48 + Math.abs(sinA) * 12;

      const rimPoints: { x: number; y: number }[] = [];
      const numPts = 12;
      for (let i = 0; i < numPts; i++) {
        const theta = (i / numPts) * Math.PI * 2;
        const pt = project3D(
          14 + Math.cos(theta) * flare,
          0,
          Math.sin(theta) * (flare * 0.7)
        );
        const wave = Math.sin(time * 3.5 + theta * 2) * 4;
        rimPoints.push({ x: pt.x, y: -2 + wave });
      }

      c.beginPath();
      c.moveTo(ladyPos.x, waistY);
      for (const p of rimPoints) {
        c.lineTo(p.x, p.y);
      }
      c.closePath();
      const underGrad = c.createRadialGradient(ladyPos.x, waistY, 10, ladyPos.x, -10, 85);
      underGrad.addColorStop(0, '#750042');
      underGrad.addColorStop(0.6, '#420025');
      underGrad.addColorStop(1, '#1A000E');
      c.fillStyle = underGrad;
      c.fill();

      const outerGrad = c.createLinearGradient(ladyPos.x - 40, waistY, ladyPos.x + 50, 0);
      outerGrad.addColorStop(0, '#FF4FAE');
      outerGrad.addColorStop(0.35, '#ED018A');
      outerGrad.addColorStop(0.75, '#BA016C');
      outerGrad.addColorStop(1, '#6E003D');

      c.beginPath();
      c.moveTo(ladyPos.x - 8, waistY);
      c.quadraticCurveTo(ladyPos.x - flare * 0.9, -40, rimPoints[0].x, rimPoints[0].y);

      for (let i = 0; i < rimPoints.length; i++) {
        const next = rimPoints[(i + 1) % rimPoints.length];
        const mx = (rimPoints[i].x + next.x) / 2;
        const my = (rimPoints[i].y + next.y) / 2;
        c.quadraticCurveTo(rimPoints[i].x, rimPoints[i].y, mx, my);
      }

      c.quadraticCurveTo(ladyPos.x + flare * 0.9, -40, ladyPos.x + 8, waistY);
      c.closePath();
      c.fillStyle = outerGrad;
      c.fill();

      c.strokeStyle = 'rgba(255, 230, 245, 0.75)';
      c.lineWidth = 1.8;
      c.stroke();

      c.fillStyle = '#ED018A';
      c.beginPath();
      c.moveTo(ladyPos.x - 7, waistY);
      c.lineTo(ladyPos.x + 7, waistY);
      c.lineTo(ladyPos.x + 9, waistY - 24);
      c.lineTo(ladyPos.x - 9, waistY - 24);
      c.closePath();
      c.fill();

      c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      c.lineWidth = 1;
      c.stroke();
      c.restore();
    }
  });

  // PART C: MAN'S TORSO & FORMAL TAILCOAT (FRAK)
  parts.push({
    z: manPos.z,
    draw: (c) => {
      c.save();
      const torsoY = -90 + waltzRise;

      const tailTip = project3D(-24, -30 + waltzRise, -12);
      c.fillStyle = '#060E18';
      c.beginPath();
      c.moveTo(manPos.x - 8, torsoY);
      c.quadraticCurveTo(manPos.x - 16, torsoY + 30, tailTip.x, tailTip.y);
      c.lineTo(manPos.x - 2, torsoY + 22);
      c.lineTo(manPos.x, torsoY);
      c.closePath();
      c.fill();

      c.fillStyle = '#0A1524';
      c.beginPath();
      c.moveTo(manPos.x - 20, torsoY - 48);
      c.lineTo(manPos.x + 18, torsoY - 48);
      c.lineTo(manPos.x + 10, torsoY);
      c.lineTo(manPos.x - 12, torsoY);
      c.closePath();
      c.fill();

      c.fillStyle = '#FFFFFF';
      c.beginPath();
      c.moveTo(manPos.x - 4, torsoY - 46);
      c.lineTo(manPos.x + 4, torsoY - 46);
      c.lineTo(manPos.x + 2, torsoY - 14);
      c.lineTo(manPos.x - 2, torsoY - 14);
      c.closePath();
      c.fill();

      c.fillStyle = '#070E18';
      c.beginPath();
      c.arc(manPos.x, torsoY - 44, 2.5, 0, Math.PI * 2);
      c.fill();

      c.strokeStyle = 'rgba(255, 255, 255, 0.48)';
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(manPos.x - 20, torsoY - 48);
      c.lineTo(manPos.x - 12, torsoY);
      c.stroke();
      c.restore();
    }
  });

  // PART D: HEADS (MAN & LADY)
  parts.push({
    z: manPos.z + 1,
    draw: (c) => {
      c.save();
      const headY = -154 + waltzRise;

      c.fillStyle = '#ECCDB8';
      c.fillRect(manPos.x - 3, headY + 8, 6, 8);

      c.fillStyle = '#ECCDB8';
      c.beginPath();
      c.arc(manPos.x, headY, 8.5, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#090E16';
      c.beginPath();
      c.arc(manPos.x, headY - 2, 9, Math.PI * 0.8, Math.PI * 2.2);
      c.fill();

      c.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      c.lineWidth = 1.2;
      c.beginPath();
      c.arc(manPos.x, headY - 2, 8.5, Math.PI * 0.9, Math.PI * 1.6);
      c.stroke();
      c.restore();
    }
  });

  parts.push({
    z: ladyPos.z + 1,
    draw: (c) => {
      c.save();
      const headY = -148 + waltzRise;
      const headX = ladyPos.x + 6;

      c.fillStyle = '#F5D7C4';
      c.beginPath();
      c.moveTo(ladyPos.x - 2, headY + 12);
      c.lineTo(headX, headY + 4);
      c.lineTo(headX + 4, headY + 12);
      c.closePath();
      c.fill();

      c.fillStyle = '#F5D7C4';
      c.beginPath();
      c.arc(headX, headY, 7.5, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#361C10';
      c.beginPath();
      c.arc(headX - 3, headY - 2, 8, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.arc(headX - 7, headY - 3, 5, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = '#FFD700';
      c.beginPath();
      c.arc(headX - 6, headY - 3, 1.8, 0, Math.PI * 2);
      c.fill();

      c.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      c.lineWidth = 1.2;
      c.beginPath();
      c.arc(headX + 1, headY - 2, 7.5, Math.PI * 1.4, Math.PI * 2.1);
      c.stroke();
      c.restore();
    }
  });

  // PART E: UNIFIED DANCE FRAME & CONNECTED ARMS
  const joinedHand = project3D(-34, -136 + waltzRise, 8);

  parts.push({
    z: Math.max(manPos.z, ladyPos.z) + 3,
    draw: (c) => {
      c.save();
      c.lineCap = 'round';
      c.lineJoin = 'round';

      const shoulderY = -138 + waltzRise;

      c.strokeStyle = '#0A1524';
      c.lineWidth = 9;
      c.beginPath();
      c.moveTo(manPos.x - 16, shoulderY);
      c.quadraticCurveTo(manPos.x - 26, shoulderY + 8, joinedHand.x, joinedHand.y);
      c.stroke();

      c.strokeStyle = '#FFFFFF';
      c.lineWidth = 3.5;
      c.beginPath();
      c.moveTo(joinedHand.x + 2, joinedHand.y);
      c.lineTo(joinedHand.x - 2, joinedHand.y);
      c.stroke();

      c.strokeStyle = '#F5D7C4';
      c.lineWidth = 5.5;
      c.beginPath();
      c.moveTo(ladyPos.x + 6, shoulderY + 4);
      c.quadraticCurveTo(joinedHand.x + 10, shoulderY - 12, joinedHand.x, joinedHand.y);
      c.stroke();

      c.fillStyle = '#ECCDB8';
      c.beginPath();
      c.arc(joinedHand.x, joinedHand.y, 4, 0, Math.PI * 2);
      c.fill();

      c.strokeStyle = '#F5D7C4';
      c.lineWidth = 5.5;
      c.beginPath();
      c.moveTo(ladyPos.x - 4, shoulderY + 6);
      c.lineTo(manPos.x + 12, shoulderY + 8);
      c.stroke();

      c.strokeStyle = '#0A1524';
      c.lineWidth = 9;
      c.beginPath();
      c.moveTo(manPos.x + 14, shoulderY);
      c.lineTo(ladyPos.x - 2, shoulderY + 6);
      c.stroke();

      c.strokeStyle = 'rgba(237, 1, 138, 0.72)';
      c.lineWidth = 3;
      c.beginPath();
      const wave = Math.sin(time * 3.4) * 12;
      c.moveTo(joinedHand.x, joinedHand.y + 2);
      c.bezierCurveTo(
        joinedHand.x + 14,
        joinedHand.y + 30 + wave,
        joinedHand.x - 20,
        joinedHand.y + 60 - wave,
        joinedHand.x - 6 + wave * 1.2,
        -18
      );
      c.stroke();

      c.strokeStyle = 'rgba(255, 215, 235, 0.85)';
      c.lineWidth = 1;
      c.stroke();

      c.restore();
    }
  });

  // Z-BUFFER SORT
  parts.sort((a, b) => a.z - b.z);

  for (const part of parts) {
    part.draw(ctx);
  }

  ctx.restore();
}

// =========================================================================
// SCENIC SUB-COMPONENTS (PODIUM, PARQUET, SPOTLIGHTS)
// =========================================================================

function drawPodium(
  ctx: CanvasRenderingContext2D,
  cx: number,
  baseY: number,
  w: number,
  h: number,
  time: number,
  isBreaking: boolean
) {
  const podW = Math.min(w * 0.42, 340);
  const stepW = podW / 3;
  const h1 = 78;
  const h2 = 54;
  const h3 = 38;

  ctx.save();

  const podAura = ctx.createRadialGradient(cx, baseY - h1 - 30, 20, cx, baseY - h1, podW * 0.8);
  if (isBreaking) {
    podAura.addColorStop(0, 'rgba(237, 1, 138, 0.35)'); // Magenta urban lighting during breaking
    podAura.addColorStop(0.4, 'rgba(53, 126, 192, 0.22)');
    podAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    podAura.addColorStop(0, 'rgba(255, 215, 0, 0.28)'); // Gold celebration aura
    podAura.addColorStop(0.4, 'rgba(237, 1, 138, 0.16)');
    podAura.addColorStop(0.8, 'rgba(27, 70, 122, 0.25)');
    podAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }
  ctx.fillStyle = podAura;
  ctx.beginPath();
  ctx.arc(cx, baseY - h1, podW * 0.75, 0, Math.PI * 2);
  ctx.fill();

  const trophyY = baseY - h1 - 28 + Math.sin(time * 2) * 3;
  drawTrophy(ctx, cx, trophyY, 18);

  drawPodiumBlock(ctx, cx - stepW, baseY, stepW * 0.94, h2, '2', '#C0C8D4', '#E8EEF5', 'rgba(192,200,212,0.6)');
  drawPodiumBlock(ctx, cx + stepW * 0.06, baseY, stepW * 0.94, h3, '3', '#CD7F32', '#F0B888', 'rgba(205,127,50,0.6)');
  drawPodiumBlock(ctx, cx - stepW * 0.47, baseY, stepW * 0.94, h1, '1', '#FFD700', '#FFF2A8', 'rgba(255,215,0,0.85)');

  ctx.restore();
}

function drawPodiumBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  width: number,
  height: number,
  label: string,
  trimColor: string,
  glowColor: string,
  lightColor: string
) {
  const topY = baseY - height;

  ctx.save();

  ctx.fillStyle = '#1A3356';
  ctx.beginPath();
  ctx.moveTo(x, topY);
  ctx.lineTo(x + width, topY);
  ctx.lineTo(x + width - 10, topY - 12);
  ctx.lineTo(x + 10, topY - 12);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = trimColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  const frontGrad = ctx.createLinearGradient(x, topY, x, baseY);
  frontGrad.addColorStop(0, '#132B4C');
  frontGrad.addColorStop(0.6, '#0E223D');
  frontGrad.addColorStop(1, '#09172B');
  ctx.fillStyle = frontGrad;
  ctx.fillRect(x, topY, width, height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, topY, width, height);

  ctx.fillStyle = trimColor;
  ctx.fillRect(x, baseY - 3, width, 3);

  ctx.font = 'bold 22px "Archivo", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = glowColor;
  ctx.shadowColor = lightColor;
  ctx.shadowBlur = 10;
  ctx.fillText(label, x + width * 0.5, topY + height * 0.5);

  ctx.restore();
}

function drawTrophy(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.fillStyle = '#FFD700';
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  ctx.shadowBlur = 12;

  ctx.beginPath();
  ctx.arc(x, y - size * 0.2, size * 0.5, 0, Math.PI);
  ctx.lineTo(x - size * 0.5, y - size * 0.6);
  ctx.lineTo(x + size * 0.5, y - size * 0.6);
  ctx.closePath();
  ctx.fill();

  ctx.fillRect(x - 2, y + size * 0.3, 4, size * 0.35);
  ctx.fillRect(x - size * 0.35, y + size * 0.65, size * 0.7, 3);

  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x - size * 0.55, y - size * 0.35, size * 0.22, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(x + size * 0.55, y - size * 0.35, size * 0.22, Math.PI * 1.5, Math.PI * 0.5);
  ctx.stroke();

  ctx.restore();
}

function drawParquetFloor(
  ctx: CanvasRenderingContext2D,
  horizonY: number,
  w: number,
  h: number,
  time: number,
  vanishX: number
) {
  const floorHeight = h - horizonY;
  ctx.save();

  const floorGrad = ctx.createLinearGradient(0, horizonY, 0, h);
  floorGrad.addColorStop(0, '#102746');
  floorGrad.addColorStop(0.2, '#0D1E36');
  floorGrad.addColorStop(0.6, '#081424');
  floorGrad.addColorStop(1, '#040A12');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, horizonY, w, floorHeight);

  ctx.lineWidth = 1;
  const slatCount = 38;
  for (let s = -slatCount / 2; s <= slatCount / 2; s++) {
    const bottomX = vanishX + s * (w / 18);
    const topX = vanishX + s * 7;

    const slatGrad = ctx.createLinearGradient(0, horizonY, 0, h);
    slatGrad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
    slatGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
    slatGrad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
    ctx.strokeStyle = slatGrad;

    ctx.beginPath();
    ctx.moveTo(topX, horizonY);
    ctx.lineTo(bottomX, h);
    ctx.stroke();
  }

  const crossPlanks = 14;
  for (let p = 1; p <= crossPlanks; p++) {
    const ratio = Math.pow(p / crossPlanks, 2.2);
    const py = horizonY + ratio * floorHeight;
    const alpha = 0.04 + ratio * 0.12;

    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(w, py);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(w, horizonY);
  ctx.stroke();

  const floorGlow = ctx.createRadialGradient(
    vanishX,
    horizonY + 20,
    10,
    vanishX,
    horizonY + 80,
    w * 0.4
  );
  floorGlow.addColorStop(0, 'rgba(255, 215, 0, 0.18)');
  floorGlow.addColorStop(0.3, 'rgba(27, 70, 122, 0.28)');
  floorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = floorGlow;
  ctx.fillRect(0, horizonY, w, floorHeight);

  ctx.restore();
}

function drawSpotlights(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  podX: number,
  horizonY: number,
  isBreaking: boolean
) {
  ctx.save();

  const lights = isBreaking
    ? [
        { originX: w * 0.25, targetX: podX - 60 + Math.sin(time * 1.4) * 80, col: 'rgba(237,1,138,0.22)' },
        { originX: w * 0.65, targetX: podX + Math.sin(time * 1.8) * 60, col: 'rgba(255,255,255,0.28)' },
        { originX: w * 0.85, targetX: podX + 70 + Math.cos(time * 1.5) * 80, col: 'rgba(53,126,192,0.2)' }
      ]
    : [
        { originX: w * 0.35, targetX: podX - 80 + Math.sin(time * 0.8) * 60, col: 'rgba(255,255,255,0.14)' },
        { originX: w * 0.72, targetX: podX + Math.sin(time * 0.6) * 50, col: 'rgba(255,230,180,0.18)' },
        { originX: w * 0.88, targetX: podX + 90 + Math.cos(time * 0.7) * 70, col: 'rgba(237,1,138,0.11)' }
      ];

  for (const beam of lights) {
    const beamGrad = ctx.createLinearGradient(beam.originX, -30, beam.targetX, horizonY + 120);
    beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    beamGrad.addColorStop(0.2, beam.col);
    beamGrad.addColorStop(0.7, 'rgba(27, 70, 122, 0.08)');
    beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(beam.originX, -30);
    ctx.lineTo(beam.targetX - 95, horizonY + 120);
    ctx.lineTo(beam.targetX + 95, horizonY + 120);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}
