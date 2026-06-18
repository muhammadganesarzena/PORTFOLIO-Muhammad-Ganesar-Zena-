/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import { easing } from "maath";

function LensScene({ imageUrl }: { imageUrl: string }) {
  const lensRef = useRef<THREE.Mesh>(null!);
  const buffer = useFBO();
  const [bgScene] = useState(() => new THREE.Scene());
  const { viewport } = useThree();
  const texture = useTexture(imageUrl);

  useFrame((state, delta) => {
    const { gl, viewport: vp, pointer, camera } = state;
    const v = vp.getCurrentViewport(camera, [0, 0, 15]);

    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    easing.damp3(lensRef.current.position, [destX, destY, 15], 0.1, delta);

    gl.setRenderTarget(buffer);
    gl.render(bgScene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <mesh scale={[viewport.width, viewport.height, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={texture} />
        </mesh>,
        bgScene
      )}

      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>

      <mesh
        ref={lensRef}
        scale={0.35}
        rotation-x={Math.PI / 2}
        position={[0, 0, 15]}
      >
        <cylinderGeometry args={[1, 1, 0.45, 64]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.18}
          thickness={5}
          anisotropy={0.05}
          chromaticAberration={0.12}
          transmission={1}
          roughness={0}
          color="#ffffff"
        />
      </mesh>
    </>
  );
}

export function FluidGlassLens({ imageUrl }: { imageUrl: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <LensScene imageUrl={imageUrl} />
    </Canvas>
  );
}
