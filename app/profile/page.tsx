"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ProfileData {
    username: string;
    email: string;
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

async function fetchProfile(token: string) {
    const res = await fetch(`${API_BASE}/api/onboarding/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || "Failed to fetch profile data");
    }
    const result = await res.json();
    return result.data;
}

async function fetchUserData(token: string) {
    const res = await fetch(`${API_BASE}/api/users/beta-data`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || "Failed to fetch user data");
    }
    const result = await res.json();
    return result.data;
}

export default function ProfilePage() {
    const [data, setData] = useState<ProfileData | null>(null);
    const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
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
                const [profileData, user] = await Promise.all([
                    fetchProfile(token),
                    fetchUserData(token),
                ]);
                setData(profileData);
                setUserData({ username: user.username, email: user.email });
            } catch (err: any) {
                if (err.message.includes("token") || err.message.includes("expired") || err.message.includes("Invalid")) {
                    localStorage.removeItem("token");
                    window.location.href = "/auth/signin";
                    return;
                }
                setError(err.message.includes("not completed")
                    ? "You haven't completed onboarding yet."
                    : err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#111827] min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#111827] min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-white">
                <p className="text-red-400 text-lg font-semibold text-center">{error}</p>
                <div className="flex gap-3">
                    <Link href="/onboarding" className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm">Go to Onboarding</Link>
                    <Link href="/" className="px-6 py-3 rounded-xl border border-white/20 text-white/60 font-semibold text-sm">Home</Link>
                </div>
            </div>
        );
    }

    if (!data) return null;
    const { stats, progress, weakAreas, criticalAlerts, onboarding } = data;
    const username = userData?.username || "User";
    const email = userData?.email || "";

    return (
        <div className="bg-[#111827] min-h-screen text-white">
            {/* ─── Navbar ─── */}
            <nav className="w-full px-6 py-3 flex items-center justify-between bg-[#1a2035] border-b border-[#2a3050]">
                <div className="flex items-center gap-3">
                    {onboarding.avatarUrl && (
                        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-500/50">
                            <img src={onboarding.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="leading-tight">
                        <p className="text-sm font-semibold text-white">{username}</p>
                        <p className="text-[11px] text-white/40">{email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="px-4 py-1.5 text-xs rounded-lg font-medium bg-purple-600 hover:bg-purple-700 transition text-white">
                        Dashboard
                    </Link>
                    <Link href="/onboarding" className="px-4 py-1.5 text-xs rounded-lg font-medium border border-[#2a3050] text-white/50 hover:text-white hover:bg-white/5 transition">
                        Retake Survey
                    </Link>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-5 py-8 space-y-6">
                {/* ─── Stat Cards ─── */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl p-5 bg-[#1a2035] border border-[#2a3050]">
                        <p className="text-[11px] uppercase tracking-widest mb-1 text-[#7c8db5]">Tests Attempted</p>
                        <p className="text-3xl font-black text-white">{stats.testsAttempted}</p>
                    </div>
                    <div className="rounded-xl p-5 bg-[#1a2035] border border-[#2a3050]">
                        <p className="text-[11px] uppercase tracking-widest mb-1 text-[#7c8db5]">Average Marks</p>
                        <p className="text-3xl font-black text-white">{stats.averageMarks}</p>
                    </div>
                </div>

                {/* ─── Readiness Overview ─── */}
                <div className="rounded-xl p-6 space-y-5 bg-[#1a2035] border border-[#2a3050]">
                    <h2 className="text-[15px] font-bold text-white">Readiness Overview</h2>

                    {/* Rote Memory */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#7c8db5]">Rote Memory</span>
                            <span className="text-[11px] font-bold text-[#7c8db5]">{progress.roteMemory}%</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full overflow-hidden bg-[#252d3d]">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: `${progress.roteMemory}%`,
                                    background: "linear-gradient(90deg, #22c55e, #eab308, #f97316)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Board Readiness */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#7c8db5]">Board Readiness</span>
                            <span className="text-[11px] font-bold text-[#7c8db5]">{progress.boardReadiness}%</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full overflow-hidden bg-[#252d3d]">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: `${progress.boardReadiness}%`,
                                    background: "linear-gradient(90deg, #22c55e, #10b981)",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Bottom Grid ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Weak Areas */}
                    <div
                        className="lg:col-span-1 rounded-xl p-6"
                        style={{
                            background: "linear-gradient(135deg, #2d1b69, #1a1145)",
                            border: "1px solid rgba(124, 58, 237, 0.2)",
                        }}
                    >
                        <h3 className="text-[15px] font-bold text-white mb-5">Weak Areas</h3>
                        {weakAreas.length > 0 ? (
                            <ul className="space-y-4">
                                {weakAreas.map((area, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-red-500" style={{ boxShadow: "0 0 6px rgba(239,68,68,0.6)" }} />
                                        <span className="text-sm font-medium text-[#e5e7eb]">{area}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-[#6b7280]">No weak areas detected!</p>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Critical Alerts */}
                        {criticalAlerts.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-[15px] font-bold text-white">Critical Alerts</h3>
                                {criticalAlerts.map((alert, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl px-4 py-3 flex items-start gap-3"
                                        style={{ background: "rgba(127, 29, 29, 0.3)", border: "1px solid rgba(239, 68, 68, 0.25)" }}
                                    >
                                        <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#dc2626]">
                                            <span className="text-white text-[10px] font-bold">!</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#fca5a5]">{alert}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Your Preferences */}
                        <div className="rounded-xl p-6 bg-[#1a2035] border border-[#2a3050]">
                            <h3 className="text-[15px] font-bold text-white mb-4">Your Preferences</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: "Goal", value: onboarding.goal.split("(")[0].trim() },
                                    { label: "Timeline", value: onboarding.goalTimeframe },
                                    { label: "Daily Hours", value: onboarding.hoursPerDay },
                                    { label: "Course Type", value: onboarding.courseType },
                                    { label: "Language", value: onboarding.preferredLanguage },
                                    { label: "Prog. Language", value: onboarding.preferredProgLanguage },
                                ].map((item, i) => (
                                    <div key={i} className="rounded-lg px-4 py-3 bg-[#111827] border border-[#252d3d]">
                                        <p className="text-[10px] uppercase tracking-widest mb-0.5 text-[#6b7280]">{item.label}</p>
                                        <p className="text-sm font-semibold text-white truncate">{item.value}</p>
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
