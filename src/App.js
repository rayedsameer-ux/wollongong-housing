import React, { useState } from "react";
import Shell from "./components/Shell";
import Overview from "./sections/Overview";
import Forecast from "./sections/Forecast";
import Demand from "./sections/Demand";
import Growth from "./sections/Growth";
import Affordability from "./sections/Affordability";
import SupplyPlanner from "./sections/SupplyPlanner";
import RentStress from "./sections/RentStress";
import Stakeholders from "./sections/Stakeholders";

export default function App() {
  const [section, setSection] = useState("overview");
  const [scenario, setScenario] = useState("base");

  const [income, setIncome] = useState(85000);
  const [deposit, setDeposit] = useState(150000);
  const [rate, setRate] = useState(6.0);
  const [term, setTerm] = useState(30);
  const [targetYear, setTargetYear] = useState(3);

  const [migInput, setMigInput] = useState(1800);
  const [approvals, setApprovals] = useState(1286);
  const [targetGrowth, setTargetGrowth] = useState(3);

  const [weeklyIncome, setWeeklyIncome] = useState(1400);

  return (
    <Shell section={section} setSection={setSection}>
      {section === "overview" && <Overview setSection={setSection} />}
      {section === "forecast" && (
        <Forecast scenario={scenario} setScenario={setScenario} />
      )}
      {section === "demand" && <Demand />}
      {section === "growth" && <Growth />}
      {section === "affordability" && (
        <Affordability
          scenario={scenario}
          setScenario={setScenario}
          income={income}
          setIncome={setIncome}
          deposit={deposit}
          setDeposit={setDeposit}
          rate={rate}
          setRate={setRate}
          term={term}
          setTerm={setTerm}
          targetYear={targetYear}
          setTargetYear={setTargetYear}
        />
      )}
      {section === "supply" && (
        <SupplyPlanner
          migInput={migInput}
          setMigInput={setMigInput}
          approvals={approvals}
          setApprovals={setApprovals}
          targetGrowth={targetGrowth}
          setTargetGrowth={setTargetGrowth}
        />
      )}
      {section === "rent" && (
        <RentStress
          scenario={scenario}
          setScenario={setScenario}
          weeklyIncome={weeklyIncome}
          setWeeklyIncome={setWeeklyIncome}
        />
      )}
      {section === "stakeholders" && <Stakeholders />}

      <footer>Wollongong Housing Market · OPS270 Operations Management</footer>
    </Shell>
  );
}
