import React, { useRef, useState, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';
import { destinations, Destination, worldDestinations } from '@/data/destinations';
import * as THREE from 'three';

export default function InteractiveGlobe() {
  const globeEl = useRef<any>();
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any>({ features: [] });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(700);
  const [hoveredData, setHoveredData] = useState<Destination | null>(null);

  // Fetch GeoJSON for country polygons
  useEffect(() => {
    fetch('/countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      })
      .catch(err => console.error("Failed to load geojson", err));
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const parent = document.getElementById("globe-container");
      if (parent) {
        setWidth(parent.clientWidth);
        setHeight(parent.clientHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cloud layer setup
  useEffect(() => {
    if (globeEl.current) {
      const CLOUDS_IMG_URL = '//unpkg.com/three-globe/example/img/earth-clouds.png';
      const CLOUDS_ALT = 0.005;
      const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

      new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(globeEl.current.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        );
        globeEl.current.scene().add(clouds);

        (function rotateClouds() {
          clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
          requestAnimationFrame(rotateClouds);
        })();
      });
    }
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      
      // Focus on India initially as most destinations are there
      globeEl.current.pointOfView({ lat: 20, lng: 80, altitude: 2.0 }, 1000);
    }
  }, []);

  const markersData = useMemo(() => {
    return [
      ...destinations.map(d => ({ ...d, type: 'indian' })),
      ...worldDestinations.map(d => ({ ...d, type: 'world' }))
    ];
  }, []);

  return (
    <div id="globe-container" className="w-full relative h-[500px] md:h-[600px] lg:h-[700px] flex justify-center items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-background via-transparent to-background opacity-60"></div>
      
      <Globe
        ref={globeEl}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#96d0ff"
        atmosphereAltitude={0.25}
        
        // Use natural textures
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        // Disable scroll zoom in onGlobeReady to prevent the 'minimizing' effect
        onGlobeReady={() => {
          if (globeEl.current) {
            globeEl.current.controls().enableZoom = false;
          }
        }}
        
        // Hide Polygon Caps to show Natural Texture, keep subtle outlines
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={() => 'rgba(255, 255, 255, 0.1)'}
        polygonLabel={({ properties: d }: any) => `
          <div class="glass-card px-3 py-2 text-xs font-semibold text-white shadow-2xl border-none" style="background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);">
            ${d.ADMIN}
          </div>
        `}
        onPolygonClick={() => {
          if (globeEl.current) {
             globeEl.current.controls().autoRotate = !globeEl.current.controls().autoRotate;
          }
        }}

        // Custom HTML Markers (Pulsing Dots + Hover Labels)
        htmlElementsData={markersData}
        htmlElement={(d: any) => {
          const el = document.createElement('div');
          el.className = 'globe-marker-container';
          
          const dot = document.createElement('div');
          dot.className = `globe-marker-dot ${d.type === 'indian' ? 'bg-accent' : 'bg-primary'}`;
          
          const tooltip = document.createElement('div');
          tooltip.className = 'globe-marker-tooltip';
          tooltip.innerHTML = `
            <div class="text-[10px] font-bold uppercase tracking-widest text-accent/80 mb-1 leading-none">${d.country}</div>
            <div class="text-sm font-display font-bold text-foreground leading-tight">${d.name}</div>
          `;

          el.appendChild(dot);
          el.appendChild(tooltip);
          
          el.onclick = () => {
             if (d.type === 'indian') navigate(`/destination/${d.id}`);
          };
          
          return el;
        }}

      />

    </div>
  );
}
