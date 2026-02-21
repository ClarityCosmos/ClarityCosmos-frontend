import Button from "../button";
import Link from "next/link";

const Pricing = () => {
  return (
    <section id="pricing" className="px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#534dec]">
            Pricing Plans
          </h2>
          <p className="text-white text-lg md:text-xl">
            We believe every learner deserves clarity, care, and long-term guidance.
          </p>
        </div>

        {/* Cards Wrapper */}
        <div className="min-h-[80vh] bg-[#111827] flex items-center justify-center px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full place-items-center">

            {/* ================= LEFT CARD ================= */}
            <div className="relative w-full max-w-[380px] h-[460px] rounded-lg p-8 md:p-10 border-2 border-blue-500 bg-[#1A0E47]">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-400 tracking-wide">
                  EXPLORER
                </h2>
                <span className="text-5xl font-bold text-white">$0</span>
              </div>

              <ul className="space-y-5 md:space-y-6 text-white/90 mt-10 md:mt-12">
                <li className="flex gap-3">
                  <span className="text-blue-400 text-xl">▶</span>
                  <span>15s roadmap preview</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400 text-xl">🏷</span>
                  <span>
                    10% lifetime discounts <br />
                    on future premiums
                  </span>
                </li>
              </ul>

              <Link href="/auth/signin">
                <Button className="absolute bottom-7 md:bottom-8 left-8 right-8 py-4 rounded-lg text-lg font-semibold text-white border-2 border-[#445CF8] bg-[#401CC2] hover:bg-[#4b25d6] transition">
                  Explore For Free!
                </Button>
              </Link>
            </div>

            {/* ================= RIGHT CARD ================= */}
            <div className="relative w-full max-w-[380px] h-[460px] rounded-lg p-8 md:p-10 border-2 border-[#A4B428] bg-gradient-to-b from-[rgba(191,22,233,0.8)] to-[rgba(64,28,194,0.8)]">

              {/* Badge */}
              <div className="absolute -top-1 left-1/4 -translate-x-1/2 bg-red-600 text-white text-sm px-6 py-1 font-semibold rounded shadow-lg">
                5 slots left!
              </div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[23px] font-bold text-green-400 tracking-wide">
                  FOUNDING USER
                </h2>
                <span className="text-[40px] font-bold text-yellow-300">$1</span>
              </div>

              <ul className="space-y-4 md:space-y-5 text-white mt-6">
                <li className="flex gap-3">
                  <span className="text-green-400 text-xl">▶</span>
                  <span>Full roadmap video</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-green-400 text-xl">📄</span>
                  <span>PDF (downloadable)</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-green-400 text-xl">🏷</span>
                  <span>
                    50% lifetime discounts on <br />
                    future premiums
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="text-green-400 text-xl">💬</span>
                  <span>Direct feedback to the team</span>
                </li>
              </ul>

              <Link href="/auth/signin">
                <Button className="absolute bottom-6 md:bottom-7 left-8 right-8 py-4 rounded-xl text-[20px] font-semibold text-white bg-gradient-to-r from-[#17C272] from-[30.29%] to-[#BC12E6] transition shadow-lg shadow-green-500/40 hover:opacity-90">
                  Get Full Roadmap!
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;