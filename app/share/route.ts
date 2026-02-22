export const ROUTES = {
  HOME: "",
  FEATURES: "",
  PRICING: "",
  FAQS: "",
  CONTACT: "",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
