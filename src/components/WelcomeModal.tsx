import { useStore } from "../store/useStore";
import { contact } from "../data/resume";

export default function WelcomeModal() {
  const hasStarted = useStore((s) => s.hasStarted);
  const setHasStarted = useStore((s) => s.setHasStarted);

  if (hasStarted) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 50, background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="max-w-md w-full mx-4 p-8 rounded-2xl text-center"
        style={{
          background: "rgba(10, 25, 10, 0.95)",
          border: "2px solid rgba(80, 200, 120, 0.4)",
          boxShadow: "0 0 60px rgba(80, 200, 120, 0.15), 0 0 120px rgba(255, 215, 0, 0.05)",
        }}
      >
        {/* Ruby slipper icon */}
        <div className="text-5xl mb-4 animate-ruby-sparkle">👠</div>

        {/* Name */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "Georgia, serif",
            color: "#FFD700",
            textShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
          }}
        >
          {contact.name}
        </h1>

        <p className="text-lg mb-1" style={{ color: "#50C878", fontFamily: "Georgia, serif" }}>
          Software Engineer
        </p>

        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
          {contact.location}
        </p>

        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif" }}
        >
          Walk down the Yellow Brick Road and explore my journey through education, skills, experience, and projects.
        </p>

        {/* Begin button */}
        <button
          onClick={() => setHasStarted(true)}
          className="px-8 py-3 rounded-full text-lg font-semibold tracking-wider cursor-pointer animate-float"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(80,200,120,0.2))",
            border: "2px solid #FFD700",
            color: "#FFD700",
            textShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
          }}
        >
          ✦ Begin the Journey ✦
        </button>

        <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          WASD to move · Mouse to look · ESC to unlock cursor
        </p>
      </div>
    </div>
  );
}
