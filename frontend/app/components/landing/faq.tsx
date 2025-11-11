import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need to pay to try Clarity Cosmos?",
      answer:
        "No, you can start with a free plan. If you want to add video Q&A, you can generate your first videos for free during the beta release.",
    },
    {
      question: "What learners is Clarity Cosmos for?",
      answer:
        "Clarity Cosmos is designed for learners of all levels who want personalized guidance in their learning journey, whether you're a student or a professional.",
    },
    {
      question: "Is this AI useful?",
      answer:
        "Yes! Our AI is specifically trained to provide personalized learning experiences and adapt to your pace and style of learning.",
    },
    {
      question: "Is the Clarity Cosmos expensive?",
      answer:
        "We offer flexible pricing plans starting with a free tier, making quality education accessible to everyone.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
         <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-[#7C3AED] to-white bg-clip-text text-transparent">
            Frequently Asked Question
          </h2>
          <p className="text-white text-lg md:text-xl">
            You have any Question ? Take a read.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=" rounded-xl bg-card p-4  transition-all text-white duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-normal text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="w-4 h-4 text-primary" />
                ) : (
                  <FaChevronDown className="w-4 h-4 text-primary" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-md">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
