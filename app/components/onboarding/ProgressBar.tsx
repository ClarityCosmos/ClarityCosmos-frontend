"use client";

interface ProgressBarProps {
    value: number;
    max?: number;
    label: string;
    color?: string;
}

export default function ProgressBar({
    value,
    max = 100,
    label,
    color = "from-purple-500 to-indigo-600",
}: ProgressBarProps) {
    const percentage = Math.min(Math.round((value / max) * 100), 100);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-white/80 tracking-wide uppercase">
                    {label}
                </span>
                <span className="text-sm font-bold text-white">{percentage}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
