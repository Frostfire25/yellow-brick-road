import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore, ZONE_ORDER, type ZoneName } from "../store/useStore";

// Road control points defining the winding path through all zones
const ROAD_POINTS = [
  new THREE.Vector3(0, 0, 0),       // Kansas start
  new THREE.Vector3(0, 0, -15),
  new THREE.Vector3(5, 0, -30),      // Munchkinland
  new THREE.Vector3(3, 0, -50),
  new THREE.Vector3(-5, 0, -65),     // Scarecrow
  new THREE.Vector3(-8, 0, -85),
  new THREE.Vector3(0, 0, -100),     // Tin Man
  new THREE.Vector3(5, 0, -120),
  new THREE.Vector3(2, 0, -135),     // Lion
  new THREE.Vector3(-3, 0, -155),
  new THREE.Vector3(0, 0, -170),     // Emerald City
  new THREE.Vector3(0, 0, -185),
];

export const roadSpline = new THREE.CatmullRomCurve3(ROAD_POINTS);

// Zone positions along the road (t values from 0 to 1)
export const ZONE_POSITIONS: Record<ZoneName, number> = {
  kansas: 0.0,
  munchkinland: 0.18,
  scarecrow: 0.36,
  tinman: 0.54,
  lion: 0.72,
  emeraldcity: 0.91,
};

// Get the world position of a zone
export function getZoneWorldPos(zone: ZoneName): THREE.Vector3 {
  return roadSpline.getPointAt(ZONE_POSITIONS[zone]);
}

// Yellow brick texture (procedural)
function createBrickTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // Base gold color
  ctx.fillStyle = "#DAA520";
  ctx.fillRect(0, 0, 256, 256);

  const brickW = 32;
  const brickH = 16;
  const gap = 2;

  for (let row = 0; row < 256 / brickH; row++) {
    const offset = row % 2 === 0 ? 0 : brickW / 2;
    for (let col = -1; col < 256 / brickW + 1; col++) {
      const x = col * brickW + offset;
      const y = row * brickH;

      // Slight color variation per brick
      const shade = 180 + Math.random() * 40;
      ctx.fillStyle = `rgb(${shade + 30}, ${shade}, ${shade - 60})`;
      ctx.fillRect(x + gap, y + gap, brickW - gap * 2, brickH - gap * 2);

      // Subtle highlight
      ctx.fillStyle = "rgba(255,255,200,0.1)";
      ctx.fillRect(x + gap, y + gap, brickW - gap * 2, 2);
    }
  }

  // Mortar color in gaps
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "#8B7355";
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 8);
  return texture;
}

export default function Road() {
  const meshRef = useRef<THREE.Mesh>(null);
  const setCurrentZone = useStore((s) => s.setCurrentZone);

  const brickTexture = useMemo(() => createBrickTexture(), []);

  // Create road geometry from spline
  const roadGeometry = useMemo(() => {
    const points = roadSpline.getPoints(200);

    // Create a flat ribbon along the spline
    const shape = new THREE.Shape();
    shape.moveTo(-3, 0);
    shape.lineTo(3, 0);
    shape.lineTo(3, 0.05);
    shape.lineTo(-3, 0.05);
    shape.closePath();

    // Use a simple tube-like approach: generate flat quads along the path
    const geometry = new THREE.BufferGeometry();
    const width = 4;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i < points.length; i++) {
      const t = i / (points.length - 1);
      const point = roadSpline.getPointAt(t);
      const tangent = roadSpline.getTangentAt(t);

      // Right vector (perpendicular to tangent in XZ plane)
      const right = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const left = point.clone().add(right.clone().multiplyScalar(-width / 2));
      const rightPt = point.clone().add(right.clone().multiplyScalar(width / 2));

      positions.push(left.x, 0.02, left.z);
      positions.push(rightPt.x, 0.02, rightPt.z);

      uvs.push(0, t * 20);
      uvs.push(1, t * 20);

      if (i < points.length - 1) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Determine current zone based on camera position
  useFrame(({ camera }) => {
    const camPos = camera.position;
    let closestZone: ZoneName = "kansas";
    let closestDist = Infinity;

    for (const zone of ZONE_ORDER) {
      const zonePos = getZoneWorldPos(zone);
      const dist = camPos.distanceTo(zonePos);
      if (dist < closestDist) {
        closestDist = dist;
        closestZone = zone;
      }
    }
    setCurrentZone(closestZone);
  });

  return (
    <group>
      {/* Main yellow brick road */}
      <mesh ref={meshRef} geometry={roadGeometry} receiveShadow>
        <meshStandardMaterial
          map={brickTexture}
          roughness={0.7}
          metalness={0.1}
          color="#FFD700"
        />
      </mesh>

      {/* Road edges / curbs */}
      <mesh position={[0, 0.01, 0]} geometry={roadGeometry}>
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.9}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
