import { useRef, useCallback, useEffect, useState } from "react";

interface TouchState {
  moveX: number;
  moveY: number;
  lookX: number;
  lookY: number;
}

export default function MobileControls({
  onMove,
}: {
  onMove: (state: TouchState) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const joystickKnobRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const moveRef = useRef({ moveX: 0, moveY: 0, lookX: 0, lookY: 0 });

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleJoystickStart = useCallback((_e: React.TouchEvent) => {
    const rect = joystickRef.current?.getBoundingClientRect();
    if (rect) {
      touchStartRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }, []);

  const handleJoystickMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const maxDist = 40;
      const clampedX = Math.max(-maxDist, Math.min(maxDist, dx));
      const clampedY = Math.max(-maxDist, Math.min(maxDist, dy));

      if (joystickKnobRef.current) {
        joystickKnobRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
      }

      moveRef.current.moveX = clampedX / maxDist;
      moveRef.current.moveY = -clampedY / maxDist;
      onMove(moveRef.current);
    },
    [onMove]
  );

  const handleJoystickEnd = useCallback(() => {
    if (joystickKnobRef.current) {
      joystickKnobRef.current.style.transform = "translate(0, 0)";
    }
    moveRef.current.moveX = 0;
    moveRef.current.moveY = 0;
    onMove(moveRef.current);
  }, [onMove]);

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-24 left-8 pointer-events-auto" style={{ zIndex: 20 }}>
      {/* Virtual joystick */}
      <div
        ref={joystickRef}
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255,215,0,0.15)",
          border: "2px solid rgba(255,215,0,0.4)",
        }}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
      >
        <div
          ref={joystickKnobRef}
          className="w-10 h-10 rounded-full transition-transform"
          style={{
            background: "rgba(255,215,0,0.6)",
            border: "2px solid rgba(255,215,0,0.8)",
          }}
        />
      </div>
    </div>
  );
}
