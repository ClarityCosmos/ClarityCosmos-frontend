"use client";
import { useState } from "react";
import Button from "@/app/components/button";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Message sent! We'll get back to you as soon as possible.");
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <section id="contact-us" className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-[#2563EB] to-white bg-clip-text text-transparent">
            Let&apos;s Talk
          </h2>
          <p className="text-white text-lg md:text-xl">
            Questions, partnership, or feedback? We’d love to hear from you!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
  {/* Outer Form Box */}
  <div className="bg-[#1b2130] p-12 rounded-2xl shadow-lg">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
          className="w-full p-3 rounded-lg border border-white text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-gray-300"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
          className="w-full p-3 rounded-lg border border-white text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-gray-300"
        />
      </div>
      <div className="md:col-span-2">
        <input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="w-full p-3 rounded-lg border border-white text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-gray-300"
        />
      </div>
    </div>

    <textarea
      placeholder="Message"
      value={formData.message}
      onChange={(e) =>
        setFormData({ ...formData, message: e.target.value })
      }
      required
      className="w-full p-3 rounded-lg border border-white text-white bg-transparent min-h-32 mt-6 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-gray-300"
    />

    <Button
      type="submit"
      className="w-full mt-6 bg-[#2563EB] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
    >
      Submit
    </Button>
  </div>
</form>

      </div>
    </section>
  );
};

export default Contact;
