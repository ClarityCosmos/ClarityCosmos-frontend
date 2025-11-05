"use client";

import Header from "./components/header";
import Hero from "./components/landing/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#111827]">
      <Header />
      <Hero />
    </main>
  );
}
