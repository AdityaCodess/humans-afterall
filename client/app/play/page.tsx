'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Users, Activity, Database, Clock, 
  ChevronRight, Brain, Heart, Landmark, Briefcase, 
  ShieldAlert
} from 'lucide-react';

export default function MasterSimulationHUD() {
  const [simTime, setSimTime] = useState(new Date('2026-08-08T08:00:00'));

  // Simulated world clock ticking forward
  useEffect(() => {
    const timer = setInterval(() => {
      setSimTime(prev => new Date(prev.getTime() + 60000)); // 1 minute per tick
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-[#050505] text-zinc-300 font-sans overflow-hidden flex flex-col selection:bg-zinc-800">
      
      {/* Top Global Telemetry Bar */}
      <header className="h-12 w-full border-b border-zinc-800/80 bg-[#0a0a0c] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-zinc-500" />
            <span className="font-black tracking-widest text-xs text-white uppercase">Humans_After_All</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Core Engine Online
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {simTime.toLocaleDateString()} | {simTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            Pop: 8,492,103
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex relative overflow-hidden">
        
        {/* Left Panel - Macro Dashboard & Event Log */}
        <aside className="w-72 h-full border-r border-zinc-800/80 bg-[#0a0a0c]/90 flex flex-col z-40 relative">
          <div className="p-4 border-b border-zinc-800/80">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 mb-4">
              <Activity className="w-3 h-3" /> Macro Simulation
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
                  <span>Global Market</span>
                  <span className="text-red-400">-1.2%</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-600 w-[45%]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
                  <span>Geopolitical Tension</span>
                  <span className="text-amber-400">ELEVATED</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[78%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto scrollbar-hide flex flex-col gap-3">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold sticky top-0 bg-[#0a0a0c]/90 py-1">Live History Log</h3>
            
            {/* Example Live Events */}
            <div className="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded flex flex-col gap-1">
              <span className="text-[9px] font-mono text-zinc-500">14:22 - SECTOR 4</span>
              <span className="text-xs text-zinc-300">Local election concluded. Elias Thorne elected Mayor.</span>
            </div>
            
            <div className="p-3 bg-red-950/20 border border-red-900/30 rounded flex flex-col gap-1">
              <span className="text-[9px] font-mono text-red-500/70">14:18 - SECTOR 9</span>
              <span className="text-xs text-red-200">Riots broken out over food shortages. 42 entities injured.</span>
            </div>
          </div>
        </aside>

        {/* Center - Live Spatial Viewport */}
        <section className="flex-1 h-full relative bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          <div className="relative z-10 flex flex-col items-center justify-center opacity-30 pointer-events-none">
            <Database className="w-12 h-12 text-zinc-600 mb-4" />
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">Awaiting Spatial Engine Render Context</span>
            <span className="font-mono text-[10px] text-zinc-600 mt-2">X: 142.44 | Y: -84.11</span>
          </div>
        </section>

        {/* Right Panel - Entity Inspector */}
        <aside className="w-80 h-full border-l border-zinc-800/80 bg-[#0a0a0c]/90 flex flex-col z-40">
          {/* Profile Header */}
          <div className="p-5 border-b border-zinc-800/80 bg-zinc-900/30">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">Arthur Pendelton</h2>
                <p className="text-xs font-mono text-zinc-500">ID: #8492-A44</p>
              </div>
              <span className="px-2 py-1 bg-zinc-800 text-[9px] uppercase tracking-widest font-bold text-zinc-400 rounded">Age 42</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
              <Briefcase className="w-3 h-3 text-zinc-500" />
              Senior Architect, Vertex Corp
            </div>
          </div>

          {/* Deep Data */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Core Ambition */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-2">Primary Ambition</h3>
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded text-sm text-zinc-300 italic border-l-2 border-l-emerald-500">
                "I want to build a legacy that outlasts me."
              </div>
            </div>

            {/* Attributes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-zinc-900/30 border border-zinc-800/50 rounded">
                <Brain className="w-4 h-4 text-zinc-500 mb-2" />
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Education</div>
                <div className="text-xs font-bold text-zinc-300">Master's Deg.</div>
              </div>
              <div className="p-3 bg-zinc-900/30 border border-zinc-800/50 rounded">
                <Landmark className="w-4 h-4 text-zinc-500 mb-2" />
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Wealth Level</div>
                <div className="text-xs font-bold text-zinc-300">Upper Middle</div>
              </div>
            </div>

            {/* Active Memories */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-3 flex items-center gap-2">
                <Heart className="w-3 h-3" /> Core Memories
              </h3>
              <div className="space-y-2 border-l border-zinc-800 ml-2 pl-3">
                <div className="relative">
                  <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-zinc-700 border border-[#0a0a0c]" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-bold text-zinc-300">Age 38:</span> Lost his younger brother in the Sector 2 infrastructure collapse. Harbors deep distrust of local government.
                  </p>
                </div>
                <div className="relative pt-2">
                  <div className="absolute -left-[17px] top-3.5 w-2 h-2 rounded-full bg-zinc-700 border border-[#0a0a0c]" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-bold text-zinc-300">Age 40:</span> Promoted to Senior Architect. Purchased first home.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </aside>

      </main>
    </div>
  );
}