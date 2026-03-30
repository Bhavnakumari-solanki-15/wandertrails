import React, { useRef, useState, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const AIRPORTS = [
  { code: 'DEL', name: 'New Delhi', lat: 28.5562, lng: 77.1000 },
  { code: 'BOM', name: 'Mumbai', lat: 19.0896, lng: 72.8656 },
  { code: 'BLR', name: 'Bengaluru', lat: 13.1986, lng: 77.7066 },
  { code: 'MAA', name: 'Chennai', lat: 12.9941, lng: 80.1709 },
  { code: 'CCU', name: 'Kolkata', lat: 22.6438, lng: 88.4467 },
  { code: 'HYD', name: 'Hyderabad', lat: 17.2403, lng: 78.4294 },
  { code: 'JFK', name: 'New York (USA)', lat: 40.6413, lng: -73.7781 },
  { code: 'LHR', name: 'London (UK)', lat: 51.4700, lng: -0.4543 },
  { code: 'DXB', name: 'Dubai (UAE)', lat: 25.2532, lng: 55.3657 },
  { code: 'SIN', name: 'Singapore (SG)', lat: 1.3644, lng: 103.9915 },
  { code: 'SYD', name: 'Sydney (AU)', lat: -33.9399, lng: 151.1753 },
  { code: 'KEF', name: 'Keflavik (ICE)', lat: 63.9850, lng: -22.6056 },
  { code: 'LAX', name: 'Los Angeles (USA)', lat: 33.9416, lng: -118.4085 }
];

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI/180);
  const dLon = (lon2 - lon1) * (Math.PI/180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

export default function FlightGlobe() {
  const globeEl = useRef<any>();
  const [fromCode, setFromCode] = useState<string>('');
  const [toCode, setToCode] = useState<string>('');
  const [width, setWidth] = useState(800);
  const [flightProgress, setFlightProgress] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [countries, setCountries] = useState<any>({ features: [] });

  // Fetch GeoJSON for white country polygons reliably locally to bypass cors issues completely!
  useEffect(() => {
    fetch('/countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      })
      .catch(err => console.error("Failed to load geojson", err));
  }, []);

  // Dynamically generate a simple flat blue texture to bypass any material overriding WebGL crashes
  const blueTextureUrl = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 4;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#66d8ff';
      ctx.fillRect(0, 0, 4, 4);
    }
    return canvas.toDataURL();
  }, []);

  // Handle window resize dynamically
  useEffect(() => {
    const handleResize = () => {
      const parent = document.getElementById("globe-wrapper");
      if (parent) setWidth(parent.clientWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fromAirport = useMemo(() => AIRPORTS.find(a => a.code === fromCode), [fromCode]);
  const toAirport = useMemo(() => AIRPORTS.find(a => a.code === toCode), [toCode]);

  // Handle triggering flight paths
  useEffect(() => {
    if (fromAirport && toAirport && fromCode !== toCode) {
      setFlightProgress(0);
      setIsFlying(true);
      
      const distance = getDistance(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng);
      
      // Focus camera perfectly framing both points
      if (globeEl.current) {
        const midLat = (fromAirport.lat + toAirport.lat) / 2;
        const midLng = (fromAirport.lng + toAirport.lng) / 2;
        const alt = distance > 8000 ? 2.5 : (distance > 3000 ? 2.0 : 1.2);
        globeEl.current.pointOfView({ lat: midLat, lng: midLng, altitude: alt }, 1500);
      }
    } else {
      setIsFlying(false);
      setFlightProgress(0);
      
      // Default view if empty
      if (globeEl.current && globeEl.current.pointOfView) {
        globeEl.current.pointOfView({ lat: 20, lng: 10, altitude: 2.2 }, 1000);
      }
    }
  }, [fromAirport, toAirport, fromCode, toCode]);

  // Plane flying animation frame loop
  useEffect(() => {
    if (isFlying && flightProgress < 1) {
      const interval = setInterval(() => {
        setFlightProgress(prev => {
          if (prev >= 1) return 1; // It reached destination
          return prev + 0.005; // Fly speed
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isFlying, flightProgress]);

  // Flight time info logic
  const distance = (fromAirport && toAirport) ? getDistance(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng) : 0;
  const hoursData = distance > 0 ? (distance / 800) + 0.5 : 0;
  const hDisplay = Math.floor(hoursData);
  const mDisplay = Math.round((hoursData - hDisplay) * 60);

  // Red dashed line arc
  const arcsData = useMemo(() => {
    if (fromAirport && toAirport) {
      return [{
        startLat: fromAirport.lat,
        startLng: fromAirport.lng,
        endLat: toAirport.lat,
        endLng: toAirport.lng
      }];
    }
    return [];
  }, [fromAirport, toAirport]);

  // HTML Overlays: all standard pins + the plane + the specific markers
  const htmlElementsData = useMemo(() => {
    const elements: any[] = [];
    
    // Add all generic background pins EXCEPT the selected ones
    AIRPORTS.forEach(airport => {
      if (airport.code !== fromCode && airport.code !== toCode) {
        elements.push({ ...airport, type: 'pin' });
      }
    });
    
    // Start / End Selection Pins
    if (fromAirport) {
      elements.push({ ...fromAirport, type: 'marker' });
    }
    if (toAirport) {
      elements.push({ ...toAirport, type: 'marker' });
    }

    // The flying plane calculation
    if (isFlying && fromAirport && toAirport && flightProgress > 0) {
      // Convert coordinates to radians
      const lat1 = fromAirport.lat * (Math.PI / 180);
      const lon1 = fromAirport.lng * (Math.PI / 180);
      const lat2 = toAirport.lat * (Math.PI / 180);
      const lon2 = toAirport.lng * (Math.PI / 180);

      // Spherical interpolation calculation (Slerp)
      const dist = 2 * Math.asin(Math.sqrt(
        Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon1 - lon2) / 2), 2)
      ));

      let currentLat = fromAirport.lat;
      let currentLng = fromAirport.lng;
      let brng = 45; // default angle

      if (dist === 0) {
         currentLat = fromAirport.lat;
         currentLng = fromAirport.lng;
      } else {
         const A = Math.sin((1 - flightProgress) * dist) / Math.sin(dist);
         const B = Math.sin(flightProgress * dist) / Math.sin(dist);
         
         const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
         const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
         const z = A * Math.sin(lat1) + B * Math.sin(lat2);
         
         const finalLat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
         const finalLon = Math.atan2(y, x);
         
         currentLat = finalLat * (180 / Math.PI);
         currentLng = finalLon * (180 / Math.PI);
         
         // Calculate bearing
         const dLon = lon2 - lon1;
         const yb = Math.sin(dLon) * Math.cos(lat2);
         const xb = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
         brng = (Math.atan2(yb, xb) * 180 / Math.PI) + 45; // Adjust SVG heading
      }

      elements.push({
        lat: currentLat,
        lng: currentLng,
        rotation: brng,
        type: 'plane'
      });
    }

    return elements;
  }, [fromAirport, toAirport, isFlying, flightProgress, fromCode, toCode]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 mb-24 mt-16 p-6 lg:p-12 relative overflow-visible items-center">
      
      {/* Interactive Globe Area (Left Side) */}
      <div className="w-full md:w-2/3 h-[500px] lg:h-[600px] relative flex justify-center items-center" id="globe-wrapper">
        <Globe
          ref={globeEl}
          width={width}
          height={600}
          backgroundColor="rgba(255, 255, 255, 0)" // perfectly blank background
          showAtmosphere={false}
          globeImageUrl={blueTextureUrl}
          
          // White Continents overlaid onto the blue globe material
          polygonsData={countries.features}
          polygonCapColor={() => '#ffffff'}
          polygonSideColor={() => '#ffffff'}
          polygonStrokeColor={() => '#ffffff'}
          
          // Elements (All Pins, Selected Markers & Flying Plane)
          htmlElementsData={htmlElementsData}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.style.pointerEvents = 'none';
            if (d.type === 'pin') {
              // Classic tall blue pin with a grey stick based on user screenshot
              el.innerHTML = '<svg width="24" height="40" viewBox="0 0 24 40"><line x1="12" y1="40" x2="12" y2="12" stroke="#999" stroke-width="2"/><circle cx="12" cy="12" r="8" fill="#00a8ff"/></svg>';
              el.style.transform = 'translate(-50%, -100%)'; 
            } else if (d.type === 'marker') {
              // The selected markers (Red)
              el.innerHTML = '<svg width="32" height="50" viewBox="0 0 24 40"><line x1="12" y1="40" x2="12" y2="12" stroke="#999" stroke-width="2"/><circle cx="12" cy="12" r="10" fill="#ff0000"/></svg>';
              el.style.transform = 'translate(-50%, -100%)'; 
            } else if (d.type === 'plane') {
              // Airplane SVG hovering
              el.innerHTML = `<svg width="48" height="48" viewBox="0 0 24 24" stroke="none" fill="#444"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`;
              el.style.transform = `translate(-50%, -50%) rotate(${d.rotation}deg)`;
              el.style.zIndex = '100'; // Make plane stay on top
            }
            return el;
          }}

          // Red dashed arc path
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={() => '#ff0000'}
          arcDashLength={0.05} // Dashed look
          arcDashGap={0.05}
          arcStroke={2} // Very visible line
          arcAltitudeAutoScale={0.15}
        />
        
        {/* Flight Time Semi-Transparent Dark Circle */}
        {fromAirport && toAirport && isFlying && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-[#444444] rounded-full flex flex-col items-center justify-center text-white pointer-events-none z-30 shadow-xl transition-opacity duration-300">
            <span className="text-4xl font-sans tracking-tight mb-1 drop-shadow-sm font-light">{hDisplay}h</span>
            <span className="text-xs font-sans tracking-[0.2em] font-medium text-white/95">
              {fromAirport.code} - {toAirport.code}
            </span>
          </div>
        )}
      </div>

      {/* Settings Side Panel (Right Side) */}
      <div className="w-full md:w-1/3 flex flex-col space-y-8 z-10 pt-4 pl-0 md:pl-12">
        <div>
          <h2 className="text-4xl font-display font-bold text-black flex flex-col gap-1 tracking-tight">
            Flight Time<br />
            <span className="text-lg font-semibold text-black font-sans tracking-tight">Calculator</span>
          </h2>
        </div>

        <div className="space-y-6 w-full max-w-sm">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-black mb-2 font-sans">From</label>
            <select 
              className="bg-white text-black border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 font-medium w-full shadow-sm text-sm"
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
            >
              <option value=""></option>
              {AIRPORTS.map(a => (
                <option key={`from-${a.code}`} value={a.code} disabled={a.code === toCode}>
                  {a.code} | {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-black mb-2 font-sans">To</label>
            <select 
              className="bg-white text-black border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 font-medium w-full shadow-sm text-sm"
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              disabled={!fromCode}
            >
              <option value=""></option>
              {AIRPORTS.map(a => (
                <option key={`to-${a.code}`} value={a.code} disabled={a.code === fromCode}>
                  {a.code} | {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
