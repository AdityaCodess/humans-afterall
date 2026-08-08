'use client';

import React from 'react';
import { Activity, Cpu, Hexagon, Network, Radar, Settings2 } from 'lucide-react';

export default function SimulationHUD() {
  return (
    <div className="h-screen w-full bg-black text-zinc-300 font-sans overflow-hidden flex flex-col selection:bg-zinc-800">
      
      {/* Top Global Status Bar */}
      <header className="h-14 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-emerald-500" />
            <span className="font-black tracking-widest text-sm text-white">SPATIAL_OS</span>
          </div>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Engine Online
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Grid Load</span>
            <span className="font-mono text-sm text-white">24.8%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Active Entities</span>
            <span className="font-mono text-sm text-emerald-400">1,024</span>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="flex-1 w-full flex relative">
        
        {/* Left Toolbar - Build & Management */}
        <aside className="w-16 h-full border-r border-white/10 bg-zinc-950/50 backdrop-blur-md flex flex-col items-center py-6 gap-6 z-40">
          <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
            <Radar className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 text-zinc-600 hover:text-zinc-400 transition-all">
            <Network className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 text-zinc-600 hover:text-zinc-400 transition-all">
            <Cpu className="w-5 h-5" />
          </button>
        </aside>

        {/* Center Viewport - Reserved for Real-Time Graphics */}
        <section className="flex-1 h-full relative bg-zinc-900 overflow-hidden">
          {/* Grid Overlay Placeholder */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Target Reticle / Map Center Placeholder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="absolute top-0 w-[1px] h-4 bg-white/20" />
            <div className="absolute bottom-0 w-[1px] h-4 bg-white/20" />
            <div className="absolute left-0 w-4 h-[1px] bg-white/20" />
            <div className="absolute right-0 w-4 h-[1px] bg-white/20" />
          </div>

          {/* Environmental Readout */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span>X: 104.22</span>
            <span>Y: -45.91</span>
            <span>Z: 0.00</span>
          </div>
        </section>

        {/* Right Panel - Data & Telemetry */}
        <aside className="w-80 h-full border-l border-white/10 bg-zinc-950/80 backdrop-blur-md flex flex-col z-40 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Telemetry
            </h2>
            <Settings2 className="w-4 h-4 text-zinc-600" />
          </div>

          {/* Data Module 1 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Network Stability</span>
              <span className="text-xs font-mono text-white">99.9%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[99%]" />
            </div>
          </div>

          {/* Live Feed / Activity Log */}
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4 flex items-center gap-2">
              <Activity className="w-3 h-3" />
              Event Log
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 text-xs font-mono">
                  <span className="text-zinc-600 border-r border-white/10 pr-2">11:4{i}:00</span>
                  <span className="text-zinc-400">Vector node initialized.</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}