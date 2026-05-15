import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { forecastHouse, forecastYears, fmt, scenarios, theme, tooltipStyle } from "../data";
import { Card, ChartTitle, Metric, PageTitle, ScenarioBtns, SliderInput, YearButtons } from "../components/SharedComponents";

export default function Affordability({ scenario, setScenario, income, setIncome, deposit, setDeposit, rate, setRate, term, setTerm, targetYear, setTargetYear }) {
  const projPrice = forecastHouse[scenario][targetYear];
  const loan = Math.max(projPrice - deposit, 0);
  const mr = rate / 100 / 12;
  const np = term * 12;
  const mp = mr > 0 ? (loan * mr * Math.pow(1 + mr, np)) / (Math.pow(1 + mr, np) - 1) : loan / np;
  const dsr = ((mp * 12) / income) * 100;
  const canAfford = dsr <= 30;
  const maxBorrow = mr > 0 ? (((income * 0.3) / 12) * (Math.pow(1 + mr, np) - 1)) / (mr * Math.pow(1 + mr, np)) : ((income * 0.3) / 12) * np;

  const affordTimeline = forecastYears.map((y, i) => {
    const p = forecastHouse[scenario][i];
    const l = Math.max(p - deposit, 0);
    const m = mr > 0 ? (l * mr * Math.pow(1 + mr, np)) / (Math.pow(1 + mr, np) - 1) : l / np;
    return { year: y, dsr: Number((((m * 12) / income) * 100).toFixed(1)), affordable: ((m * 12) / income) * 100 <= 30 };
  });

  return (
    <div className="screen fade-in">
      <PageTitle eyebrow="Interactive tool" title="Affordability Calculator" subtitle="Can a household afford projected Wollongong house prices?" />
      <div className="tool-layout">
        <Card className="input-panel">
          <h3>Your details</h3>
          <SliderInput label="Annual Household Income" value={income} onChange={setIncome} min={40000} max={250000} step={5000} format={(v) => `$${(v / 1000).toFixed(0)}K`} />
          <SliderInput label="Saved Deposit" value={deposit} onChange={setDeposit} min={0} max={500000} step={10000} format={(v) => `$${(v / 1000).toFixed(0)}K`} />
          <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={3} max={10} step={0.25} format={(v) => `${v}%`} />
          <SliderInput label="Loan Term" value={term} onChange={setTerm} min={15} max={30} step={5} format={(v) => `${v} yrs`} />
          <YearButtons value={targetYear} setValue={setTargetYear} />
          <ScenarioBtns scenario={scenario} setScenario={setScenario} />
        </Card>

        <div>
          <Card className={`status-card ${canAfford ? "good" : "bad"}`}>
            <span>{canAfford ? "Affordable" : "Unaffordable"}</span>
            <strong>{dsr.toFixed(1)}%</strong>
            <p>Debt-service ratio using the 30% rule.</p>
          </Card>
          <div className="metrics-grid two">
            <Metric label={`Price (${forecastYears[targetYear]})`} value={fmt(projPrice)} sub={scenarios[scenario].label} tone={theme.blue} />
            <Metric label="Monthly Repayment" value={`$${Math.round(mp).toLocaleString()}`} sub="P+I" tone={theme.violet} />
            <Metric label="Max Purchase" value={fmt(Math.round(maxBorrow + deposit))} sub="with deposit" tone={theme.amber} />
            <Metric label="Status" value={canAfford ? "Safe" : "Over"} sub="30% threshold" tone={canAfford ? theme.green : theme.red} />
          </div>
          <Card className="chart-card">
            <ChartTitle title="Affordability timeline" />
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={affordTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
                <YAxis tickFormatter={(v) => `${v}%`} stroke="#64748b" fontSize={11} />
                <Tooltip formatter={(v) => `${v}%`} contentStyle={tooltipStyle} />
                <Bar dataKey="dsr" radius={[8, 8, 0, 0]}>
                  {affordTimeline.map((d, i) => <Cell key={i} fill={d.affordable ? "#059669" : "#e11d48"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
