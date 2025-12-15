import { useState, useMemo } from "react";
import { InvestmentInput } from "./InvestmentInput";
import { ResultsCards } from "./ResultsCards";
import { ValuationChart } from "./ValuationChart";
import { TIERS } from "../data/financials";
import { calculateInvestorReturn, calculateGrowthProjection } from "../lib/calculator";
import { cn } from "../lib/utils";
import { Info, Sparkles } from "lucide-react";
import { DistributionBreakdown } from "./DistributionBreakdown";
import { ConstitutionExplainer } from "./ConstitutionExplainer";

export function Calculator() {
    const [investment, setInvestment] = useState<number>(100000);
    const [investorType, setInvestorType] = useState<"EXTERNAL" | "FOUNDER">("EXTERNAL");
    const [selectedTierId, setSelectedTierId] = useState<string>("tier-2"); // Default to Baseline
    const [isFullSelfFunded, setIsFullSelfFunded] = useState<boolean>(false);

    const isGrowthMode = selectedTierId === "growth";

    // Derived state
    const selectedTier = TIERS.find(t => t.id === selectedTierId) || TIERS[0];

    // Reset full self-funded if switching to External
    if (investorType === "EXTERNAL" && isFullSelfFunded) {
        setIsFullSelfFunded(false);
    }

    const result = useMemo(() => {
        if (isGrowthMode) {
            return calculateGrowthProjection(investment, investorType, isFullSelfFunded);
        }
        return calculateInvestorReturn(investment, selectedTier, investorType, isFullSelfFunded);
    }, [investment, selectedTier, investorType, isGrowthMode, isFullSelfFunded]);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3" />
                    Purrfect Universe Financials
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Motion Mechanics <span className="text-primary block md:inline">Investment Simulator</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    {investorType === "FOUNDER"
                        ? "Verify your stewardship, project your impact, and safeguard the mission."
                        : "Project your returns, visualize growth, and align your capital with the mission of the first physical planet of the Purrfect Universe."
                    }
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Controls */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Scenario Selector */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Operational Scenario</h3>
                            <a
                                href="https://microsites.infra.purrfecthq.com/flextime/?h=747f34f9&lang=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                            >
                                <Sparkles className="w-3 h-3" />
                                Model Microsite
                            </a>
                        </div>
                        <div className="space-y-3">
                            {TIERS.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedTierId(tier.id)}
                                    className={cn(
                                        "w-full text-left p-3 rounded-xl border transition-all duration-200",
                                        selectedTierId === tier.id
                                            ? "bg-primary/20 border-primary/50 ring-1 ring-primary/50"
                                            : "bg-black/20 border-transparent hover:bg-black/40 hover:border-white/10"
                                    )}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={cn("font-bold", selectedTierId === tier.id ? "text-white" : "text-gray-400")}>
                                            {tier.name}
                                        </span>
                                        {selectedTierId === tier.id && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />}
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">{tier.description}</p>
                                </button>
                            ))}

                            <div className="h-px bg-white/10 my-2" />

                            <button
                                onClick={() => setSelectedTierId("growth")}
                                className={cn(
                                    "w-full text-left p-3 rounded-xl border transition-all duration-200",
                                    selectedTierId === "growth"
                                        ? "bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/50"
                                        : "bg-black/20 border-transparent hover:bg-black/40 hover:border-white/10"
                                )}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className={cn("font-bold", selectedTierId === "growth" ? "text-white" : "text-gray-400")}>
                                        Realistic Growth (5 Yr)
                                    </span>
                                    {selectedTierId === "growth" && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    Simulates Year 1 (MVP) → Year 2 (Stable) → Year 3+ (Baseline). Returns are averaged.
                                </p>
                            </button>
                        </div>
                    </div>

                    <InvestmentInput
                        investment={investment}
                        setInvestment={setInvestment}
                        investorType={investorType}
                        setInvestorType={setInvestorType}
                    />

                    {/* Founder Sovereignty Toggle */}
                    {investorType === "FOUNDER" && (
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={isFullSelfFunded}
                                        onChange={(e) => setIsFullSelfFunded(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                                </div>
                                <div className="grid gap-1">
                                    <span className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                                        I am funding the MVP Runway myself
                                    </span>
                                    <p className="text-xs text-gray-400">
                                        By covering the Seed 1 & 2 gap (~$7.95M), you retain 100% of the Equity rights (Founder + Investor pools).
                                    </p>
                                </div>
                            </label>
                        </div>
                    )}

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-start">
                        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <p className="text-sm text-blue-200/80">
                                <span className="font-semibold text-blue-200">Industry Insight:</span> Early-stage health-tech investments typically target 15-25% IRR.
                                Our "Baseline" scenario projects ~17.7% yield, aligning with balanced growth targets.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visualization */}
                <div className="lg:col-span-8 space-y-6">
                    <ResultsCards result={result} />



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center">
                            <h3 className="text-gray-400 text-sm font-medium mb-1">Projected Annual Surplus</h3>
                            <div className="text-4xl font-bold text-white mb-2">
                                BDT {Math.round(result.surplus * 12).toLocaleString()}
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-500"
                                    style={{ width: `${Math.min(100, (result.surplus * 12 / 10000000) * 100)}%` }} // Normalized to 10M for visual
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                {isGrowthMode
                                    ? "Average annual surplus over 5-year growth trajectory."
                                    : `Based on ${selectedTier.name} projections. Surplus is distributed to investors, employees, and community.`
                                }
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center">
                            <h3 className="text-gray-400 text-sm font-medium mb-1">Your Monthly Share</h3>
                            <div className="text-4xl font-bold text-white mb-2">
                                BDT {Math.round(result.investorShareMonth).toLocaleString()}
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${Math.min(100, (result.investorShareMonth / 200000) * 100)}%` }} // Normalized to 200k
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Paid out monthly or quarterly as per Article IX-B.
                            </p>
                        </div>
                    </div>

                    {/* NEW: Surplus Breakdown */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <DistributionBreakdown
                            distribution={result.distribution}
                            totalSurplusMonthly={result.surplus}
                        />
                    </div>

                    {/* NEW: Discrepancy Explainer */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Info className="w-5 h-5 text-gray-400" />
                            Understanding the Returns
                        </h3>
                        <ConstitutionExplainer investorType={investorType} isFullSelfFunded={isFullSelfFunded} />
                    </div>

                    <ValuationChart
                        initialInvestment={investment}
                        annualSurplus={result.surplus * 12}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

