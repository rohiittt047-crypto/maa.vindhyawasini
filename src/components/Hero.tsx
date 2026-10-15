import React, { useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, MessageSquare, ChevronDown, Building2 } from 'lucide-react';
import * as THREE from 'three';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Torus Geometry
    const ringGeo = new THREE.TorusGeometry(180, 2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF7628, wireframe: true });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Dust particles
    const particleGeo = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 800;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xD5AA66, size: 2.5, transparent: true, opacity: 0.6 });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ringMesh.rotation.z += 0.0015;
      particlePoints.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden construction-grid pt-12 pb-20">
      
      {/* Background Cinematic Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/hero_construction_1791632768450.jpg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1920&q=80';
          }}
          alt="Modern Architectural Construction Site"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-midnight/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/70 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-builderOrange/10 rounded-full blur-3xl pointer-events-none pulse-glow" />
      </div>

      {/* 3D Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-1 pointer-events-none opacity-45" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/90 border border-steelGrey/20 backdrop-blur-md shadow-sm">
              <MapPin className="w-4 h-4 text-builderOrange" />
              <span className="text-xs font-semibold tracking-wide text-warmWhite">{t.heroLocationBadge}</span>
              <span className="text-steelGrey/40">•</span>
              <span className="text-xs font-medium text-goldAccent">{t.heroSupplierBadge}</span>
            </div>

            {/* Oversized Headline */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-warmWhite leading-[1.08]"
              dangerouslySetInnerHTML={{ __html: t.heroHeadline }}
            />

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-steelGrey max-w-2xl font-normal leading-relaxed">
              {t.heroSubheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-builderOrange hover:bg-orange-600 transition-all shadow-orange-glow active:scale-95 flex items-center gap-2 group"
              >
                <span>{t.heroPrimaryCTA}</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://wa.me/919304201774?text=Namaste%20Maa%20Vindhyavasini%20Traders,%20mujhe%20construction%20materials%20ke%20bare%20mein%20jaankari%20chahiye."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl text-sm font-bold tracking-wider text-warmWhite bg-charcoal/90 hover:bg-charcoal border border-steelGrey/30 hover:border-builderOrange transition-all backdrop-blur-md flex items-center gap-2.5 group"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>{t.heroSecondaryCTA}</span>
              </a>
            </div>

            {/* Direct Verification Line */}
            <div className="pt-4 flex items-center gap-6 text-xs text-steelGrey">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t.directPhoneLabel}</span>
                <a href="tel:9304201774" className="text-warmWhite font-bold hover:text-builderOrange transition-colors">9304201774</a>
              </div>
              <div className="text-steelGrey/50">•</div>
              <div className="font-medium">
                <span>{t.ownerBadge}</span> <span className="text-warmWhite">Ajit Kumar Singh</span>
              </div>
            </div>

          </div>

          {/* Right Floating Quick Material Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="glass-card rounded-2xl p-6 relative floating-anim shadow-navy-deep border border-steelGrey/20">
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-builderOrange text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow">
                Siswan Supply Hub
              </div>
              <div className="flex items-center gap-3 border-b border-steelGrey/15 pb-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-midnight flex items-center justify-center border border-steelGrey/30 text-builderOrange">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-warmWhite">Maa Vindhyavasini Traders</h2>
                  <p className="text-xs text-steelGrey">{t.localSupplierNote}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-midnight/60 border border-steelGrey/10">
                  <span className="text-warmWhite font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-goldAccent" />
                    <span>{t.heroCatBalu}</span>
                  </span>
                  <span className="text-steelGrey text-[11px]">{t.enquireStatus}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-midnight/60 border border-steelGrey/10">
                  <span className="text-warmWhite font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-steelGrey" />
                    <span>{t.heroCatGitti}</span>
                  </span>
                  <span className="text-steelGrey text-[11px]">{t.enquireStatus}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-midnight/60 border border-steelGrey/10">
                  <span className="text-warmWhite font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-builderOrange" />
                    <span>{t.heroCatRod}</span>
                  </span>
                  <span className="text-steelGrey text-[11px]">{t.enquireStatus}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-midnight/60 border border-steelGrey/10">
                  <span className="text-warmWhite font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warmWhite" />
                    <span>{t.heroCatCement}</span>
                  </span>
                  <span className="text-steelGrey text-[11px]">{t.enquireStatus}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-steelGrey/15">
                <a
                  href="#contact"
                  className="block w-full py-2.5 text-center rounded-lg text-xs font-bold uppercase tracking-wider text-builderOrange bg-builderOrange/10 border border-builderOrange/30 hover:bg-builderOrange hover:text-white transition-all"
                >
                  {t.quickRateBtn}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
