'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Box } from '@react-three/drei';
import * as THREE from 'three';

// Static World Infrastructure
function CityInfrastructure() {
  return (
    <group>
      {/* Vertex Corp HQ (Target: 5.0, -5.0) */}
      <mesh position={[5.0, 1.5, -5.0]}>
        <boxGeometry args={[2, 4, 2]} />
        <meshBasicMaterial color="#18181b" />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(2, 4, 2)]} />
          <lineBasicMaterial attach="material" color="#3f3f46" />
        </lineSegments>
      </mesh>
      
      {/* Arthur's Residence (Target: -4.0, 2.0) */}
      <mesh position={[-4.0, 0.5, 2.0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshBasicMaterial color="#18181b" />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1.5, 2, 1.5)]} />
          <lineBasicMaterial attach="material" color="#3f3f46" />
        </lineSegments>
      </mesh>
    </group>
  );
}

function SimulationEnvironment({ entities, activeId, onSelect }: any) {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={gridRef}>
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        sectionColor="#27272a" 
        cellColor="#18181b" 
        cellSize={1} 
        sectionSize={5} 
        position={[0, -0.5, 0]}
      />
      
      <CityInfrastructure />
      
      {Object.values(entities).map((entity: any) => (
        <mesh 
          key={entity.id} 
          position={entity.position}
          onClick={(e) => { 
            e.stopPropagation(); 
            onSelect(entity.id); 
          }}
          onPointerOver={() => document.body.style.cursor = 'crosshair'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshBasicMaterial 
            color={activeId === entity.id ? '#10b981' : '#52525b'} 
            wireframe={activeId !== entity.id} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SpatialGrid({ entities, activeId, onSelect }: any) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [12, 10, 12], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <SimulationEnvironment entities={entities} activeId={activeId} onSelect={onSelect} />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}