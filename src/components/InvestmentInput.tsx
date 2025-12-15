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
        : FINANCIAL_CONSTANTS.FUNDING_GAP * 0.51; // Allow max 51% of total gap for Founders

    return (
        <div className={cn("p-6 rounded-2xl bg-gray-800/90 border border-gray-700", className)}>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-brand-light to-brand-base bg-clip-text text-transparent">
                Investment Configuration
            </h3>

            {/* Type Selection */}
            <div className="flex gap-2 mb-6 p-1 bg-black/20 rounded-lg">
                <button
                    onClick={() => setInvestorType("EXTERNAL")}
                    aria-pressed={investorType === "EXTERNAL"}
                    aria-label="Select External Investor type"
                    className={cn(
                        "flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300",
                        investorType === "EXTERNAL"
                            ? "bg-brand-base text-white shadow-lg shadow-brand-base/25"
                            : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    )}
                >
                    External Investor
                </button>
                <button
                    onClick={() => setInvestorType("FOUNDER")}
                    aria-pressed={investorType === "FOUNDER"}
                    aria-label="Select Founder type"
                    className={cn(
                        "flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300",
                        investorType === "FOUNDER"
                            ? "bg-brand-base text-white shadow-lg shadow-brand-base/25"
                            : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    )}
                >
                    Founder
                </button>
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="investment-amount" className="text-sm text-gray-300">Investment Amount (BDT)</label>
                    <input
                        id="investment-amount"
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        aria-label="Investment amount in BDT"
                        className="bg-gray-900/60 border border-gray-600 rounded-lg px-3 py-1 text-right font-mono text-lg text-white"
                    />
                </div>

                <input
                    type="range"
                    min={0}
                    max={maxInvestment}
                    step={50000}
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    aria-label="Investment amount slider"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-base hover:accent-brand-light transition-all"
                />

                <div className="flex justify-between text-xs text-gray-400">
                    <span>0 BDT</span>
                    <span>{maxInvestment.toLocaleString()} BDT</span>
                </div>
            </div>
        </div>
    );
}
