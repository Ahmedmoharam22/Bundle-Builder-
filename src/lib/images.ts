export interface ImageDimensions {
  width: number;
  height: number;
}

const OPTIMIZED_IMAGE_BASE = "/images/optimized";

const OPTIMIZED_IMAGE_NAMES: Record<string, string> = {
  "/images/wyze-battary.webp": "wyze-battary",
  "/images/wyze-cam-floodlight.webp": "wyze-cam-floodlight",
  "/images/wyze-cam-pan-v3.webp": "wyze-cam-pan-v3",
  "/images/wyze-cam.webp": "wyze-cam",
  "/images/wyze-duo-cam-doo.webp": "wyze-duo-cam-doo",
  "/images/wyze-micro-SD.webp": "wyze-micro-SD",
  "/images/wyze-sensor-hub.webp": "wyze-sensor-hub",
  "/images/wyze-sensor-motion.webp": "wyze-sensor-motion",
  // Plan card image (cam-unlimited)
  "/images/cam-unlimit.webp": "wyze-cam",
  "/images/cam-unlimited.webp": "wyze-cam",
};

/** Matches CARD.IMAGE_COL_WIDTH (100px) – the actual rendered dimensions */
export const PRODUCT_CARD_IMAGE_DIMENSIONS: ImageDimensions = {
  width: 100,
  height: 100,
};

/** Matches the 36×36 thumbnail container size used in ReviewItem */
export const REVIEW_THUMBNAIL_IMAGE_DIMENSIONS: ImageDimensions = {
  width: 36,
  height: 36,
};

export const GUARANTEE_BADGE_IMAGE = {
  src: `${OPTIMIZED_IMAGE_BASE}/badge-satisfaction-80.webp`,
  width: 80,
  height: 80,
} as const;

export const getProductCardImageSrc = (src: string): string => {
  const optimizedName = OPTIMIZED_IMAGE_NAMES[src];
  return optimizedName ? `${OPTIMIZED_IMAGE_BASE}/${optimizedName}-card.webp` : src;
};

export const getReviewThumbnailImageSrc = (src: string): string => {
  const optimizedName = OPTIMIZED_IMAGE_NAMES[src];
  return optimizedName ? `${OPTIMIZED_IMAGE_BASE}/${optimizedName}-thumb.webp` : src;
};