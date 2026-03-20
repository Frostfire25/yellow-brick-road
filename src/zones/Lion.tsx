import { useMemo } from "react";
import { type ThreeEvent } from "@react-three/fiber";
import { Text, Billboard, Float, Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { projects } from "../data/resume";
import { useStore } from "../store/useStore";

const BASE = import.meta.env.BASE_URL;

function KenneyModel({ url, position, scale = 1, rotation = 0 }: {
  url: string; position: [number, number, number]; scale?: number; rotation?: number;
}) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} position={position} scale={scale} rotation={[0, rotation, 0]} castShadow />;
}

export default function Lion() {
  const pos = getZoneWorldPos("lion");
  const setSelectedProject = useStore((s) => s.setSelectedProject);

  const stoneColors = ["#9370DB", "#50C878", "#FF6347", "#4169E1", "#FFD700", "#FF69B4"];

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Section title */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.4}>
        <Billboard position={[0, 5.5, 0]}>
          <Text fontSize={0.6} color="#FFD700" anchorX="center" outlineWidth={0.04} outlineColor="#000">
            🦁 FEATURED PROJECTS
          </Text>
        </Billboard>
      </Float>

      {/* Enchanted forest — Kenney dark pine trees */}
      {[...Array(10)].map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 14 + (i * 3) % 5;
        const treeModels = ["tree_pineTallA.glb", "tree_pineTallB.glb", "tree_pineRoundA.glb", "tree_pineRoundB.glb"];
        return (
          <KenneyModel
            key={i}
            url={`${BASE}models/nature/${treeModels[i % treeModels.length]}`}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            scale={3 + (i % 3)}
            rotation={i * 1.5}
          />
        );
      })}

      {/* Kenney rocks around clearing */}
      <KenneyModel url={`${BASE}models/nature/rock_largeA.glb`} position={[-10, 0, 8]} scale={3} />
      <KenneyModel url={`${BASE}models/nature/rock_largeB.glb`} position={[10, 0, -8]} scale={2.5} />
      <KenneyModel url={`${BASE}models/nature/rock_smallA.glb`} position={[-7, 0, -10]} scale={2} />

      {/* Floating project portal stones with Float */}
      {projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const r = 6;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;

        return (
          <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <group position={[x, 1.8, z]}>
              <mesh
                castShadow
                onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); setSelectedProject(i); }}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => { (e.object as THREE.Mesh).scale.set(1.15, 1.15, 1.15); document.body.style.cursor = "pointer"; }}
                onPointerOut={(e: ThreeEvent<PointerEvent>) => { (e.object as THREE.Mesh).scale.set(1, 1, 1); document.body.style.cursor = "default"; }}
              >
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={stoneColors[i]} emissive={stoneColors[i]} emissiveIntensity={0.3} roughness={0.4} metalness={0.3} />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.3, 0.03, 8, 32]} />
                <meshStandardMaterial color={stoneColors[i]} emissive={stoneColors[i]} emissiveIntensity={0.8} transparent opacity={0.5} />
              </mesh>
              <Billboard position={[0, 1.8, 0]}>
                <Text fontSize={0.2} color="#FFD700" anchorX="center" outlineWidth={0.02} outlineColor="#000" fontWeight="bold">
                  {project.name}
                </Text>
              </Billboard>
              <Billboard position={[0, 1.5, 0]}>
                <Text fontSize={0.12} color="#CCC" anchorX="center" outlineWidth={0.015} outlineColor="#000">
                  {project.subtitle}
                </Text>
              </Billboard>
            </group>
          </Float>
        );
      })}

      {/* Lion figure */}
      <group position={[0, 0, 8]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[1.2, 8, 6]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2, 0.3]} castShadow>
          <sphereGeometry args={[0.9, 12, 8]} />
          <meshStandardMaterial color="#DAA520" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2, 0.5]} castShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.7, 0.4]} castShadow>
          <coneGeometry args={[0.3, 0.5, 5]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Drei Sparkles for fireflies */}
      <Sparkles count={40} scale={[20, 8, 20]} size={3} speed={0.4} color="#FFFF00" />

      <pointLight position={[0, 6, 0]} intensity={0.8} color="#9370DB" distance={25} />
    </group>
  );
}
