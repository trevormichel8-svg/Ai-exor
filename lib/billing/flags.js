export const FEATURES = {
  free: ["basic_generation"],
  pro: ["basic_generation", "svg_download", "variations"],
  enterprise: ["basic_generation", "svg_download", "variations", "priority_ai"]
};

export function hasFeature(plan, feature) {
  return FEATURES[plan]?.includes(feature);
}