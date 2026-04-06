// @ts-nocheck
import { useState, useRef } from "react";
import { P } from "../lib/utils";
import { MacroScene, GlutenScene, StarchScene, OrganismScene } from "./ZoomScenes";

const ZOOM_STAGES=[
  {mag:"×1",      sub:"קערת המחמצת",       desc:"המחמצת כפי שהיא — מסה חיה ותוססת שתופחת בקצב קבוע. הגז שנוצר בתוכה (CO₂) יוצר את הנפח ואת הטקסטורה הספוגית של הלחם."},
  {mag:"×100",    sub:"רשת הגלוטן",        desc:"הגלוטן הוא הרשת החלבונית שנוצרת כשקמח ומים נלושים יחד. היא לוכדת את הגז מבפנים — בלעדיה הבצק היה שוקע."},
  {mag:"×400",    sub:"גרגרי עמילן",       desc:"עמילן הוא הפחמימה העיקרית בקמח. ברגע שנוגע במים, הוא סופג אותם ומתחיל להיכנס לתהליך. זה השלב שבו מיקרואורגניזמים יכולים להתחיל לנצל אותו."},
  {mag:"×4,000",  sub:"קהילה מיקרוביאלית",desc:"כאן מתחוללת הקסם. שמרים וחיידקי חומצה לקטית עובדים יחד — חלקם מנפחים, חלקם מחמיצים, וחלקם יוצרים את החומרים שהופכים את המחמצת לטובה לגוף."},
];

function getZoomOps(v){const s=v/100;if(s<0.333){const t=s/0.333;return[1-t,t,0,0];}else if(s<0.666){const t=(s-0.333)/0.333;return[0,1-t,t,0];}else{const t=(s-0.666)/0.334;return[0,0,1-t,t];}}

const TRACK_PAD = 20;

