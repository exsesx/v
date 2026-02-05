import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useIsTouchDevice } from "../hooks/useIsTouchDevice";

const DETECTION_RADIUS = 140;
const JUMP_DISTANCE = 180;
const VIEWPORT_PADDING = 20;

const MOBILE_PHRASES = [
  "No",
  "Are you sure?",
  "Think again! 🥺",
  "Pretty please?",
  "Last chance...",
];

interface EvadeButtonProps {
  onGiveUp?: () => void;
}

export function EvadeButton({ onGiveUp }: EvadeButtonProps) {
  const mousePos = useMousePosition();
  const isTouch = useIsTouchDevice();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [hasEvaded, setHasEvaded] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bounds = useMemo(
    () => ({
      minX: VIEWPORT_PADDING,
      maxX: windowSize.width - VIEWPORT_PADDING - 140,
      minY: VIEWPORT_PADDING,
      maxY: windowSize.height - VIEWPORT_PADDING - 60,
    }),
    [windowSize],
  );

  const clampPosition = useCallback(
    (x: number, y: number) => ({
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    }),
    [bounds],
  );

  useEffect(() => {
    if (isTouch || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = position ? position.x + rect.width / 2 : rect.left + rect.width / 2;
    const btnCenterY = position ? position.y + rect.height / 2 : rect.top + rect.height / 2;

    const dx = mousePos.x - btnCenterX;
    const dy = mousePos.y - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < DETECTION_RADIUS) {
      const angle = Math.atan2(dy, dx);
      const fleeAngle = angle + Math.PI;

      const jitter = (Math.random() - 0.5) * 0.8;
      const finalAngle = fleeAngle + jitter;

      let newX = btnCenterX + Math.cos(finalAngle) * JUMP_DISTANCE - rect.width / 2;
      let newY = btnCenterY + Math.sin(finalAngle) * JUMP_DISTANCE - rect.height / 2;

      const clamped = clampPosition(newX, newY);
      newX = clamped.x;
      newY = clamped.y;

      const newCenterX = newX + rect.width / 2;
      const newCenterY = newY + rect.height / 2;
      const newDx = mousePos.x - newCenterX;
      const newDy = mousePos.y - newCenterY;
      const newDist = Math.sqrt(newDx * newDx + newDy * newDy);

      if (newDist < DETECTION_RADIUS * 0.8) {
        newX = Math.random() * (bounds.maxX - bounds.minX) + bounds.minX;
        newY = Math.random() * (bounds.maxY - bounds.minY) + bounds.minY;
      }

      setPosition({ x: newX, y: newY });
      setHasEvaded(true);
    }
  }, [mousePos, isTouch, position, bounds, clampPosition]);

  const handleMobileTap = useCallback(() => {
    if (!isTouch) return;

    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    if (nextTap >= MOBILE_PHRASES.length) {
      setIsHidden(true);
      onGiveUp?.();
    }
  }, [isTouch, tapCount, onGiveUp]);

  if (isHidden) return null;

  const mobileLabel = isTouch ? MOBILE_PHRASES[Math.min(tapCount, MOBILE_PHRASES.length - 1)] : "No";

  if (isTouch) {
    return (
      <motion.button
        ref={buttonRef}
        onClick={handleMobileTap}
        className="rounded-full bg-rose-900/30 font-body text-xl tracking-wide text-rose-300/70 backdrop-blur-sm transition-all hover:bg-rose-900/40 sm:text-2xl"
        style={{ padding: "18px 56px", border: "1px solid rgba(244, 63, 94, 0.15)" }}
        whileTap={{ scale: 0.95 }}
        animate={{
          opacity: tapCount >= MOBILE_PHRASES.length - 1 ? 0.4 : 0.8,
        }}
      >
        {mobileLabel}
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      tabIndex={-1}
      className="rounded-full bg-rose-900/30 font-body text-xl tracking-wide text-rose-300/70 backdrop-blur-sm transition-colors hover:bg-rose-900/40 sm:text-2xl"
      style={{
        padding: "18px 56px",
        position: hasEvaded ? "fixed" : "relative",
        left: hasEvaded && position ? position.x : undefined,
        top: hasEvaded && position ? position.y : undefined,
        zIndex: 50,
        willChange: "transform",
        border: "1px solid rgba(244, 63, 94, 0.15)",
        cursor: "default",
      }}
      animate={
        hasEvaded && position
          ? { x: 0, y: 0 }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      }}
    >
      No
    </motion.button>
  );
}
