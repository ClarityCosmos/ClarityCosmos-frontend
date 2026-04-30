"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "../components/onboarding/ProgressBar";
import StatCard from "../components/onboarding/StatCard";
import AlertBanner from "../components/onboarding/AlertBanner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ProfileData {
    onboarding: {
        background: string;
        understanding: string;
        language: string;
        learningSources: string[];
        struggles: string[];
        hoursPerDay: string;
        goal: string;
        goalTimeframe: string;
        mentorStyle: string[];
        courseType: string;
        preferredLanguage: string;
        preferredProgLanguage: string;
        avatarUrl: string | null;
    };
    stats: {
        testsAttempted: number;
        averageMarks: number;
    };
    progress: {
        roteMemory: number;
        boardReadiness: number;
    };
    weakAreas: string[];
    criticalAlerts: string[];
}

async function fetchProfile(token: string): Promise<ProfileData> {
    const res = await fetch(`${API_BASE}/api/onboarding/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
            errData?.error?.message || "Failed to fetch profile data"
        );
    }

    const result = await res.json();
    return result.data;
}

export default function ProfilePage() {
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please log in to view your profile.");
                setLoading(false);
                return;
            }

            try {
                const profileData = await fetchProfile(token);
                setData(profileData);
            } catch (err: any) {
                if (err.message.includes("not completed")) {
                    setError(
                        "You haven't completed onboarding yet. Please complete the survey first."
                    );
                } else if (err.message.includes("token")) {
                    setError("Session expired. Please log in again.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    // --- Loading State ---
    if (loading) {
        return (
            <div className="bg-[#111827] min-h-screen text-white flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-white/60 font-medium">Loading your profile...</p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="bg-[#111827] min-h-screen text-white flex flex-col items-center justify-center gap-6 px-4">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-3xl">!</span>
                </div>
                <p className="text-red-400 text-lg font-semibold text-center">
                    {error}
                </p>
                <div className="flex gap-3">
                    <Link
                        href="/onboarding"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30"
                    >
                        Go to Onboarding
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl border border-white/20 text-white/70 font-semibold text-sm hover:text-white hover:bg-white/10 transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const { stats, progress, weakAreas, criticalAlerts, onboarding } = data;

    return (
        <div className="bg-[#111827] min-h-screen text-white relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between relative z-10">
                <Link
                    href="/"
                    className="px-4 py-2 text-sm rounded-xl bg-purple-700 hover:bg-purple-800 transition-all font-semibold"
                >
                    ← Back to Home
                </Link>
                <Link
                    href="/onboarding"
                    className="px-4 py-2 text-sm rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium"
                >
                    Retake Survey
                </Link>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 relative z-10">
                {/* Greeting */}
                <div className="text-center space-y-2">
                    {onboarding.avatarUrl && (
                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-purple-500/50 shadow-lg shadow-purple-500/20">
                            <img
                                src={onboarding.avatarUrl}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Your Learning Profile
                    </h1>
                    <p className="text-white/50 text-sm md:text-base">
                        {onboarding.background} • {onboarding.understanding} Level • {onboarding.language}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatCard
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        }
                        value={stats.testsAttempted}
                        label="Tests Attempted"
                        gradient="from-purple-600 to-violet-700"
                    />
                    <StatCard
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        }
                        value={stats.averageMarks}
                        label="Average Marks"
                        gradient="from-indigo-600 to-blue-700"
                    />
                </div>

                {/* Progress Bars */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm space-y-6">
                    <h2 className="text-lg font-bold text-white tracking-wide">
                        Readiness Overview
                    </h2>
                    <ProgressBar
                        value={progress.roteMemory}
                        label="Rote Memory"
                        color="from-amber-500 to-orange-600"
                    />
                    <ProgressBar
                        value={progress.boardReadiness}
                        label="Board Readiness"
                        color="from-emerald-500 to-green-600"
                    />
                </div>

                {/* Bottom Grid: Weak Areas + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weak Areas Panel */}
                    <div className="lg:col-span-1 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-white mb-5 tracking-wide">
                            Weak Areas
                        </h3>
                        {weakAreas.length > 0 ? (
                            <ul className="space-y-4">
                                {weakAreas.map((area, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                        <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                                            {area}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white/40 text-sm">
                                No significant weak areas detected. Great job!
                            </p>
                        )}
                    </div>

                    {/* Critical Alerts + Profile Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Critical Alerts */}
                        {criticalAlerts.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-white tracking-wide">
                                    Critical Alerts
                                </h3>
                                {criticalAlerts.map((alert, index) => (
                                    <AlertBanner key={index} message={alert} />
                                ))}
                            </div>
                        )}

                        {/* Profile Summary Cards */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
                                Your Preferences
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { label: "Goal", value: onboarding.goal.split("(")[0].trim() },
                                    { label: "Timeline", value: onboarding.goalTimeframe },
                                    { label: "Daily Hours", value: onboarding.hoursPerDay },
                                    { label: "Course Type", value: onboarding.courseType },
                                    { label: "Language", value: onboarding.preferredLanguage },
                                    { label: "Prog. Language", value: onboarding.preferredProgLanguage },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 rounded-xl p-3 border border-white/5"
                                    >
                                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-semibold text-white truncate">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
