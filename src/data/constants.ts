export const FINANCIAL_CONSTANTS = {
    // Seed 0 Overview
    SEED_0_TARGET: 9060000,
    ALREADY_COMMITTED: 1110000,

    // Funding Gap
    FUNDING_GAP: 7950000,
    MVP_RUNWAY_COST: 7950000, // For "Self-Funded" scenario, we assume covering the full gap

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
        RESERVES_DREAM: 0.10, // Article IX-C & Structural Reserves (Handling the remaining 10%)
    },

    // Reinvestment Layer (Pre-Distribution)
    REINVESTMENT_RATE: 0.40,
    // Note: The Constitution (IX-B §3.2) states 40% of TOTAL surplus is reinvested FIRST.
    // However, the calculator visualization is focused on the "Redistribution Layer" (§3.3) shares
    // for simplicity and to match the user's focus on "Returns".
    // We will apply the above SHARES to the "Distributable Surplus".
    // For this simplified calculator, we assume the Net Surplus is what is being distributed.
};