export function ZoomSection() {
  const [val,setVal]=useState(0);
  const trackRef=useRef(null);
  const dragging=useRef(false);
  const si=Math.min(3,Math.floor(val/25));
  const stage=ZOOM_STAGES[si];
  const ops=getZoomOps(val);
  const scale=1+(val/100)*0.26;
  const scenes=[MacroScene,GlutenScene,StarchScene,OrganismScene];

  const yToV=cy=>{
    const r=trackRef.current?.getBoundingClientRect();
    if(!r)return 0;
    const usable=r.height-TRACK_PAD*2;
    return Math.max(0,Math.min(100,((cy-(r.top+TRACK_PAD))/usable)*100));
  };
  const onDown=e=>{dragging.current=true;trackRef.current?.setPointerCapture(e.pointerId);setVal(yToV(e.clientY));};
  const onMove=e=>{if(!dragging.current)return;setVal(yToV(e.clientY));};
  const onUp=()=>{dragging.current=false;};
  const snap=i=>setVal([0,33,66,100][i]);

  const thumbTop=`calc(${TRACK_PAD}px + ${val/100} * (100% - ${TRACK_PAD*2}px))`;
  const stopTop=(sv)=>`calc(${TRACK_PAD}px + ${sv/100} * (100% - ${TRACK_PAD*2}px))`;

  return (
    <section>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
          <div style={{width:32,height:32,borderRadius:5,border:`1px solid ${P.border}`,background:P.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:600,color:P.warmDeep}}>3</div>
          <h2 style={{fontSize:28,fontWeight:600,color:P.text,margin:0}}>להיכנס פנימה</h2>
        </div>
        <p style={{color:P.soft,fontSize:15,lineHeight:1.75,maxWidth:640,margin:0}}>גררו את הנקודה כלפי מטה כדי לצלול — מהקערה עד השמרים הזעירים.</p>
      </div>
      <div style={{background:P.surface,border:`1px solid ${P.border}`,borderRadius:5,padding:"18px 22px",boxShadow:"0 0 18px rgba(70,44,24,0.06)"}}>
        <div style={{display:"grid",gridTemplateColumns:"110px 1fr",gap:10,marginBottom:14}}>
          <div style={{background:P.surfaceAlt,border:`1px solid ${P.border}`,borderRadius:5,padding:"12px 10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minWidth:0}}>
            <div style={{fontSize:10,color:P.soft,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>הגדלה</div>
            <div style={{fontSize:22,fontWeight:800,color:P.warmDeep,lineHeight:1,transition:"all 350ms",textAlign:"center"}}>{stage.mag}</div>
          </div>
          <div style={{background:P.surfaceAlt,border:`1px solid ${P.border}`,borderRadius:5,padding:"12px 16px",borderRight:`3px solid ${P.warm}`,minWidth:0,overflow:"hidden"}}>
            <div style={{fontSize:13,fontWeight:700,color:P.text,marginBottom:5}}>{stage.sub}</div>
            <div style={{fontSize:13,lineHeight:1.7,color:P.soft,transition:"all 350ms"}}>{stage.desc}</div>
          </div>
        </div>

        <div style={{display:"flex",gap:0,alignItems:"stretch"}}>
          <div style={{flex:1,position:"relative",aspectRatio:"16/10",overflow:"hidden",borderRadius:"5px 0 0 5px",border:`1px solid ${P.border}`,borderRight:"none"}}>
            <div style={{position:"absolute",inset:0,transform:`scale(${scale})`,transformOrigin:"center center",transition:"transform 180ms ease-out"}}>
              {scenes.map((Scene,i)=>(<div key={i} style={{position:"absolute",inset:0,opacity:ops[i],transition:"opacity 480ms ease",pointerEvents:"none"}}><Scene/></div>))}
            </div>
            
            {/* Scale Bar Overlay */}
            <svg style={{position:"absolute", bottom: 20, right: 20, width: 140, height: 30, pointerEvents: "none"}}>
              {[
                { text: "1 cm", bg: "rgba(245,237,224,0.75)", fg: "#6B5240", w: 120 },
                { text: "100 μm", bg: "rgba(90,70,50,0.45)", fg: "#F5EEE0", w: 130 },
                { text: "10 μm", bg: "rgba(40,55,70,0.55)", fg: "white", w: 120 },
                { text: "1 μm", bg: "rgba(20,20,20,0.45)", fg: "white", w: 110 },
              ].map((bar, i) => (
                <g key={i} opacity={ops[i] * (i === 0 ? 0.55 : i === 1 ? 0.6 : i === 2 ? 0.6 : 0.65)} style={{transition: "opacity 480ms ease"}}>
                  <rect x={140 - bar.w} y="0" width={bar.w} height="26" rx="4" fill={bar.bg}/>
                  <line x1={140 - bar.w + 12} y1="18" x2={140 - 12} y2="18" stroke={bar.fg} strokeWidth="2"/>
                  <line x1={140 - bar.w + 12} y1="14" x2={140 - bar.w + 12} y2="22" stroke={bar.fg} strokeWidth="1.5"/>
                  <line x1={140 - 12} y1="14" x2={140 - 12} y2="22" stroke={bar.fg} strokeWidth="1.5"/>
                  <text x={140 - bar.w/2} y="12" fontSize="12" fill={bar.fg} fontFamily="'Heebo',sans-serif" textAnchor="middle">{bar.text}</text>
                </g>
              ))}
            </svg>
          </div>

          <div ref={trackRef}
            onPointerDown={onDown} onPointerMove={onMove}
            onPointerUp={onUp} onPointerCancel={onUp}
            style={{
              width:72, position:"relative", flexShrink:0,
              borderRadius:"0 5px 5px 0",
              border:`1px solid ${P.border}`, borderLeft:"none",
              background:P.surfaceAlt,
              userSelect:"none", cursor:"ns-resize",
            }}>

            <div style={{
              position:"absolute",
              top:TRACK_PAD, bottom:TRACK_PAD,
              left:"50%", transform:"translateX(-50%)",
              width:2, background:P.border, borderRadius:1,
            }}/>

            {ZOOM_STAGES.map((s,i)=>{
              const sv=[0,33,66,100][i];
              const active=si===i;
              return (
                <div key={i} onClick={()=>snap(i)} style={{
                  position:"absolute",
                  top:stopTop(sv),
                  left:0, right:0,
                  transform:"translateY(-50%)",
                  display:"flex", flexDirection:"column", alignItems:"center",
                  cursor:"pointer", zIndex:2, gap:3,
                }}>
                  <div style={{
                    width:active?14:9, height:active?14:9, borderRadius:"50%",
                    background:active?P.warmDeep:P.surface,
                    border:`2px solid ${active?P.warmDeep:P.warmSoft}`,
                    transition:"all 260ms ease",
                    boxShadow:active?`0 0 0 3px ${P.warmSoft}44`:"none",
                  }}/>
                  <span style={{
                    fontSize:11.5, fontWeight:active?700:500,
                    color:active?P.warmDeep:P.soft,
                    lineHeight:1.1, textAlign:"center",
                    whiteSpace:"nowrap",
                  }}>{s.mag}</span>
                </div>
              );
            })}

            <div style={{
              position:"absolute",
              top:thumbTop,
              left:"50%",
              transform:"translate(-50%,-50%)",
              width:22, height:22, borderRadius:"50%",
              background:P.warmDeep, border:`3px solid ${P.surface}`,
              boxShadow:"0 2px 8px rgba(123,63,30,0.35)",
              zIndex:3, pointerEvents:"none",
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}
