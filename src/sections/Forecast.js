import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  buildCombinedData,
  forecastHouse,
  forecastRent,
  forecastYears,
  fmt,
  scenarios,
  tooltipStyle,
} from "../data";
import {
  Card,
  ChartTitle,
  PageTitle,
  ScenarioBtns,
  Table,
} from "../components/SharedComponents";

export default function Forecast({ scenario, setScenario }) {
  return (
    <div className="screen fade-in">
      <PageTitle
        eyebrow="Forecast"
        title="Price Forecast 2025-26 to 2030-31"
        subtitle="Scenario analysis plus ARIMA time series results."
      />
      <ScenarioBtns scenario={scenario} setScenario={setScenario} />

      <div className="forecast-layout">
        <Card className="chart-card">
          <ChartTitle
            title="Median House Price"
            subtitle="Historical + projected"
          />
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={buildCombinedData("house")}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
              <YAxis tickFormatter={fmt} stroke="#64748b" fontSize={11} />
              <Tooltip
                formatter={(v) => (v ? fmt(v) : "—")}
                contentStyle={tooltipStyle}
              />
              <Legend />
              <Line
                dataKey="actual"
                stroke="#0f172a"
                strokeWidth={4}
                name="Historical"
              />
              <Line
                dataKey="low"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="8 4"
                name="Low"
              />
              <Line
                dataKey="base"
                stroke="#2563eb"
                strokeWidth={4}
                strokeDasharray="8 4"
                name="Base"
              />
              <Line
                dataKey="high"
                stroke="#f97316"
                strokeWidth={2}
                strokeDasharray="8 4"
                name="High"
              />
              <Line
                dataKey="arima"
                stroke="#059669"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="ARIMA"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="chart-card">
          <ChartTitle
            title="Median Weekly Rent"
            subtitle="Historical + projected"
          />
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={buildCombinedData("rent")}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
              <YAxis
                tickFormatter={(v) => `$${v}`}
                stroke="#64748b"
                fontSize={11}
              />
              <Tooltip
                formatter={(v) => (v ? `$${v}/wk` : "—")}
                contentStyle={tooltipStyle}
              />
              <Legend />
              <Line
                dataKey="actual"
                stroke="#0f172a"
                strokeWidth={4}
                name="Historical"
              />
              <Line
                dataKey="low"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="8 4"
                name="Low"
              />
              <Line
                dataKey="base"
                stroke="#7c3aed"
                strokeWidth={4}
                strokeDasharray="8 4"
                name="Base"
              />
              <Line
                dataKey="high"
                stroke="#f97316"
                strokeWidth={2}
                strokeDasharray="8 4"
                name="High"
              />
              <Line
                dataKey="arima"
                stroke="#059669"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="ARIMA"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <ChartTitle title={`Forecast table — ${scenarios[scenario].label}`} />
        <Table
          headers={[
            "Year",
            "House Price",
            "Rent/Week",
            "ARIMA House",
            "ARIMA Rent",
          ]}
          rows={forecastYears.map((y, i) => [
            y,
            fmt(forecastHouse[scenario][i]),
            `$${forecastRent[scenario][i]}/wk`,
            fmt(forecastHouse.arima[i]),
            `$${forecastRent.arima[i]}/wk`,
          ])}
        />
        <div className="callout green">
          ARIMA house price forecast ($1.85M by 2031) aligns closest with the
          Low scenario. ARIMA rent forecast ($1,007/wk) aligns with the Base
          scenario.
        </div>
      </Card>
    </div>
  );
}
