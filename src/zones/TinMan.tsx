import { useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { experiences } from "../data/resume";
import { useStore } from "../store/useStore";

export default function TinMan() {
  const pos = getZoneWorldPos("tinman");
  const gearsRef = useRef<THREE.Group>(null);
  const setSelectedExperience = useStore((s) => s.setSelectedExperience);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gearsRef.current) {
      gearsRef.current.children.forEach((child, i) => {
        child.rotation.z = t * (i % 2 === 0 ? 0.3 : -0.3);
      });
    }
  });

  const pillarColors = ["#4169E1", "#4169E1", "#FF4500", "#2E8B57", "#8B4513"];

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Section title */}
      <Billboard position={[0, 6, 0]}>
        <Text
          fontSize={0.6}
          color="#FFD700"
          anchorX="center"
          outlineWidth={0.04}
          outlineColor="#000"
        >
          ⚙️ PROFESSIONAL EXPERIENCE
        </Text>
      </Billboard>

      {/* Timeline pillars for each role */}
      {experiences.map((exp, i) => {
        const x = (i - (experiences.length - 1) / 2) * 5;
        const height = 4 + (experiences.length - i) * 0.5;

        return (
          <group key={i} position={[x, 0, 0]}>
            {/* Pillar */}
            <mesh
              position={[0, height / 2, 0]}
              castShadow
              onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                setSelectedExperience(i);
              }}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                (e.object as THREE.Mesh).scale.set(1.05, 1.05, 1.05);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e: ThreeEvent<PointerEvent>) => {
                (e.object as THREE.Mesh).scale.set(1, 1, 1);
                document.body.style.cursor = "default";
              }}
            >
              <boxGeometry args={[2, height, 1.5]} />
              <meshStandardMaterial
                color={pillarColors[i]}
                roughness={0.3}
                metalness={0.6}
              />
            </mesh>

            {/* Metal plate with company name */}
            <mesh position={[0, height - 0.5, 0.76]}>
              <boxGeometry args={[1.8, 0.6, 0.05]} />
              <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
            </mesh>

            <Billboard position={[0, height - 0.5, 0.8]}>
              <Text fontSize={0.18} color="#1a1a1a" anchorX="center" fontWeight="bold">
                {exp.company}
              </Text>
            </Billboard>

            <Billboard position={[0, height - 1, 0.8]}>
              <Text fontSize={0.12} color="#FFF" anchorX="center" outlineWidth={0.02} outlineColor="#000">
                {exp.role}
              </Text>
            </Billboard>

            <Billboard position={[0, height - 1.4, 0.8]}>
              <Text fontSize={0.1} color="#FFD700" anchorX="center" outlineWidth={0.02} outlineColor="#000">
                {exp.period}
              </Text>
            </Billboard>

            {/* Click hint */}
            <Billboard position={[0, 0.5, 0.8]}>
              <Text fontSize={0.1} color="rgba(255,255,255,0.5)" anchorX="center">
                [ Click to read more ]
              </Text>
            </Billboard>

            {/* Connecting wire to next pillar */}
            {i < experiences.length - 1 && (
              <mesh position={[2.5, 2, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3, 0.05, 0.05]} />
                <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Decorative gears */}
      <group ref={gearsRef}>
        {[
          { x: -12, y: 3, z: 2, s: 1.5 },
          { x: 12, y: 4, z: -1, s: 2 },
          { x: -10, y: 6, z: -3, s: 1 },
        ].map((gear, i) => (
          <mesh key={i} position={[gear.x, gear.y, gear.z]}>
            <torusGeometry args={[gear.s, 0.15, 8, 12]} />
            <meshStandardMaterial color="#808080" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Tin Man figure */}
      <group position={[-8, 0, 4]}>
        {/* Body */}
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 2.5, 8]} />
          <meshStandardMaterial color="#A9A9A9" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 3.8, 0]} castShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Funnel hat */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <coneGeometry args={[0.3, 0.8, 8]} />
          <meshStandardMaterial color="#A9A9A9" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Heart (red gem on chest) */}
        <mesh position={[0, 2.2, 0.81]}>
          <sphereGeometry args={[0.15, 8, 6]} />
          <meshStandardMaterial color="#E0115F" emissive="#E0115F" emissiveIntensity={0.5} />
        </mesh>
      </group>

      <pointLight position={[0, 10, 0]} intensity={0.7} color="#87CEEB" distance={30} />
    </group>
  );
}
