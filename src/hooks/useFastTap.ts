import { useCallback, useRef, type TouchEvent } from "react";

const TOUCH_CLICK_GUARD_MS = 700;

export function useFastTap(handler: () => void) {
  const lastTouchAt = useRef(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    lastTouchAt.current = Date.now();
    e.preventDefault();

    handler();
  }, [handler]);

  const onClick = useCallback(() => {
    if (Date.now() - lastTouchAt.current < TOUCH_CLICK_GUARD_MS) return;

    handler();
  }, [handler]);

  return { onTouchStart, onClick };
}
