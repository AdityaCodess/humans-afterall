'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, Brain, Heart, Landmark, Briefcase, Navigation, Zap
} from 'lucide-react';
import SpatialGrid from './SpatialGrid';

const INITIAL_DATABASE: Record<string, any> = {
  "8492-A44": {
    id: "8492-A44",
    name: "Arthur Pendelton",
    age: 42,
    job: "Senior Architect, Vertex Corp",
    wealth: "Upper Middle",
    education: "Master's Deg.",
    ambition: "I want to build a legacy that outlasts me.",
    action: "Idle",
    mood: 68,
    energy: 45,
    memories: [
      { age: 38, text: "Lost his younger brother in the Sector 2 infrastructure collapse." },
      { age: 40, text: "Promoted to Senior Architect. Purchased first home." }
    ],
    position: [0, -0.5, 0]
  },
  "2219-B12": {
    id: "2219-B12",
    name: "Elena Rostova",
    age: 28,
    job: "Independent Journalist",
    wealth: "Working Class",
    education: "Bachelor's Deg.",
    ambition: "I want to expose the corruption in the Sector 2 council.",
    action: "Investigating local terminal",
    mood: 82,
    energy: 90,
    memories: [
      { age: 27, text: "Published article on Vertex Corp tax evasion. Received anonymous threats." }
    ],
    position: [3, -0.5, -2]
  },
};

