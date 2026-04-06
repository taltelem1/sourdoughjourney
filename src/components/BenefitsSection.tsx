// @ts-nocheck
import { useState } from "react";
import { Wheat, Activity } from "lucide-react";
import { P } from "../lib/utils";
import { MicrobiomeScene, DigestScene, AbsorptionScene, SugarScene } from "./Scenes";
import { TimeSlider, TSTOPS } from "./TimeSlider";

function PetriDishIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="7" opacity="0.5" />
      <line x1="9" y1="10" x2="11" y2="10" />
      <line x1="14" y1="14" x2="15" y2="15" />
      <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function StomachIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v4c-5 0-7 4-6 10 1 5 7 7 11 4 4-3 6-5 6-8 0-4-3-5-5-5-2 0-3-2-3-5" />
    </svg>
  );
}

const TIME_DESC = {
  microbiome:[
    {title:"בתחילת הדרך",       desc:"המחמצת רק מתחילה להתגבש. יש בה כמה זנים של חיידקים — בעיקר כאלה שהגיעו מן הקמח. הסביבה עדיין פשוטה, ועדיין לא נוצר המגוון שעושה את ההבדל."},
    {title:"החיים מתחילים",     desc:"הקהילה מתרחבת. זנים נוספים מתחילים להופיע ולהתרבות, ומתחיל ריח חמוץ עדין — סימן שהחיידקים פעילים ומייצרים חומצות."},
    {title:"פסגת הפעילות",      desc:"קהילה מגוונת ועשירה. סוגים שונים של חיידקים עובדים יחד — חלקם מחמיצים, חלקם מייצרים ויטמינים, וחלקם יוצרים תוצרים שיהיו מזון לחיידקי המעי שלנו."},
    {title:"בשלה ומוכנה",       desc:"בשלב זה המחמצת כוללת כמות גדולה ומגוונת של חיידקים, לצד סיבים שנוצרו במהלך התסיסה — אלה יכולים לתמוך בסביבת המעי ולהזין את הקהילה שחיה שם."},
  ],
  digestion:[
    {title:"לפני שהתסיסה עובדת", desc:"הגלוטן בבצק עדיין בצורתו המקורית — שרשראות חלבון ארוכות ומסובכות. הגוף יכול לעכל אותן, אבל זה לוקח מאמץ, ואצל חלק מהאנשים זה מרגיש כבד."},
    {title:"פירוק מתחיל",        desc:"אנזימים שמופעלים על ידי התסיסה מתחילים לחתוך את שרשראות הגלוטן. הם פועלים כמו מספריים זעירות — חותכים בנקודות ספציפיות לאורך השרשרת."},
    {title:"השרשרת מתפרקת",     desc:"עוד חתכים, קטעים קצרים יותר. ככל שהתסיסה נמשכת, כך נוצרים יותר קטעים קטנים שקל יותר לאנזימי העיכול לטפל בהם — ופחות עבודה לגוף."},
    {title:"פפטידים קצרים",      desc:"שרשראות הגלוטן פורקו לקטעים קצרים. לגוף הרבה יותר קל לפרק ולספוג אותם. זו אחת הסיבות שאנשים שמתקשים עם גלוטן מדווחים לפעמים על תחושה קלה יותר עם לחם מחמצת."},
  ],
  absorption:[
    {title:"מינרלים לכודים",    desc:"בדגנים יש חומצה פיטית — מולקולה שנקשרת לברזל, אבץ ומגנזיום ומונעת מהם להיספג. בשלב זה רוב המינרלים עדיין כבולים ולא זמינים לגוף."},
    {title:"הקשרים מתחילים להיחלש", desc:"החומציות שנבנית בתסיסה מפעילה אנזים בשם phytase. הוא מתחיל לפרק את הקשר בין החומצה הפיטית לבין המינרלים — כמו שפותחים מנעול."},
    {title:"שחרור הדרגתי",       desc:"ככל שהתסיסה מתמשכת, יותר ויותר מינרלים משתחררים מהקשרים שלהם. הם הופכים לחופשיים יותר — ובמצב זה הגוף יכול לספוג אותם."},
    {title:"זמינות מלאה",        desc:"בסיום תסיסה ארוכה, רוב הקשרים כבר פורקו. ברזל, אבץ ומגנזיום הרבה יותר זמינים לספיגה במעי — ערך תזונתי גבוה יותר מאותם מינרלים בלחם רגיל."},
  ],
  sugar:[
    {title:"כמו לחם רגיל",        desc:"בתחילת התסיסה הלחם עדיין מתנהג בצורה דומה ללחם לבן רגיל — הגלוקוז נספג במהירות ורמת הסוכר בדם עולה בחדות לאחר האכילה."},
    {title:"השפעה ראשונה",         desc:"החומצות שנוצרות בתסיסה מתחילות לשנות את הדרך שבה העמילן נספג. הן מאטות את הפירוק — ובעקבות זאת גם את קצב כניסת הגלוקוז לדם."},
    {title:"עקומה מתונה יותר",    desc:"הגוף מקבל את האנרגיה מהלחם בצורה הדרגתית יותר. השיא נמוך יותר, ומגיע מאוחר יותר — פחות עומס על מערכת ויסות הסוכר."},
    {title:"תגובה מאוזנת",        desc:"לחם מחמצת שתסס מספיק זמן מניב תגובת סוכר מתונה משמעותית ביחס ללחם רגיל. זה לא תחליף לייעוץ רפואי, אבל זה הבדל אמיתי שנמדד במחקרים קליניים."},
  ],
};

