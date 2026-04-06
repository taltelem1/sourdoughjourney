// @ts-nocheck
import { useRef, useCallback } from "react";
import { P } from "../lib/utils";

export const TSTOPS = [
  {v:0,  h:"0 שע׳",  sub:"בצק ראשוני"},
  {v:33, h:"4 שע׳",  sub:"תחילת תסיסה"},
  {v:66, h:"8 שע׳",  sub:"שיא פעילות"},
  {v:100,h:"12 שע׳", sub:"בשלות מלאה"},
];

export function TimeSlider({ value, onChange }) {
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const toV = useCallback(cx => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return 0;
    return Math.max(0, Math.min(100, ((cx-r.left)/r.width)*100));
  }, []);
  const onDown = useCallback(e => { dragging.current=true; trackRef.current?.setPointerCapture(e.pointerId); onChange(toV(e.clientX)); }, [onChange,toV]);
  const onMove = useCallback(e => { if (!dragging.current) return; onChange(toV(e.clientX)); }, [onChange,toV]);
  const onUp   = useCallback(() => { dragging.current=false; }, []);
  const si = Math.min(3, Math.round(value/33));
  const TRACK_TOP = 44;

  return (
    <div style={{ padding:"0 4px" }}>
      <div ref={trackRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{ position:"relative", height:72, cursor:"ew-resize", userSelect:"none" }}>

        {TSTOPS.map((s,i) => {
          const active = si===i;
          return (
            <div key={i} onClick={()=>onChange(s.v)} style={{
              position:"absolute", left:`${s.v}%`, top:0,
              transform:"translateX(-50%)",
              display:"flex", flexDirection:"column", alignItems:"center",
              cursor:"pointer", zIndex:2,
            }}>
              <span style={{ fontSize:12, fontWeight:active?700:500, color:active?P.warmDeep:P.soft, whiteSpace:"nowrap", lineHeight:1.4 }}>
                {s.h}
              </span>
            </div>
          );
        })}

        <div style={{ position:"absolute", top:TRACK_TOP, left:0, right:0, height:3, background:P.border, borderRadius:99 }}/>
        <div style={{ position:"absolute", top:TRACK_TOP, left:0, width:`${value}%`, height:3, background:P.warmDeep, borderRadius:99 }}/>

        {TSTOPS.map((s,i) => {
          const active = si===i;
          return (
            <div key={i} onClick={()=>onChange(s.v)} style={{
              position:"absolute", left:`${s.v}%`, top:TRACK_TOP+1.5,
              transform:"translate(-50%,-50%)", zIndex:2, cursor:"pointer",
              width:active?14:10, height:active?14:10, borderRadius:"50%",
              background:active?P.warmDeep:P.surface,
              border:`2px solid ${active?P.warmDeep:P.warmSoft}`,
              transition:"all 280ms ease",
              boxShadow:active?`0 0 0 3px ${P.warmSoft}55`:"none",
            }}/>
          );
        })}

        <div style={{
          position:"absolute", top:TRACK_TOP+1.5, left:`${value}%`,
          transform:"translate(-50%,-50%)",
          width:22, height:22, borderRadius:"50%",
          background:P.warmDeep, border:`3px solid ${P.surface}`,
          boxShadow:"0 2px 8px rgba(123,63,30,0.35)",
          zIndex:3, pointerEvents:"none",
        }}/>
      </div>
    </div>
  );
}
