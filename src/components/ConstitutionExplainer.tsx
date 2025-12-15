
import { ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

export function ConstitutionExplainer({
    investorType,
    selfFundingPercentage = 0,
    className
}: {
    investorType: "EXTERNAL" | "FOUNDER";
    selfFundingPercentage?: number;
    className?: string;
}) {
    const isFounder = investorType === "FOUNDER";
    const hasSelfFunding = selfFundingPercentage > 0;

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
            {/* Founders Card */}
            <div className={cn(
                "p-6 rounded-2xl border backdrop-blur-md transition-all",
                isFounder
                    ? "bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_30px_-5px_rgba(234,179,8,0.1)]"
                    : "bg-yellow-500/5 border-yellow-500/10 opacity-75 hover:opacity-100"
            )}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                        <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                        {isFounder ? "You (Seed 0 - Founder)" : "Founders (Seed 0)"}
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest">The "Sweat" Risk</p>
                        <p className="text-sm text-gray-300">
                            {isFounder
                                ? "You invest time and money when the company value is zero. You take the highest risk (conception phase)."
                                : "Founders invested time and money when the company value was zero. They took the highest risk (conception phase)."
                            }
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest">Smaller Pie, Fewer Slices</p>
                        <p className="text-sm text-gray-300">
                            {isFounder
                                ? hasSelfFunding
                                    ? <span className="text-yellow-400 font-semibold">
                                        By funding {selfFundingPercentage}% of the runway, you also capture a proportional slice of the Investor Pool.
                                        You now control {(10 + (15 * (selfFundingPercentage / 100))).toFixed(1)}% of the total surplus.
                                    </span>
                                    : "You share a 10% surplus pool. Because your initial capital (~$1.1M) is smaller than external financing, your return per dollar is higher."
                                : "They share a 10% surplus pool. Because the total founder investment (~$1.1M) is smaller than the external Ask (~$7.9M), their return per dollar appears higher."
                            }
                        </p>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-start gap-2">
                            <Scale className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-yellow-200">
                                <span className="font-bold">Fairness Cap:</span> {hasSelfFunding ? "Your Base Founder portion is capped, but your Self-Funded portion is UNCAPPED." : `${isFounder ? "You" : "Founders"} are strictly limited.${isFounder ? "Your" : "Their"} earnings cannot exceed 2x the median employee bonus.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* External Investors Card */}
            <div className={cn(
                "p-6 rounded-2xl border backdrop-blur-md transition-all",
                !isFounder
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]"
                    : "bg-emerald-500/5 border-emerald-500/10 opacity-75 hover:opacity-100"
            )}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                        {isFounder ? (hasSelfFunding ? "Self-Funded Investment" : "External Investors (Seed 2)") : "You (Seed 2)"}
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">The "Growth" Fuel</p>
                        <p className="text-sm text-gray-300">
                            {isFounder
                                ? hasSelfFunding
                                    ? "You are providing the growth fuel yourself, reducing reliance on external investors."
                                    : "They invest in a proven model (Operational/Profitability Phase). Their risk is significantly lower than yours."
                                : "You are investing in a proven model (Operational/Profitability Phase). The risk is significantly lower than Seed 0."
                            }
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">Larger Pie, More Slices</p>
                        <p className="text-sm text-gray-300">
                            {hasSelfFunding
                                ? <span className="text-emerald-400">
                                    You have absorbed {selfFundingPercentage}% of this pool.
                                    {selfFundingPercentage >= 49
                                        ? " Be aware: You now bear major risk for the $7.95M runway."
                                        : " You now carry additional risk proportional to your commitment."}
                                </span>
                                : "Investors share a larger 15% surplus pool. However, since the total capital required is much higher ($7.9M), the return is spread across more dollars."
                            }
                        </p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-start gap-2">
                            <Scale className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-emerald-200">
                                <span className="font-bold">Uncapped Potential:</span> {hasSelfFunding ? "Since you are also the Investor, this portion of your return is UNCAPPED and purely proportional to your capital." : `Unlike founders, ${isFounder ? "investor" : "your"} returns are not capped.${isFounder ? "They" : "You"} earn exactly what the share dictates.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Footer */}
            <div className="md:col-span-2 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 flex gap-3 text-sm text-gray-400 items-center justify-center text-center">
                <AlertCircle className="w-4 h-4 text-gray-500 shrink-0" />
                <p>
                    {isFounder
                        ? hasSelfFunding
                            ? "In short: You have increased your Sovereignty. You hold your Risk Premium plus a share of the Growth Return."
                            : "In short: You get a Risk Premium with a Safety Cap. Investors get a Growth Return with Uncapped Upside."
                        : "In short: Founders get a Risk Premium with a Safety Cap. You get a Growth Return with Uncapped Upside."
                    }
                </p>
            </div>
        </div>
    );
}

