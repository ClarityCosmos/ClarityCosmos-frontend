"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- Question Definitions ---
const QUESTIONS = [
    {
        id: "background",
        title: "What best describes your background?",
        type: "radio" as const,
        options: [
            "College/University student",
            "Working professional",
            "Career switcher",
            "Self-learner preparing for interviews",
        ],
    },
    {
        id: "understanding",
        title: "How would you rate your current DSA understanding?",
        type: "radio" as const,
        options: ["Beginner", "Intermediate", "Advanced"],
    },
    {
        id: "language",
        title: "What's your preferred programming language for DSA?",
        type: "radio" as const,
        options: [
            "C++",
            "Java",
            "Python",
            "JavaScript",
            "C",
            "C#",
            "Go",
            "Rust",
            "Kotlin",
            "Swift",
        ],
    },
    {
        id: "learningSources",
        title: "How do you currently learn DSA?",
        subtitle: "Select all that apply",
        type: "checkbox" as const,
        options: [
            "YouTube tutorials",
            "Online courses (Coursera, Udemy, etc.)",
            "Practice sites (LeetCode, HackerRank, etc.)",
            "College or coaching classes",
            "Self-study from books",
        ],
    },
    {
        id: "struggles",
        title: "What's your biggest struggle?",
        subtitle: "Select all that apply",
        type: "checkbox" as const,
        options: [
            "Staying consistent",
            "Understanding complex topics",
            "Choosing what to study next",
            "Getting stuck on problems",
            "Balancing DSA with other commitments",
        ],
    },
    {
        id: "hoursPerDay",
        title: "How many hours per day can you dedicate?",
        type: "radio" as const,
        options: ["< 1 hour", "1–2 hours", "2–4 hours", "4+ hours"],
    },
    {
        id: "goal",
        title: "What's your primary goal?",
        type: "radio" as const,
        options: [
            "Crack coding interviews (FAANG / startups)",
            "Build strong problem-solving foundation",
            "Excel in competitive programming",
            "Learn DSA for academic growth",
        ],
    },
    {
        id: "goalTimeframe",
        title: "When do you want to achieve your goal?",
        type: "radio" as const,
        options: [
            "In the next 3 months",
            "3–6 months",
            "6–12 months",
            "Not sure yet",
        ],
    },
    {
        id: "mentorStyle",
        title: "What mentor style works best for you?",
        subtitle: "Select all that apply",
        type: "checkbox" as const,
        options: [
            "Structured and strict",
            "Supportive and motivating",
            "Fast-paced and challenge-driven",
            "Step-by-step with detailed explanations",
        ],
    },
    {
        id: "courseType",
        title: "What type of courses do you prefer?",
        type: "radio" as const,
        options: ["Free only", "Paid only", "Both Free and Paid"],
    },
    {
        id: "preferredLanguage",
        title: "Which language do you prefer?",
        type: "radio" as const,
        options: ["English", "Urdu"],
    },
    {
        id: "preferredProgLanguage",
        title: "Which programming language do you prefer?",
        type: "radio" as const,
        options: [
            "Python",
            "JavaScript",
            "C++",
            "Java",
            "C",
            "C#",
            "Go",
            "Rust",
            "Kotlin",
            "Swift",
            "TypeScript",
            "Ruby",
        ],
    },
    {
        id: "avatarUrl",
        title: "Choose your avatar",
        type: "avatar" as const,
        options: [
            "/assets/avatar_1.jpeg",
            "/assets/avatar_2.jpeg",
            "/assets/avatar_3.jpeg",
        ],
    },
];

const TOTAL_STEPS = QUESTIONS.length;

