export interface CategoryMap {
  name: string;
  ids: string[];
}

export const CATEGORY_MAP: CategoryMap[] = [
  { name: "CAMERAS", ids: ["cameras"] },
  { name: "SENSORS", ids: ["sensors"] },
  { name: "ACCESSORIES", ids: ["accessories", "protection"] },
  { name: "PLAN", ids: ["plan"] },
];
export const CATEGORY_NAME_BY_ID = new Map(
  CATEGORY_MAP.flatMap((group) => group.ids.map((id) => [id, group.name] as const)),
);
