import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { skills } from "../data/resume";

export default function Scarecrow() {
  const pos = getZoneWorldPos("scarecrow");
  const signpostRef = useRef<THREE.Group>(null);
  const badgesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (signpostRef.current) {
      signpostRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
    if (badgesRef.current) {
      badgesRef.current.children.forEach((child, i) => {
        child.rotation.y = t * 0.5 + i * 0.5;
      });
    }
  });

  // Flatten all skills for display
  const allSkills = skills.flatMap((cat) =>
    cat.items.map((item) => ({ item, category: cat.category }))
  );

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Central scarecrow figure */}
      <group position={[0, 0, 3]} ref={signpostRef}>
        {/* Post */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 5, 8]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        {/* Crossbar */}
        <mesh position={[0, 3.5, 0]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        {/* Head (hat shape) */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <coneGeometry args={[0.4, 0.8, 8]} />
          <meshStandardMaterial color="#8B6914" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4, 0]} castShadow>
          <sphereGeometry args={[0.35, 8, 6]} />
          <meshStandardMaterial color="#DEB887" roughness={0.7} />
        </mesh>
        {/* Direction signs */}
        {["Languages", "Frontend", "Backend", "Cloud & DevOps"].map(
          (label, i) => {
            const angle = ((i - 1.5) / 4) * 0.8;
            return (
              <group
                key={label}
                position={[Math.sin(angle) * 1.5, 3.5 - i * 0.3, 0]}
                rotation={[0, 0, angle * 0.5]}
              >
                <mesh>
                  <boxGeometry args={[1.8, 0.3, 0.08]} />
                  <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
                </mesh>
                <Billboard position={[0, 0, 0.05]}>
                  <Text fontSize={0.12} color="#FFD700" anchorX="center">
                    {label}
                  </Text>
                </Billboard>
              </group>
            );
          }
        )}
      </group>

      {/* Section title */}
      <Billboard position={[0, 5.5, 3]}>
        <Text
          fontSize={0.6}
          color="#FFD700"
          anchorX="center"
          outlineWidth={0.04}
          outlineColor="#000"
        >
          🧠 SKILLS & TECHNOLOGIES
        </Text>
      </Billboard>

      {/* Hay bale pedestals with skill badges */}
      <group ref={badgesRef}>
        {allSkills.slice(0, 24).map((skill, i) => {
          const cols = 6;
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = (col - cols / 2 + 0.5) * 3;
          const z = -4 - row * 3;
          const categoryColors: Record<string, string> = {
            Languages: "#FF6347",
            Frontend: "#00CED1",
            Backend: "#9370DB",
            "Cloud & DevOps": "#FF69B4",
            Databases: "#FFD700",
            Tools: "#50C878",
          };
          const color = categoryColors[skill.category] || "#FFD700";

          return (
            <group key={skill.item} position={[x, 0, z]}>
              {/* Hay bale pedestal */}
              <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.5, 0.6, 0.8, 8]} />
                <meshStandardMaterial color="#DAA520" roughness={0.9} />
              </mesh>
              {/* Skill badge (floating) */}
              <group position={[0, 1.5, 0]}>
                <mesh>
                  <boxGeometry args={[1.2, 0.5, 0.08]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.85}
                  />
                </mesh>
                <Billboard position={[0, 0, 0.05]}>
                  <Text fontSize={0.15} color="#FFF" anchorX="center">
                    {skill.item}
                  </Text>
                </Billboard>
              </group>
            </group>
          );
        })}
      </group>

      {/* Straw scattered around */}
      {[...Array(15)].map((_, i) => (
        <mesh
          key={i}
          position={[
            -8 + Math.random() * 16,
            0.1,
            -8 + Math.random() * 16,
          ]}
          rotation={[0, Math.random() * Math.PI, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.5 + Math.random(), 4]} />
          <meshStandardMaterial color="#DAA520" />
        </mesh>
      ))}

      <pointLight position={[0, 8, 0]} intensity={0.6} color="#DAA520" distance={25} />
    </group>
  );
}
