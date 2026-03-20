import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { contact } from "../data/resume";

export default function Kansas() {
  const pos = getZoneWorldPos("kansas");
  const tornadoRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (tornadoRef.current) {
      tornadoRef.current.rotation.y = t * 0.5;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Kansas farmhouse */}
      <group position={[6, 0, 2]}>
        {/* House base */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[4, 3, 3]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 3.5, 0]} castShadow>
          <coneGeometry args={[3.2, 2, 4]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0.8, 1.51]}>
          <boxGeometry args={[0.8, 1.6, 0.1]} />
          <meshStandardMaterial color="#4a3520" />
        </mesh>
        {/* Windows */}
        <mesh position={[-1, 1.8, 1.51]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[1, 1.8, 1.51]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Tornado (decorative, in the distance) */}
      <group ref={tornadoRef} position={[-12, 0, -5]}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0, i * 2 + 1, 0]}>
            <torusGeometry args={[0.5 + i * 0.4, 0.15, 8, 16]} />
            <meshStandardMaterial
              color="#555"
              transparent
              opacity={0.3 - i * 0.02}
            />
          </mesh>
        ))}
      </group>

      {/* Floating clouds */}
      <group ref={cloudsRef}>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[
              -10 + Math.random() * 20,
              12 + Math.random() * 5,
              -5 + Math.random() * 10,
            ]}
          >
            <sphereGeometry args={[2 + Math.random() * 2, 8, 6]} />
            <meshStandardMaterial
              color="#ddd"
              transparent
              opacity={0.7}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* Welcome sign with name */}
      <Billboard position={[0, 4, 3]} follow lockX={false} lockY={false} lockZ={false}>
        <Text
          fontSize={1.2}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000"
          font={undefined}
        >
          {contact.name}
        </Text>
      </Billboard>
      <Billboard position={[0, 2.8, 3]}>
        <Text
          fontSize={0.4}
          color="#50C878"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000"
        >
          Software Engineer · {contact.location}
        </Text>
      </Billboard>

      {/* "Follow the Yellow Brick Road" sign */}
      <group position={[-3, 0, -3]}>
        {/* Sign post */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
          <meshStandardMaterial color="#5c3a1e" />
        </mesh>
        {/* Sign board */}
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[2.5, 0.6, 0.1]} />
          <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
        </mesh>
        <Billboard position={[0, 2.8, 0.06]}>
          <Text fontSize={0.18} color="#FFD700" anchorX="center" anchorY="middle">
            Follow the Yellow Brick Road →
          </Text>
        </Billboard>
      </group>

      {/* Warm point light for Kansas zone */}
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#FFA500" distance={20} />
    </group>
  );
}
