import { useRef, useEffect, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls as DreiPointerLock } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../store/useStore";
import { roadSpline } from "./Road";

const MOVE_SPEED = 8;
const PLAYER_HEIGHT = 2;

export default function Controls() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const isAutoWalking = useStore((s) => s.isAutoWalking);
  const setLocked = useStore((s) => s.setLocked);
  const autoWalkT = useRef(0);

  // Movement keys state
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        keys.current.forward = true;
        break;
      case "KeyS":
      case "ArrowDown":
        keys.current.backward = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        keys.current.left = true;
        break;
      case "KeyD":
      case "ArrowRight":
        keys.current.right = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        keys.current.forward = false;
        break;
      case "KeyS":
      case "ArrowDown":
        keys.current.backward = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        keys.current.left = false;
        break;
      case "KeyD":
      case "ArrowRight":
        keys.current.right = false;
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useFrame((_, delta) => {
    if (isAutoWalking) {
      // Auto-walk along the spline
      autoWalkT.current = Math.min(autoWalkT.current + delta * 0.02, 1);
      const point = roadSpline.getPointAt(autoWalkT.current);
      const lookAhead = roadSpline.getPointAt(
        Math.min(autoWalkT.current + 0.01, 1)
      );

      camera.position.set(point.x, PLAYER_HEIGHT, point.z);
      camera.lookAt(lookAhead.x, PLAYER_HEIGHT, lookAhead.z);
      return;
    }

    // Manual WASD movement
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(
      0,
      0,
      Number(keys.current.backward) - Number(keys.current.forward)
    );
    const sideVector = new THREE.Vector3(
      Number(keys.current.left) - Number(keys.current.right),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED * delta)
      .applyEuler(camera.rotation);

    // Keep player on the ground
    direction.y = 0;

    camera.position.add(direction);
    camera.position.y = PLAYER_HEIGHT;

    // Soft-constrain to near the road
    const closest = roadSpline.getPointAt(
      findClosestT(camera.position, roadSpline)
    );
    const distFromRoad = camera.position.distanceTo(
      new THREE.Vector3(closest.x, camera.position.y, closest.z)
    );
    if (distFromRoad > 12) {
      const pullback = new THREE.Vector3()
        .subVectors(
          new THREE.Vector3(closest.x, PLAYER_HEIGHT, closest.z),
          camera.position
        )
        .normalize()
        .multiplyScalar(0.1);
      camera.position.add(pullback);
    }
  });

  return (
    <DreiPointerLock
      ref={controlsRef}
      onLock={() => setLocked(true)}
      onUnlock={() => setLocked(false)}
    />
  );
}

// Find the closest t parameter on the spline to a given position
function findClosestT(
  pos: THREE.Vector3,
  spline: THREE.CatmullRomCurve3,
  steps = 50
): number {
  let closestT = 0;
  let closestDist = Infinity;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const point = spline.getPointAt(t);
    const dist = pos.distanceTo(point);
    if (dist < closestDist) {
      closestDist = dist;
      closestT = t;
    }
  }
  return closestT;
}
