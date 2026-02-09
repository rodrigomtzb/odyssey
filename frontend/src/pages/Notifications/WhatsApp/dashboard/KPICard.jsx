import React from "react";

export default function KPICard({ title, value, trend, subtitle }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <h4>{title}</h4>
        {trend && (
          <span
            className={`kpi-trend ${
              trend > 0 ? "positive" : trend < 0 ? "negative" : ""
            }`}
          >
            {trend > 0 && "▲"}
            {trend < 0 && "▼"}
            {trend}%
          </span>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
    </div>
  );
}
