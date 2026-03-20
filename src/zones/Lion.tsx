import { useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { projects } from "../data/resume";
import { useStore } from "../store/useStore";

export default function Lion() {
  const pos = getZoneWorldPos("lion");
  const stonesRef = useRef<THREE.Group>(null);
  const setSelectedProject = useStore((s) => s.setSelectedProject);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (stonesRef.current) {
      stonesRef.current.children.forEach((child, i) => {
        child.position.y = 1.8 + Math.sin(t * 0.8 + i * 1.2) * 0.15;
        child.rotation.y = t * 0.2 + i;
      });
    }
  });

  const stoneColors = ["#9370DB", "#50C878", "#FF6347", "#4169E1", "#FFD700", "#FF69B4"];

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Section title */}
      <Billboard position={[0, 5.5, 0]}>
        <Text
          fontSize={0.6}
          color="#FFD700"
          anchorX="center"
          outlineWidth={0.04}
          outlineColor="#000"
        >
          🦁 FEATURED PROJECTS
        </Text>
      </Billboard>

      {/* Enchanted forest clearing — tall dark trees */}
      {[...Array(10)].map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 14 + Math.random() * 4;
        return (
          <group key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
            <mesh position={[0, 4, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.4, 8, 6]} />
              <meshStandardMaterial color="#2d1a0e" roughness={0.9} />
            </mesh>
            <mesh position={[0, 9, 0]} castShadow>
              <coneGeometry args={[2.5, 5, 6]} />
              <meshStandardMaterial color="#1a4a1a" roughness={0.8} flatShading />
            </mesh>
          </group>
        );
      })}

      {/* Floating portal stones — one per project */}
      <group ref={stonesRef}>
        {projects.map((project, i) => {
          const angle = (i / projects.length) * Math.PI * 2;
          const r = 6;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;

          return (
            <group key={i} position={[x, 1.8, z]}>
              {/* Stone base */}
              <mesh
                castShadow
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  setSelectedProject(i);
                }}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                  (e.object as THREE.Mesh).scale.set(1.15, 1.15, 1.15);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e: ThreeEvent<PointerEvent>) => {
                  (e.object as THREE.Mesh).scale.set(1, 1, 1);
                  document.body.style.cursor = "default";
                }}
              >
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  color={stoneColors[i]}
                  emissive={stoneColors[i]}
                  emissiveIntensity={0.3}
                  roughness={0.4}
                  metalness={0.3}
                />
              </mesh>

              {/* Glow ring around stone */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.3, 0.03, 8, 32]} />
                <meshStandardMaterial
                  color={stoneColors[i]}
                  emissive={stoneColors[i]}
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.5}
                />
              </mesh>

              {/* Project name label */}
              <Billboard position={[0, 1.8, 0]}>
                <Text
                  fontSize={0.2}
                  color="#FFD700"
                  anchorX="center"
                  outlineWidth={0.02}
                  outlineColor="#000"
                  fontWeight="bold"
                >
                  {project.name}
                </Text>
              </Billboard>
              <Billboard position={[0, 1.5, 0]}>
                <Text
                  fontSize={0.12}
                  color="#CCC"
                  anchorX="center"
                  outlineWidth={0.015}
                  outlineColor="#000"
                >
                  {project.subtitle}
                </Text>
              </Billboard>
            </group>
          );
        })}
      </group>

      {/* Lion figure */}
      <group position={[0, 0, 8]}>
        {/* Body */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[1.2, 8, 6]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        {/* Mane */}
        <mesh position={[0, 2, 0.3]} castShadow>
          <sphereGeometry args={[0.9, 12, 8]} />
          <meshStandardMaterial color="#DAA520" roughness={0.9} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 2, 0.5]} castShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        {/* Crown (courage!) */}
        <mesh position={[0, 2.7, 0.4]} castShadow>
          <coneGeometry args={[0.3, 0.5, 5]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Mystical ambient light */}
      <pointLight position={[0, 6, 0]} intensity={0.8} color="#9370DB" distance={25} />
      
      {/* Fireflies / sparkle particles */}
      {[...Array(15)].map((_, i) => (
        <mesh
          key={i}
          position={[
            -8 + Math.random() * 16,
            1 + Math.random() * 4,
            -8 + Math.random() * 16,
          ]}
        >
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshStandardMaterial
            color="#FFFF00"
            emissive="#FFFF00"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}
