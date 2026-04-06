// @ts-nocheck
import { P, L, cl } from "../lib/utils";

const ORGS = [
  { tp:"rod_pair", x:210, y:195, ang:18,  col:[212,146,78], at:0,    col_at:0.45, len:36, w:18, dl:0   },
  { tp:"rod",      x:470, y:148, ang:-22, col:[212,146,78], at:0,    col_at:0.45, len:44, w:19, dl:0.5 },
  { tp:"rod_pair", x:650, y:228, ang:5,   col:[184,112,64], at:0,    col_at:0.45, len:38, w:20, dl:0.2 },
  { tp:"rod",      x:125, y:295, ang:38,  col:[232,176,112], at:0.18, col_at:0.55, len:46, w:19, dl:0.3 },
  { tp:"rod_pair", x:352, y:288, ang:-12, col:[212,146,78], at:0.22, col_at:0.58, len:34, w:18, dl:0.7 },
  { tp:"rod",      x:598, y:315, ang:28,  col:[184,112,64], at:0.26, col_at:0.60, len:44, w:18, dl:0.1 },
  { tp:"rod_pair", x:778, y:175, ang:-35, col:[232,176,112], at:0.28, col_at:0.62, len:40, w:18, dl:0.6 },
  { tp:"bifido",   x:295, y:165, ang:15,  col:[140,154,168], at:0.32, col_at:0.60, dl:0.4 },
  { tp:"bifido",   x:540, y:248, ang:-40, col:[140,154,168], at:0.42, col_at:0.68, dl:0.2 },
  { tp:"cluster",  x:415, y:205, col:[212,146,78], at:0.48, col_at:0.72, dl:0.5 },
  { tp:"cluster",  x:712, y:295, col:[232,176,112], at:0.56, col_at:0.76, dl:0.1 },
  { tp:"rod_pair", x:168, y:138, ang:-18, col:[184,112,64], at:0.62, col_at:0.80, len:38, w:19, dl:0.8 },
  { tp:"rod",      x:658, y:155, ang:25,  col:[212,146,78], at:0.68, col_at:0.84, len:46, w:20, dl:0.3 },
  { tp:"rod_pair", x:840, y:298, ang:15,  col:[232,176,112], at:0.70, col_at:0.85, len:40, w:17, dl:0.9 },
  { tp:"rod",      x:98,  y:182, ang:-42, col:[184,112,64], at:0.74, col_at:0.88, len:42, w:17, dl:0.4 },
];

const FIBERS = [
  { near:4,  dx:55,  dy:0,   tp:"wavy",  col:[255,255,255], at:0.55 },
  { near:7,  dx:58,  dy:8,   tp:"wavy",  col:[255,255,255], at:0.60 },
  { near:9,  dx:-12, dy:38,  tp:"wavy",  col:[255,255,255], at:0.65 },
  { near:8,  dx:48,  dy:5,   tp:"wavy",  col:[255,255,255], at:0.68 },
  { near:5,  dx:0,   dy:38,  tp:"tri",   col:[255,255,255], at:0.62 },
  { near:10, dx:-8,  dy:34,  tp:"tri",   col:[255,255,255], at:0.70 },
  { near:11, dx:42,  dy:12,  tp:"sq",    col:[255,255,255], at:0.72 },
  { near:12, dx:-40, dy:20,  tp:"sq",    col:[255,255,255], at:0.76 },
  { near:3,  dx:55,  dy:10,  tp:"wavy",  col:[255,255,255], at:0.78 },
  { near:6,  dx:48,  dy:-10, tp:"tri",   col:[255,255,255], at:0.80 },
];

