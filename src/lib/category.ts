export const CATEGORY_MAP = [
  {
    name: "CAMERAS",
    ids: ["cameras"],
  },
  {
    name: "SENSORS",
    ids: ["sensors"],
  },
  {
    name: "ACCESSORIES",
    ids: ["accessories", "protection"],
  },
  {
    name: "PLAN",
    ids: ["plan"],
  },
] as const;

export type CategoryMapItem = typeof CATEGORY_MAP[number];