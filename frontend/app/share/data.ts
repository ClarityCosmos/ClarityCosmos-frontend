import { ROUTES, RouteValue } from "./route";
import { FiFileText, FiGlobe, FiLink } from "react-icons/fi";


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



export const VISION_CARDS = [
  {
    icon: FiFileText,
    title: "Deliver clear information without fluff.",
  },
  {
    icon: FiGlobe,
    title: "Make learning playful and engaging through.",
  },
  {
    icon: FiLink,
    title: "Provide consistent mentorship involving your progress.",
  },
];