// Backend API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [direction, setDirection] = useState<"next" | "back">("next");

    const currentQuestion = QUESTIONS[currentStep];
    const isLastStep = currentStep === TOTAL_STEPS - 1;

    // --- Check if current step has a valid answer ---
    const hasAnswer = () => {
        const answer = answers[currentQuestion.id];
        if (!answer) return false;
        if (Array.isArray(answer)) return answer.length > 0;
        return answer.length > 0;
    };

    // --- Handle radio selection ---
    const handleRadioSelect = (value: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    };

    // --- Handle checkbox toggle ---
    const handleCheckboxToggle = (value: string) => {
        setAnswers((prev) => {
            const current = (prev[currentQuestion.id] as string[]) || [];
            if (current.includes(value)) {
                return {
                    ...prev,
                    [currentQuestion.id]: current.filter((v) => v !== value),
                };
            }
            return {
                ...prev,
                [currentQuestion.id]: [...current, value],
            };
        });
    };

    // --- Handle avatar selection ---
    const handleAvatarSelect = (url: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: url }));
    };

    // --- Navigation ---
    const goNext = () => {
        if (currentStep < TOTAL_STEPS - 1) {
            setDirection("next");
            setCurrentStep((s) => s + 1);
        }
    };

    const goBack = () => {
        if (currentStep > 0) {
            setDirection("back");
            setCurrentStep((s) => s - 1);
        }
    };

    // --- Submit all answers ---
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to submit.");
            setIsSubmitting(false);
            return;
        }

        const payload = {
            background: answers.background,
            understanding: answers.understanding,
            language: answers.language,
            learningSources: answers.learningSources,
            struggles: answers.struggles,
            hoursPerDay: answers.hoursPerDay,
            goal: answers.goal,
            goalTimeframe: answers.goalTimeframe,
            mentorStyle: answers.mentorStyle,
            courseType: answers.courseType,
            preferredLanguage: answers.preferredLanguage,
            preferredProgLanguage: answers.preferredProgLanguage,
            avatarUrl: answers.avatarUrl || null,
        };

        try {
            const res = await fetch(`${API_BASE}/api/onboarding/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.error?.message || "Failed to submit onboarding"
                );
            }

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Progress percentage ---
    const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100;

    return (
        <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Progress Bar */}
            <div className="w-full max-w-xl mb-8 relative z-10">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-white/50 text-sm font-medium tracking-wide">
                        Step {currentStep + 1} of {TOTAL_STEPS}
                    </span>
                    <span className="text-white/50 text-sm font-medium">
                        {Math.round(progressPercent)}%
                    </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div
                key={currentStep}
                className={`w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative z-10 
                    animate-in ${direction === "next" ? "slide-in-from-right-5" : "slide-in-from-left-5"} 
                    fade-in duration-300`}
                style={{
                    animation: `${direction === "next" ? "slideInRight" : "slideInLeft"} 0.35s ease-out`,
                }}
            >
                {/* Question Title */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                    <p className="text-sm text-gray-500 mb-6">
                        {currentQuestion.subtitle}
                    </p>
                )}
                {!currentQuestion.subtitle && <div className="mb-6" />}

                {/* Radio Options */}
                {currentQuestion.type === "radio" && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => {
                            const isSelected =
                                answers[currentQuestion.id] === option;
                            return (
                                <button
                                    key={option}
                                    onClick={() => handleRadioSelect(option)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium
                                        ${
                                            isSelected
                                                ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md shadow-purple-100"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                                                ${
                                                    isSelected
                                                        ? "border-purple-500 bg-purple-500"
                                                        : "border-gray-300"
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <span>{option}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Checkbox Options */}
                {currentQuestion.type === "checkbox" && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => {
                            const selected =
                                (answers[currentQuestion.id] as string[]) || [];
                            const isChecked = selected.includes(option);
                            return (
                                <button
                                    key={option}
                                    onClick={() => handleCheckboxToggle(option)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium
                                        ${
                                            isChecked
                                                ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md shadow-purple-100"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                                                ${
                                                    isChecked
                                                        ? "border-purple-500 bg-purple-500"
                                                        : "border-gray-300"
                                                }`}
                                        >
                                            {isChecked && (
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span>{option}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Avatar Selection */}
                {currentQuestion.type === "avatar" && (
                    <div className="grid grid-cols-3 gap-4">
                        {currentQuestion.options.map((url, index) => {
                            const isSelected =
                                answers[currentQuestion.id] === url;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAvatarSelect(url)}
                                    className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-300 aspect-square
                                        ${
                                            isSelected
                                                ? "border-purple-500 shadow-xl shadow-purple-200 scale-105"
                                                : "border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                        }`}
                                >
                                    <img
                                        src={url}
                                        alt={`Avatar ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="w-full max-w-xl flex justify-between mt-6 relative z-10">
                <button
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                        ${
                            currentStep === 0
                                ? "opacity-0 pointer-events-none"
                                : "text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                        }`}
                >
                    ← Back
                </button>

                {isLastStep ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!hasAnswer() || isSubmitting}
                        className={`px-8 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 shadow-lg
                            ${
                                !hasAnswer() || isSubmitting
                                    ? "bg-gray-600 cursor-not-allowed opacity-60"
                                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]"
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            "Submit & View Profile →"
                        )}
                    </button>
                ) : (
                    <button
                        onClick={goNext}
                        disabled={!hasAnswer()}
                        className={`px-8 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 shadow-lg
                            ${
                                !hasAnswer()
                                    ? "bg-gray-600 cursor-not-allowed opacity-60"
                                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02]"
                            }`}
                    >
                        Next →
                    </button>
                )}
            </div>

            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="fixed inset-0 z-50 bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        <p className="text-white font-semibold text-lg">
                            Analyzing your profile...
                        </p>
                        <p className="text-white/50 text-sm">
                            This won&apos;t take long
                        </p>
                    </div>
                </div>
            )}

            {/* Animation keyframes */}
            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
}
