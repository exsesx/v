import { useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

const HEART_COLORS = ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#ec4899", "#f472b6"];

let confettiRunning = false;

function fireConfetti() {
  if (confettiRunning) return;

  confettiRunning = true;
  const duration = 4000;
  const end = Date.now() + duration;

  const heartShape = confetti.shapeFromPath({
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  });

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: HEART_COLORS,
      shapes: [heartShape, "circle"],
      scalar: 1.2,
      drift: 0.5,
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: HEART_COLORS,
      shapes: [heartShape, "circle"],
      scalar: 1.2,
      drift: -0.5,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      confettiRunning = false;
    }
  };

  frame();

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: HEART_COLORS,
      shapes: [heartShape, "circle"],
      scalar: 1.5,
    });
  }, 500);
}

export function Celebration() {
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (!hasLaunched.current) {
      hasLaunched.current = true;
      fireConfetti();
    }
  }, []);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 4 + Math.random() * 8,
      })),
    [],
  );

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 2,
        size: 16 + Math.random() * 24,
      })),
    [],
  );

  const handleFireMore = useCallback(() => {
    fireConfetti();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <div
        className="animate-gradient-shift absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #2d0a1e 0%, #4a0e2e 25%, #1a0a14 50%, #3d0c24 75%, #2d0a1e 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="animate-sparkle absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${HEART_COLORS[s.id % HEART_COLORS.length]}, transparent)`,
            }}
          />
        </div>
      ))}

      {/* Floating hearts background */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.left}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.6, 0.6, 0] }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Heart
            size={h.size}
            className="text-rose-500/30"
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        {/* Glowing heart icon */}
        <motion.div
          className="animate-celebration-glow rounded-full p-8"
          style={{ marginBottom: 56, background: "radial-gradient(circle, rgba(244,63,94,0.2), transparent)" }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <Heart
            size={80}
            className="animate-heartbeat text-rose-500"
            fill="currentColor"
            strokeWidth={0}
          />
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight text-rose-100 sm:text-7xl md:text-8xl"
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Olya said{" "}
          <span
            className="animate-shimmer bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #fda4af, #f43f5e, #ec4899, #f43f5e, #fda4af)",
              backgroundSize: "200% auto",
            }}
          >
            YES!
          </span>
        </motion.h1>

        <motion.p
          className="font-script text-2xl text-rose-300/80 sm:text-3xl md:text-4xl"
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Happy Valentine's Day, my love 💕
        </motion.p>

        {/* Hearts row */}
        <motion.div
          className="flex gap-4"
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          {["💖", "💝", "💗", "💖", "💝"].map((heart, i) => (
            <motion.span
              key={i}
              className="text-4xl sm:text-5xl"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>

        {/* Fire more confetti button */}
        <motion.button
          onClick={handleFireMore}
          className="cursor-pointer rounded-full font-body text-xl tracking-wide text-rose-200 transition-all sm:text-2xl"
          style={{
            padding: "18px 56px",
            background: "linear-gradient(135deg, rgba(225,29,72,0.4), rgba(236,72,153,0.4))",
            border: "1px solid rgba(244, 63, 94, 0.3)",
            backdropFilter: "blur(8px)",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(244, 63, 94, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          More Love!
        </motion.button>
      </div>
    </motion.div>
  );
}
