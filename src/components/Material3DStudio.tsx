import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Layers, RotateCcw, Box, Eye } from 'lucide-react';
import * as THREE from 'three';

interface Material3DStudioProps {
  language: Language;
}

export const Material3DStudio: React.FC<Material3DStudioProps> = ({ language }) => {
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeModel, setActiveModel] = useState<'rebar' | 'aggregate' | 'concrete'>('rebar');
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentMeshGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });

  const loadModelGeometry = (modelKey: 'rebar' | 'aggregate' | 'concrete', isWf: boolean) => {
    if (!sceneRef.current) return;
    if (currentMeshGroupRef.current) {
      sceneRef.current.remove(currentMeshGroupRef.current);
    }

    const group = new THREE.Group();

    if (modelKey === 'rebar') {
      const barMaterial = new THREE.MeshStandardMaterial({
        color: 0x4B5563,
        metalness: 0.85,
        roughness: 0.25,
        wireframe: isWf
      });
      const ribMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF7628,
        metalness: 0.6,
        roughness: 0.4,
        wireframe: isWf
      });

      const barGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5.5, 24);
      const positions = [
        [-1.2, 0, -1.2],
        [1.2, 0, -1.2],
        [-1.2, 0, 1.2],
        [1.2, 0, 1.2]
      ];

      positions.forEach(pos => {
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(pos[0], pos[1], pos[2]);
        group.add(bar);

        for (let y = -2.4; y <= 2.4; y += 0.35) {
          const ribGeo = new THREE.TorusGeometry(0.22, 0.035, 8, 20);
          const rib = new THREE.Mesh(ribGeo, ribMaterial);
          rib.rotation.x = Math.PI / 2 + 0.15;
          rib.position.set(pos[0], y, pos[2]);
          group.add(rib);
        }
      });

      const tieMaterial = new THREE.MeshStandardMaterial({
        color: 0xD5AA66,
        metalness: 0.9,
        roughness: 0.3,
        wireframe: isWf
      });
      [-2.0, -1.0, 0, 1.0, 2.0].forEach(y => {
        const ringGeo = new THREE.BoxGeometry(2.7, 0.08, 2.7);
        const ring = new THREE.Mesh(ringGeo, tieMaterial);
        ring.position.y = y;
        group.add(ring);
      });
    } else if (modelKey === 'aggregate') {
      const stoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x546A7B,
        metalness: 0.15,
        roughness: 0.85,
        flatShading: true,
        wireframe: isWf
      });
      const darkStoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x394854,
        metalness: 0.2,
        roughness: 0.9,
        flatShading: true,
        wireframe: isWf
      });

      for (let i = 0; i < 24; i++) {
        const radius = 0.5 + Math.random() * 0.45;
        const stoneGeo = new THREE.DodecahedronGeometry(radius, 1);
        const mat = i % 2 === 0 ? stoneMaterial : darkStoneMaterial;
        const stone = new THREE.Mesh(stoneGeo, mat);

        const angle = (i / 24) * Math.PI * 2;
        const dist = 0.8 + (i % 3) * 0.65;
        stone.position.set(
          Math.cos(angle) * dist,
          ((i % 4) - 1.5) * 0.7,
          Math.sin(angle) * dist
        );
        stone.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        group.add(stone);
      }
    } else if (modelKey === 'concrete') {
      const concreteMaterial = new THREE.MeshStandardMaterial({
        color: 0x8C929D,
        metalness: 0.05,
        roughness: 0.92,
        wireframe: isWf
      });
      const orangeAccentMat = new THREE.MeshStandardMaterial({
        color: 0xFF7628,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: isWf
      });

      const colGeo = new THREE.BoxGeometry(2.2, 4.2, 2.2);
      const col = new THREE.Mesh(colGeo, concreteMaterial);
      col.position.y = 0.4;
      group.add(col);

      const baseGeo = new THREE.BoxGeometry(3.6, 0.8, 3.6);
      const base = new THREE.Mesh(baseGeo, concreteMaterial);
      base.position.y = -2.1;
      group.add(base);

      for (const x of [-0.6, 0.6]) {
        for (const z of [-0.6, 0.6]) {
          const rodGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 16);
          const rod = new THREE.Mesh(rodGeo, orangeAccentMat);
          rod.position.set(x, 3.0, z);
          group.add(rod);
        }
      }
    }

    currentMeshGroupRef.current = group;
    sceneRef.current.add(group);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x081321);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const orangeLight = new THREE.DirectionalLight(0xFF7628, 1.8);
    orangeLight.position.set(6, 8, 5);
    scene.add(orangeLight);

    const rimLight = new THREE.DirectionalLight(0x7395AE, 1.2);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const goldLight = new THREE.PointLight(0xD5AA66, 1.2, 50);
    goldLight.position.set(0, 5, 4);
    scene.add(goldLight);

    loadModelGeometry(activeModel, wireframe);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (currentMeshGroupRef.current && autoRotate && !isDraggingRef.current) {
        currentMeshGroupRef.current.rotation.y += 0.007;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update geometry on model or wireframe change
  useEffect(() => {
    loadModelGeometry(activeModel, wireframe);
  }, [activeModel, wireframe]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !currentMeshGroupRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;
    currentMeshGroupRef.current.rotation.y += deltaX * 0.01;
    currentMeshGroupRef.current.rotation.x += deltaY * 0.01;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !currentMeshGroupRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
    const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;
    currentMeshGroupRef.current.rotation.y += deltaX * 0.01;
    currentMeshGroupRef.current.rotation.x += deltaY * 0.01;
    prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <section id="materials-3d" className="py-24 bg-midnight relative overflow-hidden border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal border border-steelGrey/20 text-goldAccent text-xs font-bold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-builderOrange" />
            <span>{t.badge3D}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-warmWhite tracking-tight">
            <span>{t.heading3D}</span>
          </h2>
          <p className="text-sm sm:text-base text-steelGrey leading-relaxed">
            {t.subheading3D}
          </p>
        </div>

        {/* 3D Studio Container */}
        <div className="relative glass-card rounded-3xl overflow-hidden border border-steelGrey/25 shadow-navy-deep">
          
          {/* Controls Bar */}
          <div className="p-4 sm:p-6 bg-charcoal/80 border-b border-steelGrey/15 flex flex-wrap items-center justify-between gap-4">
            
            {/* Model Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveModel('rebar')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeModel === 'rebar' ? 'bg-builderOrange text-white shadow-sm' : 'bg-midnight text-steelGrey hover:text-warmWhite border border-steelGrey/20'}`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>{t.tabRebar}</span>
              </button>
              <button
                onClick={() => setActiveModel('aggregate')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeModel === 'aggregate' ? 'bg-builderOrange text-white shadow-sm' : 'bg-midnight text-steelGrey hover:text-warmWhite border border-steelGrey/20'}`}
              >
                <span className="w-2 h-2 rounded-full bg-steelGrey" />
                <span>{t.tabAggregate}</span>
              </button>
              <button
                onClick={() => setActiveModel('concrete')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeModel === 'concrete' ? 'bg-builderOrange text-white shadow-sm' : 'bg-midnight text-steelGrey hover:text-warmWhite border border-steelGrey/20'}`}
              >
                <span className="w-2 h-2 rounded-full bg-warmWhite" />
                <span>{t.tabConcrete}</span>
              </button>
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="px-3 py-1.5 rounded-lg bg-midnight border border-steelGrey/20 text-steelGrey hover:text-warmWhite transition-colors flex items-center gap-1.5 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-builderOrange" />
                <span>{t.btnAutoRotate}: {autoRotate ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={() => setWireframe(!wireframe)}
                className="px-3 py-1.5 rounded-lg bg-midnight border border-steelGrey/20 text-steelGrey hover:text-warmWhite transition-colors flex items-center gap-1.5 font-medium"
              >
                <Box className="w-3.5 h-3.5 text-goldAccent" />
                <span>{t.btnWireframe}: {wireframe ? 'ON' : 'OFF'}</span>
              </button>
            </div>

          </div>

          {/* Interactive WebGL Canvas */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => { isDraggingRef.current = false; }}
            className="relative h-[480px] sm:h-[550px] w-full bg-gradient-to-b from-charcoal via-midnight to-midnight flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Hint */}
            <div className="absolute bottom-6 left-6 pointer-events-none bg-midnight/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-steelGrey/20 flex items-center gap-2 text-xs text-steelGrey">
              <Eye className="w-4 h-4 text-builderOrange animate-pulse" />
              <span>{t.drag3dHint}</span>
            </div>

            {/* Context Card */}
            <div className="absolute top-6 right-6 max-w-xs bg-midnight/90 backdrop-blur-md p-4 rounded-xl border border-steelGrey/25 pointer-events-none text-left hidden sm:block">
              <h4 className="text-sm font-bold text-warmWhite mb-1">
                {activeModel === 'rebar' && (language === 'hi' ? 'सरिया ढांचा (TMT Rebar Cage)' : 'TMT Steel Assembly')}
                {activeModel === 'aggregate' && (language === 'hi' ? 'गिट्टी स्टोन एग्रीगेट्स (10mm/20mm)' : 'Stone Chips (Gitti Cluster)')}
                {activeModel === 'concrete' && (language === 'hi' ? 'कंक्रीट स्ट्रक्चरल कॉलम' : 'Structural Concrete Column')}
              </h4>
              <p className="text-xs text-steelGrey leading-relaxed">
                {activeModel === 'rebar' && (language === 'hi' ? 'उच्च तन्यता वहन करने के लिए रीढ़ की तरह कार्य करता है।' : 'Reinforced rebar structure tied with cylindrical binding rings to absorb high tensile stresses.')}
                {activeModel === 'aggregate' && (language === 'hi' ? 'ब्लू-ग्रे मजबूत कोणीय पत्थर जो कंक्रीट स्लैब को ठोस कंप्रेसिव स्ट्रेंथ प्रदान करते हैं।' : 'Angular crushed blue-grey aggregates providing high compressive strength in concrete.')}
                {activeModel === 'concrete' && (language === 'hi' ? 'नींव और छत के भार को समान रूप से वहन करने वाला मुख्य आर्किटेक्चरल ढांचा।' : 'Engineered monolithic column with foundation footing and protruding steel tie rods.')}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
