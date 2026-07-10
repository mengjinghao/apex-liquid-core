"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MERCURY_FRAGMENT = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    // 模拟铬金属环境反射 (Pseudo Chrome)
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float fresnel = pow(1.2 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);

    // 基础钛金色与极光白混合
    vec3 baseColor = vec3(0.6, 0.6, 0.65);
    vec3 highlight = vec3(1.0, 1.0, 1.0);
    vec3 color = mix(baseColor, highlight, fresnel);

    // 鼠标点击产生的液体扰动视觉反馈
    float dist = distance(vUv, uMouse);
    float ripple = sin(dist * 30.0 - uTime * 5.0) * exp(-dist * 4.0);
    color += ripple * 0.15;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const MERCURY_VERTEX = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 pos = position;

    // 动态流体波动逻辑
    float d = distance(uv, uMouse);
    float wave = sin(d * 15.0 - uTime * 3.0) * 0.12 * exp(-d * 3.0);
    pos += normal * wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

function LiquidBall() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(
      new THREE.Vector2((state.mouse.x + 1) / 2, (state.mouse.y + 1) / 2),
      0.1
    );
    if (meshRef.current) {
      meshRef.current.rotation.y = state.mouse.x * 0.15;
      meshRef.current.rotation.x = -state.mouse.y * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 128, 128]} />
      <shaderMaterial
        fragmentShader={MERCURY_FRAGMENT}
        vertexShader={MERCURY_VERTEX}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export const MercurySurface = ({ onActivate }: { onActivate: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-0 bg-black cursor-pointer"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      aria-label="点击液态汞折叠现实"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); }
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <LiquidBall />
      </Canvas>
      <div className="absolute bottom-12 w-full text-center pointer-events-none">
        <p className="text-zinc-600 font-mono text-[9px] tracking-[1em] uppercase animate-pulse">
          Click liquid to fold reality
        </p>
      </div>
    </div>
  );
};

export default MercurySurface;
