import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import HUD from "./components/HUD";
import WelcomeModal from "./components/WelcomeModal";

export default function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 70, near: 0.1, far: 500, position: [0, 2, 0] }}
        style={{ width: "100vw", height: "100vh" }}
        gl={{ antialias: true, alpha: false }}
      >
        <fog attach="fog" args={["#87CEEB", 40, 180]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <WelcomeModal />
      <HUD />
    </>
  );
}