export function MicrobiomeScene({ t }) {
  const GR = [148, 142, 138];
  return (
    <svg viewBox="0 0 920 400" style={{ width:"100%", height:"100%", display:"block" }}>
      <defs>
        <radialGradient id="mb-vg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.48"/>
        </radialGradient>
      </defs>
      <rect width="920" height="400" fill={`rgb(${Math.round(L(28,22,t))},${Math.round(L(34,26,t))},${Math.round(L(44,36,t))})`}/>

      {FIBERS.map((f, fi) => {
        const a = cl(t, f.at, 0.14);
        const org = ORGS[f.near];
        const ox = org.x + f.dx, oy = org.y + f.dy;
        const anim = { animation:`floatSoft ${3.5+fi*0.3}s ease-in-out infinite`, animationDelay:`${fi*0.22}s` };
        if (f.tp === "wavy") {
          const d = `M${ox} ${oy} C${ox+28} ${oy-12} ${ox+52} ${oy+12} ${ox+76} ${oy}`;
          return (
            <g key={fi} opacity={a}>
              <g style={anim}><path d={d} fill="none" stroke={`rgba(255,255,255,0.28)`} strokeWidth="2.5" strokeLinecap="round"/></g>
            </g>
          );
        }
        if (f.tp === "tri") return (
          <g key={fi} transform={`translate(${ox},${oy})`} opacity={a}>
            <g style={anim}><path d="M0-11 L11 7 L-11 7Z" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.8"/></g>
          </g>
        );
        if (f.tp === "sq") return (
          <g key={fi} transform={`translate(${ox},${oy})`} opacity={a}>
            <g style={anim}><rect x="-9" y="-9" width="18" height="18" rx="2" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1.8"/></g>
          </g>
        );
        return null;
      })}

      {ORGS.map((o, oi) => {
        const appear = cl(t, o.at, 0.16);
        const colorT = cl(t, o.col_at, 0.22);
        const col = `rgb(${Math.round(L(GR[0],o.col[0],colorT))},${Math.round(L(GR[1],o.col[1],colorT))},${Math.round(L(GR[2],o.col[2],colorT))})`;
        const lcol = `rgb(${Math.round(L(GR[0]+30,Math.min(255,o.col[0]+55),colorT))},${Math.round(L(GR[1]+28,Math.min(255,o.col[1]+55),colorT))},${Math.round(L(GR[2]+25,Math.min(255,o.col[2]+45),colorT))})`;
        const anim = { animation:`floatSoft ${3.4+oi*0.2}s ease-in-out infinite`, animationDelay:`${o.dl}s` };

        const renderRod = (len, w, flagA) => {
          const hw = len/2, hh = w/2;
          return (
            <g>
              {/* Pili */}
              {flagA > 0.1 && (
                <g opacity={flagA * 0.4}>
                  {Array.from({length: Math.floor(len/6)}).map((_, ci) => (
                    <line key={`t${ci}`} x1={-hw + 4 + ci*6} y1={-hh} x2={-hw + 4 + ci*6} y2={-hh-5} stroke={lcol} strokeWidth="1" strokeLinecap="round" />
                  ))}
                  {Array.from({length: Math.floor(len/6)}).map((_, ci) => (
                    <line key={`b${ci}`} x1={-hw + 4 + ci*6} y1={hh} x2={-hw + 4 + ci*6} y2={hh+5} stroke={lcol} strokeWidth="1" strokeLinecap="round" />
                  ))}
                  {[-hh+4, 0, hh-4].map((py, ci) => (
                    <line key={`l${ci}`} x1={-hw} y1={py} x2={-hw-5} y2={py} stroke={lcol} strokeWidth="1" strokeLinecap="round" />
                  ))}
                  {[-hh+4, 0, hh-4].map((py, ci) => (
                    <line key={`r${ci}`} x1={hw} y1={py} x2={hw+5} y2={py} stroke={lcol} strokeWidth="1" strokeLinecap="round" />
                  ))}
                </g>
              )}
              
              {/* Body */}
              <rect x={-hw} y={-hh} width={len} height={w} rx={hh} fill={col} stroke={lcol} strokeWidth="2"/>
              
              {/* Nucleoid (DNA) */}
              <path d={`M${-hw*0.6} 0 Q 0 ${-hh*0.6} ${hw*0.6} 0 Q 0 ${hh*0.6} ${-hw*0.6} 0`} fill={lcol} opacity="0.35"/>
              <circle cx={-hw*0.2} cy={0} r={hh*0.4} fill={lcol} opacity="0.4"/>
              <circle cx={hw*0.3} cy={0} r={hh*0.3} fill={lcol} opacity="0.4"/>
              
              {/* Highlight */}
              <rect x={-hw+hh*0.5} y={-hh+hh*0.25} width={len-hh} height={hh*0.5} rx={hh*0.25} fill="white" opacity="0.4"/>
              <circle cx={-hw+hh*0.6} cy={-hh+hh*0.5} r={hh*0.15} fill="white" opacity="0.6"/>
            </g>
          );
        };

        if (o.tp === "rod") {
          const flagA = cl(t, o.col_at, 0.28);
          return (
            <g key={oi} transform={`translate(${o.x},${o.y}) rotate(${o.ang})`} opacity={appear}>
              <g style={anim}>
                {renderRod(o.len, o.w, flagA)}
              </g>
            </g>
          );
        }
        if (o.tp === "rod_pair") {
          const flagA = cl(t, o.col_at, 0.28);
          const hw = o.len/2;
          return (
            <g key={oi} transform={`translate(${o.x},${o.y}) rotate(${o.ang})`} opacity={appear}>
              <g style={anim}>
                <g transform={`translate(${-hw - 1}, 0)`}>
                  {renderRod(o.len, o.w, flagA)}
                </g>
                <g transform={`translate(${hw + 1}, 0)`}>
                  {renderRod(o.len, o.w, flagA)}
                </g>
              </g>
            </g>
          );
        }
        if (o.tp === "bifido") {
          return (
            <g key={oi} transform={`translate(${o.x},${o.y}) rotate(${o.ang||0})`} opacity={appear}>
              <g style={anim}>
                <path d="M0 16 L0 0 L-14 -20 M0 0 L14 -20" fill="none" stroke={lcol} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0 16 L0 0 L-14 -20 M0 0 L14 -20" fill="none" stroke={col} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M-2 14 L-2 -1 L-12 -16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
              </g>
            </g>
          );
        }
        if (o.tp === "cluster") {
          return (
            <g key={oi} transform={`translate(${o.x},${o.y})`} opacity={appear}>
              <g style={anim}>
                {[[-10,-10],[10,-10],[-10,10],[10,10],[0,0]].map(([dx,dy],ci)=>(
                  <g key={ci} transform={`translate(${dx},${dy})`}>
                    <circle cx={0} cy={0} r={12} fill={col} stroke={lcol} strokeWidth="2"/>
                    <circle cx={-2} cy={0} r={5} fill={lcol} opacity="0.4"/>
                    <path d="M-6 -4 A 8 8 0 0 1 2 -8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                  </g>
                ))}
              </g>
            </g>
          );
        }
        return null;
      })}

      <rect width="920" height="400" fill="url(#mb-vg)" style={{pointerEvents:"none"}}/>

      <g opacity="0.42">
        <line x1="808" y1="382" x2="878" y2="382" stroke="white" strokeWidth="2"/>
        <line x1="808" y1="376" x2="808" y2="388" stroke="white" strokeWidth="1.5"/>
        <line x1="878" y1="376" x2="878" y2="388" stroke="white" strokeWidth="1.5"/>
        <text x="843" y="398" fontSize="11" fill="white" fontFamily="'Heebo',sans-serif" textAnchor="middle">10 μm</text>
      </g>
    </svg>
  );
}

