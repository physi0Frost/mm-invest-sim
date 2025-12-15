import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { calculateValuationGrowth } from "../lib/calculator";
import { cn } from "../lib/utils";

interface ValuationChartProps {
    initialInvestment: number;
    years?: number;
    annualSurplus: number; // To drive the growth factor logically if we wanted to
    className?: string;
}

export function ValuationChart({ initialInvestment, years = 5, annualSurplus, className }: ValuationChartProps) {
    // Generate data points
    const data = Array.from({ length: years + 1 }, (_, i) => {
        return {
            year: `Year ${i}`,
            value: calculateValuationGrowth(initialInvestment, i, annualSurplus),
        };
    });

    return (
        <div className={cn("h-64 w-full p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm", className)}>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Projected Valuation Growth (Reinvestment Effect)</h3>
            <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="year"
                            stroke="#666"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#666"
                            fontSize={12}
                            tickFormatter={(val) => `BDT ${(val / 1000000).toFixed(1)}M`}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(val: number) => [`BDT ${Math.round(val).toLocaleString()}`, "Valuation"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
