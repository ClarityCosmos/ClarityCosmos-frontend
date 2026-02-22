import { VISION_CARDS } from "@/app/share/data";
const Vision = () => {
  return (
    <section id="home" className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-[#7C3AED] to-white bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-white text-lg md:text-xl">
            We believe every learner deserves clarity, care, and long-term
            guidance.
          </p>
        </div>

        <h3 className="text-2xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-white to-[#34D399] bg-clip-text text-transparent">
          Clarity Cosmos is built to:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {VISION_CARDS.map((card, index) => (
            <div
              key={index}
              className="w-full max-w-xs flex flex-col items-center justify-center border border-[#957cc2] rounded-xl p-6 hover:scale-105 transition-transform duration-300"
              style={{
                background:
                  "linear-gradient(120deg, rgba(251, 191, 36, 0.2), rgba(37, 99, 235, 0.2))",
              }}
            >
              <div className="flex flex-col items-center justify-center text-center gap-4 w-full h-full">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <card.icon className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-xl text-white">
                  {card.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
