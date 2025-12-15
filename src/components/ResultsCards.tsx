import type { CalculationResult } from "../lib/calculator";
import { cn } from "../lib/utils";
import { TrendingUp, DollarSign, Clock } from "lucide-react";

interface ResultsCardsProps {
    result: CalculationResult;
    className?: string;
}

export function ResultsCards({ result, className }: ResultsCardsProps) {
    const cards = [
        {
            label: "Annual Return",
            value: `BDT ${Math.round(result.investorShareYear).toLocaleString()}`,
            subtext: `Monthly: BDT ${Math.round(result.investorShareMonth).toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
        {
            label: "ROI Yield",
            value: `${result.roiYield.toFixed(1)}%`,
            subtext: "Annualized Yield",
            icon: TrendingUp,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            label: "Break-even",
            value: result.yearsToReturn === Infinity ? "∞" : `${result.yearsToReturn.toFixed(1)} Years`,
            subtext: "To Recoup Capital",
            icon: Clock,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
    ];

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className={cn(
                        "p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
                        card.bg,
                        card.border
                    )}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-400 text-sm font-medium">{card.label}</span>
                        <card.icon className={cn("w-5 h-5", card.color)} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                        {card.value}
                    </div>
                    <div className="text-xs text-gray-400">
                        {card.subtext}
                    </div>
                </div>
            ))}
        </div>
    );
}
