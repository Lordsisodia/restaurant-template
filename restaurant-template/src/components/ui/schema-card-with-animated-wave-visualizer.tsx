"use client";

import React, { useEffect, useRef } from "react";

export default function SchemaCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let time = 0;
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = (py + 1) * canvas.height / 2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 100;
        const g = 70 + intensity * 130;
        const b = 229;
        ctx.lineWidth = 1 + i * 0.3;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }

    function animate() {
      time += 0.02;
      updateWaveData();
      draw();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-xs">
          <div className="relative overflow-hidden rounded-2xl flex flex-col animate-float card-border">
            <div className="p-4 flex justify-center relative">
              <div className="w-full h-48 rounded-xl gradient-border inner-glow overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="h-full w-full animate-pulse"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '15px 15px',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="p-4">
              <span className="glass mb-3 inline-block rounded-full border border-indigo-400/30 px-3 py-1 text-xs font-medium text-indigo-300">Database</span>
              <h3 className="mb-2 text-lg font-medium text-white">Schema Management</h3>
              <p className="mb-4 text-xs leading-relaxed text-white/70">
                Design, optimize and maintain your database structure with powerful schema tools.
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="glass flex items-center rounded-lg border border-indigo-400/30 px-3 py-1.5 text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Manage
                  <svg className="ml-1 h-3 w-3" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <span className="glass rounded-full border border-white/10 px-2 py-1 text-xs text-white/50">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