export function DigestScene({ t }) {
  const bg = `rgb(${Math.round(L(244,250,t))},${Math.round(L(236,244,t))},${Math.round(L(222,238,t))})`;
  const N = 12;
  const startX = 44, stepX = 72, midY = 165;
  const nodes = Array.from({length:N}, (_,i) => ({
    x: startX + i*stepX,
    y: midY + Math.sin(i * 1.05) * 30,
  }));

  const cut1 = cl(t, 0.28, 0.14);
  const cut2 = cl(t, 0.56, 0.14);

  function nodeY(i) {
    if (i <= 3)      return nodes[i].y + L(0, -32, cut1);
    else if (i <= 7) return nodes[i].y + L(0,  28, cut2);
    else             return nodes[i].y + L(0, -22, cut2);
  }

  const nodeR  = L(15, 10, t);
  const nodeC  = `rgb(${Math.round(L(192,228,t))},${Math.round(L(148,198,t))},${Math.round(L(82,130,t))})`;
  const nodeCs = `rgba(130,85,25,0.22)`;
  const linkW  = L(7, 3, t);
  const done   = t > 0.88;

  return (
    <svg viewBox="0 0 880 320" style={{ width:"100%", height:"100%", display:"block", background:bg }}>
      <text x="440" y="30" textAnchor="middle" fontSize="13" fill={P.soft} fontFamily="'Heebo',sans-serif">
        {t < 0.22 ? "שרשרת גלוטן — פולימר חלבוני רציף (גלוטנין)" :
         t < 0.52 ? "פרוטאז חותך את הקשר הראשון — שרשרת מתפרקת" :
         t < 0.85 ? "חיתוך שני — פפטידים קצרים ונגישים" :
         "פפטידים קצרים — קלים לאנזימי העיכול"}
      </text>

      {[{a:1,b:9},{a:4,b:11}].map(({a,b},si)=>{
        const opacity = Math.max(0, 1 - t*1.4);
        if (opacity < 0.02) return null;
        const ax = nodes[a].x, ay = nodeY(a);
        const bx = nodes[b].x, by = nodeY(b);
        const mx = (ax+bx)/2, my = (ay+by)/2 - 18;
        return (
          <g key={si} opacity={opacity}>
            <path d={`M${ax} ${ay-nodeR} Q${mx} ${my} ${bx} ${by-nodeR}`}
              fill="none" stroke="#B87040" strokeWidth="1.5" strokeDasharray="5 3"/>
            <text x={mx} y={my-6} textAnchor="middle" fontSize="10" fill="#B87040" fontFamily="'Heebo',sans-serif">S–S</text>
          </g>
        );
      })}

      {nodes.slice(0,-1).map((n,i) => {
        const x1=n.x, y1=nodeY(i), x2=nodes[i+1].x, y2=nodeY(i+1);
        const isCut1 = i === 3, isCut2 = i === 7;
        const op = isCut1 ? Math.max(0, 1-cut1) * 0.65 : isCut2 ? Math.max(0, 1-cut2) * 0.65 : 0.65;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={nodeC} strokeWidth={linkW} strokeLinecap="round" opacity={op}/>
        );
      })}

      {cut1 > 0.04 && (
        <g transform={`translate(${nodes[3].x + stepX/2}, ${(nodeY(3)+nodeY(4))/2 - 46})`}
          opacity={Math.min(1, cut1*2)}>
          <circle r="17" fill={P.surfaceAlt} stroke={P.border} strokeWidth="1.5"/>
          <path d="M-5-6 L5 6 M5-6 L-5 6" stroke={P.warmDeep} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx={-8} cy={-8} r={3.5} fill="none" stroke={P.warmDeep} strokeWidth="1.8"/>
          <circle cx={ 8} cy={ 8} r={3.5} fill="none" stroke={P.warmDeep} strokeWidth="1.8"/>
          <text textAnchor="middle" y="30" fontSize="11" fill={P.warmDeep} fontFamily="'Heebo',sans-serif">פרוטאז</text>
        </g>
      )}
      {cut2 > 0.04 && (
        <g transform={`translate(${nodes[7].x + stepX/2}, ${(nodeY(7)+nodeY(8))/2 + 50})`}
          opacity={Math.min(1, cut2*2)}>
          <circle r="17" fill={P.surfaceAlt} stroke={P.border} strokeWidth="1.5"/>
          <path d="M-5-6 L5 6 M5-6 L-5 6" stroke={P.warmDeep} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx={-8} cy={-8} r={3.5} fill="none" stroke={P.warmDeep} strokeWidth="1.8"/>
          <circle cx={ 8} cy={ 8} r={3.5} fill="none" stroke={P.warmDeep} strokeWidth="1.8"/>
          <text textAnchor="middle" y="30" fontSize="11" fill={P.warmDeep} fontFamily="'Heebo',sans-serif">פרוטאז</text>
        </g>
      )}

      {nodes.map((n,i) => {
        const cx=n.x, cy=nodeY(i);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={nodeR+4} fill={nodeC} opacity="0.13"/>
            <circle cx={cx} cy={cy} r={nodeR}   fill={nodeC} stroke={nodeCs} strokeWidth="1.5"/>
            <circle cx={cx-nodeR*0.3} cy={cy-nodeR*0.32} r={nodeR*0.27} fill="white" opacity="0.22"/>
            {done && (
              <path d={`M${cx-nodeR*0.48} ${cy}L${cx-nodeR*0.12} ${cy+nodeR*0.44}L${cx+nodeR*0.52} ${cy-nodeR*0.42}`}
                fill="none" stroke="rgba(50,130,70,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const IONS_ABS = [
  { x:180, y:180, lbl:"Fe", col:[192,120,55], delay:0   },
  { x:420, y:145, lbl:"Zn", col:[75,155,125], delay:0.4 },
  { x:660, y:180, lbl:"Mg", col:[145,115,185], delay:0.8},
];

export function AbsorptionScene({ t }) {
  const phyA   = Math.max(0, 1 - t*1.8);
  const freeA  = cl(0.45, t, 0.25);
  const driftA = cl(0.55, t, 0.25);
  const bg = `rgb(${Math.round(L(245,250,t))},${Math.round(L(237,244,t))},${Math.round(L(224,238,t))})`;

  return (
    <svg viewBox="0 0 840 340" style={{ width:"100%", height:"100%", display:"block", background:bg }}>
      <text x="420" y="38" textAnchor="middle" fontSize="13" fontFamily="'Heebo',sans-serif"
        fill={t >= 0.98 ? P.warmDeep : P.soft}
        fontWeight={t >= 0.98 ? "600" : "400"}>
        {t >= 0.98
          ? "✓ מינרלים חופשיים — זמינים לספיגה"
          : phyA > 0.55
          ? "חומצה פיטית קושרת את המינרלים — מונעת ספיגה"
          : "הטבעות מתפרקות — המינרלים מתחילים להשתחרר"}
      </text>

      {IONS_ABS.map((ion,i) => {
        const driftX = driftA * [50,-40,35][i];
        const driftY = driftA * [-25,35,-20][i];
        const ionCol = `rgb(${Math.round(L(148,ion.col[0],Math.min(1,t*2)))},${Math.round(L(142,ion.col[1],Math.min(1,t*2)))},${Math.round(L(138,ion.col[2],Math.min(1,t*2)))})`;
        const ionStroke = `rgb(${Math.round(L(178,Math.min(255,ion.col[0]+55),Math.min(1,t*2)))},${Math.round(L(172,Math.min(255,ion.col[1]+55),Math.min(1,t*2)))},${Math.round(L(168,Math.min(255,ion.col[2]+45),Math.min(1,t*2)))})`;

        return (
          <g key={i} transform={`translate(${ion.x+driftX},${ion.y+driftY})`}>
            <g style={{ animation:`floatSoft ${3.2+i*0.5}s ease-in-out infinite`, animationDelay:`${ion.delay}s` }}>
              <g opacity={phyA}>
                <circle r="66" fill="none" stroke="#8C9AA8" strokeWidth={L(3.5,0.5,1-phyA)}
                  strokeDasharray={`${L(0,10,phyA)} ${L(0,7,phyA)}`}/>
                <circle r="46" fill="none" stroke="#A0AAB0" strokeWidth={L(2.5,0.3,1-phyA)}
                  strokeDasharray={`${L(0,7,phyA)} ${L(0,9,phyA)}`} opacity="0.7"/>
                {[0,60,120,180,240,300].map((deg,di)=>{
                  const rad = deg*Math.PI/180;
                  return (
                    <text key={di} x={Math.cos(rad)*66} y={Math.sin(rad)*66+4}
                      textAnchor="middle" fontSize="10" fill="#8C9AA8"
                      fontFamily="'Heebo',sans-serif" opacity={phyA*0.75}>P</text>
                  );
                })}
              </g>

              <circle r="24" fill={ionCol} stroke={ionStroke} strokeWidth="2"/>
              <ellipse cx="-9" cy="-8" rx="9" ry="6" fill="white" opacity="0.2"/>
              <text textAnchor="middle" y="6" fontSize="15" fill="white"
                fontFamily="'Heebo',sans-serif" fontWeight="700">{ion.lbl}</text>

              <circle r="36" fill="none" stroke={ionStroke} strokeWidth="2" opacity={freeA*0.35}/>
            </g>
          </g>
        );
      })}

      {t > 0.2 && t < 0.7 && (
        <g opacity={Math.min(cl(0.2,t,0.15), 1-cl(0.6,t,0.15))}>
          <rect x="340" y="288" width="160" height="34" rx="5" fill={P.surfaceAlt} stroke={P.border} strokeWidth="1"/>
          <text x="420" y="310" textAnchor="middle" fontSize="13" fill={P.warmDeep} fontFamily="'Heebo',sans-serif">phytase פעיל</text>
        </g>
      )}
    </svg>
  );
}

export function SugarScene({ t }) {
  const OX=70, OY=278, AW=560, AH=220;
  const peakH  = L(0.9, 0.42, t);
  const peakX  = L(150, 220, t);
  const tailX  = L(270, 380, t);
  const refPath = `M${OX} ${OY} C${OX+55} ${OY} ${OX+100} ${OY-AH*0.96} ${OX+150} ${OY-AH*0.9} S${OX+270} ${OY} ${OX+AW} ${OY}`;
  const sourPath = `M${OX} ${OY} C${OX+55} ${OY} ${OX+peakX-55} ${OY-AH*peakH} ${OX+peakX} ${OY-AH*peakH} S${OX+tailX} ${OY} ${OX+AW} ${OY}`;
  const reduction = Math.round((1-peakH)*100);

  return (
    <svg viewBox="0 0 700 330" style={{ width:"100%", height:"100%", display:"block", background:"#F7EFE4" }}>
      {[0.25,0.5,0.75,1].map(f=>(
        <line key={f} x1={OX} y1={OY-AH*f} x2={OX+AW} y2={OY-AH*f} stroke="#E2D0BC" strokeWidth="1" strokeDasharray="4 4"/>
      ))}
      <line x1={OX} y1={OY+4} x2={OX+AW} y2={OY+4} stroke="#B7A38D" strokeWidth="2"/>
      <line x1={OX} y1={OY+4} x2={OX} y2={OY-AH-20} stroke="#B7A38D" strokeWidth="2"/>
      <text x={OX+AW/2} y={OY+32} textAnchor="middle" fontSize="13" fill="#6E5B4B" fontFamily="'Heebo',sans-serif">זמן (דקות)</text>
      {[0,60,120,180].map((min,i)=>{
        const x=OX+(min/180)*AW;
        return <g key={i}><line x1={x} y1={OY+4} x2={x} y2={OY+10} stroke="#B7A38D" strokeWidth="1.5"/><text x={x} y={OY+22} textAnchor="middle" fontSize="11" fill="#9A8876" fontFamily="'Heebo',sans-serif">{min}′</text></g>;
      })}
      <text x={OX-12} y={OY-AH/2+5} textAnchor="middle" fontSize="12" fill="#9A8876" fontFamily="'Heebo',sans-serif" transform={`rotate(-90,${OX-12},${OY-AH/2})`}>גלוקוז בדם</text>
      <path d={refPath+`L${OX+AW} ${OY}Z`} fill="#E0B8B0" opacity="0.2"/>
      <path d={refPath} fill="none" stroke="#C09090" strokeWidth="2" strokeDasharray="6 4" opacity="0.55"/>
      <text x={OX+160} y={OY-AH*0.84} fontSize="12" fill="#A08080" fontFamily="'Heebo',sans-serif">לחם רגיל</text>
      <path d={sourPath+`L${OX+AW} ${OY}Z`} fill={P.warmSoft} opacity={L(0.35,0.18,t)}/>
      <path d={sourPath} fill="none" stroke={P.warmDeep} strokeWidth="3" strokeLinecap="round"/>
      <text x={OX+peakX+15} y={OY-AH*peakH-10} fontSize="12" fill={P.warmDeep} fontFamily="'Heebo',sans-serif">מחמצת</text>
      {t>0.45&&(
        <g opacity={cl(0.45,t,0.18)}>
          <rect x={OX+peakX-52} y={OY-AH*peakH-32} width={104} height={24} rx={4} fill={P.warmDeep}/>
          <text x={OX+peakX} y={OY-AH*peakH-14} textAnchor="middle" fontSize="13" fill="white" fontFamily="'Heebo',sans-serif" fontWeight="600">{reduction}% פחות</text>
        </g>
      )}
    </svg>
  );
}