export default function MasterSimulationHUD() {
  const [selectedEntityId, setSelectedEntityId] = useState<string>("8492-A44");
  const [entities, setEntities] = useState(INITIAL_DATABASE);
  const [macroEvents, setMacroEvents] = useState<any[]>([]);

  const activeEntity = entities[selectedEntityId] || entities["8492-A44"];

  // 1. Rust Spatial Engine Sync
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8088/stream');
    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setEntities((prev) => ({
          ...prev,
          [update.id]: {
            ...prev[update.id],
            position: update.position,
            action: update.action || prev[update.id].action,
          }
        }));
      } catch (err) {}
    };
    return () => ws.close();
  }, []);

  // 2. Python Macro-Simulation Sync
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/events');
    ws.onmessage = (event) => {
      try {
        const newEvent = JSON.parse(event.data);
        setMacroEvents(prev => [newEvent, ...prev].slice(0, 8)); // Keep 8 latest events
      } catch (err) {}
    };
    return () => ws.close();
  }, []);

  return (
    // The top header is completely removed. The UI is now a pure 3-column flex layout.
    <div className="h-screen w-full bg-[#050505] text-zinc-300 font-sans overflow-hidden flex selection:bg-zinc-800">
      
      {/* SECTION 1: MACRO-SIMULATION (Left Panel) */}
      <aside className="w-80 h-full border-r border-zinc-800/80 bg-[#0a0a0c]/90 flex flex-col z-40 relative">
        <div className="p-6 border-b border-zinc-800/80 bg-zinc-900/30">
          
          {/* Integrated Title & Status to save space */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-3 h-3 rounded-full bg-emerald-500/30 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="font-black tracking-[0.2em] text-xs text-white uppercase">Humans_After_All</span>
          </div>

          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 mb-4">
            <Activity className="w-3 h-3" /> Global Market
          </h2>
          <div className="flex justify-between text-xs text-zinc-400 font-bold tracking-wider mb-2">
            <span>Index</span>
            <span className="text-red-400">-1.2%</span>
          </div>
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-600 w-[45%]" />
          </div>
        </div>

        {/* Dedicated History Log Container */}
        <div className="flex-1 p-5 overflow-y-auto scrollbar-hide flex flex-col gap-4">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold sticky top-0 bg-[#0a0a0c]/90 py-2">
            Live History Log
          </h3>
          
          <div className="flex flex-col gap-3">
            {macroEvents.map((evt, idx) => (
              <div key={idx} className={`p-4 bg-transparent border rounded flex flex-col gap-2 transition-all duration-300 animate-in fade-in slide-in-from-left-4 ${evt.bg}`}>
                <span className={`text-[10px] font-mono tracking-wider ${evt.color} opacity-70`}>{evt.time} - {evt.sector}</span>
                <span className={`text-sm leading-relaxed ${evt.color}`}>{evt.message}</span>
              </div>
            ))}
            
            {macroEvents.length === 0 && (
              <div className="p-4 border border-zinc-800/50 rounded text-xs text-zinc-600 font-mono italic animate-pulse">
                Monitoring global telemetry...
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* SECTION 2: SPATIAL VIEWPORT (Center) */}
      <main className="flex-1 h-full relative bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
        <SpatialGrid entities={entities} activeId={selectedEntityId} onSelect={setSelectedEntityId} />
        
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Coordinates overlay strictly bound to the center view */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4 text-[10px] font-mono text-zinc-500 bg-[#050505]/90 px-4 py-2 border border-zinc-800/80 rounded shadow-lg backdrop-blur-md z-20">
          <Navigation className="w-4 h-4 text-emerald-500" />
          <span>SYS_COORDS</span>
          <span className="text-zinc-300">X: {(activeEntity.position[0] * 10).toFixed(1)}</span>
          <span className="text-zinc-300">Y: {(activeEntity.position[2] * 10).toFixed(1)}</span>
        </div>
      </main>

      {/* SECTION 3: ENTITY INSPECTOR (Right Panel) */}
      <aside className="w-[22rem] h-full border-l border-zinc-800/80 bg-[#0a0a0c]/95 flex flex-col z-40 backdrop-blur-lg">
        
        {/* Identity Header */}
        <div className="p-6 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">{activeEntity.name}</h2>
              <p className="text-[10px] font-mono text-zinc-500 mt-1">ENTITY ID: #{activeEntity.id}</p>
            </div>
            <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] uppercase tracking-widest font-bold text-zinc-300 rounded shadow-inner">Age {activeEntity.age}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-5">
            <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
            {activeEntity.job}
          </div>

          <div className="p-3 bg-[#050505] border border-zinc-800/80 rounded flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 tracking-wide">{activeEntity.action}</span>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* AI Condition */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">
                <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Energy</span>
                <span>{activeEntity.energy}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${activeEntity.energy}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">
                <span className="flex items-center gap-1.5"><Heart className="w-3 h-3" /> Mood</span>
                <span>{activeEntity.mood}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${activeEntity.mood}%` }} />
              </div>
            </div>
          </div>

          {/* Ambition */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-3">Core Drive</h3>
            <div className="p-4 bg-[#050505] border border-zinc-800 rounded text-sm text-zinc-300 italic border-l-2 border-l-emerald-500 shadow-inner">
              "{activeEntity.ambition}"
            </div>
          </div>

          {/* Societal Demographics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#050505] border border-zinc-800/80 rounded shadow-inner">
              <Brain className="w-4 h-4 text-zinc-500 mb-3" />
              <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold mb-1">Education</div>
              <div className="text-xs font-bold text-zinc-300">{activeEntity.education}</div>
            </div>
            <div className="p-4 bg-[#050505] border border-zinc-800/80 rounded shadow-inner">
              <Landmark className="w-4 h-4 text-zinc-500 mb-3" />
              <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold mb-1">Class</div>
              <div className="text-xs font-bold text-zinc-300">{activeEntity.wealth}</div>
            </div>
          </div>

          {/* Historical Memories */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-4 flex items-center gap-2">
              <Heart className="w-3 h-3" /> Life Events
            </h3>
            <div className="space-y-4 border-l border-zinc-800 ml-2 pl-4">
              {activeEntity.memories.map((mem: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-zinc-700 border border-[#0a0a0c]" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="font-bold text-zinc-300 block mb-1">Age {mem.age}</span>
                    {mem.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </aside>

    </div>
  );
}