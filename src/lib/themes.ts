export type GangTheme = "default" | "neon" | "crimson" | "aurora" | "mono" | "royal" | "ocean" | "ember";

export const gangThemes: Record<GangTheme, { name: string; description: string; preview: string; accent: string; background: string; className: string }> = {
  default: { name: "Default", description: "เข้ม เรียบ และสมดุล", preview: "linear-gradient(135deg,#111827,#050505)", accent: "#0084ff", background: "#0a0a0a", className: "theme-default" },
  neon: { name: "Neon Circuit", description: "นีออนจัดจ้านสำหรับสายไซเบอร์", preview: "linear-gradient(135deg,#071a1d,#07100d)", accent: "#35f5bb", background: "#06100e", className: "theme-neon" },
  crimson: { name: "Crimson Night", description: "ดุดัน ลึกลับ และทรงพลัง", preview: "linear-gradient(135deg,#250e19,#0d070b)", accent: "#ff647d", background: "#0d070b", className: "theme-crimson" },
  aurora: { name: "Aurora", description: "แสงเหนือแบบ futuristic", preview: "linear-gradient(135deg,#132849,#1e1230)", accent: "#8bd8ff", background: "#0b1220", className: "theme-aurora" },
  mono: { name: "Monochrome", description: "มินิมอล คม และสะอาด", preview: "linear-gradient(135deg,#303030,#0b0b0b)", accent: "#ffffff", background: "#0b0b0b", className: "theme-mono" },
  royal: { name: "Royal Gold", description: "หรูหราแบบราชวงศ์", preview: "linear-gradient(135deg,#33240b,#100c05)", accent: "#f5c76a", background: "#100c05", className: "theme-royal" },
  ocean: { name: "Deep Ocean", description: "เย็นลึก สงบ และมีมิติ", preview: "linear-gradient(135deg,#092e48,#06121e)", accent: "#45caff", background: "#06121e", className: "theme-ocean" },
  ember: { name: "Ember", description: "อุ่นแรงเหมือนถ่านไฟ", preview: "linear-gradient(135deg,#451e0c,#120805)", accent: "#ff9c54", background: "#120805", className: "theme-ember" },
};

export function getGangTheme(theme?: string) { return gangThemes[(theme as GangTheme) || "default"] || gangThemes.default; }
