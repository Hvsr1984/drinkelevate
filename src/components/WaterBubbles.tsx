import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const WaterBubbles = ({ count = 15 }: { count?: number }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generated: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 20,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.05 + Math.random() * 0.15,
    }));
    setBubbles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full animate-bubble-rise"
          style={{
            left: `${b.x}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: `radial-gradient(circle at 30% 30%, hsl(var(--primary) / ${b.opacity + 0.1}), hsl(var(--primary) / ${b.opacity * 0.3}))`,
            boxShadow: `inset -2px -2px ${b.size * 0.3}px hsl(var(--primary) / 0.1), 0 0 ${b.size * 0.5}px hsl(var(--primary) / 0.05)`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