const BTABS = [
  { id:"microbiome", label:"מיקרוביום",  sub:"סיבים ומגוון",    icon:<PetriDishIcon size={18}/>, Scene:MicrobiomeScene },
  { id:"digestion",  label:"עיכול",      sub:"גלוטן",           icon:<StomachIcon size={18}/>,   Scene:DigestScene     },
  { id:"absorption", label:"ספיגה",      sub:"מינרלים",         icon:<Wheat size={18}/>,         Scene:AbsorptionScene },
  { id:"sugar",      label:"סוכר בדם",   sub:"תגובה גליקמית",   icon:<Activity size={18}/>,      Scene:SugarScene      },
];

const COMPLETION_MSG = {
  microbiome: "לאחר 12 שעות תסיסה נוצרת קהילה מיקרוביאלית עשירה ומגוונת, לצד סיבים שיכולים לתמוך בבריאות המעי.",
  digestion:  "תסיסה ארוכה פורקת את שרשראות הגלוטן לקטעים קצרים — קל יותר לגוף לעכל ולספוג.",
  absorption: "לאחר 12 שעות, רוב הקשרים של החומצה הפיטית פורקו. ברזל, אבץ ומגנזיום — זמינים הרבה יותר לגוף.",
  sugar:      "תסיסה מלאה מניבה עלייה מתונה ומאוזנת בסוכר בדם — הבדל שנמדד ומשמעותי לעומת לחם רגיל.",
};

