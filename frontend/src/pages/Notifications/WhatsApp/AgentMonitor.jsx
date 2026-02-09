import React, { useEffect, useState } from "react";
import AgentMemoryViewer from "./dashboard/AgentMemoryViewer";
import KPICard from "./dashboard/KPICard";
import DonutChart from "./dashboard/charts/DonutChart";
import BarChart from "./dashboard/charts/BarChart";
import LineChart from "./dashboard/charts/LineChart";
import { analyzeMemory } from "./dashboard/utils/analyzeMemory";
import "./dashboard/styles/executive-dashboard.css";
import "./dashboard/styles/agentmemoryviewer.css";
//import csvData from "./dashboard/mock/whatsapp_agent_memory_202602040121.csv?url";
import AgentMonitorLogService from "../../../services/agentmonitor.service";

export default function AgentMonitor() {
  const [metrics, setMetrics] = useState(null);
  const [memoryData, setMemoryData] = useState([]);

  // ... dentro de tu componente AgentMonitor
useEffect(() => {
    // 2. Ahora fetch usa la ruta resuelta por React
    //fetch(csvData)
    AgentMonitorLogService.getMonitorLog()
    //   .then(res => {
    //     if (!res.ok) throw new Error("No se pudo cargar el archivo");
    //     return res.text();
    //   })
      .then(res => {
        console.log("¡Ahora sí es un CSV!", res);
        setMetrics(analyzeMemory(res));
        setMemoryData(res.data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  if (!metrics) return <div className="loading">Cargando Dashboard Ejecutivo…</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📊 AgentIA – Executive Dashboard</h1>
        <p>Visión estratégica del comportamiento del Agente</p>
      </header>

      <section className="kpi-section">
        <KPICard title="Conversaciones" value={metrics.sessions} />
        <KPICard title="Mensajes Totales" value={metrics.totalMessages} />
        <KPICard title="Automatización" value={`${metrics.automationRate}%`} />
        <KPICard title="Uso de Tools" value={`${metrics.toolUsage}%`} />
        <KPICard title="Resp. AI Promedio" value={`${metrics.avgResponseLength} chars`} />
      </section>

      <section className="charts-grid">
        <DonutChart
          title="Distribución Conversacional"
          labels={["Usuario", "Agente IA"]}
          data={[ parseInt( metrics.human), parseInt(metrics.ai)]}
        />

        <BarChart
          title="Uso de Herramientas"
          labels={Object.keys(metrics.tools)}
          data={Object.values(metrics.tools)}
        />

        {/* <LineChart
          title="Actividad del Agente"
          labels={metrics.timeline.labels}
          data={metrics.timeline.values}
        /> */}
      </section>

      <section>
        <AgentMemoryViewer data={memoryData} />
      </section>

    </div>
  );
}
