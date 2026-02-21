"use client";

import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
    const data = {
        userName: "Ali",
        language: "JavaScript",
        avatar: "/avatar.jpg",
        videoUrl: "#",
        pdfUrl: "#",
    };

    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <section className="min-h-screen bg-[linear-gradient(180deg,#19163A_0%,#C61AD5_46.63%,#6F1887_81.73%)] flex justify-center py-12 px-4 text-white">
            <div className="w-full max-w-6xl space-y-12">
                <div className="w-full flex items-center justify-between px-6 py-4 border-b border-purple-500/30">
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
                        <span className="text-sm hidden sm:inline text-gray-400 tracking-wide">LANGUAGE</span>
                        <div className="rounded-full px-4 ml-10 py-1 bg-gradient-to-r from-indigo-800 to-purple-800 border border-purple-500">
                            <span className="text-green-400 font-semibold text-sm">
                                ● {data.language.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
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
                <div className="flex justify-center relative">
                    <div className="w-full max-w-[1024px] aspect-video rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 to-blue-500 relative overflow-hidden">


                        {!videoLoaded && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                                <span className="relative text-white font-semibold text-lg">Loading Video...</span>
                            </div>
                        )}

                        <div className="w-full max-w-[1024px] aspect-video">
                            <div className="w-full h-full bg-black rounded-2xl overflow-hidden border border-green-400 shadow-2xl">
                                <video
                                    src={data.videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    onLoadedData={() => setVideoLoaded(true)}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className="flex justify-center gap-6 flex-wrap">
                    <a
                        href={data.pdfUrl}
                        className="bg-gradient-to-r from-indigo-800 to-purple-700 px-6 py-3 rounded-full font-semibold transition shadow-lg"
                    >
                        📄 GET PDF
                    </a>

                    <a
                        href={data.videoUrl}
                        className="bg-gradient-to-r from-indigo-800 to-purple-700 px-6 py-3 rounded-full font-semibold transition shadow-lg"
                    >
                        🎬 GET VIDEO
                    </a>
                </div>

            </div>
        </section>
    );
}