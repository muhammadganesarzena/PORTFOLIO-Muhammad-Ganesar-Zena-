/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}
float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}
float displaceA(float coord, float t) {
  float r = sin(coord * 2.123) * 0.2;
  r += sin(coord * 3.234 + t * 4.345) * 0.1;
  r += sin(coord * 0.589 + t * 0.934) * 0.5;
  return r;
}
float displaceB(float coord, float t) {
  float r = sin(coord * 1.345) * 0.3;
  r += sin(coord * 2.734 + t * 3.345) * 0.2;
  r += sin(coord * 0.189 + t * 0.934) * 0.3;
  return r;
}
vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution;
  coords = coords * 2.0 - 1.0;
  coords.x *= uResolution.x / uResolution.y;
  coords = rotate2D(coords, -0.7854);

  float speed  = 0.3;
  float halfT  = uTime * speed * 0.5;
  float fullT  = uTime * speed;

  vec2 mPos    = rotate2D(uMouse * 2.0 - 1.0, -0.7854);
  mPos.x      *= uResolution.x / uResolution.y;
  float mDist  = length(coords - mPos);
  float mWarp  = 2.0 * exp(-mDist * mDist * 4.0);

  float warpAx = coords.x + displaceA(coords.y, halfT) + mWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT);
  float warpBx = coords.x + displaceB(coords.y, halfT) + mWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT);

  vec2 bld     = mix(vec2(warpAx, warpAy), vec2(warpBx, warpBy), 0.5);

  float inner  = 32.0;
  float outer  = 36.0;
  float scaledY = bld.y * mix(outer, inner, 1.0);
  float nY      = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - bld.x) * 2.0, HALF_PI) * cos(2.0 * (nY - bld.x)),
    5.0
  );
  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern  = lines;
  float cycleT   = fullT * 1.0;
  float rChannel = (pattern + lines * ridge) * (cos(bld.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + ridge)         * (sin(bld.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(bld.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 c1 = vec3(0.024, 0.714, 0.831);
  vec3 c2 = vec3(0.231, 0.510, 0.965);
  vec3 c3 = vec3(0.545, 0.361, 0.965);

  vec3 col = (rChannel * c1 + gChannel * c2 + bChannel * c3) * 0.18;
  float alpha = clamp(length(col) * 3.5, 0.0, 0.85);
  gl_FragColor = vec4(col, alpha);
}
`;

export function LineWavesBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const targetRef = useRef<[number, number]>([0.5, 0.5]);

  const { gl, size } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      ];
    };
    const onLeave = () => { targetRef.current = [0.5, 0.5]; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [gl]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
    mouseRef.current[0] += 0.05 * (targetRef.current[0] - mouseRef.current[0]);
    mouseRef.current[1] += 0.05 * (targetRef.current[1] - mouseRef.current[1]);
    matRef.current.uniforms.uMouse.value.set(mouseRef.current[0], mouseRef.current[1]);
  });

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        depthTest={false}
        uniforms={{
          uTime:       { value: 0 },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
        }}
      />
    </mesh>
  );
}
