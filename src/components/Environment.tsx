import { useMemo } from "react";
import * as THREE from "three";

// Ground plane and background environment for the Oz world
export default function Environment() {
  const grassTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Base green
    ctx.fillStyle = "#2d8a2d";
    ctx.fillRect(0, 0, 256, 256);

    // Grass variation
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const green = 80 + Math.random() * 80;
      ctx.fillStyle = `rgb(${20 + Math.random() * 30}, ${green}, ${10 + Math.random() * 20})`;
      ctx.fillRect(x, y, 1 + Math.random() * 2, 3 + Math.random() * 5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(80, 80);
    return texture;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -90]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial map={grassTexture} color="#3a8a3a" roughness={0.9} />
      </mesh>

      {/* Distant hills */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 120 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const z = -90 + Math.sin(angle) * radius;
        const scale = 15 + Math.random() * 25;
        return (
          <mesh key={i} position={[x, scale * 0.3, z]}>
            <sphereGeometry args={[scale, 8, 6]} />
            <meshStandardMaterial color="#1a6b1a" roughness={1} flatShading />
          </mesh>
        );
      })}

      {/* Scattered trees along the road */}
      {[...Array(60)].map((_, i) => {
        const z = -5 - Math.random() * 175;
        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (6 + Math.random() * 25);
        const height = 3 + Math.random() * 4;
        return (
          <group key={`tree-${i}`} position={[x, 0, z]}>
            {/* Trunk */}
            <mesh position={[0, height / 2, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.25, height, 6]} />
              <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
            </mesh>
            {/* Canopy */}
            <mesh position={[0, height + 1, 0]} castShadow>
              <sphereGeometry args={[1.5 + Math.random(), 8, 6]} />
              <meshStandardMaterial
                color={`hsl(${110 + Math.random() * 30}, ${50 + Math.random() * 30}%, ${25 + Math.random() * 15}%)`}
                roughness={0.8}
                flatShading
              />
            </mesh>
          </group>
        );
      })}

      {/* Flowers scattered in grass */}
      {[...Array(100)].map((_, i) => {
        const z = -Math.random() * 180;
        const x = -30 + Math.random() * 60;
        const colors = ["#FF69B4", "#FF6347", "#FFD700", "#9370DB", "#FF4500", "#00CED1"];
        return (
          <mesh
            key={`flower-${i}`}
            position={[x, 0.3, z]}
          >
            <sphereGeometry args={[0.15 + Math.random() * 0.1, 6, 4]} />
            <meshStandardMaterial
              color={colors[Math.floor(Math.random() * colors.length)]}
              emissive={colors[Math.floor(Math.random() * colors.length)]}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
