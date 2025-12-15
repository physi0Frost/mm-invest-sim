export const FINANCIAL_CONSTANTS = {
    // Seed 0 Overview
    SEED_0_TARGET: 9060000,
    ALREADY_COMMITTED: 1110000,

    // Funding Gap
    FUNDING_GAP: 7950000,

    // Fixed Monthly OpEx
    MONTHLY_OPEX: 200000,

    // Profit Distribution Config
    PROFIT_CAP_PERCENT: 0.05, // 5% of Gross Revenue retained

    // Surplus Distribution (Article IX-B)
    SURPLUS_SHARES: {
        EMPLOYEES: 0.30,
        FOUNDERS: 0.10,
        EXTERNAL_INVESTORS: 0.15,
        SWEAT_EQUITY: 0.15,
        TREASURY_RESERVE: 0.10,
        COMMUNITY_FUND: 0.10,
        REINVESTMENT: 0.40, // Used for Valuation Increase calc (as per docs "Reinvestment Layer")
        // Note: The doc says "Minimum 40% of total surplus reinvested...". 
        // It also lists Surplus Redistribution which sums to 100%. 
        // For the purpose of "Valuation Increase", we will assume the 
        // Reinvestment Layer is handled BEFORE redistribution or that 
        // specific redistribution items (Treasury, Community, etc) contribute to valuation.
        // However, strictly reading "Surplus Redistribution" table in IX-B:
        // Employees (30) + Founders (10) + Sweat (15) + External (15) + Treasury (10) + Community (10) = 90%
        // Wait, 30+10+15+15+10+10 = 90%. Where is the other 10%?
        // Dream Alignment Fellows (<=5%).
        // Let's re-read the table in view_file output.
        // Employees 30, Founders 10, Dream <=5, Sweat 15, External 15, Treasury 10, Community 10.
        // 30+10+15+15+10+10 = 90.
        // Maybe the Dream Fellows is 5? That makes 95.
        // Let's assume for Calculator purposes:
        // External Investors get 15% of the TOTAL Surplus.
    },

    // Investment Cap for External (implied by 15% pool size acting on the Gap?)
    // Actually, the return is calculated as: (UserInv / TotalExternalRequired) * (Surplus * 0.15)
    // TotalExternalRequired = FUNDING_GAP.
};
