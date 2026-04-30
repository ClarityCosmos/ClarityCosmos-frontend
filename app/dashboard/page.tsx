"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeedbackModal from "../components/landing/feedbackModel";
import { LayoutGrid, Plus } from "lucide-react";

async function getDashboardData(token: string | null) {
    if (!token) throw new Error("No token provided");

    const res = await fetch("https://16.171.250.82.sslip.io/api/users/beta-data", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || "Failed to fetch dashboard data");
    }

    const result = await res.json();
    return result.data;
}

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User not logged in");
                setLoading(false);
                return;
            }

            try {
                const result = await getDashboardData(token);

                const mappedData = {
                    user: {
                        username: result.username,
                        email: result.email,
                    },
                    professor: {
                        name: result.mentorName,
                        avatarUrl: result.mentorImageUrl,
                    },
                    language: result.language,
                    weakAreas: result.hardestTopic
                        ? result.hardestTopic.split(",").map((t: string) => t.trim())
                        : [],
                    videoUrl: result.video_url,
                    pdfUrl: result.pdf_url,
                };

                setData(mappedData);
                console.log(mappedData, "fetch data");
            } catch (err: any) {
                console.error(err);

                if (err.message.includes("token")) {
                    setError("Session expired. Please login again.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error("Download failed", err);
        }
    };

    if (loading)
        return (
            <div className="bg-[#111827] min-h-screen text-white flex items-center justify-center">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="bg-[#111827] min-h-screen text-white flex flex-col items-center justify-center">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <p className="text-white/70 text-sm">
                    Please refresh the page or log in again if necessary.
                </p>
            </div>
        );

    const userName = data?.user?.username || "User";
    const professor = data?.professor || {};
    const videoUrl = data?.videoUrl || "";
    const pdfUrl = data?.pdfUrl || "";
    const language = data?.language || "";
    const weakAreas = data?.weakAreas || [];

    return (
        <div className="bg-[#111827] min-h-screen text-white">
            <div className="w-full h-12 sm:h-14 flex items-center justify-between px-4 sm:px-6">
                <Link
                    href="/"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-purple-700 hover:bg-purple-800 transition"
                >
                    Back to Home
                </Link>
                <Link
                    href="/profile"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-purple-500/20 font-semibold"
                >
                    📊 View Profile
                </Link>
            </div>

            <section className="flex justify-center px-4">
                <div className="w-full max-w-6xl space-y-10">
                    <div className="text-center space-y-6">
                        <h1 className="text-2xl md:text-4xl font-bold">
                            <span>{userName.toUpperCase()}</span>, YOUR DSA ROADMAP IS READY!
                        </h1>
                        <div className="w-full max-w-[273px] h-[60px] mx-auto">
                            <button
                                onClick={() => handleDownload(videoUrl, "roadmap.mp4")}
                                className="w-full h-full rounded-xl text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-[#17C272] to-[#BC12E6] transition shadow-lg shadow-green-500/40 hover:scale-105 hover:opacity-90 duration-300"
                            >
                                GET ROADMAP!
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center relative">
                        <div className="w-full max-w-[1024px] aspect-video rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 to-blue-500 relative overflow-hidden">
                            {!videoLoaded && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl overflow-hidden bg-[#111827]">
                                    <div className="absolute inset-0">
                                        <div className="w-[200%] h-full animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(168,85,247,0.35),rgba(34,197,94,0.35),transparent)]" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-green-900/30" />
                                    <span className="relative text-white font-semibold tracking-wide text-sm sm:text-base">
                                        Your roadmap is being granted by {professor.name || "Professor"}
                                    </span>
                                </div>
                            )}
                            <div className="w-full h-full bg-black rounded-2xl overflow-hidden border border-green-400 shadow-2xl">
                                {videoUrl ? (
                                    <video
                                        src={videoUrl}
                                        controls
                                        className="w-full h-full object-contain"
                                        onLoadedData={() => setVideoLoaded(true)}
                                        onEnded={() => setShowFeedback(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                        Video not available
                                    </div>
                                )}
                            </div>
                        </div>

                        {showFeedback && (
                            <div className="fixed inset-0 z-50">
                                <FeedbackModal closeModal={() => setShowFeedback(false)} />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center gap-6 flex-wrap">
                        <button
                            onClick={() => handleDownload(pdfUrl, "roadmap.pdf")}
                            className="bg-gradient-to-r from-indigo-800 to-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90"
                        >
                            GET PDF
                        </button>
                        <button
                            onClick={() => handleDownload(videoUrl, "roadmap.mp4")}
                            className="bg-gradient-to-r from-indigo-800 to-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90"
                        >
                            GET VIDEO
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 p-8 md:ml-55 rounded-2xl">
                        <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-2xl px-6 sm:px-8 py-4 sm:py-6 rounded-full bg-gradient-to-r from-[#d000ff] via-[#8000ff] to-[#2000ff] border-b-2 border-r border-[#00ff41]">
                            <div className="flex items-center gap-3 mb-3 sm:mb-0">
                                <div className="relative">
                                    <LayoutGrid size={28} className="text-white/80" />
                                    <Plus size={14} className="absolute -bottom-1 -right-1 text-white" />
                                </div>
                                <span className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase">
                                    Language
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-black/20 px-4 sm:px-6 py-2 rounded-full border border-white/10">
                                <div className="w-3 h-3 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                                <span className="text-lg sm:text-xl font-black tracking-tight uppercase">{language}</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
                            <div className="flex-1 p-8 rounded-[32px] bg-gradient-to-br from-[#d000ff] via-[#8000ff] to-[#2000ff] border-b-2 border-r-1 border-[#00ff41]">
                                <h3 className="text-xl font-black text-center mb-8 tracking-widest uppercase">Weak Areas</h3>
                                <ul className="space-y-6">
                                    {weakAreas.map((area: string, index: number) => (
                                        <li key={index} className="flex items-center gap-4 group">
                                            <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-black shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                                            <span className="text-lg font-black tracking-tight uppercase group-hover:translate-x-1 transition-transform">{area}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex-1 p-8 rounded-[32px] flex flex-col items-center justify-between bg-gradient-to-br from-[#d000ff] via-[#8000ff] to-[#2000ff] border-b-2 border-r-1 border-[#00ff41]">
                                <div className="relative w-32 h-32 rounded-full border-4 border-black/30 overflow-hidden shadow-2xl bg-gray-800">
                                    {professor.avatarUrl ? (
                                        <Image
                                            src={professor.avatarUrl}
                                            alt={professor.name || "Professor"}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white font-bold">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-lg font-black tracking-tighter uppercase mt-4">{professor.name || "Professor"}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}