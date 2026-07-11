"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldAlert, Terminal, LockKeyhole, Smartphone, Cpu, Globe, Clock, Fingerprint, Wifi, Eye } from "lucide-react";

interface RealMetric {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: typeof Terminal;
  color: string;
  border: string;
  bg: string;
}

// 真实检测访问者浏览器环境
function detectEnvironment(): RealMetric[] {
  const ua = navigator.userAgent;
  const platform = navigator.platform || "unknown";
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isLinux = /Linux/i.test(platform) || /Linux/i.test(ua);
  const cores = navigator.hardwareConcurrency || 0;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const lang = navigator.language || "unknown";
  const online = navigator.onLine;
  const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // WebGL 指纹 (GPU 型号)
  let gpu = "unavailable";
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (gl) {
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbg) {
        gpu = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || "masked";
      } else {
        gpu = "masked (privacy)";
      }
    }
  } catch {
    gpu = "blocked";
  }

  // 隐身模式粗略探测 (storage 配额异常小) — 留待客户端 effect 异步更新
  const incognito = "browser probe";

  // root 相关: 只在 Android 上有意义
  const rootHint = isAndroid
    ? `Android ${ua.match(/Android\s+([\d.]+)/)?.[1] || "?"} — 需 APK 端检测`
    : isLinux
    ? "Linux 桌面 — 无 Android root 概念"
    : "非 Android 平台 — N/A";

  return [
    {
      id: "platform",
      title: "Device Platform",
      value: isAndroid ? "ANDROID" : isMobile ? "MOBILE" : platform.toUpperCase(),
      sub: `${ua.split(" ").slice(-2).join(" ")}`,
      icon: Smartphone,
      color: "text-emerald-500",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/10",
    },
    {
      id: "root",
      title: "Root Access",
      value: isAndroid ? "NEED APK" : "N/A",
      sub: rootHint,
      icon: Terminal,
      color: isAndroid ? "text-amber-400" : "text-zinc-500",
      border: isAndroid ? "border-amber-400/30" : "border-zinc-700/30",
      bg: isAndroid ? "bg-amber-950/10" : "bg-zinc-950/10",
    },
    {
      id: "hardware",
      title: "Hardware Cores",
      value: cores > 0 ? `${cores} threads` : "masked",
      sub: mem > 0 ? `${mem} GB device memory` : "memory masked",
      icon: Cpu,
      color: "text-cyan-400",
      border: "border-cyan-400/30",
      bg: "bg-cyan-950/10",
    },
    {
      id: "gpu",
      title: "GPU Renderer",
      value: gpu.length > 24 ? gpu.substring(0, 24) + "..." : gpu,
      sub: "WebGL UNMASKED_RENDERER",
      icon: Eye,
      color: "text-purple-400",
      border: "border-purple-400/30",
      bg: "bg-purple-950/10",
    },
    {
      id: "tz",
      title: "Timezone",
      value: tz,
      sub: `Language: ${lang}`,
      icon: Clock,
      color: "text-blue-400",
      border: "border-blue-400/30",
      bg: "bg-blue-950/10",
    },
    {
      id: "network",
      title: "Network",
      value: online ? "ONLINE" : "OFFLINE",
      sub: touch ? "Touch device" : "No touch",
      icon: Wifi,
      color: online ? "text-emerald-500" : "text-red-500",
      border: online ? "border-emerald-500/30" : "border-red-500/30",
      bg: online ? "bg-emerald-950/10" : "bg-red-950/10",
    },
    {
      id: "selinux",
      title: "SELinux Status",
      value: isAndroid ? "NEED APK" : "N/A",
      sub: isAndroid ? "需 /proc/self/attr 读取" : "非 Linux 内核",
      icon: LockKeyhole,
      color: "text-zinc-500",
      border: "border-zinc-700/30",
      bg: "bg-zinc-950/10",
    },
    {
      id: "fingerprint",
      title: "Browser Fingerprint",
      value: "COLLECTED",
      sub: `${ua.length} chars UA · ${navigator.languages?.length || 0} langs · ${incognito}`,
      icon: Fingerprint,
      color: "text-orange-500",
      border: "border-orange-500/30",
      bg: "bg-orange-950/10",
    },
  ];
}

export default function RootDashboard() {
  const [metrics, setMetrics] = useState<RealMetric[]>([]);
  const [scanTime, setScanTime] = useState(0);

  useEffect(() => {
    const start = performance.now();
    // 延迟一帧让入场动画先跑
    const id = requestAnimationFrame(() => {
      setMetrics(detectEnvironment());
      setScanTime(performance.now() - start);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto p-6 md:p-12 z-20 relative"
    >
      <div className="mb-8 border-b border-emerald-500/20 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-2">
            ROOT_<span className="text-emerald-500">CHECK</span> ENGINE
          </h1>
          <p className="text-emerald-500/60 tracking-widest text-sm">REAL ENVIRONMENT ANALYSIS · {scanTime.toFixed(0)}ms</p>
        </div>
        <div className="text-right hidden md:block text-xs text-emerald-500/40">
          v1.0.0-web<br />
          BROWSER PROBE MODE
        </div>
      </div>

      {/* 说明条 */}
      <div className="mb-6 p-4 rounded-lg border border-amber-500/20 bg-amber-950/5 text-xs text-amber-400/80 font-mono">
        ⚠ 浏览器环境受限: /proc、syscall、SELinux 等 Android 内核级检测需安装 APK 后在设备端运行。
        以下为浏览器可真实采集的环境指纹。完整 16 层检测请下载 APK。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-xl border ${metric.border} ${metric.bg} backdrop-blur-md p-5 group transition-colors min-h-[140px]`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={`${metric.color} opacity-80`} />
                  <h2 className="text-xs font-medium tracking-wide text-white/70 uppercase">{metric.title}</h2>
                </div>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${metric.color.replace("text-", "bg-")}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${metric.color.replace("text-", "bg-")}`}></span>
                </span>
              </div>

              <div>
                <div className={`text-xl font-bold tracking-tight ${metric.color} mb-1 truncate`}>
                  {metric.value}
                </div>
                <div className="text-[10px] text-white/40 font-mono truncate">
                  &gt; {metric.sub}
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-15 transition-opacity">
                <Icon size={80} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a
          href="https://github.com/mengjinghao/root-check/releases"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-8 py-3 border border-emerald-500/50 bg-emerald-950/30 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all font-bold tracking-wider"
        >
          <ShieldAlert size={16} /> 下载 APK 完整检测
        </a>
        <a
          href="https://github.com/mengjinghao/root-check"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-8 py-3 border border-zinc-600/50 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all font-bold tracking-wider"
        >
          VIEW SOURCE
        </a>
      </motion.div>
    </motion.div>
  );
}
