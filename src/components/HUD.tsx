import { useStore, ZONE_ORDER, ZONE_LABELS } from "../store/useStore";

export default function HUD() {
  const currentZone = useStore((s) => s.currentZone);
  const isLocked = useStore((s) => s.isLocked);
  const isAutoWalking = useStore((s) => s.isAutoWalking);
  const setAutoWalking = useStore((s) => s.setAutoWalking);
  const selectedProject = useStore((s) => s.selectedProject);
  const setSelectedProject = useStore((s) => s.setSelectedProject);
  const selectedExperience = useStore((s) => s.selectedExperience);
  const setSelectedExperience = useStore((s) => s.setSelectedExperience);

  const zoneIndex = ZONE_ORDER.indexOf(currentZone);
  const progress = ((zoneIndex + 1) / ZONE_ORDER.length) * 100;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* Click to start hint */}
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="px-6 py-3 rounded-lg text-lg font-semibold animate-pulse"
            style={{
              background: "rgba(0,0,0,0.7)",
              color: "#FFD700",
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          >
            Click to explore
          </div>
        </div>
      )}

      {/* Zone name display */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div
          className="px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "#FFD700",
            border: "1px solid rgba(255,215,0,0.3)",
            textShadow: "0 0 10px rgba(255,215,0,0.5)",
          }}
        >
          {ZONE_LABELS[currentZone]}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">👠</span>
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FFD700, #50C878)",
              }}
            />
          </div>
          <span className="text-xl">🏰</span>
        </div>

        {/* Zone dots */}
        <div className="flex justify-between px-4">
          {ZONE_ORDER.map((zone, i) => (
            <div
              key={zone}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i <= zoneIndex ? "#FFD700" : "rgba(255,255,255,0.3)",
                boxShadow: i <= zoneIndex ? "0 0 6px #FFD700" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Auto-walk button */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <button
          onClick={() => setAutoWalking(!isAutoWalking)}
          className="px-4 py-2 rounded-full text-sm font-semibold cursor-pointer"
          style={{
            background: isAutoWalking
              ? "rgba(80,200,120,0.8)"
              : "rgba(0,0,0,0.6)",
            color: isAutoWalking ? "#000" : "#FFD700",
            border: "1px solid rgba(255,215,0,0.3)",
          }}
        >
          {isAutoWalking ? "⏸ Pause" : "✦ Follow the Road"}
        </button>
      </div>

      {/* Controls hint */}
      {isLocked && (
        <div className="absolute bottom-6 left-6">
          <div
            className="px-3 py-1.5 rounded text-xs"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            WASD — Move &nbsp;|&nbsp; Mouse — Look &nbsp;|&nbsp; ESC — Unlock
          </div>
        </div>
      )}

      {/* Project detail modal */}
      {selectedProject !== null && (
        <ProjectModal
          index={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Experience detail modal */}
      {selectedExperience !== null && (
        <ExperienceModal
          index={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </div>
  );
}

import { projects, experiences } from "../data/resume";

function ProjectModal({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const project = projects[index];
  if (!project) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="max-w-lg w-full mx-4 p-6 rounded-2xl"
        style={{
          background: "rgba(10, 30, 10, 0.95)",
          border: "2px solid rgba(80, 200, 120, 0.5)",
          boxShadow: "0 0 40px rgba(80, 200, 120, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-2xl font-bold mb-1"
          style={{ color: "#FFD700", fontFamily: "Georgia, serif" }}
        >
          {project.name}
        </h2>
        <p className="text-sm mb-3" style={{ color: "#50C878" }}>
          {project.subtitle} — {project.date}
        </p>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: "#ccc" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs font-semibold"
              style={{
                background: "rgba(255,215,0,0.15)",
                color: "#FFD700",
                border: "1px solid rgba(255,215,0,0.3)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
          style={{
            background: "rgba(80,200,120,0.2)",
            color: "#50C878",
            border: "1px solid rgba(80,200,120,0.5)",
          }}
        >
          View on GitHub →
        </a>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg cursor-pointer"
          style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function ExperienceModal({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const exp = experiences[index];
  if (!exp) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="max-w-lg w-full mx-4 p-6 rounded-2xl relative"
        style={{
          background: "rgba(10, 15, 30, 0.95)",
          border: "2px solid rgba(100, 140, 180, 0.5)",
          boxShadow: "0 0 40px rgba(100, 140, 180, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-2xl font-bold mb-1"
          style={{ color: "#FFD700", fontFamily: "Georgia, serif" }}
        >
          {exp.company}
        </h2>
        <p className="text-sm mb-1" style={{ color: "#87CEEB" }}>
          {exp.role}
        </p>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          {exp.period}
        </p>
        <ul className="space-y-2 mb-4">
          {exp.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: "#ccc" }}
            >
              • {bullet}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs font-semibold"
              style={{
                background: "rgba(135,206,235,0.15)",
                color: "#87CEEB",
                border: "1px solid rgba(135,206,235,0.3)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg cursor-pointer"
          style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
