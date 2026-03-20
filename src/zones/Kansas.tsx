import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard, useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { contact } from "../data/resume";

const BASE = import.meta.env.BASE_URL;

function KenneyModel({ url, position, scale = 1, rotation = 0 }: {
  url: string; position: [number, number, number]; scale?: number; rotation?: number;
}) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} position={position} scale={scale} rotation={[0, rotation, 0]} castShadow />;
}

export default function Kansas() {
  const pos = getZoneWorldPos("kansas");
  const tornadoRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (tornadoRef.current) {
      tornadoRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Kenney log cabin / fence area */}
      <KenneyModel url={`${BASE}models/nature/log_stack.glb`} position={[7, 0, 2]} scale={3} />
      <KenneyModel url={`${BASE}models/nature/log_stack.glb`} position={[7, 1.5, 2]} scale={3} />
      <KenneyModel url={`${BASE}models/nature/stump_round.glb`} position={[5, 0, 4]} scale={2} />
      <KenneyModel url={`${BASE}models/nature/fence_simple.glb`} position={[4, 0, 0]} scale={2} />
      <KenneyModel url={`${BASE}models/nature/fence_simple.glb`} position={[6, 0, 0]} scale={2} />
      <KenneyModel url={`${BASE}models/nature/fence_simple.glb`} position={[8, 0, 0]} scale={2} />
      <KenneyModel url={`${BASE}models/nature/fence_gate.glb`} position={[10, 0, 0]} scale={2} />
      <KenneyModel url={`${BASE}models/nature/campfire_stones.glb`} position={[9, 0, 3]} scale={2} />

      {/* Kansas farmhouse (primitive — landmark upgrade later) */}
      <group position={[6, 0, 2]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[4, 3, 3]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.5, 0]} castShadow>
          <coneGeometry args={[3.2, 2, 4]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.8, 1.51]}>
          <boxGeometry args={[0.8, 1.6, 0.1]} />
          <meshStandardMaterial color="#4a3520" />
        </mesh>
        <mesh position={[-1, 1.8, 1.51]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[1, 1.8, 1.51]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Tornado (decorative) */}
      <group ref={tornadoRef} position={[-12, 0, -5]}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0, i * 2 + 1, 0]}>
            <torusGeometry args={[0.5 + i * 0.4, 0.15, 8, 16]} />
            <meshStandardMaterial color="#555" transparent opacity={0.3 - i * 0.02} />
          </mesh>
        ))}
      </group>

      {/* Welcome sign with name */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
        <Billboard position={[0, 4, 3]}>
          <Text fontSize={1.2} color="#FFD700" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#000">
            {contact.name}
          </Text>
        </Billboard>
      </Float>
      <Billboard position={[0, 2.8, 3]}>
        <Text fontSize={0.4} color="#50C878" anchorX="center" anchorY="middle" outlineWidth={0.03} outlineColor="#000">
          Software Engineer · {contact.location}
        </Text>
      </Billboard>

      {/* Kenney sign post */}
      <KenneyModel url={`${BASE}models/nature/sign.glb`} position={[-3, 0, -3]} scale={2.5} />
      <Billboard position={[-3, 3.2, -2.8]}>
        <Text fontSize={0.16} color="#FFD700" anchorX="center" anchorY="middle">
          Follow the Yellow Brick Road →
        </Text>
      </Billboard>

      <pointLight position={[0, 8, 0]} intensity={0.5} color="#FFA500" distance={20} />
    </group>
  );
}
