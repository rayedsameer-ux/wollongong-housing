import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { growthData, theme, tooltipStyle } from "../data";
import {
  Card,
  ChartTitle,
  Metric,
  PageTitle,
} from "../components/SharedComponents";

export default function Growth() {
  return (
    <div className="screen fade-in">
      <PageTitle
        eyebrow="Method 5"
        title="Year-on-Year Growth Rates"
        subtitle="Annual percentage change across price and rent."
      />
      <Card className="chart-card">
        <ChartTitle title="House Price & Rent Growth" />
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              stroke="#64748b"
              fontSize={11}
            />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={tooltipStyle} />
            <Legend />
            <Bar
              dataKey="priceGrowth"
              fill="#2563eb"
              name="House Price"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="rentGrowth"
              fill="#7c3aed"
              name="Rent"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <div className="metrics-grid four">
        <Metric
          label="AAGR House Price"
          value="11.0%"
          sub="per year"
          tone={theme.blue}
        />
        <Metric
          label="AAGR Rent"
          value="7.6%"
          sub="per year"
          tone={theme.violet}
        />
        <Metric
          label="House Price Volatility"
          value="4.7pp"
          sub="Std Dev"
          tone={theme.amber}
        />
        <Metric
          label="Migration Volatility"
          value="49.5%"
          sub="Std Dev"
          tone={theme.red}
        />
      </div>
    </div>
  );
}
