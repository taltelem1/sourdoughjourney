// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { BookOpen, Microscope, Droplets, ChevronLeft, ArrowDown } from "lucide-react";
import { P } from "../lib/utils";

const INTRO_CARDS = [
  {
    icon: <BookOpen size={18}/>,
    title: "מהי מחמצת?",
    preview: "תערובת של קמח ומים שבה מתפתחת תרבית חיה.",
    text: "מחמצת היא לא סתם בצק. היא תערובת של קמח ומים שתוססת לאורך זמן ובאופן טבעי. עם הזמן, המיקרואורגניזמים שמגיעים מן הקמח, המים והסביבה מתרבים בה והופכים לתרבית חיה ויציבה — מערכת אקולוגית ממש בקערה שלכם.",
    hint: "מכאן מתחיל כל הסיפור.",
  },
  {
    icon: <Microscope size={18}/>,
    title: "מי חי בתוכה?",
    preview: "שמרי בר וחיידקי חומצה לקטית פועלים יחד.",
    text: "שני שחקנים ראשיים: שמרי בר (בעיקר Saccharomyces ו-Kazachstania) מייצרים CO₂ שמנפח את הבצק. לצידם פועלים חיידקי חומצה לקטית (Lactobacillus, Leuconostoc) שבאמצעות תהליכים ביולוגיים של פירוק נותנים ללחם טעם חמצמץ ומסייעים להפוך אותו לבריא יותר.",
    hint: "לא שחקן אחד — קהילה שלמה.",
  },
  {
    icon: <Droplets size={18}/>,
    title: "מה משתנה בתסיסה?",
    preview: "הבצק לא רק תופח. כימיה שלמה מתרחשת פנימה.",
    text: "בזמן התסיסה מתרחשים שלושה תהליכים במקביל: אנזימי פרוטאז מפרקים שרשראות גלוטן, חומצה פיטית נחלשת ומשחררת מינרלים, ורמות FODMAP יורדות. התוצאה — לחם עם פרופיל תזונתי שונה לחלוטין מלחם שמרים רגיל.",
    hint: "ועכשיו אפשר להיכנס פנימה.",
  },
];

function FlowIcon() {
  return (
    <svg viewBox="0 0 40 40" width="18" height="18" style={{display:"block"}}>
      <circle cx="20" cy="6"  r="5" fill="none" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="6"  cy="31" r="5" fill="none" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="34" cy="31" r="5" fill="none" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M23 10 L30 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#fArr)"/>
      <path d="M28 34 L12 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#fArr)"/>
      <path d="M9 26 L16 10"  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#fArr)"/>
      <defs>
        <marker id="fArr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M1 1L7 4L1 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
    </svg>
  );
}

export function IntroSection({ onAllRead }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [readSet, setReadSet] = useState(new Set());
  const done = readSet.size === INTRO_CARDS.length;

  const ICONS = [<BookOpen size={18}/>, <Microscope size={18}/>, <FlowIcon/>];

  const handleClick = (i) => {
    const next = openIdx === i ? null : i;
    setOpenIdx(next);
    if (next !== null) setReadSet(prev => new Set([...prev, i]));
  };

  const prevDone = useRef(false);
  useEffect(() => {
    if (done && !prevDone.current) { prevDone.current = true; onAllRead(); }
  }, [done, onAllRead]);

  return (
    <section id="intro" style={{ scrollMarginTop:80 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
        <div style={{ width:32,height:32,borderRadius:5,border:`1px solid ${P.border}`,background:P.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:600,color:P.warmDeep }}>1</div>
        <h2 style={{ fontSize:28,fontWeight:600,color:P.text,margin:0 }}>לפני שמתחילים</h2>
      </div>
      <p style={{ color:P.soft,fontSize:15,lineHeight:1.75,maxWidth:600,margin:"0 0 20px" }}>
        קצת רקע על מה זה מחמצת בכלל. לחצו על כל כרטיס לקריאה והתקדמו הלאה.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, alignItems:"start" }}>
        {INTRO_CARDS.map((c, i) => {
          const isOpen = openIdx === i;
          const isDone = readSet.has(i);
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                background: P.surface,
                border: `1.5px solid ${isDone ? "#6AAF7A" : isOpen ? P.warmSoft : P.border}`,
                borderRadius: 5,
                padding: isOpen ? "20px 20px 22px" : "16px 20px",
                cursor: "pointer",
                transition: "all 300ms ease",
                boxShadow: isOpen ? "0 4px 18px rgba(70,44,24,0.09)" : "0 0 14px rgba(70,44,24,0.04)",
                userSelect: "none",
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{
                  width:38, height:38, borderRadius:5, flexShrink:0,
                  border:`1px solid ${isDone ? "#6AAF7A" : P.border}`,
                  background: isDone ? "#EAF5EC" : P.surfaceAlt,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color: isDone ? "#4A9058" : P.warm,
                  transition:"all 300ms ease",
                }}>
                  {isDone ? <span style={{fontSize:17,fontWeight:700}}>✓</span> : ICONS[i]}
                </div>

                <h3 style={{
                  fontSize:16, fontWeight:600, margin:0, flex:1,
                  color: isDone ? "#2A6B38" : P.text,
                  transition:"color 300ms",
                }}>
                  {c.title}
                </h3>

                <div style={{
                  color: P.soft, flexShrink:0,
                  transform: isOpen ? "rotate(-90deg)" : "rotate(0deg)",
                  transition:"transform 260ms ease",
                }}>
                  <ChevronLeft size={16}/>
                </div>
              </div>

              {isOpen && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${P.border}`, animation:"fadeIn 220ms ease" }}>
                  <p style={{ fontSize:14,lineHeight:1.85,color:P.soft,margin:"0 0 12px" }}>{c.text}</p>
                  <div style={{ fontSize:13,color:isDone?"#4A9058":P.warmDeep,fontWeight:500 }}>{c.hint}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop:22,
        display:"flex", alignItems:"center", justifyContent:"flex-end", gap:14,
        opacity: done ? 1 : 0,
        transition:"opacity 500ms ease",
        pointerEvents: done ? "auto" : "none",
      }}>
        <span style={{ fontSize:15,fontWeight:600,color:P.warmDeep }}>מוכנים — לראות מה התסיסה משנה</span>
        <div
          onClick={() => document.getElementById("benefits")?.scrollIntoView({behavior:"smooth",block:"start"})}
          style={{
            width:44, height:44, borderRadius:"50%",
            background: P.warmDeep,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", flexShrink:0,
            animation: done ? "bounceCTA 1.8s ease-in-out infinite" : "none",
            boxShadow:"0 4px 14px rgba(123,63,30,0.28)",
          }}
        >
          <ArrowDown size={20} color="#FFFCF7"/>
        </div>
      </div>
    </section>
  );
}
