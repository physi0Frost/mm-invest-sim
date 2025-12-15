import { FINANCIAL_CONSTANTS } from "../data/constants";
import { TIERS, type TierData } from "../data/financials";

export interface CalculationResult {
    netProfit: number;
    surplus: number;
    investorShareMonth: number;
    investorShareYear: number;
    yearsToReturn: number;
    roiYield: number;
}

export const calculateNetProfit = (tier: TierData): number => {
    return tier.monthlyRevenue - (tier.monthlyPayroll + FINANCIAL_CONSTANTS.MONTHLY_OPEX);
};

export const calculateSurplus = (tier: TierData, netProfit: number): number => {
    const profitCap = tier.monthlyRevenue * FINANCIAL_CONSTANTS.PROFIT_CAP_PERCENT;
    const surplus = netProfit - profitCap;
    return Math.max(0, surplus); // Surplus cannot be negative
};

export const calculateInvestorReturn = (
    investmentAmount: number,
    tier: TierData,
    investorType: "EXTERNAL" | "FOUNDER" | "EMPLOYEE" = "EXTERNAL"
): CalculationResult => {
    const netProfit = calculateNetProfit(tier);
    const surplus = calculateSurplus(tier, netProfit);

    let poolShareConfig = FINANCIAL_CONSTANTS.SURPLUS_SHARES.EXTERNAL_INVESTORS;
    let totalPoolRequirement = FINANCIAL_CONSTANTS.FUNDING_GAP;

    if (investorType === "FOUNDER") {
        poolShareConfig = FINANCIAL_CONSTANTS.SURPLUS_SHARES.FOUNDERS;
        totalPoolRequirement = FINANCIAL_CONSTANTS.ALREADY_COMMITTED; // Or should we assume Founders also scale? Docs say Committed 1.1M.
    }
    // For Employee/Sweat, it's more complex (based on salary), but for this calculator we might treat it similarly for simplicity or add specific logic later.

    // Total Surplus allocated to this POOL
    const totalPoolSurplus = surplus * poolShareConfig;

    // Investor's ownership of the pool
    const ownershipPercentage = totalPoolRequirement > 0 ? investmentAmount / totalPoolRequirement : 0;

    // Investor's share of the surplus
    const investorShareMonth = totalPoolSurplus * ownershipPercentage;
    const investorShareYear = investorShareMonth * 12; // Simple annualized

    const yearsToReturn = investorShareYear > 0 ? investmentAmount / investorShareYear : Infinity;
    const roiYield = investorShareYear > 0 ? (investorShareYear / investmentAmount) * 100 : 0;

    return {
        netProfit,
        surplus,
        investorShareMonth,
        investorShareYear,
        yearsToReturn,
        roiYield,
    };
};

export const calculateGrowthProjection = (
    investmentAmount: number,
    investorType: "EXTERNAL" | "FOUNDER" = "EXTERNAL"
): CalculationResult & { isGrowthMode: true; averageYield: number } => {
    // Simulation: Year 1 (T0) -> Year 2 (T1) -> Year 3, 4, 5 (T2)
    const trajectory = ["tier-0", "tier-1", "tier-2", "tier-2", "tier-2"];

    let totalShare5Years = 0;
    let totalSurplus5Years = 0;

    trajectory.forEach((tierId) => {
        const tier = TIERS.find((t) => t.id === tierId) || TIERS[0];
        const result = calculateInvestorReturn(investmentAmount, tier, investorType);
        totalShare5Years += result.investorShareYear;
        totalSurplus5Years += (result.surplus * 12);
    });

    const averageShareYear = totalShare5Years / 5;
    const averageSurplusYear = totalSurplus5Years / 5;

    // Break-even: simpler to just use average? 
    // No, let's just use the average for the "Card" display to be consistent.
    // Or we could be precise: if (Year1 > Inv) ... else if (Year1+Year2 > Inv)...
    // For now, average is a good "Projection".

    const yearsToReturn = averageShareYear > 0 ? investmentAmount / averageShareYear : Infinity;
    const roiYield = averageShareYear > 0 ? (averageShareYear / investmentAmount) * 100 : 0;

    return {
        netProfit: 0, // Not really applicable for mixed mode, maybe use T2 (Ending state)?
        surplus: averageSurplusYear / 12, // Average monthly surplus
        investorShareMonth: averageShareYear / 12,
        investorShareYear: averageShareYear,
        yearsToReturn,
        roiYield,
        isGrowthMode: true,
        averageYield: roiYield
    };
};

export const calculateValuationGrowth = (
    initialValuation: number,
    years: number,
    _annualSurplus: number
): number => {
    // Simple model: Valuation increases by reinvested surplus + multiplier?
    // Docs say "Investment valuation increase (based on reinvestments in r&d, employee, community and ecosystem".
    // Let's assume the "Reinvestment" (40%) and "Community/Ecosystem" contributions directly add to "Intangible Asset Value" or similar.
    // For a basic calculator, we can assume a specific Growth Rate (CAGR) powered by these reinvestments.
    // Let's assume a baseline 1.5x multiplier on Reinvested capital per year (compounding).

    // Or simpler: NewValuation = OldValuation + (ReinvestedSurplus * Multiplier).

    // const reinvestmentShare = FINANCIAL_CONSTANTS.SURPLUS_SHARES.REINVESTMENT; // 40%
    // const annualReinvestment = annualSurplus * reinvestmentShare;

    // Compounded growth?
    // Let's mock a 20% YonY growth in Valuation driven by the ecosystem.
    const growthRate = 0.20;
    return initialValuation * Math.pow(1 + growthRate, years);
};
