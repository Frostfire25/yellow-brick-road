import { useMemo } from "react";
import { Text, Billboard, useGLTF, Float } from "@react-three/drei";
import { getZoneWorldPos } from "../components/Road";
import { education } from "../data/resume";

const BASE = import.meta.env.BASE_URL;

const MUSHROOM_MODELS = [
  "mushroom_red.glb", "mushroom_redTall.glb", "mushroom_redGroup.glb",
  "mushroom_tan.glb", "mushroom_tanTall.glb", "mushroom_tanGroup.glb",
];

function KenneyModel({ url, position, scale = 1, rotation = 0 }: {
  url: string; position: [number, number, number]; scale?: number; rotation?: number;
}) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} position={position} scale={scale} rotation={[0, rotation, 0]} castShadow />;
}

export default function Munchkinland() {
  const pos = getZoneWorldPos("munchkinland");

  return (
    <group position={[pos.x, 0, pos.z]}>
      {/* Giant Kenney mushroom houses */}
      {[
        { x: 8, z: 3, model: "mushroom_redTall.glb", scale: 6 },
        { x: -7, z: 2, model: "mushroom_tanTall.glb", scale: 5 },
        { x: 10, z: -3, model: "mushroom_red.glb", scale: 7 },
        { x: -9, z: -2, model: "mushroom_tan.glb", scale: 5.5 },
        { x: 6, z: -5, model: "mushroom_redGroup.glb", scale: 4 },
        { x: -5, z: 5, model: "mushroom_tanGroup.glb", scale: 4.5 },
      ].map((house, i) => (
        <KenneyModel
          key={i}
          url={`${BASE}models/nature/${house.model}`}
          position={[house.x, 0, house.z]}
          scale={house.scale}
          rotation={(i * 1.2)}
        />
      ))}

      {/* Kenney flowers around the mushrooms */}
      {[
        { model: "flower_purpleA.glb", x: 5, z: 5 },
        { model: "flower_redA.glb", x: -4, z: 4 },
        { model: "flower_yellowA.glb", x: 3, z: -4 },
        { model: "flower_purpleB.glb", x: -6, z: -3 },
        { model: "flower_redB.glb", x: 7, z: -1 },
        { model: "flower_yellowB.glb", x: -3, z: 1 },
        { model: "flower_purpleA.glb", x: 0, z: 6 },
        { model: "flower_redA.glb", x: 4, z: 7 },
      ].map((f, i) => (
        <KenneyModel
          key={`mf-${i}`}
          url={`${BASE}models/nature/${f.model}`}
          position={[f.x, 0, f.z]}
          scale={2}
          rotation={i * 0.8}
        />
      ))}

      {/* Kenney bushes */}
      <KenneyModel url={`${BASE}models/nature/plant_bushLarge.glb`} position={[-11, 0, 0]} scale={3} />
      <KenneyModel url={`${BASE}models/nature/plant_bush.glb`} position={[12, 0, 1]} scale={2.5} />
      <KenneyModel url={`${BASE}models/nature/plant_bushSmall.glb`} position={[0, 0, 7]} scale={2} />

      {/* Education info floating panels */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <group position={[0, 3.5, 0]}>
          <Billboard>
            <Text fontSize={0.6} color="#FFD700" anchorX="center" anchorY="middle" outlineWidth={0.04} outlineColor="#000">
              🎓 EDUCATION
            </Text>
          </Billboard>
        </group>
      </Float>

      <group position={[0, 2.5, 0]}>
        <Billboard>
          <Text fontSize={0.35} color="#FFFFFF" anchorX="center" anchorY="middle" outlineWidth={0.03} outlineColor="#000">
            {education.school}
          </Text>
        </Billboard>
      </group>

      <group position={[0, 2, 0]}>
        <Billboard>
          <Text fontSize={0.22} color="#50C878" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000">
            {education.degree}
          </Text>
        </Billboard>
      </group>

      <group position={[0, 1.6, 0]}>
        <Billboard>
          <Text fontSize={0.2} color="#FFD700" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000">
            GPA: {education.gpa} · {education.graduation} · {education.location}
          </Text>
        </Billboard>
      </group>

      <pointLight position={[0, 10, 0]} intensity={0.8} color="#FF69B4" distance={25} />
    </group>
  );
}

MUSHROOM_MODELS.forEach((m) => useGLTF.preload(`${BASE}models/nature/${m}`));