export function BenefitsSection() {
  const [activeId, setActiveId] = useState("microbiome");
  const [tv, setTv] = useState(0);
  const [completedTabs, setCompletedTabs] = useState(new Set());
  const active = BTABS.find(b=>b.id===activeId);
  const t      = tv/100;
  const si     = Math.min(3, Math.round(tv/33));
  const desc   = TIME_DESC[activeId][si];
  const isDone = tv >= 98;

  const handleTab = id => { setActiveId(id); setTv(0); };
  const handleSlider = v => {
    setTv(v);
    if (v >= 98) setCompletedTabs(prev => new Set([...prev, activeId]));
  };

  return (
    <section>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
          <div style={{ width:32,height:32,borderRadius:5,border:`1px solid ${P.border}`,background:P.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:600,color:P.warmDeep }}>2</div>
          <h2 style={{ fontSize:28,fontWeight:600,color:P.text,margin:0 }}>מה התסיסה משנה</h2>
        </div>
        <p style={{ color:P.soft,fontSize:15,lineHeight:1.75,maxWidth:640,margin:0 }}>
          גררו את הסרגל ימינה לראות מה משתנה בכל שעת תסיסה. בחרו נושא לפי עניין.
        </p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14 }}>
        {BTABS.map(tab => {
          const isActive   = activeId===tab.id;
          const isComplete = completedTabs.has(tab.id);
          return (
            <button key={tab.id} onClick={()=>handleTab(tab.id)} style={{
              background:isActive?P.surfaceAlt:P.surface,
              border:`1.5px solid ${isComplete ? "#6AAF7A" : isActive ? P.warmSoft : P.border}`,
              borderRadius:5, padding:"14px 10px", cursor:"pointer", transition:"all 260ms ease",
              boxShadow:"0 0 14px rgba(70,44,24,0.05)", textAlign:"center", position:"relative",
            }}>
              {isComplete && (
                <div style={{
                  position:"absolute", top:6, left:8,
                  width:18, height:18, borderRadius:"50%",
                  background:"#6AAF7A", display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <span style={{ color:"white", fontSize:11, fontWeight:700, lineHeight:1 }}>✓</span>
                </div>
              )}
              <div style={{ display:"flex",justifyContent:"center",marginBottom:7,color:isActive?P.warmDeep:P.warm,animation:"breatheSoft 6s ease-in-out infinite" }}>{tab.icon}</div>
              <div style={{ fontSize:14,fontWeight:600,color:P.text,marginBottom:2 }}>{tab.label}</div>
              <div style={{ fontSize:12,color:P.soft }}>{tab.sub}</div>
              {isActive&&<div style={{ width:22,height:2,borderRadius:1,background:P.warmDeep,margin:"8px auto 0" }}/>}
            </button>
          );
        })}
      </div>

      <div style={{ background:P.surface,border:`1px solid ${P.border}`,borderRadius:5,padding:"18px 22px",boxShadow:"0 0 18px rgba(70,44,24,0.06)" }}>

        <div style={{ display:"grid",gridTemplateColumns:"130px 1fr",gap:10,marginBottom:14 }}>
          <div style={{ background:P.surfaceAlt,border:`1px solid ${P.border}`,borderRadius:5,padding:"12px 14px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
            <div style={{ fontSize:10,color:P.soft,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4 }}>שעת תסיסה</div>
            <div style={{ fontSize:26,fontWeight:800,color:isDone?"#2A6B38":P.warmDeep,lineHeight:1,transition:"all 300ms" }}>{TSTOPS[si].h}</div>
            <div style={{ fontSize:12,color:isDone?"#4A9058":P.warm,fontWeight:600,marginTop:3 }}>{TSTOPS[si].sub}</div>
          </div>
          <div style={{
            background:isDone?"#EAF5EC":P.surfaceAlt,
            border:`1.5px solid ${isDone?"#6AAF7A":P.border}`,
            borderRadius:5, padding:"12px 16px",
            borderRight:`3px solid ${isDone?"#4A9058":P.warm}`,
            transition:"all 400ms ease",
          }}>
            <div style={{ fontSize:13,fontWeight:700,color:isDone?"#2A6B38":P.text,marginBottom:5,transition:"all 300ms" }}>
              {isDone ? "✓ " : ""}{desc.title}
            </div>
            <div style={{ fontSize:14,lineHeight:1.75,color:isDone?"#3A7A48":P.soft,transition:"all 300ms" }}>{desc.desc}</div>
          </div>
        </div>

        <TimeSlider value={tv} onChange={handleSlider}/>

        <div style={{ border:`1.5px solid ${isDone?"#6AAF7A":P.border}`,borderRadius:5,overflow:"hidden",aspectRatio:"920/400",marginTop:14,transition:"border-color 400ms ease" }}>
          {active && <active.Scene t={t}/>}
        </div>

        {isDone && (
          <div style={{
            marginTop:12, background:"#EAF5EC", border:"1.5px solid #6AAF7A",
            borderRadius:5, padding:"14px 20px",
            display:"flex", alignItems:"center", gap:14,
            animation:"fadeIn 400ms ease",
          }}>
            <div style={{
              width:36, height:36, borderRadius:"50%", background:"#4A9058",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>
              <span style={{ color:"white", fontSize:18, fontWeight:700 }}>✓</span>
            </div>
            <div>
              <div style={{ fontSize:14,fontWeight:700,color:"#1E5C2E",marginBottom:3 }}>12 שעות תסיסה — בשלות מלאה</div>
              <div style={{ fontSize:13,color:"#3A7A48",lineHeight:1.6 }}>{COMPLETION_MSG[activeId]}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
