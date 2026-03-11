import { useEffect, useRef } from "react";

export const WaterRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }> = [];

    // Auto-generate ripples
    const autoRipple = () => {
      ripples.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        maxRadius: 80 + Math.random() * 120,
        opacity: 0.15 + Math.random() * 0.1,
      });
    };

    const interval = setInterval(autoRipple, 1800);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 150 + Math.random() * 100,
        opacity: 0.25,
      });
    };

    canvas.addEventListener("click", handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.8;
        const progress = r.radius / r.maxRadius;
        const alpha = r.opacity * (1 - progress);

        if (alpha <= 0.001) {
          ripples.splice(i, 1);
          continue;
        }

        // Outer ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(43, 72%, 55%, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner ring
        if (r.radius > 10) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(43, 72%, 55%, ${alpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-[1]"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
};
