"use client";
import { FiCheck } from "react-icons/fi";
import Image from "next/image";


const Testimonials = () => {
  const testimonials = [
    {
      name: "Liam",
      role: "4th Sem Student ",
      quote:
        "I felt totally stuck when trying to get better at DSA. I've struggled with it since 1st year, but now I feel confident!",
      avatar: "https://img.freepik.com/free-photo/school-boy-with-book-park_23-2148199240.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Noah",
      role: "FAANG Engineer",
      quote:
        "I feel tired a lot when I watch videos, because it honestly takes time a lot to learn from many videos in youtube.",
      avatar: "https://t3.ftcdn.net/jpg/03/28/49/70/360_F_328497000_mAVDgZQtgWQeH1Zzr6lb87mvokOK72Vj.jpg",
    },
    {
      name: "Oliver",
      role: "4th Sem Student",
      quote:
        "When I see lots of roadmap, it's so messy, then when I found yours roadmap it's literally good for me.",
      avatar: "https://img.freepik.com/premium-photo/campus-young-boy-student-portrait-with-smile-learning-education-development-happy-teenager-male-person-school-excited-growth-knowledge-studying-future-scholarship_590464-383508.jpg",
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
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
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