import React from "react";
import { forecastYears, scenarios, theme } from "../data";

export function PageTitle({ eyebrow, title, subtitle }) {
  return (
    <header className="page-title">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export function Card({ children, className = "", style }) {
  return <section className={`card ${className}`} style={style}>{children}</section>;
}

export function Metric({ label, value, sub, tone = theme.blue }) {
  return (
    <div className="metric" style={{ "--tone": tone }}>
      <small>{label}</small>
      <strong>{value}</strong>
      {sub && <span>{sub}</span>}
    </div>
  );
}

export function ChartTitle({ title, subtitle }) {
  return (
    <div className="chart-title">
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function ScenarioBtns({ scenario, setScenario }) {
  return (
    <div className="scenario-row">
      {Object.entries(scenarios).map(([key, item]) => (
        <button
          key={key}
          className={scenario === key ? "scenario-pill active" : "scenario-pill"}
          onClick={() => setScenario(key)}
          style={{ "--tone": item.color }}
        >
          <b>{item.label}</b>
          <span>{item.tag}</span>
          <small>{item.desc}</small>
        </button>
      ))}
    </div>
  );
}

export function SliderInput({ label, value, onChange, min, max, step, format }) {
  return (
    <div className="slider-block">
      <div>
        <label>{label}</label>
        <strong>{format ? format(value) : value}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <p>
        <span>{format ? format(min) : min}</span>
        <span>{format ? format(max) : max}</span>
      </p>
    </div>
  );
}

export function YearButtons({ value, setValue }) {
  return (
    <div className="year-buttons">
      {forecastYears.map((y, i) => (
        <button key={y} className={value === i ? "active" : ""} onClick={() => setValue(i)}>
          {y}
        </button>
      ))}
    </div>
  );
}

export function Table({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
