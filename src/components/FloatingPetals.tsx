import { useMemo } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  swayDuration: number;
  opacity: number;
  emoji: string;
}

export function FloatingPetals({ count = 12 }: { count?: number }) {
  const petals = useMemo<Petal[]>(() => {
    const emojis = ["🌸", "💮", "🏵️", "✿", "❀"];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 10,
      swayDuration: 3 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.4,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="animate-petal-sway absolute"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.swayDuration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <div
            className="animate-petal-fall"
            style={{
              fontSize: `${petal.size}px`,
              opacity: petal.opacity,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            {petal.emoji}
          </div>
        </div>
      ))}
    </div>
  );
}
