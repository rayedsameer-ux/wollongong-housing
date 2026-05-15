import React from "react";
import { fmt, theme } from "../data";
import {
  Card,
  Metric,
  PageTitle,
  SliderInput,
  Table,
} from "../components/SharedComponents";

export default function SupplyPlanner({
  migInput,
  setMigInput,
  approvals,
  setApprovals,
  targetGrowth,
  setTargetGrowth,
}) {
  const demandPressure = migInput + Math.round(migInput * 0.35);
  const requiredSupply = Math.round(demandPressure / 1.35);
  const supplyGap = requiredSupply - approvals;
  const priceImpact = Math.round((migInput - approvals * 0.8) * 220);
  const priceNoAction = 1280000 + priceImpact;
  const priceTarget = 1280000 + Math.round((1280000 * targetGrowth) / 100);

  return (
    <div className="screen fade-in">
      <PageTitle
        eyebrow="Interactive tool"
        title="Supply Planning Tool"
        subtitle="Estimate how many homes Wollongong needs to build."
      />

      <div className="tool-layout">
        <Card className="input-panel">
          <h3>Inputs</h3>

          <SliderInput
            label="Expected Annual Net Migration"
            value={migInput}
            onChange={setMigInput}
            min={500}
            max={5000}
            step={100}
            format={(v) => v.toLocaleString()}
          />

          <SliderInput
            label="Current Annual Approvals"
            value={approvals}
            onChange={setApprovals}
            min={500}
            max={3000}
            step={50}
            format={(v) => v.toLocaleString()}
          />

          <SliderInput
            label="Target Price Growth"
            value={targetGrowth}
            onChange={setTargetGrowth}
            min={0}
            max={15}
            step={0.5}
            format={(v) => `${v}%`}
          />

          <div className="callout blue">
            Historical avg supply is 1,286 approvals/year. Demand has averaged
            2,994/year.
          </div>
        </Card>

        <div>
          <div className="metrics-grid two">
            <Metric
              label="Required Approvals"
              value={requiredSupply.toLocaleString()}
              sub="per year"
              tone={theme.blue}
            />

            <Metric
              label="Current Deficit"
              value={
                supplyGap > 0
                  ? `${supplyGap.toLocaleString()} short`
                  : "Surplus"
              }
              sub="homes/year"
              tone={supplyGap > 0 ? theme.red : theme.green}
            />

            <Metric
              label="Demand Pressure"
              value={demandPressure.toLocaleString()}
              sub="migration + pop growth"
              tone={theme.amber}
            />

            <Metric
              label="Price if No Action"
              value={fmt(priceNoAction)}
              sub="with current supply"
              tone={theme.red}
            />
          </div>

          <Card>
            <h3>Scenario comparison</h3>

            <Table
              headers={[
                "Scenario",
                "Approvals/yr",
                "Projected Price",
                "Growth",
              ]}
              rows={[
                [
                  "Do Nothing",
                  approvals.toLocaleString(),
                  fmt(priceNoAction),
                  `+${(((priceNoAction - 1280000) / 1280000) * 100).toFixed(
                    1,
                  )}%`,
                ],
                [
                  "Moderate (+30%)",
                  Math.round(approvals * 1.3).toLocaleString(),
                  fmt(Math.round(1280000 * 1.055)),
                  "+5.5%",
                ],
                [
                  "Meet Target",
                  requiredSupply.toLocaleString(),
                  fmt(priceTarget),
                  `+${targetGrowth.toFixed(1)}%`,
                ],
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
