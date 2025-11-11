import { FiFileText, FiGlobe, FiLink } from "react-icons/fi";


export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" }, // scrolls to the hero section
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact Us", href: "#contact-us" },
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