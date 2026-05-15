import React from "react";

const navItems = [
  ["overview", "Overview", "⌂"],
  ["forecast", "Forecast", "↗"],
  ["demand", "Demand", "≋"],
  ["growth", "Growth", "%"],
  ["affordability", "Afford", "$"],
  ["supply", "Supply", "▦"],
  ["rent", "Rent", "●"],
  ["stakeholders", "Stakeholders", "◎"],
];

export default function Shell({ section, setSection, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="logo-block" onClick={() => setSection("overview")}>
          <img src="/logo192.png" alt="Wollongong Housing logo" />
          <div>
            <strong>Wollongong</strong>
            <small>Housing Intelligence</small>
          </div>
        </button>

        <nav className="side-nav">
          {navItems.map(([id, label, icon]) => (
            <button
              key={id}
              className={section === id ? "side-link active" : "side-link"}
              onClick={() => setSection(id)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="side-note">
          <b>OPS270</b>
          <p>
            Forecasting project using migration, supply, rent, and house price
            data.
          </p>
        </div>
      </aside>

      <div className="mobile-top">
        <button className="logo-block" onClick={() => setSection("overview")}>
          <img src="/logo192.png" alt="Wollongong Housing logo" />
          <div>
            <strong>Wollongong</strong>
            <small>Housing Intelligence</small>
          </div>
        </button>
        <div className="mobile-nav">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={section === id ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="content-area">{children}</main>
    </div>
  );
}
