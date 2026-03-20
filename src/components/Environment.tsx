import { useMemo } from "react";
import { useGLTF, Sky, Cloud } from "@react-three/drei";
import * as THREE from "three";

const BASE = import.meta.env.BASE_URL;

const TREE_MODELS = [
  "tree_oak.glb", "tree_detailed.glb", "tree_default.glb",
  "tree_fat.glb", "tree_pineRoundA.glb", "tree_pineRoundB.glb",
  "tree_pineTallA.glb", "tree_tall.glb", "tree_thin.glb", "tree_cone.glb",
];
const FLOWER_MODELS = [
  "flower_purpleA.glb", "flower_redA.glb", "flower_yellowA.glb",
  "flower_purpleB.glb", "flower_redB.glb", "flower_yellowB.glb",
];
const ROCK_MODELS = ["rock_largeA.glb", "rock_largeB.glb", "rock_smallA.glb", "rock_smallB.glb"];
const BUSH_MODELS = ["plant_bush.glb", "plant_bushLarge.glb", "plant_bushSmall.glb"];
const GRASS_MODELS = ["grass.glb", "grass_large.glb", "grass_leafs.glb"];

// Seeded random for deterministic placement
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function KenneyModel({ url, position, scale = 1, rotation = 0 }: {
  url: string; position: [number, number, number]; scale?: number; rotation?: number;
}) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive
      object={clone}
      position={position}
      scale={scale}
      rotation={[0, rotation, 0]}
      castShadow
    />
  );
}

// Grass ground texture
function Ground() {
  const grassTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#2d8a2d";
    ctx.fillRect(0, 0, 256, 256);
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -90]} receiveShadow>
      <planeGeometry args={[400, 400]} />
      <meshStandardMaterial map={grassTexture} color="#3a8a3a" roughness={0.9} />
    </mesh>
  );
}

export default function Environment() {
  const rand = useMemo(() => seededRandom(42), []);

  // Pre-generate placement data
  const trees = useMemo(() => {
    const items: { model: string; x: number; z: number; scale: number; rot: number }[] = [];
    for (let i = 0; i < 50; i++) {
      const z = -5 - rand() * 175;
      const side = rand() > 0.5 ? 1 : -1;
      const x = side * (7 + rand() * 25);
      const model = TREE_MODELS[Math.floor(rand() * TREE_MODELS.length)];
      items.push({ model, x, z, scale: 1.5 + rand() * 2, rot: rand() * Math.PI * 2 });
    }
    return items;
  }, [rand]);

  const flowers = useMemo(() => {
    const items: { model: string; x: number; z: number; scale: number; rot: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const z = -rand() * 180;
      const x = -25 + rand() * 50;
      const model = FLOWER_MODELS[Math.floor(rand() * FLOWER_MODELS.length)];
      items.push({ model, x, z, scale: 1 + rand() * 1.5, rot: rand() * Math.PI * 2 });
    }
    return items;
  }, [rand]);

  const rocks = useMemo(() => {
    const items: { model: string; x: number; z: number; scale: number; rot: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const z = -rand() * 180;
      const side = rand() > 0.5 ? 1 : -1;
      const x = side * (5 + rand() * 30);
      const model = ROCK_MODELS[Math.floor(rand() * ROCK_MODELS.length)];
      items.push({ model, x, z, scale: 0.8 + rand() * 1.5, rot: rand() * Math.PI * 2 });
    }
    return items;
  }, [rand]);

  const bushes = useMemo(() => {
    const items: { model: string; x: number; z: number; scale: number; rot: number }[] = [];
    for (let i = 0; i < 30; i++) {
      const z = -rand() * 180;
      const x = -20 + rand() * 40;
      const model = BUSH_MODELS[Math.floor(rand() * BUSH_MODELS.length)];
      items.push({ model, x, z, scale: 1 + rand() * 2, rot: rand() * Math.PI * 2 });
    }
    return items;
  }, [rand]);

  const grasses = useMemo(() => {
    const items: { model: string; x: number; z: number; scale: number; rot: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const z = -rand() * 180;
      const x = -20 + rand() * 40;
      const model = GRASS_MODELS[Math.floor(rand() * GRASS_MODELS.length)];
      items.push({ model, x, z, scale: 1 + rand() * 1, rot: rand() * Math.PI * 2 });
    }
    return items;
  }, [rand]);

  return (
    <group>
      {/* Realistic sky with sun */}
      <Sky
        distance={450000}
        sunPosition={[100, 40, -100]}
        inclination={0.5}
        azimuth={0.25}
        rayleigh={0.5}
        turbidity={8}
      />

      {/* Volumetric clouds */}
      <Cloud position={[-20, 25, -30]} speed={0.2} opacity={0.6} segments={20} />
      <Cloud position={[15, 30, -60]} speed={0.15} opacity={0.5} segments={15} />
      <Cloud position={[-10, 28, -100]} speed={0.1} opacity={0.4} segments={18} />
      <Cloud position={[25, 22, -140]} speed={0.18} opacity={0.5} segments={12} />

      {/* Ground */}
      <Ground />

      {/* Distant hills */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 120 + (i * 7) % 30;
        const x = Math.cos(angle) * radius;
        const z = -90 + Math.sin(angle) * radius;
        const scl = 15 + (i * 13) % 25;
        return (
          <mesh key={i} position={[x, scl * 0.3, z]}>
            <sphereGeometry args={[scl, 8, 6]} />
            <meshStandardMaterial color="#1a6b1a" roughness={1} flatShading />
          </mesh>
        );
      })}

      {/* Kenney trees */}
      {trees.map((t, i) => (
        <KenneyModel
          key={`tree-${i}`}
          url={`${BASE}models/nature/${t.model}`}
          position={[t.x, 0, t.z]}
          scale={t.scale}
          rotation={t.rot}
        />
      ))}

      {/* Kenney flowers */}
      {flowers.map((f, i) => (
        <KenneyModel
          key={`flower-${i}`}
          url={`${BASE}models/nature/${f.model}`}
          position={[f.x, 0, f.z]}
          scale={f.scale}
          rotation={f.rot}
        />
      ))}

      {/* Kenney rocks */}
      {rocks.map((r, i) => (
        <KenneyModel
          key={`rock-${i}`}
          url={`${BASE}models/nature/${r.model}`}
          position={[r.x, 0, r.z]}
          scale={r.scale}
          rotation={r.rot}
        />
      ))}

      {/* Kenney bushes */}
      {bushes.map((b, i) => (
        <KenneyModel
          key={`bush-${i}`}
          url={`${BASE}models/nature/${b.model}`}
          position={[b.x, 0, b.z]}
          scale={b.scale}
          rotation={b.rot}
        />
      ))}

      {/* Kenney grass tufts */}
      {grasses.map((g, i) => (
        <KenneyModel
          key={`grass-${i}`}
          url={`${BASE}models/nature/${g.model}`}
          position={[g.x, 0, g.z]}
          scale={g.scale}
          rotation={g.rot}
        />
      ))}
    </group>
  );
}

// Preload all models
[...TREE_MODELS, ...FLOWER_MODELS, ...ROCK_MODELS, ...BUSH_MODELS, ...GRASS_MODELS].forEach((m) => {
  useGLTF.preload(`${BASE}models/nature/${m}`);
});
