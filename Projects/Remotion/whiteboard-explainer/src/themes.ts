export type Theme = {
  name: string;
  bg: string;
  ink: string;
  accent: string;
  highlight: string;
  positive: string;
  outroBg: string;
  fontFamily: string;
  headingFamily: string;
  lineHeight: number;
};

export const THEMES: Record<string, Theme> = {
  warmPaper: {
    name: "Warm Paper / Blue Accent",
    bg: "#f5f0e8",
    ink: "#2c2c2c",
    accent: "#2980b9",
    highlight: "#e6a817",
    positive: "#27ae60",
    outroBg: "#2c2c2c",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    headingFamily: "Georgia, 'Times New Roman', serif",
    lineHeight: 1.5,
  },
  darkChalk: {
    name: "Dark Chalk / Amber Accent",
    bg: "#1c1c2e",
    ink: "#e8e4d8",
    accent: "#f39c12",
    highlight: "#e74c3c",
    positive: "#2ecc71",
    outroBg: "#0d0d1f",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    headingFamily: "Georgia, 'Times New Roman', serif",
    lineHeight: 1.5,
  },
};
