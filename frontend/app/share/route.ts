export const ROUTES = {
  HOME: "",
  FEATURES: "",
  PRICING: "",
  FAQS: "",
  CONTACT: "",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
