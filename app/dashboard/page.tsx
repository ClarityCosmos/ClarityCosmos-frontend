"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface WeakArea {
    title: string;
    description: string;
}

interface ProfileData {
    username: string;
    email: string;
    onboarding: {
        nickname: string;
        section: string;
        avatarUrl: string | null;
        programmingLanguage: string;
        stuckPoint: string;
        problemApproach: string;
        loopVisualization: string;
        errorReaction: string;
        copyFrequency: string;
        firstMove: string;
    };
    stats: {
        testsAttempted: number;
        averageMarks: number;
        avgTimePerQuestion: number;
    };
    progress: {
        roteMemory: number;
        semesterReadiness: number;
    };
    weakAreas: WeakArea[];
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

export default function DashboardPage() {
    const [data, setData] = useState<ProfileData | null>(null);
    const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to view your dashboard.");
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
            <div style={{
                background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a0a2e 100%)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                    width: 48,
                    height: 48,
                    border: "4px solid rgba(138, 43, 226, 0.3)",
                    borderTop: "4px solid #8a2be2",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a0a2e 100%)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                padding: 16,
                color: "white",
            }}>
                <p style={{ color: "#f87171", fontSize: 18, fontWeight: 600, textAlign: "center" }}>{error}</p>
                <div style={{ display: "flex", gap: 12 }}>
                    <Link href="/onboarding" style={{
                        padding: "12px 24px",
                        borderRadius: 12,
                        background: "#7c3aed",
                        color: "white",
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                    }}>Go to Onboarding</Link>
                    <Link href="/" style={{
                        padding: "12px 24px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                    }}>Home</Link>
                </div>
            </div>
        );
    }

    if (!data) return null;
    const { stats, progress, weakAreas, criticalAlerts, onboarding } = data;
    const nickname = onboarding?.nickname || userData?.username || data.username || "User";
    const section = onboarding?.section || "Semester 1";

    // Get first letter for avatar
    const initial = nickname.charAt(0).toUpperCase();

    // Determine alert message
    const showAlert = criticalAlerts.length > 0;
    const alertMessage = `Alert!! ${nickname}, their are high chances of your semester failure! kindly consult with your teacher.`;

    return (
        <div style={{
            background: "linear-gradient(135deg, #0a0a2e 0%, #0d0b3e 30%, #1a0a3e 60%, #0a0a2e 100%)",
            minHeight: "100vh",
            color: "white",
            fontFamily: "'Segoe UI', 'Inter', sans-serif",
        }}>
            <style>{`
                @keyframes glowPulse {
                    0%, 100% { box-shadow: 0 0 15px rgba(0, 100, 255, 0.3), inset 0 0 15px rgba(0, 100, 255, 0.1); }
                    50% { box-shadow: 0 0 25px rgba(0, 100, 255, 0.5), inset 0 0 25px rgba(0, 100, 255, 0.15); }
                }
                @keyframes borderGlow {
                    0%, 100% { border-color: rgba(0, 120, 255, 0.5); }
                    50% { border-color: rgba(100, 150, 255, 0.8); }
                }
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .dash-nav {
                    width: 100%;
                    padding: 12px 24px;
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    background: linear-gradient(90deg, #1a1050 0%, #2a1a6e 50%, #1a1050 100%);
                    border-bottom: 1px solid rgba(0, 100, 255, 0.2);
                    flex-wrap: wrap;
                }
                .dash-nav-identity {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .dash-nav-section {
                    font-weight: 600;
                    font-size: 15px;
                    color: rgba(255,255,255,0.7);
                    letter-spacing: 0.5px;
                }
                .dash-nav-links {
                    display: flex;
                    gap: 24px;
                    margin-left: auto;
                }
                .nav-link {
                    color: rgba(255,255,255,0.85);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 15px;
                    padding: 6px 4px;
                    transition: all 0.2s;
                    border-bottom: 2px solid transparent;
                }
                .nav-link:hover {
                    color: white;
                    border-bottom-color: rgba(255,255,255,0.5);
                }
                .nav-link-active {
                    color: white;
                    text-decoration: underline;
                    text-underline-offset: 6px;
                    text-decoration-thickness: 2px;
                }
                .glow-card {
                    background: linear-gradient(145deg, #0f1a5e 0%, #1a1070 50%, #1e0d6e 100%);
                    border: 2px solid rgba(0, 120, 255, 0.4);
                    border-radius: 16px;
                    animation: borderGlow 3s ease-in-out infinite;
                }
                .stat-bar-track {
                    width: 100%;
                    height: 8px;
                    background: rgba(0, 50, 150, 0.3);
                    border-radius: 4px;
                    overflow: hidden;
                    border: 1px solid rgba(0, 100, 255, 0.3);
                }
                .dash-grid {
                    display: grid;
                    grid-template-columns: 200px 1fr 1fr;
                    gap: 24px;
                    align-items: start;
                }
                .dash-stats-col {
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    padding-top: 8px;
                }
                .dash-center-col {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .dash-bottom-btns {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    margin-top: 40px;
                    flex-wrap: wrap;
                }
                .btn-outline {
                    padding: 12px 36px;
                    border-radius: 8px;
                    border: 2px solid rgba(0, 120, 255, 0.6);
                    background: transparent;
                    color: white;
                    font-weight: 700;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-outline:hover {
                    background: rgba(0, 120, 255, 0.15);
                    border-color: rgba(0, 150, 255, 0.9);
                    box-shadow: 0 0 20px rgba(0, 120, 255, 0.3);
                }
                .btn-filled {
                    padding: 12px 36px;
                    border-radius: 8px;
                    border: 2px solid rgba(0, 120, 255, 0.6);
                    background: linear-gradient(135deg, #1a1a6e, #2a1a8e);
                    color: white;
                    font-weight: 700;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-filled:hover {
                    background: linear-gradient(135deg, #2a2a8e, #3a2aae);
                    box-shadow: 0 0 20px rgba(0, 120, 255, 0.3);
                }
                @media (max-width: 768px) {
                    .dash-nav {
                        padding: 10px 16px;
                        gap: 12px;
                        justify-content: center;
                    }
                    .dash-nav-section {
                        display: none;
                    }
                    .dash-nav-links {
                        margin-left: 0;
                        width: 100%;
                        justify-content: center;
                        gap: 12px;
                        flex-wrap: wrap;
                    }
                    .nav-link {
                        font-size: 13px;
                        padding: 4px 2px;
                    }
                    .dash-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .dash-stats-col {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                        padding-top: 0;
                    }
                    .dash-bottom-btns {
                        gap: 12px;
                        margin-top: 28px;
                    }
                    .btn-outline, .btn-filled {
                        padding: 10px 24px;
                        font-size: 14px;
                    }
                }
                @media (max-width: 480px) {
                    .dash-stats-col {
                        grid-template-columns: 1fr;
                    }
                    .dash-nav-links {
                        gap: 8px;
                    }
                    .nav-link {
                        font-size: 12px;
                    }
                }
            `}</style>

            {/* ─── Navbar ─── */}
            <nav className="dash-nav">
                <div className="dash-nav-identity">
                    <div style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #4a2fbd, #7c3aed)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 18,
                        border: "2px solid rgba(255,255,255,0.2)",
                        overflow: "hidden",
                        flexShrink: 0,
                    }}>
                        {initial}
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 20, color: "white" }}>{nickname}</span>
                </div>

                <span className="dash-nav-section">{section}</span>

                <div className="dash-nav-links">
                    <Link href="/dashboard" className="nav-link nav-link-active">Dashboard</Link>
                    <Link href="/action-plan" className="nav-link">Action Plan</Link>
                    <Link href="#" className="nav-link">Tests Results</Link>
                    <Link href="#" className="nav-link">Test Sandbox</Link>
                </div>
            </nav>

            {/* ─── Alert Banner ─── */}
            {showAlert && (
                <div style={{
                    width: "100%",
                    padding: "10px 24px",
                    background: "linear-gradient(90deg, #dc2626, #b91c1c)",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "white",
                    animation: "slideDown 0.4s ease-out",
                }}>
                    {alertMessage}
                </div>
            )}

            {/* ─── Main Content ─── */}
            <main style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "32px 20px",
            }}>
                {/* 3-Column Grid */}
                <div className="dash-grid">
                    {/* ─── Left Column: Stats ─── */}
                    <div className="dash-stats-col">
                        {/* Tests Attempted */}
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>
                                Tests Attempted
                            </p>
                            <p style={{ fontSize: 36, fontWeight: 900, color: "white", margin: "4px 0" }}>
                                {stats.testsAttempted}
                            </p>
                            <div className="stat-bar-track">
                                <div style={{
                                    width: `${Math.min(stats.testsAttempted * 2, 100)}%`,
                                    height: "100%",
                                    background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                                    borderRadius: 4,
                                    transition: "width 1s ease-out",
                                }} />
                            </div>
                        </div>

                        {/* Avg Marks */}
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>
                                Avg Marks
                            </p>
                            <p style={{ fontSize: 36, fontWeight: 900, color: "white", margin: "4px 0" }}>
                                {stats.averageMarks}
                            </p>
                            <div className="stat-bar-track">
                                <div style={{
                                    width: `${stats.averageMarks}%`,
                                    height: "100%",
                                    background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                                    borderRadius: 4,
                                    transition: "width 1s ease-out",
                                }} />
                            </div>
                        </div>

                        {/* Avg Time per Question */}
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>
                                Avg Time per Question
                            </p>
                            <p style={{ fontSize: 36, fontWeight: 900, color: "white", margin: "4px 0" }}>
                                {stats.avgTimePerQuestion}
                            </p>
                            <div className="stat-bar-track">
                                <div style={{
                                    width: `${Math.min(stats.avgTimePerQuestion * 10, 100)}%`,
                                    height: "100%",
                                    background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                                    borderRadius: 4,
                                    transition: "width 1s ease-out",
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* ─── Center Column: Rote Memory + Semester Readiness ─── */}
                    <div className="dash-center-col">
                        {/* Rote Memory Card */}
                        <div className="glow-card" style={{ padding: 28, textAlign: "center" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "rgba(255,255,255,0.9)" }}>
                                Rote-Memory
                            </h3>
                            <p style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "8px 0 16px" }}>
                                {progress.roteMemory}%
                            </p>
                            <div style={{
                                width: "100%",
                                height: 12,
                                background: "rgba(0, 50, 150, 0.3)",
                                borderRadius: 6,
                                overflow: "hidden",
                                border: "2px solid rgba(0, 120, 255, 0.4)",
                            }}>
                                <div style={{
                                    width: `${progress.roteMemory}%`,
                                    height: "100%",
                                    background: progress.roteMemory >= 60 ? "linear-gradient(90deg, #dc2626, #ef4444)" : "linear-gradient(90deg, #22c55e, #4ade80)",
                                    borderRadius: 4,
                                    transition: "width 1.2s ease-out",
                                }} />
                            </div>
                        </div>

                        {/* Semester Readiness Card */}
                        <div className="glow-card" style={{ padding: 28, textAlign: "center" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "rgba(255,255,255,0.9)" }}>
                                Semester Readiness
                            </h3>
                            <p style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "8px 0 16px" }}>
                                {progress.semesterReadiness}%
                            </p>
                            <div style={{
                                width: "100%",
                                height: 12,
                                background: "rgba(0, 50, 150, 0.3)",
                                borderRadius: 6,
                                overflow: "hidden",
                                border: "2px solid rgba(0, 120, 255, 0.4)",
                            }}>
                                <div style={{
                                    width: `${progress.semesterReadiness}%`,
                                    height: "100%",
                                    borderRadius: 4,
                                    transition: "width 1.2s ease-out",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: "50%",
                                        background: "#eab308",
                                        boxShadow: "0 0 10px rgba(234, 179, 8, 0.6)",
                                        marginLeft: "auto",
                                        position: "relative" as const,
                                        right: -4,
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Right Column: Weak Areas ─── */}
                    <div className="glow-card" style={{
                        padding: 28,
                        background: "linear-gradient(145deg, #1a1a7a 0%, #2a1a9e 50%, #1a0d6e 100%)",
                    }}>
                        <h3 style={{
                            fontSize: 20,
                            fontWeight: 800,
                            marginBottom: 20,
                            color: "white",
                        }}>
                            Weak Areas
                        </h3>
                        {weakAreas.length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
                                {weakAreas.map((area, i) => (
                                    <div key={i}>
                                        <p style={{
                                            fontSize: 14,
                                            fontWeight: 800,
                                            color: "white",
                                            marginBottom: 4,
                                        }}>
                                            {area.title}
                                        </p>
                                        <p style={{
                                            fontSize: 12,
                                            color: "rgba(200, 210, 255, 0.75)",
                                            lineHeight: 1.5,
                                            margin: 0,
                                        }}>
                                            {area.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>No weak areas detected!</p>
                        )}
                    </div>
                </div>

                {/* ─── Bottom Buttons ─── */}
                <div className="dash-bottom-btns">
                    <Link href="/onboarding" className="btn-outline">
                        Resubmit Form
                    </Link>
                    <Link href="/action-plan" className="btn-filled">
                        Action Plan
                    </Link>
                </div>
            </main>
        </div>
    );
}