import { ROUTES, RouteValue } from "./route";

export interface NavLink {
  label: string;
  href: RouteValue;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Features", href: ROUTES.FEATURES },
  { label: "Pricing", href: ROUTES.PRICING },
  { label: "FAQs", href: ROUTES.FAQS },
  { label: "Contact Us", href: ROUTES.CONTACT },
];
