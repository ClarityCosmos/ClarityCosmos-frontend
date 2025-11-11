import Button from "@/app/components/button";
import { FaPlay, FaCommentMedical } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  
  const avatars = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ];
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden" id="hero">
      {/* Circular gradient background */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7C3AED] rounded-full blur-[180px] opacity-50 pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        {/* Avatars */}
        <div className="flex items-center justify-center gap-2 mb-6 border border-gray-400 px-4 py-2 rounded-xl mx-auto max-w-xs">
      {/* Avatar Group */}
      <div className="flex -space-x-2">
        {avatars.map((avatar) => (
          <Image
            key={avatar.id}
            width={8}
            height={8}
            src={avatar.image}
            alt={`Avatar ${avatar.id}`}
            className="w-8 h-8 rounded-full border-2 border-background object-cover"
          />
        ))}
      </div>

      <span className="text-sm text-white ml-2">
        Your Personalized AI Mentor
      </span>
    </div>
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          <span className="bg-linear-to-r from-[#7C3AED] to-white bg-clip-text text-transparent">
            Stuck in endless DSA
          </span>
          <br />
          <span className="bg-linear-to-r from-[#7C3AED] to-white bg-clip-text text-transparent">
            videos but still confused?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl  mb-8 max-w-3xl mx-auto text-white">
          Clarity Cosmos gives you a personal mentor layer on top of the
          internet — guiding you with hyper-personalized roadmap videos, your
          favorite avatar, and interactive chat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center justify-center gap-4">
          <Link href="">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 px-5 py-2 rounded-lg text-md font-semibold transition-all duration-300 shadow-md">
              <FaCommentMedical className="w-3 h-3 text-white" />
              <span>Try Beta Free</span>
            </Button>
          </Link>
          <Link href="">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 px-5 py-2 rounded-lg text-md font-semibold transition-all duration-300 shadow-md">
              <FaPlay className="w-3 h-3 text-white" />
              <span>Try Beta Free</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
