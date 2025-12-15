import { Info, Users, Briefcase, Heart, Building, Wallet, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";

interface DistributionBreakdownProps {
    distribution: {
        employees: number;
        founders: number;
        investors: number;
        sweatEquity: number;
        treasury: number;
        community: number;
        reserves: number;
    };
    totalSurplusMonthly: number; // For percentage reference if needed
    className?: string;
}

export function DistributionBreakdown({ distribution, className }: DistributionBreakdownProps) {
    const items = [
        {
            id: "employees",
            label: "Employees",
            amount: distribution.employees,
            percentage: 30,
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500",
            desc: "Primary beneficiaries. Allocated based on tenure and contribution.",
        },
        {
            id: "investors",
            label: "External Investors",
            amount: distribution.investors,
            percentage: 15,
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-500",
            desc: "Your share. Proportional return based on seed tokens held.",
        },
        {
            id: "sweat",
            label: "Sweat Equity",
            amount: distribution.sweatEquity,
            percentage: 15,
            icon: Briefcase,
            color: "text-purple-400",
            bg: "bg-purple-500",
            desc: "Ownership earned by employees via salary sacrifice (Seed 1).",
        },
        {
            id: "founders",
            label: "Founders",
            amount: distribution.founders,
            percentage: 10,
            icon: Building,
            color: "text-yellow-400",
            bg: "bg-yellow-500",
            desc: "Capped return for originators (Seed 0). Limited to 2x median bonus.",
        },
        {
            id: "treasury",
            label: "Treasury",
            amount: distribution.treasury,
            percentage: 10,
            icon: Wallet,
            color: "text-orange-400",
            bg: "bg-orange-500",
            desc: "Universal Treasury Reserve for future planet creation and stability.",
        },
        {
            id: "community",
            label: "Community",
            amount: distribution.community,
            percentage: 10,
            icon: Heart,
            color: "text-pink-400",
            bg: "bg-pink-500",
            desc: "Social impact and sustainability initiatives.",
        },
        {
            id: "reserves",
            label: "Startregic Reserves & Dream",
            amount: distribution.reserves,
            percentage: 10,
            icon: Info,
            color: "text-gray-400",
            bg: "bg-gray-500",
            desc: "Structural reserves and Dream Alignment Fellowship allocations.",
        },
    ];



    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-yellow-400" />
                    Surplus Redistribution Breakdown
                </h3>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Article IX-B Compliance</span>
            </div>

            {/* Progress Bar */}
            <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden flex">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={cn("h-full transition-all duration-500 hover:brightness-110", item.bg)}
                        style={{ width: `${item.percentage}%` }}
                        title={`${item.label}: ${item.percentage}%`}
                    />
                ))}
            </div>

            {/* Grid Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group relative p-3 rounded-xl border border-gray-700 bg-gray-800/70 hover:bg-gray-700/80 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                                <item.icon className={cn("w-4 h-4", item.color)} />
                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                    {item.label}
                                </span>
                            </div>
                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-black/30", item.color)}>
                                {item.percentage}%
                            </span>
                        </div>

                        <div className="text-xl font-bold text-white">
                            BDT {Math.round(item.amount).toLocaleString()}
                        </div>

                        {/* Tooltip-style description */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 backdrop-blur-md rounded-xl p-4 text-center pointer-events-none border border-white/10">
                            <p className="text-xs text-gray-200 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex gap-3 items-start">
                <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-200/80 leading-relaxed">
                    <span className="font-bold text-yellow-200">5% Profit Cap Rule:</span> Net Profit Margin is strictly capped at 5% of revenue.
                    Any earnings beyond this are classified as <strong>Surplus</strong> and redistributed according to the chart above,
                    ensuring wealth is shared with those who create it.
                </p>
            </div>
        </div>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    )
}
