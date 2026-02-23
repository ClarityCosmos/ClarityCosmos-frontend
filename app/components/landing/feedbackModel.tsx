"use client";

import React, { useState } from "react";
import { X, Heart } from "lucide-react";

export default function FeedbackModal({ closeModal }: { closeModal: () => void }) {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            rating: rating.toString(),
            message: feedback || null,
        };

        console.log("Sending to backend:", payload);

        try {
            const response = await fetch("https://16.171.250.82.sslip.io/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Feedback sent successfully!");
                closeModal();
            } else {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData?.error?.message || "Failed to send feedback");
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
            alert(error instanceof Error ? error.message : "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            {/* Modal Container */}
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#4c0082] via-[#800080] to-[#b000b0] text-center shadow-2xl border border-purple-400/20">

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 left-4 p-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="flex flex-row ml-20 items-center gap-2 mb-8">
                    <Heart size={48} fill="red" color="red" className="drop-shadow-lg" />
                    <h2 className="text-3xl font-bold text-white tracking-wider">THANKS!</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Rating Section */}
                    <div className="space-y-2">
                        <h3 className="text-[24px] font-bold text-white tracking-wide">RATE US!</h3>
                        <div className="flex justify-center items-center gap-3 p-3 rounded-full bg-gradient-to-r from-indigo-800 to-purple-700 border border-green-400 shadow-inner">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="transition-transform hover:scale-125 active:scale-90"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={(hover || rating) >= star ? "#FFD700" : "#FFFFFF"}
                                        className="w-8 h-8 cursor-pointer drop-shadow-md"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Input Section */}
                    <div className="space-y-4 text-left">
                        <h3 className="text-xl font-bold text-white text-center uppercase tracking-wide">Give Feedback</h3>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Tell us more..."
                            className="w-full h-40 p-4 rounded-2xl bg-indigo-900/50 text-white border-none focus:ring-2 focus:ring-purple-400 outline-none resize-none placeholder-gray-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-[189px] py-3 rounded-xl bg-gradient-to-r from-indigo-800 to-purple-700 text-white font-bold text-2xl uppercase shadow-lg border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1 transition-all hover:scale-105"
                    >
                        Submit!
                    </button>
                </form>
            </div>
        </div>
    );
}