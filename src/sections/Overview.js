import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  historical,
  forecastHouse,
  forecastRent,
  fmt,
  theme,
  tooltipStyle,
} from "../data";
import { Card, Metric, ChartTitle } from "../components/SharedComponents";

export default function Overview({ setSection }) {
  return (
    <div className="screen fade-in">
      <section className="hero-new">
        <div className="hero-left">
          <span className="hero-badge">OPS270 Forecasting Project</span>
          <h1>Wollongong housing pressure, visualised clearly.</h1>
          <p>
            A cleaner market intelligence dashboard showing house prices, rent
            pressure, population growth, housing supply, forecasts, and
            stakeholder impact.
          </p>
          <div className="hero-buttons">
            <button onClick={() => setSection("forecast")}>
              Explore forecast
            </button>
            <button onClick={() => setSection("demand")}>
              View demand gap
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="glass-stat main-stat">
            <small>Base price projection</small>
            <strong>{fmt(forecastHouse.base[5])}</strong>
            <span>By 2030-31</span>
          </div>
          <div className="glass-row">
            <div className="glass-stat">
              <small>Rent forecast</small>
              <strong>${forecastRent.base[5]}</strong>
              <span>/week</span>
            </div>
            <div className="glass-stat">
              <small>Gap</small>
              <strong>~14K</strong>
              <span>units</span>
            </div>
          </div>
        </div>
      </section>

      <div className="metrics-grid four">
        <Metric
          label="Median House Price"
          value="$1.28M"
          sub="2024-25"
          tone={theme.blue}
        />
        <Metric
          label="Median Weekly Rent"
          value="$750"
          sub="per week"
          tone={theme.violet}
        />
        <Metric
          label="Population"
          value="222,204"
          sub="Wollongong LGA"
          tone={theme.green}
        />
        <Metric
          label="8-Year Price Growth"
          value="+106%"
          sub="$620K → $1.28M"
          tone={theme.amber}
        />
      </div>

      <div className="overview-grid">
        <Card className="chart-card wide">
          <ChartTitle
            title="Median House Price Trend"
            subtitle="Wollongong LGA — 2017-18 to 2024-25"
          />
          <ResponsiveContainer width="100%" height={330}>
            <AreaChart data={historical}>
              <defs>
                <linearGradient id="priceAreaNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis tickFormatter={fmt} stroke="#64748b" fontSize={11} />
              <Tooltip formatter={(v) => fmt(v)} contentStyle={tooltipStyle} />
              <Area
                dataKey="housePrice"
                type="monotone"
                stroke="#2563eb"
                strokeWidth={4}
                fill="url(#priceAreaNew)"
                name="Median House Price"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="summary-panel">
          <span className="mini-kicker">Main story</span>
          <h3>Supply has not kept up with demand.</h3>
          <p>
            Demand exceeded supply in 7 out of 8 years. The largest pressure
            point was 2020-21, where the gap reached 2,878 units.
          </p>
          <button onClick={() => setSection("supply")}>
            Open supply planner
          </button>
        </Card>
      </div>

      <div className="insight-grid">
        <Card className="insight-card blue">
          <b>Key Finding</b>
          <p>
            House prices increased <strong>106%</strong> from $620K to $1.28M
            while housing supply dropped to <strong>890</strong> approvals in
            2023-24.
          </p>
        </Card>
        <Card className="insight-card orange">
          <b>Migration Impact</b>
          <p>
            Net migration spiked to <strong>3,742</strong> in 2020-21 before
            declining to <strong>1,000</strong> by 2024-25.
          </p>
        </Card>
        <Card className="insight-card violet">
          <b>Tools</b>
          <p>
            Use the calculators to test affordability, rent stress, and supply
            planning using the same dataset.
          </p>
        </Card>
      </div>

      <Card className="tools-section">
        <ChartTitle
          title="Interactive decision tools"
          subtitle="Built from the same Wollongong data"
        />
        <div className="tool-grid">
          {[
            [
              "🏠",
              "Affordability Calculator",
              "Check whether projected home prices are affordable.",
              "affordability",
            ],
            [
              "🏗️",
              "Supply Planner",
              "Estimate how many homes need to be approved.",
              "supply",
            ],
            [
              "📊",
              "Rent Stress Checker",
              "Check whether rent exceeds the 30% stress benchmark.",
              "rent",
            ],
          ].map(([icon, title, desc, id]) => (
            <button key={id} onClick={() => setSection(id)}>
              <span>{icon}</span>
              <b>{title}</b>
              <small>{desc}</small>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
