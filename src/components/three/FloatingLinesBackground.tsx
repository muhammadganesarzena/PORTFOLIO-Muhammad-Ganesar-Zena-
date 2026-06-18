/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
precision highp float;
void main() {
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t) {
  if (lineGradientCount <= 0) {
    return vec3(1.0);
  }
  if (lineGradientCount == 1) {
    return lineGradient[0];
  }
  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled   = clampedT * float(lineGradientCount - 1);
  int   idx      = int(floor(scaled));
  float f        = fract(scaled);
  int   idx2     = min(idx + 1, lineGradientCount - 1);
  return mix(lineGradient[idx], lineGradient[idx2], f) * 0.5;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time       = iTime * animationSpeed;
  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2  d          = screenUv - mouseUv;
    float influence  = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  if (enableBottom) {
    for (int i = 0; i < 32; ++i) {
      if (i >= bottomLineCount) break;
      float fi = float(i);
      float t  = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2  ruv   = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < 32; ++i) {
      if (i >= middleLineCount) break;
      float fi = float(i);
      float t  = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2  ruv   = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi, baseUv, mouseUv, interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < 32; ++i) {
      if (i >= topLineCount) break;
      float fi = float(i);
      float t  = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2  ruv   = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const h = hex.replace("#", "");
  return new THREE.Vector3(
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  );
}

const GRADIENT = ["#000000", "#4b5563", "#ffffff", "#000000"];
const MAX_STOPS = 8;

export function FloatingLinesBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const targetMouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const influenceRef = useRef(0);
  const targetInfluenceRef = useRef(0);
  const parallaxRef = useRef(new THREE.Vector2(0, 0));
  const targetParallaxRef = useRef(new THREE.Vector2(0, 0));

  const { gl } = useThree();

  // Build gradient uniform array
  const gradientStops = GRADIENT.slice(0, MAX_STOPS).map(hexToVec3);
  const gradientPadded = [
    ...gradientStops,
    ...Array(MAX_STOPS - gradientStops.length).fill(new THREE.Vector3(1, 1, 1)),
  ];

  useEffect(() => {
    const canvas = gl.domElement;
    const dpr = gl.getPixelRatio();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      targetParallaxRef.current.set(
        ((x - cx) / rect.width) * 0.2,
        (-(y - cy) / rect.height) * 0.2
      );
    };
    const onLeave = () => { targetInfluenceRef.current = 0; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.iTime.value = clock.getElapsedTime();

    const w = gl.domElement.width;
    const h = gl.domElement.height;
    u.iResolution.value.set(w, h, 1);

    // smooth mouse
    const damp = 0.05;
    mouseRef.current.lerp(targetMouseRef.current, damp);
    u.iMouse.value.copy(mouseRef.current);
    influenceRef.current += (targetInfluenceRef.current - influenceRef.current) * damp;
    u.bendInfluence.value = influenceRef.current;

    // parallax
    parallaxRef.current.lerp(targetParallaxRef.current, damp);
    u.parallaxOffset.value.copy(parallaxRef.current);
  });

  const uniforms = {
    iTime:        { value: 0 },
    iResolution:  { value: new THREE.Vector3(1, 1, 1) },
    animationSpeed: { value: 4.7 },

    enableTop:    { value: true },
    enableMiddle: { value: true },
    enableBottom: { value: true },

    topLineCount:    { value: 9 },
    middleLineCount: { value: 9 },
    bottomLineCount: { value: 9 },

    topLineDistance:    { value: 62 * 0.01 },
    middleLineDistance: { value: 62 * 0.01 },
    bottomLineDistance: { value: 62 * 0.01 },

    topWavePosition:    { value: new THREE.Vector3(10.0, 0.5, -0.4) },
    middleWavePosition: { value: new THREE.Vector3(5.0, 0.0, 0.2) },
    bottomWavePosition: { value: new THREE.Vector3(2.0, -0.7, -1.0) },

    iMouse:        { value: new THREE.Vector2(-1000, -1000) },
    interactive:   { value: true },
    bendRadius:    { value: 21.0 },
    bendStrength:  { value: 12.5 },
    bendInfluence: { value: 0 },

    parallax:         { value: true },
    parallaxStrength: { value: 0.2 },
    parallaxOffset:   { value: new THREE.Vector2(0, 0) },

    lineGradient:      { value: gradientPadded },
    lineGradientCount: { value: gradientStops.length },
  };

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        transparent={true}
        uniforms={uniforms}
      />
    </mesh>
  );
}
