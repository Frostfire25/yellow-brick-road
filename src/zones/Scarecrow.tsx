import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { skills } from "../data/resume";

const BASE = import.meta.env.BASE_URL;

function KenneyModel({ url, position, scale = 1, rotation = 0 }: {
  url: string; position: [number, number, number]; scale?: number; rotation?: number;
}) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} position={position} scale={scale} rotation={[0, rotation, 0]} castShadow />;
}

export default function Scarecrow() {
  const pos = getZoneWorldPos("scarecrow");
  const signpostRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (signpostRef.current) {
      signpostRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  const allSkills = skills.flatMap((cat) =>
    cat.items.map((item) => ({ item, category: cat.category }))
  );

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Kenney hay bales and logs */}
      <KenneyModel url={`${BASE}models/nature/log.glb`} position={[-8, 0, 5]} scale={2.5} rotation={0.3} />
      <KenneyModel url={`${BASE}models/nature/log_stack.glb`} position={[8, 0, 4]} scale={2} rotation={1.2} />
      <KenneyModel url={`${BASE}models/nature/stump_round.glb`} position={[-6, 0, -6]} scale={2.5} />
      <KenneyModel url={`${BASE}models/nature/stump_round.glb`} position={[7, 0, -5]} scale={2} />
      <KenneyModel url={`${BASE}models/nature/fence_simple.glb`} position={[-10, 0, 0]} scale={2} rotation={0.5} />
      <KenneyModel url={`${BASE}models/nature/fence_simple.glb`} position={[10, 0, 0]} scale={2} rotation={-0.5} />

      {/* Central scarecrow figure */}
      <group position={[0, 0, 3]} ref={signpostRef}>
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 5, 8]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.5, 0]} castShadow>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.5, 0]} castShadow>
          <coneGeometry args={[0.4, 0.8, 8]} />
          <meshStandardMaterial color="#8B6914" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4, 0]} castShadow>
          <sphereGeometry args={[0.35, 8, 6]} />
          <meshStandardMaterial color="#DEB887" roughness={0.7} />
        </mesh>
        {["Languages", "Frontend", "Backend", "Cloud & DevOps"].map((label, i) => {
          const angle = ((i - 1.5) / 4) * 0.8;
          return (
            <group key={label} position={[Math.sin(angle) * 1.5, 3.5 - i * 0.3, 0]} rotation={[0, 0, angle * 0.5]}>
              <mesh>
                <boxGeometry args={[1.8, 0.3, 0.08]} />
                <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
              </mesh>
              <Billboard position={[0, 0, 0.05]}>
                <Text fontSize={0.12} color="#FFD700" anchorX="center">{label}</Text>
              </Billboard>
            </group>
          );
        })}
      </group>

      {/* Section title */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <Billboard position={[0, 5.5, 3]}>
          <Text fontSize={0.6} color="#FFD700" anchorX="center" outlineWidth={0.04} outlineColor="#000">
            🧠 SKILLS & TECHNOLOGIES
          </Text>
        </Billboard>
      </Float>

      {/* Skill badges on Kenney stumps */}
      {allSkills.slice(0, 24).map((skill, i) => {
        const cols = 6;
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = (col - cols / 2 + 0.5) * 3;
        const z = -4 - row * 3;
        const categoryColors: Record<string, string> = {
          Languages: "#FF6347", Frontend: "#00CED1", Backend: "#9370DB",
          "Cloud & DevOps": "#FF69B4", Databases: "#FFD700", Tools: "#50C878",
        };
        const color = categoryColors[skill.category] || "#FFD700";

        return (
          <group key={skill.item} position={[x, 0, z]}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
              <group position={[0, 1.5, 0]}>
                <mesh>
                  <boxGeometry args={[1.2, 0.5, 0.08]} />
                  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.85} />
                </mesh>
                <Billboard position={[0, 0, 0.05]}>
                  <Text fontSize={0.15} color="#FFF" anchorX="center">{skill.item}</Text>
                </Billboard>
              </group>
            </Float>
          </group>
        );
      })}

      <pointLight position={[0, 8, 0]} intensity={0.6} color="#DAA520" distance={25} />
    </group>
  );
}
