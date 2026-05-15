import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { historical, theme, tooltipStyle } from "../data";
import {
  Card,
  ChartTitle,
  Metric,
  PageTitle,
} from "../components/SharedComponents";

export default function Demand() {
  return (
    <div className="screen fade-in">
      <PageTitle
        eyebrow="Method 3"
        title="Demand vs Supply Gap"
        subtitle="Demand = net migration + population growth. Supply = new dwelling completions."
      />
      <div className="metrics-grid three">
        <Metric
          label="Average Annual Gap"
          value="1,421"
          sub="units/year"
          tone={theme.red}
        />
        <Metric
          label="Peak Gap Year"
          value="2,878"
          sub="2020-21"
          tone={theme.amber}
        />
        <Metric
          label="Cumulative Gap"
          value="~14,000"
          sub="8-year shortfall"
          tone={theme.blue}
        />
      </div>
      <Card className="chart-card">
        <ChartTitle title="Demand, supply, and gap" />
        <ResponsiveContainer width="100%" height={370}>
          <ComposedChart data={historical}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="gap" name="Gap" radius={[8, 8, 0, 0]}>
              {historical.map((d, i) => (
                <Cell key={i} fill={d.gap < 0 ? "#10b981" : "#fb7185"} />
              ))}
            </Bar>
            <Line
              dataKey="demand"
              stroke="#f59e0b"
              strokeWidth={4}
              name="Demand"
            />
            <Line
              dataKey="supply"
              stroke="#059669"
              strokeWidth={4}
              name="Supply"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
      <Card className="callout-card">
        <b>The Gap Problem</b>
        <p>
          Demand exceeded supply in 7 out of 8 years. Until supply meaningfully
          increases, upward price pressure will continue.
        </p>
      </Card>
    </div>
  );
}
