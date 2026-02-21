"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import FeedbackModal from "../components/landing/feedbackModel";
import { LayoutGrid, Plus } from "lucide-react";

const data = {
    userName: "Ali",
    language: "JavaScript",
    avatar: "/avatar.jpg",
    videoUrl: "/video.mp4",
    pdfUrl: "/file.pdf",

    weakAreas: ["Recursion", "Dynamic Programming", "Graphs"],

    professor: {
        name: "Dr. Smith",
        avatarUrl: "/professor.jpg",
    },
};

export default function Dashboard() {
    const [showFeedback, setShowFeedback] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <div className="bg-[#111827] min-h-screen text-white">

            {/* Top Bar */}
            <div className="w-full h-16 flex items-center justify-between px-6">
                <Link
                    href="/"
                    className="px-5 py-2 text-sm rounded-xl bg-purple-700 hover:bg-purple-800 transition"
                >
                    ← Back to Home
                </Link>
            </div>

            <section className="flex justify-center px-4">

                <div className="w-full max-w-6xl space-y-10">

                    {/* User Header */}
                    {/* <div className="w-full flex items-center justify-between px-6 py-4 border-b border-purple-500/30">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-green-400">
                                <Image
                                    src={data.avatar}
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h2 className="text-lg font-semibold">
                                {data.userName.toUpperCase()}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm hidden sm:inline text-gray-400 tracking-wide">
                                LANGUAGE
                            </span>

                            <div className="rounded-full px-4 ml-6 py-1 bg-gradient-to-r from-indigo-800 to-purple-800 border border-purple-500">
                                <span className="text-green-400 font-semibold text-sm">
                                    ● {data.language.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div> */}

                    {/* Heading */}
                    <div className="text-center space-y-6">
                        <h1 className="text-2xl md:text-4xl font-bold">
                            <span>{data.userName.toUpperCase()}</span>, YOUR DSA ROADMAP IS READY!
                        </h1>

                        <div className="w-full max-w-[273px] h-[60px] mx-auto">
                            <button className="w-full h-full rounded-xl text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-[#17C272] to-[#BC12E6] transition shadow-lg shadow-green-500/40 hover:scale-105 hover:opacity-90 duration-300">
                                GET ROADMAP!
                            </button>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="flex justify-center relative">

                        <div className="w-full max-w-[1024px] aspect-video rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 to-blue-500 relative overflow-hidden">

                            {!videoLoaded && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl overflow-hidden bg-[#111827]">

                                    {/* Moving Gradient Shimmer */}
                                    <div className="absolute inset-0">
                                        <div className="w-[200%] h-full animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(168,85,247,0.35),rgba(34,197,94,0.35),transparent)]" />
                                    </div>

                                    {/* soft glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-green-900/30" />

                                    <span className="relative text-white font-semibold tracking-wide">
                                        Your roadmap is being granted by {data.professor.name}
                                    </span>
                                </div>
                            )}
                            <div className="w-full h-full bg-black rounded-2xl overflow-hidden border border-green-400 shadow-2xl">
                                <video
                                    src={data.videoUrl}
                                    controls
                                    className="w-full h-full object-contain"
                                    onLoadedData={() => setVideoLoaded(true)}
                                    onEnded={() => setShowFeedback(true)}
                                />
                            </div>
                        </div>

                        {showFeedback && (
                            <div className="fixed inset-0 z-50">
                                <FeedbackModal closeModal={() => setShowFeedback(false)} />
                            </div>
                        )}

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6 flex-wrap">

                        <a
                            href={data.pdfUrl}
                            className="bg-gradient-to-r from-indigo-800 to-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90"
                        >
                            📄 GET PDF
                        </a>

                        <a
                            href={data.videoUrl}
                            className="bg-gradient-to-r from-indigo-800 to-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90"
                        >
                            🎬 GET VIDEO
                        </a>

                    </div>

                    {/* Bottom Dashboard Section */}

                    <div className="flex flex-col gap-6 p-8 md:ml-55 rounded-2xl">

                        {/* Language Banner */}
                        <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-2xl px-6 sm:px-8 py-4 sm:py-6 rounded-full bg-gradient-to-r from-[#d000ff] via-[#8000ff] to-[#2000ff] border-b-2 border-r border-[#00ff41]">

                            {/* Left section */}
                            <div className="flex items-center gap-3 mb-3 sm:mb-0">
                                <div className="relative">
                                    <LayoutGrid size={28} className="text-white/80" />
                                    <Plus size={14} className="absolute -bottom-1 -right-1 text-white" />
                                </div>
                                <span className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase">
                                    Language
                                </span>
                            </div>

                            {/* Right section */}
                            <div className="flex items-center gap-3 bg-black/20 px-4 sm:px-6 py-2 rounded-full border border-white/10">
                                <div className="w-3 h-3 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                                <span className="text-lg sm:text-xl font-black tracking-tight uppercase">
                                    {data.language}
                                </span>
                            </div>

                        </div>

                        {/* Cards */}
                        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">

                            {/* Weak Areas */}
                            <div className="flex-1 p-8 rounded-[32px]  bg-gradient-to-br from-[#d000ff] via-[#8000ff] to-[#2000ff]  border-b-2 border-r-1 border-[#00ff41]">

                                <h3 className="text-xl font-black text-center mb-8 tracking-widest uppercase">
                                    Weak Areas
                                </h3>

                                <ul className="space-y-6">
                                    {data.weakAreas.map((area, index) => (
                                        <li key={index} className="flex items-center gap-4 group">
                                            <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-black shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                                            <span className="text-lg font-black tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                                                {area}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Professor */}
                            <div className="flex-1 p-8 rounded-[32px] flex flex-col items-center justify-between
              bg-gradient-to-br from-[#d000ff] via-[#8000ff] to-[#2000ff]
              border-b-2 border-r-1 border-[#00ff41]">

                                <div className="relative w-32 h-32 rounded-full border-4 border-black/30 overflow-hidden shadow-2xl bg-gray-800">
                                    <Image
                                        src={data.professor.avatarUrl}
                                        alt={data.professor.name}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-lg font-black tracking-tighter uppercase mt-4">
                                    {data.professor.name}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}