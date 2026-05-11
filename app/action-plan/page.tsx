"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeedbackModal from "../components/landing/feedbackModel";
import { LayoutGrid, Plus } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getDashboardData(token: string | null) {
    if (!token) throw new Error("No token provided");

    const res = await fetch(`${API_BASE}/api/users/beta-data`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || "Failed to fetch dashboard data");
    }

    const result = await res.json();
    return result.data;
}

async function getProfileData(token: string | null) {
    if (!token) throw new Error("No token provided");

    const res = await fetch(`${API_BASE}/api/onboarding/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
}

export default function ActionPlanPage() {
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
                const [result, profileData] = await Promise.all([
                    getDashboardData(token),
                    getProfileData(token),
                ]);

                const mappedData = {
                    user: {
                        username: result.username,
                        email: result.email,
                    },
                    professor: {
                        name: result.mentorName,
                        avatarUrl: result.mentorImageUrl,
                    },
                    language: result.language || "Python",
                    weakAreas: result.hardestTopic
                        ? result.hardestTopic.split(",").map((t: string) => t.trim())
                        : [],
                    videoUrl: result.video_url,
                    nickname: profileData?.onboarding?.nickname || result.username || "User",
                    section: profileData?.onboarding?.section || "Semester 1",
                    avatarUrl: profileData?.onboarding?.avatarUrl || null,
                };

                setData(mappedData);
            } catch (err: any) {
                console.error(err);

                if (err.message.includes("token") || err.message.includes("expired") || err.message.includes("Authentication")) {
                    localStorage.removeItem("token");
                    window.location.href = "/auth/signin";
                    return;
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading)
        return (
            <div style={{
                background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a0a2e 100%)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
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

    if (error)
        return (
            <div style={{
                background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a0a2e 100%)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                color: "white",
            }}>
                <p style={{ color: "#ef4444", fontSize: 18, marginBottom: 16 }}>{error}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                    Please refresh the page or log in again if necessary.
                </p>
            </div>
        );

    const userName = data?.nickname || data?.user?.username || "User";
    const section = data?.section || "Semester 1";
    const professor = data?.professor || {};
    const videoUrl = data?.videoUrl || "";
    const language = data?.language || "Python";
    const weakAreas = data?.weakAreas || [];

    // Get first letter for avatar
    const initial = userName.charAt(0).toUpperCase();

    return (
        <div style={{
            background: "linear-gradient(135deg, #0a0a2e 0%, #0d0b3e 30%, #1a0a3e 60%, #0a0a2e 100%)",
            minHeight: "100vh",
            color: "white",
            fontFamily: "'Segoe UI', 'Inter', sans-serif",
        }}>
            <style>{`
                .ap-nav {
                    width: 100%;
                    padding: 12px 24px;
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    background: linear-gradient(90deg, #1a1050 0%, #2a1a6e 50%, #1a1050 100%);
                    border-bottom: 1px solid rgba(0, 100, 255, 0.2);
                    flex-wrap: wrap;
                }
                .ap-nav-identity {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .ap-nav-section {
                    font-weight: 600;
                    font-size: 15px;
                    color: rgba(255,255,255,0.7);
                    letter-spacing: 0.5px;
                }
                .ap-nav-links {
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
                .ap-content {
                    display: flex;
                    justify-content: center;
                    padding: 24px 16px;
                }
                .ap-inner {
                    width: 100%;
                    max-width: 1100px;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    align-items: center;
                }
                .ap-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin: 0;
                    text-align: center;
                }
                .ap-video-wrapper {
                    width: 100%;
                    max-width: 900px;
                    aspect-ratio: 16/9;
                    border-radius: 16px;
                    padding: 2px;
                    background: linear-gradient(90deg, #ec4899, #3b82f6);
                    position: relative;
                    overflow: hidden;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(50%); }
                }
                .animate-shimmer {
                    animation: shimmer 2.2s linear infinite;
                }
                @media (max-width: 768px) {
                    .ap-nav {
                        padding: 10px 16px;
                        gap: 12px;
                        justify-content: center;
                    }
                    .ap-nav-section {
                        display: none;
                    }
                    .ap-nav-links {
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
                    .ap-title {
                        font-size: 22px;
                        padding: 0 8px;
                    }
                    .ap-content {
                        padding: 16px 12px;
                    }
                    .ap-inner {
                        gap: 24px;
                    }
                }
                @media (max-width: 480px) {
                    .ap-title {
                        font-size: 18px;
                    }
                    .ap-nav-links {
                        gap: 8px;
                    }
                    .nav-link {
                        font-size: 12px;
                    }
                }
            `}</style>

            <nav className="ap-nav">
                <div className="ap-nav-identity">
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
                    <span style={{ fontWeight: 800, fontSize: 20, color: "white" }}>{userName}</span>
                </div>

                <span className="ap-nav-section">{section}</span>

                <div className="ap-nav-links">
                    <Link href="/dashboard" className="nav-link">Dashboard</Link>
                    <Link href="/action-plan" className="nav-link nav-link-active">Action Plan</Link>
                    <Link href="#" className="nav-link">Tests Results</Link>
                    <Link href="#" className="nav-link">Test Sandbox</Link>
                </div>
            </nav>

            {/* ─── Main Content ─── */}
            <section className="ap-content">
                <div className="ap-inner">
                    <div style={{ textAlign: "center" }}>
                        <h1 className="ap-title">
                            <span>{userName.toUpperCase()}</span>, YOUR DSA ROADMAP IS READY!
                        </h1>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", position: "relative" as const, width: "100%" }}>
                        <div className="ap-video-wrapper">
                            {!videoLoaded && (
                                <div style={{
                                    position: "absolute" as const,
                                    inset: 0,
                                    zIndex: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    background: "#111827",
                                }}>
                                    <div style={{ position: "absolute" as const, inset: 0 }}>
                                        <div className="animate-shimmer" style={{
                                            width: "200%",
                                            height: "100%",
                                            background: "linear-gradient(110deg, transparent, rgba(168,85,247,0.35), rgba(34,197,94,0.35), transparent)",
                                        }} />
                                    </div>
                                    <span style={{
                                        position: "relative" as const,
                                        color: "white",
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                        fontSize: 15,
                                    }}>
                                        Your roadmap is being granted by {professor.name || "Professor"}
                                    </span>
                                </div>
                            )}
                            <div style={{
                                width: "100%",
                                height: "100%",
                                background: "black",
                                borderRadius: 16,
                                overflow: "hidden",
                                border: "1px solid #4ade80",
                            }}>
                                {videoUrl ? (
                                    <video
                                        src={videoUrl}
                                        controls
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        onLoadedData={() => setVideoLoaded(true)}
                                        onEnded={() => setShowFeedback(true)}
                                    />
                                ) : (
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}>
                                        Video not available
                                    </div>
                                )}
                            </div>
                        </div>

                        {showFeedback && (
                            <div style={{ position: "fixed" as const, inset: 0, zIndex: 50 }}>
                                <FeedbackModal closeModal={() => setShowFeedback(false)} />
                            </div>
                        )}
                    </div>

                    {/* Language + Weak Areas + Mentor */}

                </div>
            </section>
        </div>
    );
}
