import { useRef, useCallback } from "react";
import { contact } from "../data/resume";

export default function LoadingScreen({ onStart }: { onStart: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onStart();
  }, [onStart]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at center, #1a3a1a 0%, #0a0a0a 70%)",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Emerald glow */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "#50C878" }}
      />

      {/* Ruby slippers icon */}
      <div className="animate-ruby-sparkle text-6xl mb-8">👠</div>

      {/* Title */}
      <h1
        className="text-5xl md:text-7xl font-bold mb-4 text-center"
        style={{
          fontFamily: "Georgia, serif",
          color: "#FFD700",
          textShadow: "0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.2)",
        }}
      >
        {contact.name}
      </h1>

      <p
        className="text-xl md:text-2xl mb-2 opacity-80"
        style={{ color: "#50C878", fontFamily: "Georgia, serif" }}
      >
        Software Engineer
      </p>

      <p
        className="text-sm md:text-base mb-12 opacity-60"
        style={{ color: "#9CA3AF" }}
      >
        {contact.location}
      </p>

      {/* Start prompt */}
      <div className="animate-float">
        <div
          className="px-8 py-4 rounded-full border-2 text-lg font-semibold tracking-wider"
          style={{
            borderColor: "#FFD700",
            color: "#FFD700",
            background: "rgba(255, 215, 0, 0.05)",
            textShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
          }}
        >
          ✦ CLICK TO FOLLOW THE YELLOW BRICK ROAD ✦
        </div>
      </div>

      <p className="mt-8 text-xs opacity-40" style={{ color: "#9CA3AF" }}>
        Use WASD to move · Mouse to look around
      </p>

      {/* Decorative quote */}
      <p
        className="absolute bottom-8 text-sm italic opacity-30"
        style={{ color: "#50C878", fontFamily: "Georgia, serif" }}
      >
        "There's no place like home..."
      </p>
    </div>
  );
}
