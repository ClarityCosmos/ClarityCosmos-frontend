import Image from "next/image";
import Button from "@/app/components/button";
import { ASSETS } from "@/app/share/assets";
import Link from "next/link";

const Footer = () => {
  // const privacyLink = ["Refund Policy", "Terms of Service", "Privacy Policy"];
  const quickLinks = ["Features", "Pricing", "FAQs", "Contact Us"];
  const services = ["AI Mentor", "AI Q&A"];

  return (
    <footer className="py-12 px-4  bg-[#111827] text-white">
      <div className="w-full">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="h-[60px] w-[60px] flex items-center justify-center">
              <Image
                src={ASSETS.logo}
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full object-contain absolute"
                priority
              />
            </div>
            <p className="text-lg text-white mb-4">Personalized AI Mentor</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Empowering learners with clarity and guidance through AI-driven
              mentorship and interactive learning experiences.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Privacy Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/refund" className="text-sm text-white/60 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Get Started</h3>
            <p className="text-sm text-white/70 mb-4">
              Ready upskill yourself!
            </p>

            <Button className="w-full bg-[#7C3AED] text-white font-medium rounded-xl py-2 hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-purple-500/30">
              Get Started
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2025 Clarity Cosmos. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;