import Road from "./Road";
import Controls from "./Controls";
import Kansas from "../zones/Kansas";
import Munchkinland from "../zones/Munchkinland";
import Scarecrow from "../zones/Scarecrow";
import TinMan from "../zones/TinMan";
import Lion from "../zones/Lion";
import EmeraldCity from "../zones/EmeraldCity";
import Environment from "./Environment";

export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[20, 40, -30]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <hemisphereLight
        args={["#87CEEB", "#228B22", 0.3]}
      />

      {/* Environment */}
      <Environment />

      {/* The Yellow Brick Road */}
      <Road />

      {/* Controls */}
      <Controls />

      {/* Zones along the road */}
      <Kansas />
      <Munchkinland />
      <Scarecrow />
      <TinMan />
      <Lion />
      <EmeraldCity />
    </>
  );
}
