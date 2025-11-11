import { FiVideo, FiUser, FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";


const Features = () => {
  const features = [
    { icon: FiVideo, title: "Get Personalized roadmap video.", gradient: "bg-gradient-to-br from-primary to-secondary" },
    { icon: FiUser, title: "Pick your favorite Avatar as your Mentor.", gradient: "bg-gradient-to-br from-secondary to-primary" },
    { icon: FiZap, title: "Chat with your Mentor", gradient: "bg-gradient-to-br from-primary via-secondary to-primary" },
    { icon: FiZap, title: "Enjoy Cross Web Mentorship (coming soon)", gradient: "bg-gradient-to-br from-primary via-secondary to-primary" },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidthRef = useRef(0);

useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;
  cardWidthRef.current = container.firstElementChild
    ? (container.firstElementChild as HTMLElement).offsetWidth + 24
    : 300;
}, []);


  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    let newIndex = currentIndex + (direction === "left" ? -1 : 1);
    if (newIndex < 0) newIndex = 0;
    if (newIndex > features.length - 1) newIndex = features.length - 1;

container.scrollTo({ left: newIndex * cardWidthRef.current, behavior: "smooth" });
    setCurrentIndex(newIndex);
  };

  return (
    <section id="features" className="py-20 bg-card/30 relative overflow-hidden" >
      <div className="container mx-auto max-w-7xl relative">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center bg-linear-to-r from-[#FBBF24] to-white bg-clip-text text-transparent">
  Features
</h2>

        {/* Scrollable container */}
        <div ref={scrollRef} className="flex gap-6 overflow-hidden px-4 scroll-smooth relative mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" p-4 rounded-xl hover:scale-105 transition-transform duration-300 shrink-0 w-full justify-center max-w-106 h-38"
            >
              <div className="flex items-start gap-4 border border-[#e0c273] px-6 py-6 rounded-lg h-full text-white text-lg bg-white/5">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${feature.gradient}`}>
                  <feature.icon className="w-10 h-10 text-[#FBBF24]" />
                </div>
                <p className="text-foreground font-medium">{feature.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className={`bg-white/20 hover:bg-white/30 hover:text-[FBBF24] p-3 rounded-full backdrop-blur-sm flex z-10 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FiChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={currentIndex === features.length - 1}
            className={`bg-white/20 hover:bg-white/30 hover:text-[#FBBF24] p-3 rounded-full backdrop-blur-sm flex z-10 ${currentIndex === features.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FiChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
