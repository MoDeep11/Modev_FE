export const Colors = {
  background: {
    base: "#0F0F14",
    surface: "#1A1A24",
    elevated: "#242433",
    overlay: "#2E2E42",
  },

  text: {
    primary: "#EEEEFF",
    secondary: "#9898BB",
    disabled: "#4E4E6A",
    inverse: "#0F0F14",
  },

  brand: {
    default: "#0EE5A1",
    hover: "#0CA574",
    light: "#90FFDC",
    subtle: "#009364",
  },

  status: {
    success: "#00C684",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },

  border: {
    default: "#2E2E42",
    strong: "#4A4A6A",
    subtle: "#1E1E2C",
  },
} as const;

export type ColorsType = typeof Colors;
export type BackgroundColorType = keyof typeof Colors.background;
export type TextColorType = keyof typeof Colors.text;
export type BrandColorType = keyof typeof Colors.brand;
export type StatusColorType = keyof typeof Colors.status;
export type BorderColorType = keyof typeof Colors.border;
