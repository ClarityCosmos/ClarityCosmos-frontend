"use client";

import Header from "./components/header";
import Features from "./components/landing/features";
import Hero from "./components/landing/hero";
import Pricing from "./components/landing/pricing";
import Testimonials from "./components/landing/testimonials";
import Vision from "./components/landing/vision";
import FaQ from "./components/landing/faq";
import Contact from "./components/landing/contact";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#111827]">
      <Header />
      <Hero />
      <Vision />
      <Features />
      <Pricing />
      <Testimonials />
      <FaQ />
      <Contact />
      <Footer/>
    </main>
  );
}
