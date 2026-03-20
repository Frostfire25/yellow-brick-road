import { Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import HUD from "./components/HUD";
import LoadingScreen from "./components/LoadingScreen";
import { useStore } from "./store/useStore";

export default function App() {
  const hasStarted = useStore((s) => s.hasStarted);
  const setHasStarted = useStore((s) => s.setHasStarted);
  const setIsLoading = useStore((s) => s.setIsLoading);

  const handleStart = useCallback(() => {
    setHasStarted(true);
    setIsLoading(false);
  }, [setHasStarted, setIsLoading]);

  if (!hasStarted) {
    return <LoadingScreen onStart={handleStart} />;
  }

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 70, near: 0.1, far: 500, position: [0, 2, 0] }}
        style={{ width: "100vw", height: "100vh" }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#87CEEB"]} />
        <fog attach="fog" args={["#87CEEB", 30, 150]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <HUD />
    </>
  );
}

