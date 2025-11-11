 "use client";
import { FiCheck } from "react-icons/fi";
import Image from "next/image";


const Testimonials = () => {
 const testimonials = [
  {
    name: "Shahwelz",
    role: "4th Sem Student ",
    quote:
      "I felt totally stuck when trying to get better at DSA. I've struggled with it since 1st year, but now I feel confident!",
    avatar: "https://source.unsplash.com/100x100/?person,face,shahwelz",
  },
  {
    name: "Abdullah",
    role: "FAANG Engineer",
    quote:
      "I feel tired a lot when I watch videos, because it honestly takes time a lot to learn from many videos in youtube.",
    avatar: "https://source.unsplash.com/100x100/?person,face,abdullah",
  },
  {
    name: "Asad",
    role: "4th Sem Student",
    quote:
      "When I see lots of roadmap, it's so messy, then when I found yours roadmap it's literally good for me.",
    avatar: "https://source.unsplash.com/100x100/?person,face,asad",
  },
];


  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            <span className="bg-linear-to-r from-[#7C3AED] to-white bg-clip-text text-transparent">
              Real Learner.
            </span>
            &nbsp;
            <span className="bg-linear-to-r from-[#7C3AED] to-white bg-clip-text text-transparent">
              Real Struggle.
            </span>
          </h2>
          <p className="text-white text-lg md:text-xl">
            We believe every learner deserves clarity, care, and long-term
            guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-white">
           {testimonials.map((testimonial, index) => (
    <div
      key={index}
      className="gradient-border p-8 rounded-xl border border-[#957cc2]"
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar Image */}
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop" // Unsplash URL or any image path
            alt={testimonial.name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>

        <FiCheck className="w-8 h-8 text-primary ml-auto shrink-0" />
      </div>

      <p className="text-foreground/80 text-md">{testimonial.quote}</p>
    </div>
  ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
