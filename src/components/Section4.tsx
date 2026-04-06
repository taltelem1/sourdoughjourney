// @ts-nocheck
import { useState } from "react";
import { P } from "../lib/utils";

const QUIZ_Q = [
  {
    text: "הופעת בועות רבות ותפיחה מהירה ומרשימה ביום השני או השלישי להכנת מחמצת חדשה, מעידות על כך שהמחמצת מוכנה לאפיית לחם.",
    answer: false,
    explanation: "תופעה זו ידועה כ\"תפיחת שווא\" (False Rise) והיא אינה מעידה על פעילות שמרים. מדובר למעשה בשגשוג של בקטריות שנשרפות ומייצרות גזים וריחות לא נעימים בימים הראשונים. יש להמשיך להמתין בסבלנות ולאפות רק כשהמחמצת מתייצבת (בדרך כלל סביב יום 10 ואילך).",
  },
  {
    text: "הופעת נוזל אפרפר וצלול (Hooch) על פני המחמצת מעידה על כך שהיא התקלקלה ויש לזרוק אותה מיד.",
    answer: false,
    explanation: "הנוזל הזה נוצר כשהמחמצת שלכם רעבה ודורשת האכלה, והוא סימן חיובי לכך שהיא עדיין חיה. ניתן פשוט לשפוך את הנוזל החוצה או לערבב אותו בחזרה אל תוך המחמצת, ולאחר מכן להאכיל אותה כרגיל.",
  },
  {
    text: "אם מופיע עובש בצבעי ורוד, כתום או ירוק, או פלומה אפורה ולבנה על פני המחמצת – חובה לזרוק הכל ולהתחיל מחדש.",
    answer: true,
    explanation: "סימנים אלו מעידים על עובש או קלקול מזון מסוכן. במקרים כאלה אין ברירה אלא לזרוק את המחמצת מיד, לשטוף ולחטא את הכלים היטב, ולהתחיל את התהליך מהתחלה.",
  },
  {
    text: "כדי להתחיל מחמצת חדשה בהצלחה מרובה, מומלץ להשתמש ב-100% קמח לבן או קמח לחם, כיוון שיש בהם הכי הרבה שמרים.",
    answer: false,
    explanation: "קשה מאוד להתחיל מחמצת מאפס באמצעות קמח לבן בלבד. שמרי הפרא נמצאים בטבע בעיקר על גבי הקליפה החיצונית של גרעין החיטה (הסובין), ולכן מומלץ להשתמש לפחות ב-50% קמח מלא או 25% קמח שיפון בתערובת שלכם.",
  }
];

const QUIZ_MSGS = [
  "כדאי לצפות בסרטון שוב — עם כמה חזרות זה יתבהר!",
  "התחלה טובה, אבל יש עוד מה ללמוד. כדאי לחזור על החומר.",
  "יפה! יש הבנה בסיסית. עוד קצת ותהיו מוכנים לאפות.",
  "כמעט מושלם! אתם בדרך הנכונה.",
  "מצוין! אתם מוכנים להתחיל לפתח מחמצת ראשונה.",
];

