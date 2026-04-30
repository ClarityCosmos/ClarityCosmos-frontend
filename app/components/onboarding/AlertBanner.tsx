"use client";

interface AlertBannerProps {
    message: string;
}

export default function AlertBanner({ message }: AlertBannerProps) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-red-500/30 bg-red-950/40 backdrop-blur-sm px-5 py-4 shadow-lg">
            {/* Red pulse glow */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500/30 blur-xl animate-pulse" />

            <div className="relative z-10 flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center shadow-[0_0_12px_rgba(220,38,38,0.6)]">
                    <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-red-200 font-medium leading-relaxed">
                    {message}
                </p>
            </div>
        </div>
    );
}
