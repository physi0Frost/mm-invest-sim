import { cn } from "../lib/utils";
import { FINANCIAL_CONSTANTS } from "../data/constants";

interface InvestmentInputProps {
    investment: number;
    setInvestment: (val: number) => void;
    investorType: "EXTERNAL" | "FOUNDER";
    setInvestorType: (val: "EXTERNAL" | "FOUNDER") => void;
    className?: string;
}

export function InvestmentInput({
    investment,
    setInvestment,
    investorType,
    setInvestorType,
    className,
}: InvestmentInputProps) {
    const maxInvestment = investorType === "EXTERNAL"
        ? FINANCIAL_CONSTANTS.FUNDING_GAP
        : FINANCIAL_CONSTANTS.ALREADY_COMMITTED * 2; // Allow frounders to play with numbers

    return (
        <div className={cn("p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md", className)}>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Investment Configuration
            </h3>

            {/* Type Selection */}
            <div className="flex gap-2 mb-6 p-1 bg-black/20 rounded-lg">
                <button
                    onClick={() => setInvestorType("EXTERNAL")}
                    className={cn(
                        "flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300",
                        investorType === "EXTERNAL"
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "text-muted-foreground hover:text-white"
                    )}
                >
                    External Investor
                </button>
                <button
                    onClick={() => setInvestorType("FOUNDER")}
                    className={cn(
                        "flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300",
                        investorType === "FOUNDER"
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "text-muted-foreground hover:text-white"
                    )}
                >
                    Founder
                </button>
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm text-gray-400">Investment Amount (BDT)</label>
                    <input
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-right font-mono text-lg focus:outline-none focus:border-primary/50 text-white"
                    />
                </div>

                <input
                    type="range"
                    min={0}
                    max={maxInvestment}
                    step={50000}
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
                />

                <div className="flex justify-between text-xs text-gray-500">
                    <span>0 BDT</span>
                    <span>{maxInvestment.toLocaleString()} BDT</span>
                </div>
            </div>
        </div>
    );
}
