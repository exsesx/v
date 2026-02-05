import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { EvadeButton } from "./EvadeButton";
import { Celebration } from "./Celebration";
import { FloatingPetals } from "./FloatingPetals";

type GameState = "question" | "celebration";

export function ValentineCard() {
  const [state, setState] = useState<GameState>("question");

  const handleYes = useCallback(() => {
    setState("celebration");
  }, []);

  if (state === "celebration") {
    return <Celebration />;
  }

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(74, 14, 46, 0.6) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(61, 12, 36, 0.4) 0%, transparent 50%), linear-gradient(160deg, #1a0a14 0%, #2d0a1e 40%, #1a0a14 70%, #0f0a10 100%)",
      }}
    >
      <FloatingPetals count={15} />

      {/* Ambient glow orbs */}
      <div
        className="animate-gentle-pulse absolute left-1/4 top-1/4 h-64 w-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244, 63, 94, 0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="animate-gentle-pulse absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.06), transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "1.5s",
        }}
      />

      {/* Card container */}
      <motion.div
        className="relative z-10 flex w-full max-w-2xl flex-col items-center px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Decorative top flourish */}
        <motion.div
          className="flex items-center gap-3 text-rose-400/30"
          style={{ marginBottom: 28 }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400/30" />
          <span className="font-script text-sm tracking-widest text-rose-400/40">♥</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-400/30" />
        </motion.div>

        {/* Pulsing heart */}
        <motion.div
          className="animate-float"
          style={{ marginBottom: 44 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <Heart
              size={72}
              className="animate-heartbeat text-rose-500"
              fill="currentColor"
              strokeWidth={0}
            />
            <div
              className="absolute inset-0 animate-heartbeat"
              style={{
                background: "radial-gradient(circle, rgba(244, 63, 94, 0.3), transparent 70%)",
                filter: "blur(12px)",
                transform: "scale(2)",
              }}
            />
          </div>
        </motion.div>

        {/* Main question */}
        <motion.h1
          className="font-display text-5xl font-bold leading-tight tracking-tight text-rose-100 sm:text-6xl md:text-7xl"
          style={{ marginBottom: 36 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="block">Olya,</span>
          <span className="block">will you be my</span>
          <span
            className="animate-shimmer bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #fda4af, #f43f5e, #ec4899, #f43f5e, #fda4af)",
              backgroundSize: "200% auto",
            }}
          >
            Valentine?
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-script text-2xl text-rose-300/50 sm:text-3xl"
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          I already know the answer...
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            onClick={handleYes}
            className="relative rounded-full font-body text-xl font-medium tracking-wide text-white shadow-lg sm:text-2xl"
            style={{
              padding: "18px 56px",
              background: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #e11d48 100%)",
              boxShadow:
                "0 4px 20px rgba(225, 29, 72, 0.4), 0 0 40px rgba(225, 29, 72, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileHover={{
              scale: 1.08,
              boxShadow:
                "0 6px 30px rgba(225, 29, 72, 0.5), 0 0 60px rgba(225, 29, 72, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Yes!
          </motion.button>

          <EvadeButton />
        </motion.div>

        {/* Decorative bottom flourish */}
        <motion.div
          className="flex items-center gap-3"
          style={{ marginTop: 56 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400/20" />
          <span className="font-script text-xs tracking-[0.3em] text-rose-400/25">
            forever yours
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400/20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
