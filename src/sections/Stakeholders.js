import React, { useState, useRef, useEffect } from "react";
import { Card, PageTitle } from "../components/SharedComponents";
import { theme } from "../data";

const stakeholderGroups = [
  {
    level: "Primary",
    description: "Directly affected by rising prices and rent.",
    color: theme.blue,
    stakeholders: [
      {
        name: "Homebuyers",
        impact: "Very High",
        insight:
          "Prices determine whether first-home buyers can enter the market.",
        action:
          "Use forecasts to plan purchases and assess affordability windows.",
      },
      {
        name: "Renters",
        impact: "Very High",
        insight: "Weekly rent costs directly reduce disposable income.",
        action: "Use rent stress projections to anticipate future pressure.",
      },
      {
        name: "Local Families",
        impact: "High",
        insight: "Housing costs shape where families choose to live and work.",
        action: "Use supply data to understand future housing availability.",
      },
    ],
  },
  {
    level: "Secondary",
    description: "Decision-makers who shape housing and planning policy.",
    color: theme.violet,
    stakeholders: [
      {
        name: "Wollongong Council",
        impact: "High",
        insight:
          "The demand-supply gap shows whether approvals are keeping pace.",
        action: "Use supply analysis to guide planning decisions.",
      },
      {
        name: "Developers",
        impact: "High",
        insight: "Persistent undersupply signals development opportunity.",
        action: "Use demand forecasts to target high-need areas.",
      },
      {
        name: "State & Federal Gov",
        impact: "Medium",
        insight:
          "Migration policy amplifies housing pressure in regional cities.",
        action: "Use findings to inform infrastructure and housing investment.",
      },
    ],
  },
  {
    level: "Tertiary",
    description: "Groups with broader market or academic interest.",
    color: theme.green,
    stakeholders: [
      {
        name: "Investors",
        impact: "Medium",
        insight:
          "Forecasts reveal price growth potential and rental yield trends.",
        action: "Compare risk across low, base, and high scenarios.",
      },
      {
        name: "Researchers",
        impact: "Medium",
        insight: "Demonstrates applied forecasting on real housing data.",
        action: "Reference as an example of data-driven market analysis.",
      },
      {
        name: "Local Community",
        impact: "Medium",
        insight:
          "Housing pressure affects the wider city beyond buyers and renters.",
        action: "Understand the forces driving Wollongong's housing challenge.",
      },
    ],
  },
];

export default function Stakeholders() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState("right");
  const [animating, setAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState(0);
  const containerRef = useRef(null);

  const switchTab = (newTab) => {
    if (newTab === activeTab || animating) return;
    setDirection(newTab > activeTab ? "right" : "left");
    setAnimating(true);

    // After exit animation, swap content and play enter animation
    setTimeout(() => {
      setDisplayTab(newTab);
      setActiveTab(newTab);
      setTimeout(() => {
        setAnimating(false);
      }, 20);
    }, 250);
  };

  const group = stakeholderGroups[displayTab];

  const getAnimClass = () => {
    if (!animating) return "stake-slide-enter-active";
    return direction === "right"
      ? "stake-slide-exit-left"
      : "stake-slide-exit-right";
  };

  return (
    <div className="screen fade-in">
      <PageTitle
        eyebrow="Stakeholders"
        title="Who is affected by the forecast?"
        subtitle="The findings affect real people, organisations, and policy decisions across the Wollongong housing market."
      />

      <div className="stakeholder-tabs">
        {stakeholderGroups.map((g, i) => (
          <button
            key={g.level}
            className={activeTab === i ? "stake-tab active" : "stake-tab"}
            style={{ "--tone": g.color }}
            onClick={() => switchTab(i)}
          >
            <b>{g.level}</b>
            <small>{g.description}</small>
          </button>
        ))}
      </div>

      <div className="stake-slide-container" ref={containerRef}>
        <div className={`stake-slide-panel ${getAnimClass()}`} key={displayTab}>
          <div className="stakeholder-card-grid">
            {group.stakeholders.map((s) => (
              <Card
                key={s.name}
                className="stakeholder-detail-card"
                style={{ "--tone": group.color }}
              >
                <div className="stakeholder-topline">
                  <h3>{s.name}</h3>
                  <strong>{s.impact}</strong>
                </div>

                <div className="stakeholder-block">
                  <span>Key impact</span>
                  <p>{s.insight}</p>
                </div>

                <div className="stakeholder-block action">
                  <span>How this project helps</span>
                  <p>{s.action}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Card className="bigger-picture-card">
        <span className="mini-kicker">The bigger picture</span>
        <h3>Why this project matters</h3>
        <p>
          Wollongong's housing crisis affects families, renters, and a city
          trying to grow without pricing out the people who live there. This
          project provides a clear, evidence-based view of where the market is
          heading.
        </p>
      </Card>
    </div>
  );
}
