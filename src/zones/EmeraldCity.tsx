import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { contact } from "../data/resume";

export default function EmeraldCity() {
  const pos = getZoneWorldPos("emeraldcity");
  const crystalsRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (crystalsRef.current) {
      crystalsRef.current.children.forEach((child, i) => {
        child.rotation.y = t * 0.1 + i;
      });
    }
    if (sparklesRef.current) {
      sparklesRef.current.children.forEach((child, i) => {
        child.position.y = 2 + Math.sin(t * 2 + i * 0.7) * 3;
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).opacity =
            0.3 + Math.sin(t * 3 + i) * 0.3;
        }
      });
    }
  });

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Towering emerald crystal structures */}
      <group ref={crystalsRef}>
        {/* Central tower */}
        <group position={[0, 0, -8]}>
          <mesh position={[0, 8, 0]} castShadow>
            <cylinderGeometry args={[1.5, 2.5, 16, 6]} />
            <meshStandardMaterial
              color="#50C878"
              emissive="#50C878"
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.5}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Spire */}
          <mesh position={[0, 18, 0]} castShadow>
            <coneGeometry args={[1.5, 4, 6]} />
            <meshStandardMaterial
              color="#2ecc71"
              emissive="#2ecc71"
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>

        {/* Flanking towers */}
        {[
          { x: -6, z: -6, h: 10, r: 1.2 },
          { x: 6, z: -6, h: 10, r: 1.2 },
          { x: -4, z: -10, h: 12, r: 1 },
          { x: 4, z: -10, h: 12, r: 1 },
          { x: -8, z: -9, h: 7, r: 0.8 },
          { x: 8, z: -9, h: 7, r: 0.8 },
        ].map((tower, i) => (
          <group key={i} position={[tower.x, 0, tower.z]}>
            <mesh position={[0, tower.h / 2, 0]} castShadow>
              <cylinderGeometry args={[tower.r * 0.6, tower.r, tower.h, 6]} />
              <meshStandardMaterial
                color="#3cb371"
                emissive="#3cb371"
                emissiveIntensity={0.2}
                roughness={0.3}
                metalness={0.4}
                transparent
                opacity={0.8}
              />
            </mesh>
            <mesh position={[0, tower.h + 1, 0]}>
              <coneGeometry args={[tower.r * 0.6, 2, 6]} />
              <meshStandardMaterial
                color="#50C878"
                emissive="#50C878"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Gate archway */}
      <group position={[0, 0, -2]}>
        {/* Left pillar */}
        <mesh position={[-2, 3, 0]} castShadow>
          <boxGeometry args={[1, 6, 1]} />
          <meshStandardMaterial
            color="#2ecc71"
            emissive="#2ecc71"
            emissiveIntensity={0.3}
            metalness={0.5}
          />
        </mesh>
        {/* Right pillar */}
        <mesh position={[2, 3, 0]} castShadow>
          <boxGeometry args={[1, 6, 1]} />
          <meshStandardMaterial
            color="#2ecc71"
            emissive="#2ecc71"
            emissiveIntensity={0.3}
            metalness={0.5}
          />
        </mesh>
        {/* Arch */}
        <mesh position={[0, 6.5, 0]}>
          <torusGeometry args={[2, 0.4, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color="#50C878"
            emissive="#50C878"
            emissiveIntensity={0.4}
            metalness={0.6}
          />
        </mesh>
      </group>

      {/* CONTACT section title */}
      <Billboard position={[0, 8, -3]}>
        <Text
          fontSize={0.7}
          color="#FFD700"
          anchorX="center"
          outlineWidth={0.05}
          outlineColor="#000"
        >
          🏰 THE EMERALD CITY
        </Text>
      </Billboard>
      <Billboard position={[0, 7.2, -3]}>
        <Text
          fontSize={0.3}
          color="#50C878"
          anchorX="center"
          outlineWidth={0.03}
          outlineColor="#000"
        >
          Connect with {contact.name}
        </Text>
      </Billboard>

      {/* Contact portal links */}
      {[
        { label: "📧 Email", url: `mailto:${contact.email}`, x: -4, color: "#FF6347" },
        { label: "💻 GitHub", url: contact.github, x: 0, color: "#9370DB" },
        { label: "🔗 LinkedIn", url: contact.linkedin, x: 4, color: "#4169E1" },
      ].map((link, i) => (
        <group key={i} position={[link.x, 2, -5]}>
          {/* Portal ring */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[1, 0.1, 8, 24]} />
            <meshStandardMaterial
              color={link.color}
              emissive={link.color}
              emissiveIntensity={0.6}
            />
          </mesh>
          {/* Portal fill */}
          <mesh>
            <circleGeometry args={[0.9, 24]} />
            <meshStandardMaterial
              color={link.color}
              emissive={link.color}
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Billboard position={[0, 0, 0.1]}>
            <Text
              fontSize={0.2}
              color="#FFF"
              anchorX="center"
              outlineWidth={0.02}
              outlineColor="#000"
              fontWeight="bold"
            >
              {link.label}
            </Text>
          </Billboard>
          <Billboard position={[0, -1.5, 0]}>
            <Text fontSize={0.1} color="rgba(255,255,255,0.5)" anchorX="center">
              {link.url.replace("mailto:", "").replace("https://", "")}
            </Text>
          </Billboard>
        </group>
      ))}

      {/* Emerald sparkle particles */}
      <group ref={sparklesRef}>
        {[...Array(30)].map((_, i) => (
          <mesh
            key={i}
            position={[
              -10 + Math.random() * 20,
              Math.random() * 15,
              -12 + Math.random() * 12,
            ]}
          >
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color="#50C878"
              emissive="#50C878"
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Strong emerald glow */}
      <pointLight position={[0, 12, -8]} intensity={2} color="#50C878" distance={50} />
      <pointLight position={[0, 3, -5]} intensity={0.8} color="#2ecc71" distance={20} />
    </group>
  );
}
