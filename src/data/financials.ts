export interface TierData {
    id: string;
    name: string;
    description: string;
    monthlyRevenue: number;
    monthlyPayroll: number; // Est. Payroll from docs
}

export const TIERS: TierData[] = [
    {
        id: "tier-0",
        name: "Tier 0 (MVP)",
        description: "Minimum Viable Opening. 14 Staff, ~35% Capacity.",
        monthlyRevenue: 906000,
        monthlyPayroll: 305500,
    },
    {
        id: "tier-1",
        name: "Tier 1 (Stable)",
        description: "Stable Launch Team. 21 Staff, ~50% Capacity.",
        monthlyRevenue: 1360000,
        monthlyPayroll: 586250,
    },
    {
        id: "tier-2",
        name: "Tier 2 (Baseline)",
        description: "Full Operations. 26 Staff, ~60% Capacity.",
        monthlyRevenue: 1812426,
        monthlyPayroll: 737500,
    },
    {
        id: "tier-3",
        name: "Tier 3 (Expanded)",
        description: "Expanded Service. ~75% Capacity.",
        monthlyRevenue: 2265532,
        monthlyPayroll: 887500, // Estimated
    },
    {
        id: "tier-4",
        name: "Tier 4 (Full)",
        description: "Maximum Efficiency. ~90% Capacity.",
        monthlyRevenue: 2718639,
        monthlyPayroll: 1037500, // Estimated
    },
    {
        id: "tier-max",
        name: "Tier Max (Overdrive)",
        description: "Peak Performance. ~120% Capacity.",
        monthlyRevenue: 3624852,
        monthlyPayroll: 1141250, // Estimated
    },
];
