import { useState, useMemo } from 'react';

export interface ProvinceData {
  province: string;
  count: number;
  province_code?: string;
}

interface IndonesiaDistributionMapProps {
  provinces: ProvinceData[];
  totalRegistrants?: number;
}

interface ProvinceGeo {
  id: string;
  name: string;
  region: 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara' | 'Maluku & Papua';
  x: number;
  y: number;
}

// Koordinat Centroid 38 Provinsi Indonesia (SVG Coordinate System 1000 x 480)
const PROVINCES_GEO: ProvinceGeo[] = [
  // Sumatera
  { id: '11', name: 'Aceh', region: 'Sumatera', x: 52, y: 78 },
  { id: '12', name: 'Sumatera Utara', region: 'Sumatera', x: 114, y: 116 },
  { id: '13', name: 'Sumatera Barat', region: 'Sumatera', x: 148, y: 204 },
  { id: '14', name: 'Riau', region: 'Sumatera', x: 176, y: 172 },
  { id: '15', name: 'Jambi', region: 'Sumatera', x: 214, y: 218 },
  { id: '16', name: 'Sumatera Selatan', region: 'Sumatera', x: 238, y: 248 },
  { id: '17', name: 'Bengkulu', region: 'Sumatera', x: 188, y: 258 },
  { id: '18', name: 'Lampung', region: 'Sumatera', x: 250, y: 292 },
  { id: '19', name: 'Kepulauan Bangka Belitung', region: 'Sumatera', x: 268, y: 226 },
  { id: '21', name: 'Kepulauan Riau', region: 'Sumatera', x: 236, y: 162 },

  // Jawa
  { id: '36', name: 'Banten', region: 'Jawa', x: 270, y: 308 },
  { id: '31', name: 'DKI Jakarta', region: 'Jawa', x: 288, y: 306 },
  { id: '32', name: 'Jawa Barat', region: 'Jawa', x: 312, y: 322 },
  { id: '33', name: 'Jawa Tengah', region: 'Jawa', x: 362, y: 322 },
  { id: '34', name: 'DI Yogyakarta', region: 'Jawa', x: 364, y: 340 },
  { id: '35', name: 'Jawa Timur', region: 'Jawa', x: 416, y: 330 },

  // Bali & Nusa Tenggara
  { id: '51', name: 'Bali', region: 'Bali & Nusa Tenggara', x: 466, y: 356 },
  { id: '52', name: 'Nusa Tenggara Barat', region: 'Bali & Nusa Tenggara', x: 508, y: 356 },
  { id: '53', name: 'Nusa Tenggara Timur', region: 'Bali & Nusa Tenggara', x: 624, y: 384 },

  // Kalimantan
  { id: '61', name: 'Kalimantan Barat', region: 'Kalimantan', x: 340, y: 186 },
  { id: '62', name: 'Kalimantan Tengah', region: 'Kalimantan', x: 424, y: 226 },
  { id: '63', name: 'Kalimantan Selatan', region: 'Kalimantan', x: 450, y: 248 },
  { id: '64', name: 'Kalimantan Timur', region: 'Kalimantan', x: 496, y: 190 },
  { id: '65', name: 'Kalimantan Utara', region: 'Kalimantan', x: 498, y: 126 },

  // Sulawesi
  { id: '71', name: 'Sulawesi Utara', region: 'Sulawesi', x: 644, y: 150 },
  { id: '75', name: 'Gorontalo', region: 'Sulawesi', x: 610, y: 170 },
  { id: '72', name: 'Sulawesi Tengah', region: 'Sulawesi', x: 550, y: 200 },
  { id: '76', name: 'Sulawesi Barat', region: 'Sulawesi', x: 528, y: 234 },
  { id: '73', name: 'Sulawesi Selatan', region: 'Sulawesi', x: 538, y: 284 },
  { id: '74', name: 'Sulawesi Tenggara', region: 'Sulawesi', x: 602, y: 262 },

  // Maluku & Papua
  { id: '81', name: 'Maluku', region: 'Maluku & Papua', x: 712, y: 256 },
  { id: '82', name: 'Maluku Utara', region: 'Maluku & Papua', x: 696, y: 166 },
  { id: '96', name: 'Papua Barat Daya', region: 'Maluku & Papua', x: 774, y: 200 },
  { id: '92', name: 'Papua Barat', region: 'Maluku & Papua', x: 828, y: 200 },
  { id: '94', name: 'Papua Tengah', region: 'Maluku & Papua', x: 860, y: 250 },
  { id: '95', name: 'Papua Pegunungan', region: 'Maluku & Papua', x: 920, y: 262 },
  { id: '91', name: 'Papua', region: 'Maluku & Papua', x: 948, y: 232 },
  { id: '93', name: 'Papua Selatan', region: 'Maluku & Papua', x: 948, y: 350 },
];

