
// Layout & Component Design Tokens (Figma Frame 1735)

export const GLOBAL_LAYOUT = {
  MAX_WIDTH: "1280px",
  GAP: "32px",
  PADDING_TOP: "32px",
  PADDING_X: "32px",
} as const;

export const CARD = {
  WIDTH: "361.5px",
  MIN_HEIGHT: "173px",
  RADIUS: "10px",
  PADDING: "11px",
  GAP: "13px",
  IMAGE_COL_WIDTH: "100px",
  IMAGE_MAX_HEIGHT: "110px",
  BADGE_HEIGHT: "22px",
} as const;

export const PANEL = {
  WIDTH: "399px",
  RADIUS: "10px",
  PADDING: "15px",
  INTERNAL_GAP: "5px",
  CATEGORY_GAP: "20px",
  STICKY_TOP: "24px",
  THUMBNAIL_SIZE: "36px",
  GUARANTEE_BADGE_SIZE: "80px",
  CHECKOUT_BTN: {
    WIDTH: "350px",
    HEIGHT: "48px",
    PADDING: "13px 16px",
    GAP: "8px",
    RADIUS: "4px",
  },
} as const;

export const ACCORDION = {
  RADIUS: "10px",
  PADDING: "15px",
  GAP: "13px",
  HEADER_PADDING: "15px",
  NEXT_BTN_HEIGHT: "48px",
  NEXT_BTN_RADIUS: "4px",
} as const;

export const STEPPER = {
  CONTAINER_GAP: "12px",
  ICON_SIZE: "16px",
  ICON_PADDING: "2px",
  COUNTER_MIN_WIDTH: "16px",
  COUNTER_FONT_SIZE: "14px",
} as const;