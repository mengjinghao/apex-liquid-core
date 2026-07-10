"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MERCURY_FRAGMENT_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    vec3 baseColor = vec3(0.7, 0.7, 0.75);
    vec3 highlight = vec3(0.9, 0.9, 1.0);
    vec3 color = mix(baseColor, highlight, fresnel);
    float ripple = sin(distance(vUv, uMouse) * 20.0 - uTime * 3.0);
    if (ripple > 0.98) { color += vec3(0.2, 0.2, 0.2); }
    gl_FragColor = vec4(color, 1.0);
  }
`;

function LiquidMirror() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(new THREE.Vector2((state.mouse.x + 1) / 2, (state.mouse.y + 1) / 2), 0.1);
    if (meshRef.current) {
      meshRef.current.rotation.y = state.mouse.x * 0.1;
      meshRef.current.rotation.x = -state.mouse.y * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 128, 128]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float uTime;
          uniform vec2 uMouse;
          void main() {
            vUv = uv;
            vNormal = normal;
            vec3 pos = position;
            float d = distance(uv, uMouse);
            pos += normal * sin(d * 10.0 - uTime * 2.0) * 0.15 * exp(-d * 3.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={MERCURY_FRAGMENT_SHADER}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export const MercurySurface = ({ onActivate }: { onActivate: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-0 bg-black overflow-hidden cursor-pointer"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      aria-label="点击进入主站"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); }
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <LiquidMirror />
      </Canvas>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 font-extralight tracking-[0.4em] text-[10px] uppercase pointer-events-none">
        Disturb the liquid to fold dimensions
      </div>
    </div>
  );
};

export default MercurySurface;
