import React from "react";
import { forecastRent, forecastYears, scenarios, theme } from "../data";
import {
  Card,
  ChartTitle,
  Metric,
  PageTitle,
  ScenarioBtns,
  SliderInput,
} from "../components/SharedComponents";

export default function RentStress({
  scenario,
  setScenario,
  weeklyIncome,
  setWeeklyIncome,
}) {
  const currentRent = 750;
  const rentStress = (currentRent / weeklyIncome) * 100;
  const isStressed = rentStress > 30;
  const maxRent = Math.round(weeklyIncome * 0.3);
  const incomeNeeded = Math.round(currentRent / 0.3);

  const rows = forecastYears.map((y, i) => {
    const r = forecastRent[scenario][i];
    const pct = Number(((r / weeklyIncome) * 100).toFixed(1));
    return { year: y, rent: r, pct, stressed: pct > 30 };
  });

  return (
    <div className="screen fade-in">
      <PageTitle
        eyebrow="Interactive tool"
        title="Rent Stress Checker"
        subtitle="Are Wollongong rents affordable for your household?"
      />

      <Card className="callout blue" style={{ marginBottom: 22 }}>
        <b>What is rental stress?</b> In Australian housing policy, a household
        is in "rental stress" when more than 30% of gross income goes to rent.
        This tool uses Wollongong's median rent ($750/wk in 2024-25) and
        forecast rents from the Method 6 scenario analysis to check whether your
        household would be affected.
      </Card>

      <div className="tool-layout">
        <Card className="input-panel">
          <h3>Your details</h3>
          <SliderInput
            label="Total Household Weekly Income"
            value={weeklyIncome}
            onChange={setWeeklyIncome}
            min={400}
            max={4000}
            step={50}
            format={(v) => `$${v.toLocaleString()}`}
          />
          <div className="callout blue" style={{ marginTop: 16 }}>
            Enter your household's combined weekly take-home pay. If you're a
            couple or family, add all incomes together.
          </div>
          <ScenarioBtns scenario={scenario} setScenario={setScenario} />
        </Card>

        <div>
          <Card className={`status-card ${isStressed ? "bad" : "good"}`}>
            <span>{isStressed ? "In Rental Stress" : "Rent Manageable"}</span>
            <strong>{rentStress.toFixed(1)}%</strong>
            <p>
              {isStressed
                ? `You'd need $${incomeNeeded.toLocaleString()}/wk to keep rent under 30%.`
                : "Your rent is within the affordable range."}
            </p>
          </Card>
          <div className="metrics-grid two">
            <Metric
              label="Current Median Rent"
              value={`$${currentRent}/wk`}
              sub="Wollongong 2024-25"
              tone={theme.violet}
            />
            <Metric
              label="Max Affordable Rent"
              value={`$${maxRent}/wk`}
              sub="30% of your income"
              tone={isStressed ? theme.red : theme.green}
            />
          </div>
          <Card>
            <ChartTitle
              title={`Future rent stress — ${scenarios[scenario].label}`}
              subtitle="Projected rent as a percentage of your income each year"
            />
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Projected Rent</th>
                    <th>% of Income</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.year}>
                      <td>{r.year}</td>
                      <td>${r.rent}/wk</td>
                      <td
                        style={{
                          color: r.stressed ? theme.red : theme.green,
                          fontWeight: 800,
                        }}
                      >
                        {r.pct}%
                      </td>
                      <td>
                        <span
                          style={{
                            background: r.stressed ? "#fff1f2" : "#ecfdf5",
                            color: r.stressed ? theme.red : theme.green,
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          {r.stressed ? "Stressed" : "OK"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="callout green" style={{ marginTop: 18 }}>
            <b>Data source:</b> Rent projections are from the Method 6 scenario
            analysis using compound growth rates anchored to Method 5 historical
            averages (Low 5%, Base 7.6%, High 10% annual growth). Current rent
            ($750/wk) is the 2024-25 Wollongong LGA median.
          </Card>
        </div>
      </div>
    </div>
  );
}
