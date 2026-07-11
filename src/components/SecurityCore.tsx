"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { inSphere } from "maath/random";

// --- 常量配置 ---
const PARTICLE_COUNT = 4000; // 核心数据粒子数量
const CORE_RADIUS = 1.8;     // 核心半径
const PULSE_SPEED = 6.0;     // 脉冲波扩散速度
const EXPLOSION_FORCE = 8.0; // 粒子被摧毁时的击飞力度

interface Pulse {
  id: number;
  origin: THREE.Vector3;
  radius: number;
  opacity: number;
}

function DataMatrix() {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // 初始化粒子坐标和每个粒子的初始速度（用于击飞动画）
  const { positions, velocities } = useMemo(() => {
    const pos = inSphere(new Float32Array(PARTICLE_COUNT * 3), { radius: CORE_RADIUS }) as Float32Array;
    const vel = new Float32Array(PARTICLE_COUNT * 3).fill(0); // 初始速度为0
    return { positions: pos, velocities: vel };
  }, []);

  // 记录所有的脉冲波
  const [pulses, setPulses] = useState<Pulse[]>([]);

  // 监听点击，发射脉冲
  const handlePointerDown = (e: { point: THREE.Vector3; stopPropagation: () => void }) => {
    e.stopPropagation();
    const clickOrigin = e.point.clone();
    setPulses((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), origin: clickOrigin, radius: 0.1, opacity: 1 },
    ]);
  };

  useFrame((state, delta) => {
    // 1. 核心的基础自转与鼠标跟随
    if (pointsRef.current && meshRef.current) {
      const rotX = delta / 10;
      const rotY = delta / 15;

      pointsRef.current.rotation.x -= rotX;
      pointsRef.current.rotation.y -= rotY;
      meshRef.current.rotation.x += rotX * 2;
      meshRef.current.rotation.y += rotY * 2;

      // 矩阵整体轻微跟随鼠标偏移
      const targetX = state.pointer.x * 0.3;
      const targetY = state.pointer.y * 0.3;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.1);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.1);
      meshRef.current.position.x = pointsRef.current.position.x;
      meshRef.current.position.y = pointsRef.current.position.y;
    }

    // 2. 物理引擎：脉冲扩散与粒子击飞
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;
      let geometryNeedsUpdate = false;

      // 更新所有脉冲波的状态
      const activePulses = pulses
        .map((p) => ({
          ...p,
          radius: p.radius + delta * PULSE_SPEED, // 脉冲扩大
          opacity: p.opacity - delta * 0.8,       // 脉冲变淡
        }))
        .filter((p) => p.opacity > 0);

      if (activePulses.length !== pulses.length) {
        setPulses(activePulses);
      }

      // 遍历所有粒子，计算是否被脉冲波"摧毁"
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // 如果粒子已经被击飞（速度不为0），则继续让它飞
        if (velocities[i3] !== 0 || velocities[i3 + 1] !== 0 || velocities[i3 + 2] !== 0) {
          posArray[i3] += velocities[i3] * delta;
          posArray[i3 + 1] += velocities[i3 + 1] * delta;
          posArray[i3 + 2] += velocities[i3 + 2] * delta;
          geometryNeedsUpdate = true;
          continue;
        }

        // 获取粒子的当前世界坐标 (近似处理，忽略自转带来的微小偏移)
        const px = posArray[i3] + pointsRef.current.position.x;
        const py = posArray[i3 + 1] + pointsRef.current.position.y;
        const pz = posArray[i3 + 2] + pointsRef.current.position.z;
        const particlePos = new THREE.Vector3(px, py, pz);

        // 检测粒子是否触碰到了任何一个脉冲波
        for (const pulse of activePulses) {
          const dist = particlePos.distanceTo(pulse.origin);
          // 如果粒子在脉冲波的"冲击范围"内 (波峰附近)
          if (Math.abs(dist - pulse.radius) < 0.2) {
            // 计算击飞方向 (从脉冲中心向外)
            const dir = particlePos.clone().sub(pulse.origin).normalize();
            // 赋予粒子爆炸速度
            velocities[i3] = dir.x * EXPLOSION_FORCE * (Math.random() * 0.5 + 0.5);
            velocities[i3 + 1] = dir.y * EXPLOSION_FORCE * (Math.random() * 0.5 + 0.5);
            velocities[i3 + 2] = dir.z * EXPLOSION_FORCE * (Math.random() * 0.5 + 0.5);
            geometryNeedsUpdate = true;
            break;
          }
        }
      }

      if (geometryNeedsUpdate) {
        positionsAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* 用于捕获鼠标点击事件的隐形碰撞球体 (Raycaster Target) */}
      <mesh onPointerDown={handlePointerDown} visible={false}>
        <sphereGeometry args={[CORE_RADIUS + 0.2, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 核心内层网格结构 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[CORE_RADIUS * 0.7, 16, 16]} />
        <meshBasicMaterial color="#059669" wireframe transparent opacity={0.15} />
      </mesh>

      {/* 外层数据粒子云 */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#10b981"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 渲染视觉上的脉冲冲击波圆环 */}
      {pulses.map((pulse) => (
        <mesh key={pulse.id} position={pulse.origin}>
          <sphereGeometry args={[pulse.radius, 32, 32]} />
          <meshBasicMaterial
            color="#34d399"
            transparent
            opacity={pulse.opacity * 0.5}
            wireframe
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SecurityCore() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* 增加环境雾化，让被击飞的粒子飞远后渐渐消失在黑暗中 */}
      <fog attach="fog" args={["#0a0a0c", 3, 8]} />
      <DataMatrix />
    </Canvas>
  );
}
