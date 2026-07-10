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
    vec3 baseColor = vec3(0.6, 0.6, 0.68);
    vec3 highlight = vec3(0.95, 0.95, 1.0);
    vec3 color = mix(baseColor, highlight, fresnel);
    float dist = distance(vUv, uMouse);
    float ripple = sin(dist * 25.0 - uTime * 4.0) * exp(-dist * 4.0);
    color += ripple * 0.15;
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
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.8, 128, 128]} />
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
            pos += normal * sin(d * 15.0 - uTime * 2.5) * 0.15 * exp(-d * 2.0);
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
      className="fixed inset-0 z-0 bg-black overflow-hidden cursor-crosshair"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      aria-label="点击进入主站"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); }
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <LiquidMirror />
      </Canvas>

      {/* 顶部标题 */}
      <div className="absolute top-20 w-full text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-100 select-none">
          APEX<span className="text-zinc-500">.CORE</span>
        </h1>
        <p className="text-[10px] text-zinc-600 tracking-[0.6em] uppercase font-mono mt-3">
          Encrypted Liquid Interface
        </p>
      </div>

      <div className="absolute bottom-16 w-full text-center animate-pulse text-zinc-600 font-mono text-[10px] tracking-[0.6em] uppercase pointer-events-none">
        Phase: Liquid State // Click to Transmit
      </div>
    </div>
  );
};

export default MercurySurface;
