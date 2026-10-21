import React, { useState } from 'react';
import { MapPin, Sparkles, Building2, CheckCircle2, Navigation } from 'lucide-react';

export default function CountryMapView({
  selectedCountry,
  jobs,
  activeJobId,
  onSelectJob,
  onSelectCityFilter,
  selectedCityFilter,
  onOpenCompanyProfile
}) {
  const [hoveredCity, setHoveredCity] = useState(null);

  // Group real Mozambican jobs by city, excluding generic "Global" from map canvas
  const cityJobMap = jobs.reduce((acc, job) => {
    // Only plot jobs that have real locations in Mozambique
    const city = job.mapCoords?.city || job.region || 'Maputo';
    if (city.toLowerCase() === 'global' || city.toLowerCase() === 'remoto global') {
      return acc;
    }

    if (!acc[city]) {
      acc[city] = {
        city,
        coords: job.mapCoords || { x: 145, y: 495 },
        jobs: []
      };
    }
    acc[city].jobs.push(job);
    return acc;
  }, {});

  const cityList = Object.values(cityJobMap);
  const globalJobsCount = jobs.filter(j => j.countryCode === 'GL' || /global/i.test(j.location)).length;

  return (
    <div className="country-map-container" style={{ padding: '16px 14px 12px' }}>
      {/* Top Map Header */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🇲🇿</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '-0.2px' }}>
              Mapa Oficial de Vagas • Moçambique
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Mapeamento geográfico real por Província e Cidade
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {globalJobsCount > 0 && (
            <span
              className="badge-pill"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--glass-border)',
                fontSize: '10px',
                color: 'var(--text-secondary)'
              }}
            >
              +{globalJobsCount} Remoto Global
            </span>
          )}
          <span className="badge-pill badge-sagav" style={{ fontSize: '10px', padding: '3px 8px' }}>
            {jobs.length} Vagas Reais
          </span>
        </div>
      </div>

      {/* Real Geographic Silhouette SVG of Mozambique */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg
          viewBox="0 0 420 540"
          className="map-svg-canvas"
          style={{ width: '100%', maxHeight: '340px' }}
        >
          <defs>
            {/* Liquid Prismatic Gradient for Mozambique Territory */}
            <linearGradient id="mozRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.22" />
              <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.14" />
              <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="seaCoastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>

            <filter id="neonMapGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Indian Ocean Ambient Water Contours (Right side of Mozambique) */}
          <path
            d="M 330,60 Q 380,120 360,200 T 300,320 T 260,420 T 200,520"
            fill="none"
            stroke="rgba(0, 245, 212, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="6,4"
          />

          {/* Lake Niassa (Lake Malawi) on North-West Border */}
          <path
            d="M 175,70 Q 185,110 180,150 Q 170,130 170,80 Z"
            fill="rgba(14, 165, 233, 0.25)"
            stroke="rgba(14, 165, 233, 0.6)"
            strokeWidth="1"
          />
          <text x="140" y="115" fill="rgba(14, 165, 233, 0.6)" fontSize="8" fontStyle="italic">L. Niassa</text>

          {/* Zambezi River flowing across Tete, Sofala and Zambézia */}
          <path
            d="M 70,165 Q 110,180 160,210 T 235,270"
            fill="none"
            stroke="rgba(0, 245, 212, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="4,2"
          />
          <text x="90" y="195" fill="rgba(0, 245, 212, 0.45)" fontSize="7">Rio Zambeze</text>

          {/* ACCURATE GEOGRAPHIC OUTLINE OF MOZAMBIQUE */}
          {/*
            Geographic landmarks:
            - Ruvuma River border with Tanzania at north (x: 185, y: 55 to Cape Delgado x: 335, y: 65)
            - Pemba & Nacala bays (east coast)
            - Nampula coastal bulge around Angoche (x: 320, y: 190)
            - Zambezi Delta / Quelimane coast (x: 270, y: 240)
            - Sofala Bay / Beira (x: 220, y: 285)
            - Save River boundary (x: 205, y: 320)
            - Inhambane peninsula & Cape Correntes (x: 225, y: 360 to x: 200, y: 400)
            - Limpopo River delta / Xai-Xai (x: 165, y: 440)
            - Maputo Bay (x: 150, y: 495) and Ponta do Ouro border (x: 135, y: 525)
            - Eswatini & Kruger/South Africa western border (x: 120, y: 520 to x: 100, y: 440)
            - Zimbabwe border along Manica (x: 130, y: 350 to x: 145, y: 240)
            - Tete "Horn" / Cabora Bassa protruding west between Zimbabwe, Zambia and Malawi (x: 145, y: 220 to x: 65, y: 165 to x: 130, y: 140)
            - Malawi intrusion border (cutting deep between Tete and Zambézia/Niassa)
            - Eastern Malawi border running up along Lake Niassa to Ruvuma (x: 180, y: 150 to x: 185, y: 55)
          */}
          <path
            d="
              M 185,55
              L 230,52
              L 285,56
              L 335,68
              L 330,95
              L 320,125
              L 345,135
              L 335,165
              L 315,190
              L 285,215
              L 265,245
              L 235,275
              L 218,290
              L 208,320
              L 225,355
              L 215,385
              L 190,415
              L 165,445
              L 155,475
              L 148,495
              L 154,505
              L 142,518
              L 132,530
              L 122,525
              L 115,485
              L 100,445
              L 115,405
              L 125,360
              L 140,310
              L 148,260
              L 135,230
              L 95,200
              L 65,170
              L 75,150
              L 115,145
              L 145,150
              L 165,180
              L 175,200
              L 190,170
              L 178,140
              L 185,95
              Z
            "
            fill="url(#mozRealGrad)"
            stroke="url(#seaCoastGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#neonMapGlow)"
          />

          {/* Internal Provincial Guidelines (Subtle) */}
          <path d="M 148,260 Q 185,265 218,290" stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" fill="none" />
          <path d="M 125,360 Q 165,340 208,320" stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" fill="none" />
          <path d="M 175,200 Q 230,190 285,215" stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" fill="none" />
          <path d="M 185,95 Q 260,110 320,125" stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" fill="none" />

          {/* REAL CITY PINPOINTS WITH SMART NON-OVERLAPPING LABELS */}
          {cityList.map((c) => {
            const isMaputo = c.city.toLowerCase() === 'maputo';
            const isMatola = c.city.toLowerCase() === 'matola';
            const isTete = c.city.toLowerCase() === 'tete';
            const isPemba = c.city.toLowerCase() === 'pemba';
            const isBeira = c.city.toLowerCase() === 'beira';
            const isNampula = c.city.toLowerCase() === 'nampula';

            // Geographically calibrated coordinates:
            let x = 145;
            let y = 495;
            let textAnchor = "start";
            let textX = 12;
            let textY = 4;

            if (isMaputo) {
              x = 145;
              y = 495;
              textAnchor = "start";
              textX = 12;
              textY = 4;
            } else if (isMatola) {
              x = 110;
              y = 480;
              textAnchor = "end"; // Matola positioned to the left of the pin to NEVER overlap Maputo!
              textX = -10;
              textY = 4;
            } else if (isBeira) {
              x = 218;
              y = 290;
              textAnchor = "start";
              textX = 12;
              textY = 4;
            } else if (isTete) {
              x = 105;
              y = 175;
              textAnchor = "end";
              textX = -10;
              textY = 4;
            } else if (isNampula) {
              x = 295;
              y = 150;
              textAnchor = "start";
              textX = 12;
              textY = 4;
            } else if (isPemba) {
              x = 325;
              y = 85;
              textAnchor = "start";
              textX = 12;
              textY = 4;
            } else {
              x = c.coords?.x || 180;
              y = c.coords?.y || 320;
            }

            const isSelected = selectedCityFilter === c.city;
            const hasActiveJob = c.jobs.some(j => j.id === activeJobId);

            return (
              <g
                key={c.city}
                className="map-city-pin"
                onClick={() => {
                  onSelectCityFilter(selectedCityFilter === c.city ? null : c.city);
                  if (c.jobs[0]) onSelectJob(c.jobs[0]);
                }}
                onMouseEnter={() => setHoveredCity(c.city)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Sonar Radar Pulse Ring */}
                <circle
                  cx={x}
                  cy={y}
                  className="pin-pulse"
                  fill="none"
                  stroke={hasActiveJob ? "#00f5d4" : "rgba(0, 245, 212, 0.7)"}
                  strokeWidth="1.8"
                />

                {/* Pin Core */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected || hasActiveJob ? 7 : 5}
                  fill={isSelected || hasActiveJob ? "#00f5d4" : "#8b5cf6"}
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  filter="drop-shadow(0 0 8px #00f5d4)"
                />

                {/* City Name Badge Background Box for Ultra-Legibility */}
                <rect
                  x={textAnchor === "end" ? (x + textX - (c.city.length * 7 + 28)) : (x + textX - 4)}
                  y={y - 8}
                  width={c.city.length * 7 + 34}
                  height="16"
                  rx="4"
                  fill="rgba(5, 10, 25, 0.88)"
                  stroke={hasActiveJob ? "var(--neon-cyan)" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="0.8"
                />

                {/* City Label */}
                <text
                  x={x + textX}
                  y={y + textY}
                  textAnchor={textAnchor}
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="var(--font-sans)"
                  letterSpacing="0.2px"
                >
                  {c.city} ({c.jobs.length})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Control Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-cyan)', display: 'inline-block' }} />
          <span>Pontos luminosos = Vagas verificadas em Moçambique</span>
        </div>

        {selectedCityFilter ? (
          <button
            onClick={() => onSelectCityFilter(null)}
            style={{
              background: 'rgba(0, 245, 212, 0.15)',
              border: '1px solid var(--neon-cyan)',
              borderRadius: '99px',
              padding: '2px 8px',
              color: 'var(--neon-cyan)',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            Ver Todas as Províncias ✕
          </button>
        ) : (
          <span style={{ color: 'var(--neon-cyan)' }}>Toque numa cidade para filtrar</span>
        )}
      </div>
    </div>
  );
}
