# Motion Mechanics Investment Simulator

**A financial modeling tool for the first physical planet of the [Purrfect Universe](https://purrfecthq.com).**

This application provides a transparent, legally compliant investment simulation for potential investors (Seed 2) and founders (Seed 0). It strictly adheres to the **Purrfect Universe Constitution**, specifically **Article IX-B (Profit Redistribution)**, ensuring that all financial projections reflect the ethical and community-driven values of the organization.

## Key Features

### 1. Dynamic Financial Projections
*   **Operational Scenarios**: Toggle between "Baseline", "Conservative", and "Optimistic" operational tiers.
*   **Growth Simulation**: A "Realistic Growth" mode that averages returns over a 5-year trajectory (MVP -> Stable -> Growth).
*   **ROI Metrics**: Real-time calculation of Monthly Share, Annual Return, and Break-even points.

### 2. Constitution Compliance
*   **5% Profit Cap**: The calculator automatically applies a strict 5% cap on net profit. Anything above this cap is classified as **Surplus**.
*   **Surplus Redistribution**: Granular visualization of how surplus is distributed:
    *   **Employees**: 30%
    *   **External Investors**: 15%
    *   **Sweat Equity**: 15%
    *   **Founders**: 10%
    *   **Treasury**: 10%
    *   **Community**: 10%
    *   **Reserves**: 10%

### 3. Founder vs. Investor Context
*   **Dynamic Explainer**: The UI adapts its language and explanations based on the selected role:
    *   **Founders**: Highlights "Sweat Risk" (high initial risk, capped returns).
    *   **Investors**: Highlights "Growth Fuel" (lower risk, uncapped returns).
*   **Transparency**: Clear, side-by-side comparison of the Risk/Reward profiles for all stakeholders.

## Technology Stack

*   **Frontend**: React (TypeScript) + Vite
*   **Styling**: Tailwind CSS
*   **Visualization**: Recharts (for valuation graphs), Custom Progress Bars
*   **Icons**: Lucide-React

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

*   `src/lib/calculator.ts`: Core financial logic, including the Profit Cap and Surplus formulas.
*   `src/data/constants.ts`: Configuration for percentage shares (Article IX-B) and operational tiers.
*   `src/components/Calculator.tsx`: Main simulator container.
*   `src/components/DistributionBreakdown.tsx`: Visual component for the surplus redistribution.
*   `src/components/ConstitutionExplainer.tsx`: Dynamic text component for the Founder/Investor comparison.

## Documentation

For a deeper dive into the governance and financial rules, refer to the `docs/` folder:
*   `Constitution of Purrfect Universe.md`
*   `Article IX-B — Profit Redistribution.md`
