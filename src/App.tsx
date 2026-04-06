import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { P } from "./lib/utils";
import { IntroSection } from "./components/IntroSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { ZoomSection } from "./components/ZoomSection";
import { Section4 } from "./components/Section4";

export default function App() {
  const [introAllRead, setIntroAllRead] = useState(false);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });

  return (
    <div dir="rtl" style={{ background:P.page,minHeight:"100vh",fontFamily:"'Heebo',sans-serif",color:P.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap');
        @keyframes floatSoft  {0%,100%{transform:translateY(0)}         50%{transform:translateY(-6px)}}
        @keyframes driftSoft  {0%,100%{transform:translate(0,0)}        50%{transform:translate(5px,-5px)}}
        @keyframes breatheSoft{0%,100%{transform:scale(1)}              50%{transform:scale(1.025)}}
        @keyframes glowPulse  {0%,100%{transform:scale(1);opacity:0.35} 50%{transform:scale(1.1);opacity:0.55}}
        @keyframes fadeIn     {from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)}}
        @keyframes bounceCTA  {0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)}}
        button{font-family:'Heebo',sans-serif;}
      `}</style>

      <header style={{ padding:"32px 24px 40px",maxWidth:1100,margin:"0 auto" }}>
        <div style={{ background:P.surface,border:`1px solid ${P.border}`,borderRadius:5,padding:"36px 40px",boxShadow:"0 0 18px rgba(70,44,24,0.06)",textAlign:"center" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background: P.surfaceAlt, border:`1px solid ${P.border}`,
            borderRadius:20, padding:"5px 14px", marginBottom:18,
          }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:P.warmDeep, flexShrink:0 }}/>
            <span style={{ fontSize:13, fontWeight:500, color:P.warmDeep, letterSpacing:"0.02em" }}>חוויית למידה תוססת במיוחד</span>
          </div>
          <h1 style={{ fontSize:48,fontWeight:700,color:P.text,margin:"0 0 16px",lineHeight:1.15 }}>מסע לעומק המחמצת</h1>
          <p style={{ fontSize:17,lineHeight:1.8,color:P.soft,maxWidth:560,margin:"0 auto 28px" }}>מה זה בכלל מחמצת? מי חי בה? מה היא עושה לגוף שלנו?</p>
          <div
            onClick={() => scrollTo("intro")}
            style={{
              width:52, height:52, borderRadius:"50%",
              background:P.warmDeep, display:"inline-flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", boxShadow:"0 4px 14px rgba(123,63,30,0.28)",
              animation:"bounceCTA 1.8s ease-in-out infinite",
            }}
          >
            <ArrowDown size={22} color="#FFFCF7"/>
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",flexDirection:"column",gap:64 }}>

        <IntroSection onAllRead={() => setIntroAllRead(true)} />

        <div style={{
          opacity: introAllRead ? 1 : 0.28,
          filter: introAllRead ? "none" : "grayscale(40%)",
          pointerEvents: introAllRead ? "auto" : "none",
          transition: "opacity 600ms ease, filter 600ms ease",
        }}>
          <div style={{ display:"flex", flexDirection:"column", gap:64 }}>
            <div id="benefits" style={{ scrollMarginTop:80 }}><BenefitsSection/></div>
            <div id="zoom"     style={{ scrollMarginTop:80 }}><ZoomSection/></div>
            <div id="section4" style={{ scrollMarginTop:80 }}><Section4/></div>
          </div>
        </div>

      </main>

      <footer style={{
        marginTop: 80,
        background: P.warmDeep,
        padding: "14px 24px",
        textAlign: "center",
      }}>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: "rgba(255,252,247,0.75)",
          fontFamily: "'Heebo',sans-serif",
          letterSpacing: "0.01em",
        }}>
          נבנה ע״י: טל ביגדרי | הפקולטה לטכנולוגיות למידה | תואר שני | מכון טכנולוגי חולון
        </p>
      </footer>
    </div>
  );
}