export function Section4() {
  const [videoActive, setVideoActive] = useState(false);
  const [cur, setCur] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done, setDone] = useState(false);

  const q = QUIZ_Q[cur];
  const answered = chosen !== null;

  const handleAnswer = (val) => {
    if (answered) return;
    setChosen(val);
    if (val === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (cur < QUIZ_Q.length - 1) {
      setCur(c => c + 1);
      setChosen(null);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setCur(0); setScore(0); setChosen(null); setDone(false);
  };

  const VID_ID = "Uc_MB-T3tRk";
  const thumbUrl = `https://img.youtube.com/vi/${VID_ID}/maxresdefault.jpg`;

  return (
    <section>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
          <div style={{ width:32,height:32,borderRadius:5,border:`1px solid ${P.border}`,background:P.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:600,color:P.warmDeep }}>4</div>
          <h2 style={{ fontSize:28,fontWeight:600,color:P.text,margin:0 }}>צעדים ראשונים להכנת מחמצת ביתית</h2>
        </div>
        <p style={{ color:P.soft,fontSize:15,lineHeight:1.75,maxWidth:640,margin:0 }}>
          צפו בסרטון ולאחר מכן ענו על השאלות.
        </p>
      </div>

      <div style={{ background:P.surface,border:`1px solid ${P.border}`,borderRadius:5,padding:"20px 24px",boxShadow:"0 0 18px rgba(70,44,24,0.06)", display:"flex", flexDirection:"column", gap:20 }}>
        <div style={{ borderRadius:5,overflow:"hidden",border:`1px solid ${P.border}`,aspectRatio:"16/9",position:"relative",background:"#000",cursor:videoActive?"default":"pointer" }}
          onClick={() => setVideoActive(true)}>
          {videoActive ? (
            <iframe
              src={`https://www.youtube.com/embed/${VID_ID}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position:"absolute",inset:0,width:"100%",height:"100%",border:"none" }}
            />
          ) : (
            <>
              <img src={thumbUrl} alt="תצוגה מקדימה של הסרטון"
                style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}
                onError={e => { e.target.style.display="none"; }}
              />
              <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.28)" }}/>
              <div style={{
                position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
                width:68,height:68,borderRadius:"50%",
                background:"rgba(255,252,247,0.92)",
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:"0 4px 20px rgba(0,0,0,0.35)",
                transition:"transform 200ms ease",
              }}>
                <svg width="26" height="26" viewBox="0 0 26 26">
                  <path d="M8 4 L22 13 L8 22 Z" fill={P.warmDeep}/>
                </svg>
              </div>
            </>
          )}
        </div>

        <div style={{ borderTop:`1px solid ${P.border}` }}/>

        {!done ? (
          <div>
            <div style={{ display:"flex",gap:6,marginBottom:20 }}>
              {QUIZ_Q.map((_,i) => (
                <div key={i} style={{
                  flex:1, height:4, borderRadius:2,
                  background: i < cur ? "#4A9058" : i === cur ? P.warmDeep : P.border,
                  transition:"background 400ms",
                }}/>
              ))}
            </div>

            <div style={{ background:P.surfaceAlt,border:`1px solid ${P.border}`,borderRadius:5,padding:"20px" }}>
              <div style={{ fontSize:12,color:P.soft,marginBottom:10,letterSpacing:"0.04em" }}>
                שאלה {cur+1} מתוך {QUIZ_Q.length}
              </div>
              <div style={{ fontSize:17,fontWeight:500,color:P.text,lineHeight:1.55,marginBottom:18 }}>
                {q.text}
              </div>

              <div style={{ display:"flex",gap:10,marginBottom:answered?14:0 }}>
                {[{label:"נכון",val:true},{label:"לא נכון",val:false}].map(({label,val}) => {
                  let bg = P.surface, border2 = P.border, color = P.text;
                  if (answered) {
                    if (val === q.answer) { bg="#EAF5EC"; border2="#6AAF7A"; color="#2A6B38"; }
                    else if (chosen === val) { bg="#FCEBEB"; border2="#E24B4A"; color="#A32D2D"; }
                    else { color = P.soft; }
                  }
                  return (
                    <button key={label} onClick={() => handleAnswer(val)} disabled={answered}
                      style={{
                        flex:1, padding:"10px", borderRadius:5,
                        border:`1.5px solid ${border2}`, background:bg, color,
                        fontSize:15, cursor:answered?"default":"pointer",
                        fontFamily:"'Heebo',sans-serif", transition:"all 200ms",
                        fontWeight: answered && val===q.answer ? 600 : 400,
                      }}>
                      {label}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div style={{
                  padding:"12px 14px", borderRadius:5, fontSize:14, lineHeight:1.65,
                  background: chosen===q.answer ? "#EAF5EC" : "#FCEBEB",
                  border: `1px solid ${chosen===q.answer ? "#6AAF7A" : "#E24B4A"}`,
                  color: chosen===q.answer ? "#2A6B38" : "#A32D2D",
                  animation:"fadeIn 220ms ease",
                }}>
                  <div style={{ fontWeight:600,marginBottom:4,fontSize:13 }}>
                    {chosen===q.answer ? "✓ נכון!" : "✗ לא בדיוק"}
                  </div>
                  {q.explanation}
                </div>
              )}
            </div>

            {answered && (
              <button onClick={handleNext}
                style={{
                  width:"100%", marginTop:10, padding:"11px",
                  borderRadius:5, border:`1px solid ${P.border}`,
                  background:P.surfaceAlt, color:P.text,
                  fontSize:15, cursor:"pointer", fontFamily:"'Heebo',sans-serif",
                  transition:"background 150ms",
                }}>
                {cur < QUIZ_Q.length-1 ? "השאלה הבאה ←" : "לסיכום ←"}
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign:"center", animation:"fadeIn 300ms ease" }}>
            <div style={{ fontSize:42,fontWeight:700,color:P.text,marginBottom:6 }}>
              {score}/{QUIZ_Q.length}
            </div>
            <div style={{ fontSize:14,color:P.soft,marginBottom:16 }}>תשובות נכונות</div>
            <div style={{
              fontSize:15,color:P.text,lineHeight:1.65,marginBottom:20,
              padding:"14px 18px", background:P.surfaceAlt,
              borderRadius:5, border:`1px solid ${P.border}`,
              borderRight:`3px solid ${score===QUIZ_Q.length?"#4A9058":P.warm}`,
            }}>
              {QUIZ_MSGS[score]}
            </div>
            
            {score >= 3 && (
              <div style={{
                margin: "32px auto 24px",
                padding: "24px",
                background: P.warmDeep,
                color: "#FFFCF7",
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(123,63,30,0.2)",
                animation: "glowPulse 3s ease-in-out infinite",
                maxWidth: 400
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                  לכו להכין את המחמצת הראשונה שלכם!
                </div>
                <div style={{ fontSize: 16, opacity: 0.9 }}>
                  עכשיו אתם מוכנים לצאת לדרך.
                </div>
              </div>
            )}

            <button onClick={restart} style={{
              padding:"9px 24px", borderRadius:5,
              border:`1px solid ${P.border}`, background:"transparent",
              fontSize:14, color:P.soft, cursor:"pointer",
              fontFamily:"'Heebo',sans-serif",
            }}>
              נסי שוב
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
