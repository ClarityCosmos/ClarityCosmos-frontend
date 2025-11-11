import Button from "@/app/components/button";
import { FiCheck } from "react-icons/fi";

const Pricing = () => {
  const plans = [
    {
      name: "Freemium",
      subtitle: "Starter",
      price: 0,
      features: [
        "3 videos / month",
        "Text-based Q&A only",
        "500 words/chat",
      ],
      cta: "Choose Plan",
      popular: false,
    },
    {
      name: "Starter",
      subtitle: "for Students",
      price: 20,
      features: [
        "6 video(s) / month",
        "Video-based Q&A limits",
        "700 words / chat",
      ],
      cta: "Choose Plan",
      popular: true,
    },
    {
      name: "Pro",
      subtitle: "for Professionals",
      price: 15,
      features: [
        "6 video(s) / month",
        "Text-based Q&A only",
        "Adjust learning pace conditions",
        "1k words / call",
      ],
      cta: "Choose Plan",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#534dec]">
            Pricing Plans
          </h2>
          <p className="text-white text-lg md:text-xl">
            We believe every learner deserves clarity, care, and long-term guidance.
          </p>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {plans.map((plan, index) => (
    <div
      key={index}
      className="p-6 sm:p-8 rounded-xl bg-[#292f3d] text-white border border-[#534dec] flex flex-col justify-between"
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-1">{plan.name}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{plan.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-4 sm:mb-6">
        <span className="text-2xl sm:text-4xl font-bold">${plan.price}</span>
        <span className="text-sm sm:text-base text-muted-foreground"> /month</span>
      </div>

      {/* Features */}
      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-2">
            <FiCheck className="w-4 sm:w-5 h-4 sm:h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Button
        className="w-full h-10 sm:h-12 bg-[#534dec] rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
      >
        {plan.cta}
      </Button>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Pricing;
