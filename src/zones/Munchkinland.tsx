import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { getZoneWorldPos } from "../components/Road";
import { education } from "../data/resume";

export default function Munchkinland() {
  const pos = getZoneWorldPos("munchkinland");
  const flowersRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (flowersRef.current) {
      flowersRef.current.children.forEach((child, i) => {
        child.position.y =
          0.3 + Math.sin(clock.getElapsedTime() * 2 + i) * 0.1;
      });
    }
  });

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Colorful mushroom houses */}
      {[
        { x: 8, z: 3, color: "#FF69B4", scale: 1.2 },
        { x: -7, z: 2, color: "#9370DB", scale: 1 },
        { x: 10, z: -3, color: "#FF6347", scale: 0.8 },
        { x: -9, z: -2, color: "#00CED1", scale: 1.1 },
      ].map((house, i) => (
        <group key={i} position={[house.x, 0, house.z]} scale={house.scale}>
          {/* Stem */}
          <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.6, 2, 8]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
          </mesh>
          {/* Cap */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <sphereGeometry args={[1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={house.color} roughness={0.6} />
          </mesh>
          {/* Dots */}
          {[...Array(5)].map((_, j) => {
            const angle = (j / 5) * Math.PI * 2;
            return (
              <mesh
                key={j}
                position={[Math.cos(angle) * 1, 2.8, Math.sin(angle) * 1]}
              >
                <sphereGeometry args={[0.15, 6, 4]} />
                <meshStandardMaterial color="white" />
              </mesh>
            );
          })}
          {/* Door */}
          <mesh position={[0, 0.5, 0.61]}>
            <boxGeometry args={[0.4, 0.8, 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>
      ))}

      {/* Education info floating panels */}
      <group position={[0, 3.5, 0]}>
        <Billboard>
          <Text
            fontSize={0.6}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#000"
          >
            🎓 EDUCATION
          </Text>
        </Billboard>
      </group>

      <group position={[0, 2.5, 0]}>
        <Billboard>
          <Text
            fontSize={0.35}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000"
          >
            {education.school}
          </Text>
        </Billboard>
      </group>

      <group position={[0, 2, 0]}>
        <Billboard>
          <Text
            fontSize={0.22}
            color="#50C878"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000"
          >
            {education.degree}
          </Text>
        </Billboard>
      </group>

      <group position={[0, 1.6, 0]}>
        <Billboard>
          <Text
            fontSize={0.2}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000"
          >
            GPA: {education.gpa} · {education.graduation} · {education.location}
          </Text>
        </Billboard>
      </group>

      {/* Animated flowers */}
      <group ref={flowersRef}>
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const r = 4 + Math.random() * 2;
          const colors = ["#FF69B4", "#FFD700", "#FF6347", "#9370DB", "#00CED1"];
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, 0.3, Math.sin(angle) * r]}
            >
              <sphereGeometry args={[0.2, 6, 4]} />
              <meshStandardMaterial
                color={colors[i % colors.length]}
                emissive={colors[i % colors.length]}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Munchkinland light */}
      <pointLight
        position={[0, 10, 0]}
        intensity={0.8}
        color="#FF69B4"
        distance={25}
      />
    </group>
  );
}
