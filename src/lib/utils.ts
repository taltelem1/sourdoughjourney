export const P = {
  page:"#F5EDE0", surface:"#FFFCF7", surfaceAlt:"#F0E4D2",
  border:"#E2D0BC", text:"#2A1F15", soft:"#6B5240",
  warm:"#A05A2C", warmSoft:"#C4916A", warmDeep:"#7B3F1E",
  coral:"#C56B58", teal:"#4F8B85",
};

export const L  = (a: number, b: number, t: number) => a+(b-a)*Math.max(0,Math.min(1,t));
export const cl = (t: number, from: number, w=0.22) => Math.max(0,Math.min(1,(t-from)/w));
