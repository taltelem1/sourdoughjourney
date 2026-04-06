// @ts-nocheck
import { P } from "../lib/utils";

export function MacroScene() {
  return (
    <svg viewBox="0 0 900 560" style={{width:"100%",height:"100%",display:"block"}}>
      <style>{`
        @keyframes doughBreathe {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.025) scaleX(1.005); }
        }
      `}</style>
      <defs>
        <linearGradient id="z-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EDD9C0"/><stop offset="100%" stopColor="#F8EEE0"/>
        </linearGradient>
        <radialGradient id="z-dough" cx="48%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#F8E6C9"/>
          <stop offset="40%" stopColor="#EAC896"/>
          <stop offset="80%" stopColor="#D2A05E"/>
          <stop offset="100%" stopColor="#B88242"/>
        </radialGradient>
        <radialGradient id="z-bowl-inner" cx="48%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#FFFDF9"/><stop offset="100%" stopColor="#E8D4B8"/>
        </radialGradient>
        <clipPath id="z-bowl-clip">
          <path d="M178 240 Q178 458 450 458 Q722 458 722 240 L722 0 L178 0 Z"/>
        </clipPath>
        <filter id="z-blur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="z-blur-sm">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <rect width="900" height="560" fill="url(#z-bg)"/>
      <rect x="0" y="430" width="900" height="130" fill="#D4B580" opacity="0.35"/>

      <ellipse cx="450" cy="454" rx="235" ry="18" fill="#7A5535" opacity="0.12"/>

      <path d="M178 240 Q178 458 450 458 Q722 458 722 240" fill="url(#z-bowl-inner)" stroke="#CEB090" strokeWidth="3"/>

      <g clipPath="url(#z-bowl-clip)">
        <g style={{ animation: "doughBreathe 5s ease-in-out infinite", transformOrigin: "450px 450px" }}>
          <path d="M100 300 C 250 210, 350 190, 450 190 C 550 190, 650 210, 800 300 L 800 550 L 100 550 Z" fill="url(#z-dough)"/>
          
          <path d="M150 290 C 250 215, 350 195, 450 195 C 550 195, 650 215, 750 290" fill="none" stroke="#FFF2D9" strokeWidth="16" opacity="0.3" strokeLinecap="round" filter="url(#z-blur)"/>
          <path d="M150 300 C 250 225, 350 205, 450 205 C 550 205, 650 225, 750 300" fill="none" stroke="#A07840" strokeWidth="12" opacity="0.15" strokeLinecap="round" filter="url(#z-blur-sm)"/>

          {/* Bubbles */}
          {[
            [282,260,15],[362,242,10],[448,232,17],[532,244,12],[612,258,13],
            [328,292,9],[488,298,10],[570,288,8],[400,270,14],[240,300,11],
            [650,300,12],[450,320,16],[520,330,9],[360,340,13],[290,350,10],
            [600,340,11],[420,370,15],[490,380,12],[330,390,14],[560,400,10]
          ].map(([cx,cy,r],i)=>(
            <g key={i}>
              <circle cx={cx} cy={cy} r={r+4} fill="#F8EDD6" opacity="0.15"/>
              <circle cx={cx} cy={cy} r={r} fill="#FAF0DC" opacity="0.6" stroke="#D4A96A" strokeWidth="1.5"/>
              <circle cx={cx-r*0.3} cy={cy-r*0.3} r={r*0.25} fill="white" opacity="0.5"/>
              <path d={`M${cx-r*0.5} ${cy+r*0.5} A ${r*0.6} ${r*0.6} 0 0 0 ${cx+r*0.5} ${cy+r*0.5}`} fill="none" stroke="#B88242" strokeWidth="1.5" opacity="0.4"/>
            </g>
          ))}
        </g>
        <path d="M178 240 Q178 458 450 458 Q722 458 722 240" fill="none" stroke="#A07840" strokeWidth="8" opacity="0.08"/>
      </g>

      <ellipse cx="450" cy="228" rx="272" ry="44" fill="none" stroke="#CEB090" strokeWidth="3"/>
      <path d="M178 228 Q280 190 450 190 Q620 190 722 228" fill="none" stroke="#F0E8D8" strokeWidth="4" opacity="0.55"/>

    </svg>
  );
}

export function GlutenScene() {
  // Bubbles: cx, cy, r
  const bubbles = [
    { cx: 280, cy: 260, r: 130 },
    { cx: 660, cy: 180, r: 100 },
    { cx: 560, cy: 420, r: 85 },
    { cx: 120, cy: 480, r: 45 },
    { cx: 820, cy: 380, r: 55 },
  ];

  const smallBubbles = [
    [200, 180, 15], [350, 160, 20], [480, 280, 25], [580, 260, 18],
    [380, 360, 22], [700, 360, 16], [200, 320, 14], [500, 100, 12]
  ];

  // Strands that wrap around bubbles and connect them
  const strands = [
    // B1
    { d: "M 150 260 A 130 130 0 0 1 410 260", w: 4 },
    { d: "M 150 260 A 130 130 0 0 0 410 260", w: 5 },
    { d: "M 280 130 A 130 130 0 0 0 280 390", w: 3 },
    { d: "M 280 130 A 130 130 0 0 1 280 390", w: 6 },
    // B2
    { d: "M 560 180 A 100 100 0 0 1 760 180", w: 4 },
    { d: "M 560 180 A 100 100 0 0 0 760 180", w: 5 },
    { d: "M 660 80 A 100 100 0 0 0 660 280", w: 3 },
    { d: "M 660 80 A 100 100 0 0 1 660 280", w: 5 },
    // B3
    { d: "M 475 420 A 85 85 0 0 1 645 420", w: 4 },
    { d: "M 475 420 A 85 85 0 0 0 645 420", w: 5 },
    { d: "M 560 335 A 85 85 0 0 0 560 505", w: 3 },
    { d: "M 560 335 A 85 85 0 0 1 560 505", w: 4 },
    // B4
    { d: "M 75 480 A 45 45 0 0 1 165 480", w: 3 },
    { d: "M 75 480 A 45 45 0 0 0 165 480", w: 4 },
    { d: "M 120 435 A 45 45 0 0 0 120 525", w: 3 },
    { d: "M 120 435 A 45 45 0 0 1 120 525", w: 4 },
    // B5
    { d: "M 765 380 A 55 55 0 0 1 875 380", w: 3 },
    { d: "M 765 380 A 55 55 0 0 0 875 380", w: 4 },
    { d: "M 820 325 A 55 55 0 0 0 820 435", w: 3 },
    { d: "M 820 325 A 55 55 0 0 1 820 435", w: 4 },

    // Connections
    { d: "M 410 260 Q 485 220 560 180", w: 6 }, // B1 to B2
    { d: "M 410 260 Q 440 340 475 420", w: 5 }, // B1 to B3
    { d: "M 660 280 Q 610 300 560 335", w: 4 }, // B2 to B3
    { d: "M 280 390 Q 200 410 120 435", w: 6 }, // B1 to B4
    { d: "M 760 180 Q 800 250 820 325", w: 4 }, // B2 to B5
    { d: "M 645 420 Q 700 400 765 380", w: 5 }, // B3 to B5
    { d: "M 280 130 Q 300 50 450 -20", w: 4 },  // B1 to Top
    { d: "M 660 80 Q 700 0 800 -20", w: 5 },    // B2 to Top
    { d: "M 150 260 Q 50 200 -20 150", w: 5 },  // B1 to Left
    { d: "M 560 505 Q 500 550 400 600", w: 4 }, // B3 to Bottom
    { d: "M 165 480 Q 250 500 300 600", w: 3 }, // B4 to Bottom
    { d: "M 875 380 Q 900 300 950 250", w: 4 }, // B5 to Right
  ];

  const bgStrands = [
    { d: "M -50 100 Q 200 150 400 50 T 950 200", w: 3 },
    { d: "M -50 400 Q 300 300 500 500 T 950 400", w: 4 },
    { d: "M 300 -50 Q 400 200 200 600", w: 3 },
    { d: "M 700 -50 Q 600 300 800 600", w: 4 },
  ];

  const nodes = [
    [150, 260], [410, 260], [280, 130], [280, 390], // B1
    [560, 180], [760, 180], [660, 80], [660, 280], // B2
    [475, 420], [645, 420], [560, 335], [560, 505], // B3
    [75, 480], [165, 480], [120, 435], [120, 525], // B4
    [765, 380], [875, 380], [820, 325], [820, 435] // B5
  ];

  return (
    <svg viewBox="0 0 900 560" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="bubble-grad" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.4"/>
          <stop offset="70%" stopColor="#F5EEE0" stopOpacity="0.1"/>
          <stop offset="95%" stopColor="#D4924E" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#B8956E" stopOpacity="0.8"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="900" height="560" fill="#B8956E"/>
      
      {/* Background strands */}
      {bgStrands.map((s,i)=>(
        <g key={`bg${i}`} opacity="0.3">
          <path d={s.d} fill="none" stroke="#D4924E" strokeWidth={s.w+4} strokeLinecap="round" opacity="0.4"/>
          <path d={s.d} fill="none" stroke="#E8B070" strokeWidth={s.w} strokeLinecap="round" opacity="0.6"/>
        </g>
      ))}

      {/* Bubbles */}
      {bubbles.map((b,i)=>(
        <g key={`bub${i}`} style={{animation:`breatheSoft ${4+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.3}s`, transformOrigin:`${b.cx}px ${b.cy}px`}}>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#bubble-grad)"/>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill="none" stroke="#E8B070" strokeWidth="2" opacity="0.6"/>
          <text x={b.cx} y={b.cy+b.r*0.1} textAnchor="middle" fontSize={Math.max(14, b.r*0.25)} fill="#FFF" opacity="0.5" fontFamily="'Heebo',sans-serif" fontWeight="bold">CO₂</text>
        </g>
      ))}

      {/* Small Bubbles */}
      {smallBubbles.map(([cx,cy,r],i)=>(
        <g key={`sbub${i}`} style={{animation:`breatheSoft ${3+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.2}s`, transformOrigin:`${cx}px ${cy}px`}}>
          <circle cx={cx} cy={cy} r={r} fill="url(#bubble-grad)"/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E8B070" strokeWidth="1" opacity="0.5"/>
        </g>
      ))}

      {/* Foreground strands wrapping bubbles */}
      {strands.map((s,i)=>(
        <g key={`fg${i}`}>
          {/* Outer glow/thickness */}
          <path d={s.d} fill="none" stroke="#A67B52" strokeWidth={s.w+8} strokeLinecap="round" opacity="0.3"/>
          {/* Main strand */}
          <path d={s.d} fill="none" stroke="#E8D4B8" strokeWidth={s.w+2} strokeLinecap="round" opacity="0.9" style={{animation:`breatheSoft ${5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.25}s`}}/>
          {/* Inner fiber detail */}
          <path d={s.d} fill="none" stroke="#FFF" strokeWidth={s.w*0.4} strokeLinecap="round" opacity="0.8" style={{animation:`breatheSoft ${5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.25}s`}}/>
        </g>
      ))}

      {/* Nodes (Gliadin) */}
      {nodes.map(([cx,cy],i)=>(
        <g key={`n${i}`}>
          <circle cx={cx} cy={cy} r={10} fill="#C48242" opacity="0.9" filter="url(#glow)"/>
          <circle cx={cx} cy={cy} r={6} fill="#E8B070"/>
          <circle cx={cx-2} cy={cy-2} r={2.5} fill="#FFF" opacity="0.7"/>
          {/* Add a little texture to the globular protein */}
          <path d={`M${cx-4} ${cy+2} A 4 4 0 0 0 ${cx+4} ${cy+2}`} fill="none" stroke="#A67B52" strokeWidth="1.5" opacity="0.6"/>
        </g>
      ))}

    </svg>
  );
}

export function StarchScene() {
  const granules=[{cx:156,cy:162,r:82},{cx:402,cy:233,r:58},{cx:672,cy:188,r:88},{cx:558,cy:368,r:36},{cx:262,cy:372,r:42}];
  const drops=[[126,308],[228,80],[354,130],[502,100],[756,296],[680,418],[432,444],[157,454],[815,156],[480,312]];
  return (
    <svg viewBox="0 0 900 560" style={{width:"100%",height:"100%",display:"block"}}>
      <style>{`
        @keyframes waterAbsorb {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          40% { transform: translate(40px, 30px) scale(0.8); opacity: 0.8; }
          60% { transform: translate(45px, 35px) scale(0.5); opacity: 0; }
          100% { transform: translate(45px, 35px) scale(0.5); opacity: 0; }
        }
        @keyframes starchSwell {
          0%, 40% { transform: scale(1); }
          60%, 100% { transform: scale(1.05); }
        }
      `}</style>
      <defs><radialGradient id="zs-st" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#F7F3EC"/><stop offset="65%" stopColor="#E8DDD0"/><stop offset="100%" stopColor="#C8BAA8"/></radialGradient><radialGradient id="zs-wa" cx="28%" cy="22%" r="78%"><stop offset="0%" stopColor="#D8EEF5"/><stop offset="100%" stopColor="#7AADC8"/></radialGradient></defs>
      <rect width="900" height="560" fill="#4E6470"/>
      
      {/* Animated absorbing water drop */}
      <g style={{animation: "waterAbsorb 4s ease-in-out infinite"}}>
        <circle cx="330" cy="180" r="8" fill="url(#zs-wa)" opacity="0.8"/>
      </g>

      {drops.map(([x,y],i)=>(<g key={i} style={{animation:`driftSoft ${3+i*0.28}s ease-in-out infinite`,animationDelay:`${i*0.33}s`}}><circle cx={x} cy={y} r={8} fill="url(#zs-wa)" opacity="0.8"/></g>))}
      
      {granules.map(({cx,cy,r},i)=>{
        // Apply swell animation to the specific granule near the absorbing drop
        const isSwelling = (i === 1); // The one at {cx:402,cy:233,r:58}
        const animStyle = isSwelling 
          ? {animation: "starchSwell 4s ease-in-out infinite", transformOrigin: `${cx}px ${cy}px`} 
          : {animation:`floatSoft ${4+i*0.32}s ease-in-out infinite`, animationDelay:`${i*0.42}s`};
          
        return (
          <g key={i} style={animStyle}>
            <circle cx={cx} cy={cy} r={r} fill="url(#zs-st)" stroke="#A09080" strokeWidth="4"/>
            <circle cx={cx} cy={cy} r={r*0.72} fill="none" stroke="#D8D0C5" strokeWidth="2.5" strokeDasharray="10 8" opacity="0.52"/>
            <circle cx={cx} cy={cy} r={r*0.46} fill="none" stroke="#D8D0C5" strokeWidth="2" strokeDasharray="6 7" opacity="0.42"/>
          </g>
        );
      })}

      {/* Labels */}
      <g opacity="0.85">
        <text x="156" y="166" fontSize="16" fill="#6B5240" fontFamily="'Heebo',sans-serif" textAnchor="middle" fontWeight="bold">עמילן</text>
        <text x="126" y="330" fontSize="14" fill="#D8EEF5" fontFamily="'Heebo',sans-serif" textAnchor="middle">מים</text>
      </g>

    </svg>
  );
}

export function OrganismScene() {
  const bact=[{x:148,y:158,s:1.0,r:0},{x:262,y:108,s:0.85,r:30},{x:382,y:245,s:1.1,r:-20},{x:498,y:152,s:0.95,r:45},{x:628,y:302,s:1.05,r:-10},{x:742,y:178,s:0.88,r:62},{x:322,y:352,s:0.92,r:20}];
  const yeast=[{x:220,y:262,s:1.0,r:-15},{x:432,y:120,s:0.94,r:25},{x:612,y:212,s:1.12,r:-5},{x:700,y:365,s:0.88,r:40}];
  
  const bactCol = "rgb(212,146,78)";
  const bactLCol = "rgb(242,176,108)";
  const yeastCol = "rgb(200,148,215)";
  const yeastLCol = "rgb(230,178,245)";

  const renderRodPair = (len, w) => {
    const hw = len/2, hh = w/2;
    const renderSingle = () => (
      <g>
        {/* Pili */}
        <g opacity="0.4">
          {Array.from({length: Math.floor(len/6)}).map((_, ci) => (
            <line key={`t${ci}`} x1={-hw + 4 + ci*6} y1={-hh} x2={-hw + 4 + ci*6} y2={-hh-5} stroke={bactLCol} strokeWidth="1" strokeLinecap="round" />
          ))}
          {Array.from({length: Math.floor(len/6)}).map((_, ci) => (
            <line key={`b${ci}`} x1={-hw + 4 + ci*6} y1={hh} x2={-hw + 4 + ci*6} y2={hh+5} stroke={bactLCol} strokeWidth="1" strokeLinecap="round" />
          ))}
          {[-hh+4, 0, hh-4].map((py, ci) => (
            <line key={`l${ci}`} x1={-hw} y1={py} x2={-hw-5} y2={py} stroke={bactLCol} strokeWidth="1" strokeLinecap="round" />
          ))}
          {[-hh+4, 0, hh-4].map((py, ci) => (
            <line key={`r${ci}`} x1={hw} y1={py} x2={hw+5} y2={py} stroke={bactLCol} strokeWidth="1" strokeLinecap="round" />
          ))}
        </g>
        
        {/* Body */}
        <rect x={-hw} y={-hh} width={len} height={w} rx={hh} fill={bactCol} stroke={bactLCol} strokeWidth="2"/>
        
        {/* Nucleoid (DNA) */}
        <path d={`M${-hw*0.6} 0 Q 0 ${-hh*0.6} ${hw*0.6} 0 Q 0 ${hh*0.6} ${-hw*0.6} 0`} fill={bactLCol} opacity="0.35"/>
        <circle cx={-hw*0.2} cy={0} r={hh*0.4} fill={bactLCol} opacity="0.4"/>
        <circle cx={hw*0.3} cy={0} r={hh*0.3} fill={bactLCol} opacity="0.4"/>
        
        {/* Highlight */}
        <rect x={-hw+hh*0.5} y={-hh+hh*0.25} width={len-hh} height={hh*0.5} rx={hh*0.25} fill="white" opacity="0.4"/>
        <circle cx={-hw+hh*0.6} cy={-hh+hh*0.5} r={hh*0.15} fill="white" opacity="0.6"/>
      </g>
    );

    return (
      <g>
        <g transform={`translate(${-hw - 1}, 0)`}>{renderSingle()}</g>
        <g transform={`translate(${hw + 1}, 0)`}>{renderSingle()}</g>
      </g>
    );
  };

  const renderYeast = (rx, ry) => {
    return (
      <g>
        {/* Main cell */}
        <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={yeastCol} stroke={yeastLCol} strokeWidth="2"/>
        {/* Nucleus */}
        <circle cx={-rx*0.1} cy={0} r={rx*0.35} fill={yeastLCol} opacity="0.4"/>
        {/* Highlight */}
        <path d={`M${-rx*0.6} ${-ry*0.4} A ${rx*0.5} ${ry*0.3} 0 0 1 ${rx*0.2} ${-ry*0.7} A ${rx*0.6} ${ry*0.4} 0 0 0 ${-rx*0.6} ${-ry*0.4}`} fill="white" opacity="0.4"/>
        
        {/* Bud */}
        <g transform={`translate(${rx*0.85}, ${ry*0.3})`}>
          <circle cx={0} cy={0} r={rx*0.45} fill={yeastCol} stroke={yeastLCol} strokeWidth="2"/>
          <circle cx={-rx*0.05} cy={-rx*0.1} r={rx*0.15} fill="white" opacity="0.4"/>
        </g>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 900 560" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="zo-vg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.48"/>
        </radialGradient>
      </defs>
      
      <rect width="900" height="560" fill="rgb(28,34,44)"/>

      {bact.map((b,i)=>{
        return (
          <g key={`b${i}`} transform={`translate(${b.x},${b.y}) scale(${b.s}) rotate(${b.r})`}>
            <g style={{animation:`floatSoft ${3.2+i*0.22}s ease-in-out infinite`,animationDelay:`${i*0.18}s`}}>
              {renderRodPair(36, 18)}
            </g>
          </g>
        );
      })}

      {yeast.map((y,i)=>{
        return (
          <g key={`y${i}`} transform={`translate(${y.x},${y.y}) scale(${y.s}) rotate(${y.r})`}>
            <g style={{animation:`floatSoft ${3.8+i*0.24}s ease-in-out infinite`,animationDelay:`${i*0.22}s`}}>
              {renderYeast(30, 22)}
            </g>
          </g>
        );
      })}

      <rect width="900" height="560" fill="url(#zo-vg)" style={{pointerEvents:"none"}}/>
      
    </svg>
  );
}
