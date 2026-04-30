"use client";

interface StatCardProps {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    gradient?: string;
}

export default function StatCard({
    icon,
    value,
    label,
    gradient = "from-purple-600 to-indigo-700",
}: StatCardProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-xl border border-white/10`}
        >
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    {icon}
                </div>
                <div className="text-4xl font-black text-white tracking-tight">
                    {value}
                </div>
                <div className="text-sm font-semibold text-white/70 uppercase tracking-widest">
                    {label}
                </div>
            </div>
        </div>
    );
}