const REGIONS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku & Papua'] as const;

export function IndonesiaDistributionMap({ provinces = [], totalRegistrants = 0 }: IndonesiaDistributionMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'active' | 'all'>('active');

  // Map data normalizer (case-insensitive name match)
  const provinceCounts = useMemo(() => {
    const map = new Map<string, number>();
    provinces.forEach((p) => {
      if (p.province) {
        const cleanName = p.province.trim().toLowerCase();
        map.set(cleanName, Number(p.count) || 0);
      }
    });
    return map;
  }, [provinces]);

  const effectiveTotal = useMemo(() => {
    if (totalRegistrants && totalRegistrants > 0) return totalRegistrants;
    return provinces.reduce((sum, p) => sum + (Number(p.count) || 0), 0);
  }, [totalRegistrants, provinces]);

  // Merge Geo data with real counts
  const enrichedProvinces = useMemo(() => {
    return PROVINCES_GEO.map((geo) => {
      const matchCount = provinceCounts.get(geo.name.toLowerCase()) || 0;
      const percentage = effectiveTotal > 0 ? (matchCount / effectiveTotal) * 100 : 0;
      return {
        ...geo,
        count: matchCount,
        percentage: Number(percentage.toFixed(1)),
      };
    });
  }, [provinceCounts, effectiveTotal]);

  // Active provinces with registrants > 0
  const activeProvinces = useMemo(() => {
    return enrichedProvinces
      .filter((p) => p.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [enrichedProvinces]);

  // Filtered provinces for table display
  const displayedProvinces = useMemo(() => {
    let list = enrichedProvinces;
    if (selectedRegion !== 'Semua') {
      list = list.filter((p) => p.region === selectedRegion);
    }
    if (searchQuery.trim()) {
      list = list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (viewMode === 'active' && !searchQuery.trim() && selectedRegion === 'Semua') {
      const active = list.filter((p) => p.count > 0).sort((a, b) => b.count - a.count);
      return active.length > 0 ? active : list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list.sort((a, b) => (b.count - a.count) || a.name.localeCompare(b.name));
  }, [enrichedProvinces, selectedRegion, searchQuery, viewMode]);

  // Statistics
  const activeProvincesCount = activeProvinces.length;
  const coveragePercent = ((activeProvincesCount / PROVINCES_GEO.length) * 100).toFixed(1);
  const topProvince = activeProvinces[0];

  // Active or hovered province details for tooltip/info
  const currentInspect = useMemo(() => {
    const targetName = hoveredProvince || activeProvince;
    if (!targetName) return null;
    return enrichedProvinces.find((p) => p.name === targetName) || null;
  }, [hoveredProvince, activeProvince, enrichedProvinces]);

  return (
    <div className="bg-white rounded-2xl border border-[#dce6f0] shadow-sm overflow-hidden mb-8">
      {/* Header bar */}
      <div className="p-6 border-b border-[#eef4f9] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#fafcff] to-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#071c36] text-[#f3b641] text-xs font-black shadow-sm">
              🗺️
            </span>
            <h2 className="text-base font-extrabold text-[#071c36] tracking-tight">
              Peta Sebaran Geografis Pendaftar Nasional
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e8f1fa] text-[#0e5088]">
              38 Provinsi
            </span>
          </div>
          <p className="text-[12.5px] text-[#5a7288] mt-1">
            Visualisasi persebaran peserta brand program 500 Brand Global di seluruh kepulauan Indonesia.
          </p>
        </div>

        {/* Quick KPI Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#f0f6fb] border border-[#dce9f4] text-[12px]">
            <span className="text-[#6d8498] font-medium mr-1.5">Cakupan Wilayah:</span>
            <strong className="text-[#0c355c] font-black">{activeProvincesCount} / 38 ({coveragePercent}%)</strong>
          </div>
          {topProvince && (
            <div className="px-3 py-1.5 rounded-xl bg-[#fcf5e7] border border-[#f3d9a1] text-[12px]">
              <span className="text-[#8e681c] font-medium mr-1.5">Top Hotspot:</span>
              <strong className="text-[#8c5700] font-black">{topProvince.name} ({topProvince.count})</strong>
            </div>
          )}
        </div>
      </div>

      {/* Region Filter Buttons & Search */}
      <div className="px-6 py-3 border-b border-[#eef4f9] bg-[#f8fafc] flex flex-wrap items-center justify-between gap-3">
        {/* Island filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#71889c] uppercase tracking-wider mr-1">
            Filter Pulau:
          </span>
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-lg text-[12px] font-bold transition-all ${
                  isSelected
                    ? 'bg-[#071c36] text-white shadow-sm ring-1 ring-[#071c36]'
                    : 'bg-white text-[#4a6379] hover:bg-[#eaf1f8] border border-[#e1eaf2]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* Search province */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari provinsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-[12px] rounded-lg border border-[#cfdce7] focus:outline-none focus:ring-2 focus:ring-[#0c416e] bg-white text-[#183652]"
            />
            <span className="absolute left-2.5 top-2 text-[12px] text-[#8fa3b5]">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1.5 text-xs text-[#8fa3b5] hover:text-[#0c416e]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Map View & Ranking Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive SVG Map Canvas (8 Cols on Desktop) */}
        <div className="lg:col-span-8 p-4 md:p-6 bg-[#071a30] relative overflow-hidden flex flex-col justify-between select-none">
          {/* Subtle ocean grid lines & maritime coordinate styling */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#6ee7b7_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Map Top Bar Status */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#8ab0cf] mb-2 px-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#00d2c4] animate-pulse" />
                RADAR SEBARAN LIVE
              </span>
              <span className="hidden sm:inline text-[#4f708e] font-mono text-[10.5px]">
                95°E - 141°E / 6°N - 11°S
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f3b641] inline-block shadow-sm" />
                <span>Terdaftar ({effectiveTotal})</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#204366] inline-block" />
                <span>Belum Terdata</span>
              </span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[1000/480] my-auto">
            <svg
              viewBox="0 0 1000 480"
              className="w-full h-full drop-shadow-2xl"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Island Gradient */}
                <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14375b" />
                  <stop offset="100%" stopColor="#0c2542" />
                </linearGradient>

                {/* Active Highlight Gradient */}
                <linearGradient id="activeIslandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1d5487" />
                  <stop offset="100%" stopColor="#103b63" />
                </linearGradient>

                {/* Hotspot Radial Glow */}
                <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f3b641" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#f3b641" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f3b641" stopOpacity="0" />
                </radialGradient>

                {/* Ocean Ambient Filter */}
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ocean Graticules (Latitude / Longitude Guide Lines) */}
              <g stroke="#16395c" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.4">
                <line x1="40" y1="120" x2="960" y2="120" />
                <line x1="40" y1="220" x2="960" y2="220" />
                <line x1="40" y1="320" x2="960" y2="320" />
                <line x1="200" y1="40" x2="200" y2="440" />
                <line x1="400" y1="40" x2="400" y2="440" />
                <line x1="600" y1="40" x2="600" y2="440" />
                <line x1="800" y1="40" x2="800" y2="440" />
              </g>

              {/* ================= ARCHIPELAGO ISLAND SILHOUETTES ================= */}
              <g id="indonesia-islands" stroke="#225383" strokeWidth="1" strokeLinejoin="round">
                {/* SUMATERA */}
                <path
                  d="M 38,62 
                     C 55,55 75,70 100,95 
                     C 130,125 155,160 185,185 
                     C 220,215 250,250 262,295 
                     C 255,302 240,298 225,280 
                     C 200,255 170,225 145,190 
                     C 120,155 90,120 60,90 
                     C 42,75 32,68 38,62 Z"
                  fill="url(#islandGradient)"
                  className="transition-colors hover:fill-[#1b4673] cursor-pointer"
                  onClick={() => setSelectedRegion('Sumatera')}
                />
                {/* Kep. Bangka & Belitung */}
                <ellipse cx="265" cy="225" rx="11" ry="16" fill="url(#islandGradient)" />
                <ellipse cx="292" cy="235" rx="8" ry="10" fill="url(#islandGradient)" />
                {/* Kep. Riau / Natuna mini dots */}
                <circle cx="230" cy="155" r="5" fill="url(#islandGradient)" />
                <circle cx="242" cy="145" r="4" fill="url(#islandGradient)" />
                <circle cx="315" cy="115" r="5" fill="url(#islandGradient)" />

                {/* JAWA & MADURA */}
                <path
                  d="M 260,305 
                     C 285,300 315,310 345,315 
                     C 380,318 410,318 438,328 
                     C 448,332 445,342 430,340 
                     C 395,338 360,335 325,330 
                     C 290,324 270,320 258,312 Z"
                  fill={activeProvinces.some((p) => p.region === 'Jawa') ? 'url(#activeIslandGradient)' : 'url(#islandGradient)'}
                  stroke={activeProvinces.some((p) => p.region === 'Jawa') ? '#00c5b5' : '#225383'}
                  strokeWidth={activeProvinces.some((p) => p.region === 'Jawa') ? '1.8' : '1'}
                  className="transition-colors hover:fill-[#20558b] cursor-pointer"
                  onClick={() => setSelectedRegion('Jawa')}
                />
                {/* Madura */}
                <path
                  d="M 408,312 C 420,310 435,312 442,316 C 435,322 418,322 408,312 Z"
                  fill="url(#islandGradient)"
                />

                {/* KALIMANTAN (Indonesian Territory) */}
                <path
                  d="M 320,185 
                     C 335,160 370,150 405,150 
                     C 440,150 475,130 500,118 
                     C 508,135 500,165 498,195 
                     C 495,220 480,240 458,255 
                     C 440,268 410,250 380,240 
                     C 350,230 325,210 320,185 Z"
                  fill="url(#islandGradient)"
                  className="transition-colors hover:fill-[#1b4673] cursor-pointer"
                  onClick={() => setSelectedRegion('Kalimantan')}
                />

                {/* SULAWESI (Signature K-shape) */}
                <path
                  d="M 648,142 
                     C 630,150 610,165 590,172 
                     C 565,178 545,188 540,205 
                     C 530,225 522,250 528,285 
                     C 538,285 545,268 550,248 
                     C 560,230 580,225 600,235 
                     C 615,245 612,265 605,278 
                     C 600,265 588,245 572,238 
                     C 560,215 565,200 585,190 
                     C 610,180 635,160 650,148 Z"
                  fill="url(#islandGradient)"
                  className="transition-colors hover:fill-[#1b4673] cursor-pointer"
                  onClick={() => setSelectedRegion('Sulawesi')}
                />

                {/* BALI & NUSA TENGGARA CHAIN */}
                {/* Bali */}
                <ellipse cx="462" cy="354" rx="8" ry="6" fill="url(#islandGradient)" />
                {/* Lombok */}
                <ellipse cx="502" cy="355" rx="9" ry="7" fill="url(#islandGradient)" />
                {/* Sumbawa */}
                <path d="M 525,352 C 545,350 562,354 565,360 C 555,365 535,364 525,352 Z" fill="url(#islandGradient)" />
                {/* Flores */}
                <path d="M 580,352 C 605,350 632,354 635,360 C 620,364 595,364 580,352 Z" fill="url(#islandGradient)" />
                {/* Sumba */}
                <ellipse cx="578" cy="382" rx="15" ry="9" fill="url(#islandGradient)" />
                {/* Timor (Indonesian West Timor) */}
                <path d="M 625,375 C 645,368 660,372 665,380 C 650,388 635,385 625,375 Z" fill="url(#islandGradient)" />

                {/* MALUKU ARCHIPELAGO */}
                {/* Halmahera */}
                <path d="M 692,145 C 705,150 710,165 705,180 C 695,175 688,160 692,145 Z" fill="url(#islandGradient)" />
                {/* Buru */}
                <ellipse cx="682" cy="245" rx="12" ry="9" fill="url(#islandGradient)" />
                {/* Seram */}
                <path d="M 710,240 C 735,236 755,242 758,248 C 740,252 720,250 710,240 Z" fill="url(#islandGradient)" />

                {/* PAPUA */}
                <path
                  d="M 770,192 
                     C 790,185 810,190 825,200 
                     C 845,215 865,225 895,228 
                     C 930,230 960,235 970,245 
                     C 970,285 965,325 960,358 
                     C 940,362 920,340 905,310 
                     C 885,270 860,255 835,245 
                     C 815,235 800,238 780,225 
                     C 760,215 760,200 770,192 Z"
                  fill="url(#islandGradient)"
                  className="transition-colors hover:fill-[#1b4673] cursor-pointer"
                  onClick={() => setSelectedRegion('Maluku & Papua')}
                />
              </g>

              {/* ================= PROVINCE PINS & HOTSPOT BEACONS ================= */}
              {enrichedProvinces.map((prov) => {
                const isHovered = hoveredProvince === prov.name;
                const isActive = activeProvince === prov.name;
                const hasRegistrants = prov.count > 0;
                const isHighlighted = (hasRegistrants || isHovered || isActive) &&
                  (selectedRegion === 'Semua' || prov.region === selectedRegion);

                return (
                  <g
                    key={prov.id}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredProvince(prov.name)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => setActiveProvince(isActive ? null : prov.name)}
                  >
                    {/* Pulsing Beacon for provinces with registrants */}
                    {hasRegistrants && (
                      <>
                        {/* Outer Glow Halo */}
                        <circle
                          cx={prov.x}
                          cy={prov.y}
                          r={18 + Math.min(prov.count * 2, 20)}
                          fill="url(#hotspotGlow)"
                          opacity="0.6"
                          className="animate-pulse"
                        />
                        {/* Animated Radar Pulse Ring */}
                        <circle
                          cx={prov.x}
                          cy={prov.y}
                          r={14 + Math.min(prov.count, 12)}
                          fill="none"
                          stroke="#f3b641"
                          strokeWidth="1.5"
                          opacity="0.8"
                        >
                          <animate
                            attributeName="r"
                            from="6"
                            to={22 + Math.min(prov.count * 2, 18)}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.9"
                            to="0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </>
                    )}

                    {/* Invisible Hit Target for smooth mouse interaction */}
                    <circle
                      cx={prov.x}
                      cy={prov.y}
                      r={hasRegistrants ? 22 : 14}
                      fill="transparent"
                      pointerEvents="all"
                    />

                    {/* Province Centroid Pin */}
                    <circle
                      cx={prov.x}
                      cy={prov.y}
                      r={hasRegistrants ? 7 : isHovered ? 4.5 : 2.5}
                      fill={
                        hasRegistrants
                          ? '#f3b641'
                          : isHovered
                          ? '#00e1cf'
                          : isHighlighted
                          ? '#38bdf8'
                          : '#254b73'
                      }
                      stroke={hasRegistrants ? '#071c36' : '#14385f'}
                      strokeWidth={hasRegistrants ? 2 : 1}
                      filter={hasRegistrants ? 'url(#glowFilter)' : undefined}
                      className="transition-all duration-200"
                    />

                    {/* Numeric Count Badge right on the map pin */}
                    {hasRegistrants && (
                      <g>
                        <rect
                          x={prov.x - 14}
                          y={prov.y - 24}
                          width={28}
                          height={17}
                          rx={8.5}
                          fill="#f3b641"
                          stroke="#071c36"
                          strokeWidth="1.5"
                          filter="url(#glowFilter)"
                        />
                        <text
                          x={prov.x}
                          y={prov.y - 12}
                          textAnchor="middle"
                          fill="#071c36"
                          fontSize="10"
                          fontWeight="900"
                          fontFamily="sans-serif"
                        >
                          {prov.count}
                        </text>
                        {/* Province Label below Pin */}
                        <text
                          x={prov.x}
                          y={prov.y + 16}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="bold"
                          stroke="#071c36"
                          strokeWidth="2"
                          paintOrder="stroke"
                        >
                          {prov.name}
                        </text>
                      </g>
                    )}

                    {/* Subtle label on hover for inactive provinces */}
                    {!hasRegistrants && isHovered && (
                      <g>
                        <rect
                          x={prov.x - 40}
                          y={prov.y - 22}
                          width={80}
                          height={16}
                          rx={4}
                          fill="#071c36"
                          stroke="#38bdf8"
                          strokeWidth="1"
                        />
                        <text
                          x={prov.x}
                          y={prov.y - 11}
                          textAnchor="middle"
                          fill="#e0f2fe"
                          fontSize="8.5"
                          fontWeight="bold"
                        >
                          {prov.name} (0)
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Floating Live Tooltip Box on the map */}
            {currentInspect && (
              <div className="absolute top-4 left-4 z-20 bg-[#0b2444]/95 backdrop-blur-md border border-[#23588f] text-white p-3.5 rounded-xl shadow-2xl max-w-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#38bdf8]">
                    {currentInspect.region}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentInspect.count > 0 ? 'bg-[#f3b641] text-[#071c36]' : 'bg-[#18395f] text-[#8ab0cf]'
                    }`}>
                      {currentInspect.count > 0 ? 'Hotspot Aktif' : '0 Pendaftar'}
                    </span>
                    {activeProvince && (
                      <button
                        type="button"
                        onClick={() => setActiveProvince(null)}
                        className="text-xs text-[#8ab0cf] hover:text-white px-1 leading-none font-bold"
                        title="Tutup detail"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <h4 className="text-sm font-black text-white leading-tight">
                  {currentInspect.name}
                </h4>
                <div className="mt-2 pt-2 border-t border-[#183d66] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#8ab0cf] text-[11px] block">Jumlah Pendaftar</span>
                    <strong className="text-base font-black text-[#f3b641]">
                      {currentInspect.count} <span className="text-xs font-normal text-[#c7d9e8]">orang</span>
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8ab0cf] text-[11px] block">Porsi Nasional</span>
                    <strong className="text-sm font-extrabold text-[#00d2c4]">
                      {currentInspect.percentage}%
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map bottom legend & quick hint */}
          <div className="relative z-10 pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[11.5px] text-[#7198bb] border-t border-[#14375b] mt-3 gap-2">
            <div className="flex items-center gap-2">
              <span>💡 Arahkan kursor atau klik pin peta untuk melihat detail pendaftar per provinsi.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#4e7497]">Skala Warna:</span>
              <div className="flex items-center gap-1">
                <span className="w-3 h-2 rounded-sm bg-[#163b63]" title="0" />
                <span className="w-3 h-2 rounded-sm bg-[#0e5c94]" title="1-4" />
                <span className="w-3 h-2 rounded-sm bg-[#00a89d]" title="5-9" />
                <span className="w-3 h-2 rounded-sm bg-[#f3b641]" title="10+" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Ranked Provinces & Regional Breakdown (4 Cols on Desktop) */}
        <div className="lg:col-span-4 p-5 bg-[#fafcff] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#eef4f9]">
          <div>
            {/* Header Leaderboard */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#e9f1f8]">
              <div>
                <h3 className="text-sm font-extrabold text-[#071c36]">Peringkat Sebaran Wilayah</h3>
                <span className="text-[11.5px] text-[#69849a]">
                  {activeProvinces.length > 0
                    ? `${activeProvinces.length} provinsi memiliki pendaftar aktif`
                    : 'Belum ada sebaran tersimpan'}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-[#edf3f8] p-0.5 rounded-lg text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('active')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    viewMode === 'active'
                      ? 'bg-white text-[#0b3059] shadow-sm font-black'
                      : 'text-[#617d94] hover:text-[#0b3059]'
                  }`}
                >
                  Hotspot
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    viewMode === 'all'
                      ? 'bg-white text-[#0b3059] shadow-sm font-black'
                      : 'text-[#617d94] hover:text-[#0b3059]'
                  }`}
                >
                  Semua ({displayedProvinces.length})
                </button>
              </div>
            </div>

            {/* List Top Provinces */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {displayedProvinces.length > 0 ? (
                displayedProvinces.map((prov, index) => {
                  const isHovered = hoveredProvince === prov.name;
                  const hasCount = prov.count > 0;
                  return (
                    <div
                      key={prov.name}
                      onMouseEnter={() => setHoveredProvince(prov.name)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => setActiveProvince(prov.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isHovered || activeProvince === prov.name
                          ? 'bg-[#edf5fc] border-[#0c416e] shadow-sm translate-x-1'
                          : hasCount
                          ? 'bg-white border-[#e3edf6] hover:border-[#b8d2e8]'
                          : 'bg-[#fcfdfd] border-[#edf2f7] opacity-80 hover:opacity-100 hover:border-[#cfdce7]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                              index === 0 && hasCount
                                ? 'bg-[#f3b641] text-[#0b2443]'
                                : index === 1 && hasCount
                                ? 'bg-[#cbd5e1] text-[#1e293b]'
                                : index === 2 && hasCount
                                ? 'bg-[#fed7aa] text-[#7c2d12]'
                                : 'bg-[#eef4f9] text-[#5a7288]'
                            }`}
                          >
                            {index === 0 && hasCount ? '🥇' : index + 1}
                          </span>
                          <span className="font-extrabold text-[#071c36] text-[13px]">
                            {prov.name}
                          </span>
                        </div>
                        <span
                          className={`font-black px-2.5 py-0.5 rounded-full text-[11px] ${
                            hasCount
                              ? 'text-[#0c355c] bg-[#e6f1f9]'
                              : 'text-[#849aab] bg-[#f0f4f8]'
                          }`}
                        >
                          {prov.count} pendaftar
                        </span>
                      </div>

                      {/* Progress density bar */}
                      <div className="w-full bg-[#e9f1f8] rounded-full h-2 overflow-hidden mt-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            hasCount
                              ? 'bg-gradient-to-r from-[#009b94] to-[#f3b641]'
                              : 'bg-gray-200'
                          }`}
                          style={{ width: `${hasCount ? Math.max(prov.percentage, 8) : 0}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10.5px] text-[#768e9f] mt-1 font-medium">
                        <span>{prov.region}</span>
                        <span>{prov.percentage}% dari total pendaftar</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 px-4 bg-white rounded-xl border border-dashed border-[#d5e2ed]">
                  <span className="text-3xl block mb-2">📍</span>
                  <p className="text-xs font-bold text-[#556e82]">Tidak ada provinsi ditemukan</p>
                  <p className="text-[11px] text-[#8fa3b5] mt-1">
                    Coba sesuaikan kata kunci pencarian atau filter wilayah pulau.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Card Summary Action */}
          <div className="mt-4 pt-3 border-t border-[#eef4f9]">
            <div className="bg-[#f2f7fc] p-3 rounded-xl border border-[#dce8f3] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <div>
                  <span className="font-extrabold text-[#0b3059] block">Ekspor Lengkap</span>
                  <span className="text-[11px] text-[#69849a]">Laporan sebaran per wilayah</span>
                </div>
              </div>
              <a
                href="/admin/pendaftar/export.csv"
                className="px-3 py-1.5 rounded-lg bg-[#0b3059] hover:bg-[#124275] text-white font-bold text-[11px] transition-colors"
              >
                Unduh CSV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
