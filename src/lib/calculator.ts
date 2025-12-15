import { FINANCIAL_CONSTANTS } from "../data/constants";
import { TIERS, type TierData } from "../data/financials";

export interface CalculationResult {
    netProfit: number;
    surplus: number;
    investorShareMonth: number;
    investorShareYear: number;
    yearsToReturn: number;
    roiYield: number;
    distribution: {
        employees: number;
        founders: number;
        investors: number;
        sweatEquity: number;
        treasury: number;
        community: number;
        reserves: number;
    };
    breakdown: {
        cash: number;
        equity: number;
    };
    isGrowthMode?: boolean;
    averageYield?: number;
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
    investment: number,
    tier: TierData,
    investorType: "EXTERNAL" | "FOUNDER",
    selfFundingPercentage: number = 0
): CalculationResult => {
    const revenue = tier.monthlyRevenue;
    const payroll = tier.monthlyPayroll;
    const opEx = FINANCIAL_CONSTANTS.MONTHLY_OPEX;

    // 1. Net Profit
    const netProfit = revenue - (payroll + opEx);

    // 2. Profit Cap (5% of Gross Revenue)
    const profitCap = revenue * FINANCIAL_CONSTANTS.PROFIT_CAP_PERCENT;

    // 3. Surplus
    const surplus = Math.max(0, netProfit - profitCap);

    // 4. Pool Configuration
    let poolShareConfig = FINANCIAL_CONSTANTS.SURPLUS_SHARES.EXTERNAL_INVESTORS;
    let totalPoolRequirement = FINANCIAL_CONSTANTS.FUNDING_GAP;

    // Breakdown tracking
    let baseSharePercent = 0;
    let equitySharePercent = 0;

    if (investorType === "FOUNDER") {
        baseSharePercent = FINANCIAL_CONSTANTS.SURPLUS_SHARES.FOUNDERS;
        equitySharePercent = FINANCIAL_CONSTANTS.SURPLUS_SHARES.EXTERNAL_INVESTORS * (selfFundingPercentage / 100);

        poolShareConfig = baseSharePercent + equitySharePercent;
        totalPoolRequirement = FINANCIAL_CONSTANTS.ALREADY_COMMITTED + (FINANCIAL_CONSTANTS.MVP_RUNWAY_COST * (selfFundingPercentage / 100));
    } else {
        baseSharePercent = FINANCIAL_CONSTANTS.SURPLUS_SHARES.EXTERNAL_INVESTORS;
        equitySharePercent = 0;
    }

    // 5. Calculate ownership and shares
    const totalPoolSurplusMonthly = surplus * poolShareConfig;
    const ownershipPercentage = totalPoolRequirement > 0 ? Math.min(1, investment / totalPoolRequirement) : 0;

    const investorShareMonth = totalPoolSurplusMonthly * ownershipPercentage;
    const investorShareYear = investorShareMonth * 12;

    // 6. ROI Metrics
    const yearsToReturn = investorShareYear > 0 ? investment / investorShareYear : Infinity;
    const roiYield = investment > 0 ? (investorShareYear / investment) * 100 : 0;

    // 7. Distribution (Annual)
    const annualSurplus = surplus * 12;
    const distribution = {
        employees: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.EMPLOYEES,
        founders: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.FOUNDERS,
        investors: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.EXTERNAL_INVESTORS,
        sweatEquity: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.SWEAT_EQUITY,
        treasury: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.TREASURY_RESERVE,
        community: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.COMMUNITY_FUND,
        reserves: annualSurplus * FINANCIAL_CONSTANTS.SURPLUS_SHARES.RESERVES_DREAM,
    };

    // 8. Breakdown (Cash vs Equity for Founders)
    const totalShare = baseSharePercent + equitySharePercent;
    const cashRatio = totalShare > 0 ? baseSharePercent / totalShare : 1;
    const equityRatio = totalShare > 0 ? equitySharePercent / totalShare : 0;

    const breakdown = {
        cash: investorShareYear * cashRatio,
        equity: investorShareYear * equityRatio,
    };

    return {
        netProfit,
        surplus,
        investorShareMonth,
        investorShareYear,
        yearsToReturn,
        roiYield,
        distribution,
        breakdown,
    };
};

export const calculateGrowthProjection = (
    investmentAmount: number,
    investorType: "EXTERNAL" | "FOUNDER" = "EXTERNAL",
    selfFundingPercentage: number = 0
): CalculationResult => {
    // Simulation: Year 1 (T0) -> Year 2 (T1) -> Year 3, 4, 5 (T2)
    const trajectory = ["tier-0", "tier-1", "tier-2", "tier-2", "tier-2"];

    let totalShare5Years = 0;
    let totalSurplus5Years = 0;
    let totalDistribution = {
        employees: 0,
        founders: 0,
        investors: 0,
        sweatEquity: 0,
        treasury: 0,
        community: 0,
        reserves: 0,
    };

    trajectory.forEach((tierId) => {
        const tier = TIERS.find((t) => t.id === tierId) || TIERS[0];
        const result = calculateInvestorReturn(investmentAmount, tier, investorType, selfFundingPercentage);
        totalShare5Years += result.investorShareYear;
        totalSurplus5Years += (result.surplus * 12);

        // Sum distributions
        totalDistribution.employees += result.distribution.employees;
        totalDistribution.founders += result.distribution.founders;
        totalDistribution.investors += result.distribution.investors;
        totalDistribution.sweatEquity += result.distribution.sweatEquity;
        totalDistribution.treasury += result.distribution.treasury;
        totalDistribution.community += result.distribution.community;
        totalDistribution.reserves += result.distribution.reserves;
    });

    const averageShareYear = totalShare5Years / 5;
    const averageSurplusYear = totalSurplus5Years / 5;

    // Average distribution
    const averageDistribution = {
        employees: totalDistribution.employees / 5,
        founders: totalDistribution.founders / 5,
        investors: totalDistribution.investors / 5,
        sweatEquity: totalDistribution.sweatEquity / 5,
        treasury: totalDistribution.treasury / 5,
        community: totalDistribution.community / 5,
        reserves: totalDistribution.reserves / 5,
    };

    const yearsToReturn = averageShareYear > 0 ? investmentAmount / averageShareYear : Infinity;
    const roiYield = averageShareYear > 0 ? (averageShareYear / investmentAmount) * 100 : 0;

    // Calculate breakdown for growth mode
    const foundersBase = FINANCIAL_CONSTANTS.SURPLUS_SHARES.FOUNDERS;
    const investorShare = FINANCIAL_CONSTANTS.SURPLUS_SHARES.EXTERNAL_INVESTORS;
    const equityPortion = investorShare * (selfFundingPercentage / 100);
    const totalShare = (investorType === "FOUNDER") ? foundersBase + equityPortion : investorShare;
    const cashRatio = totalShare > 0 ? ((investorType === "FOUNDER") ? foundersBase : investorShare) / totalShare : 1;
    const equityRatio = (investorType === "FOUNDER" && totalShare > 0) ? equityPortion / totalShare : 0;

    return {
        netProfit: 0,
        surplus: averageSurplusYear / 12,
        investorShareMonth: averageShareYear / 12,
        investorShareYear: averageShareYear,
        yearsToReturn,
        roiYield,
        distribution: averageDistribution,
        breakdown: {
            cash: averageShareYear * cashRatio,
            equity: averageShareYear * equityRatio,
        },
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
