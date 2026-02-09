import React, { useEffect, useState } from "react";
import WhatsAppLogAudit from "./WhatsAppLogAudit";
import "./dashboard/styles/agentmemoryviewer.css";
import WhatsAppLogService from "../../../services/whatsapplogaudit.service";

export default function WhatsAppAudit() {
  const [logData, setLogData] = useState([]);

useEffect(() => {

    WhatsAppLogService.getWhatsAppLog()
      .then(res => {
        console.log("¡Ahora sí es un CSV!", res);
        setLogData(res.data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  if (!logData) return <div className="loading">Cargando Dashboard Ejecutivo…</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>WhatsApp – Executive Dashboard</h1>
        <p>Visión estratégica de las conversaciones</p>
      </header>

     {/* <section className="kpi-section">
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

         <LineChart
          title="Actividad del Agente"
          labels={metrics.timeline.labels}
          data={metrics.timeline.values}
        /> 
      </section> */}

      <section>
        <WhatsAppLogAudit logs={logData} />
      </section> 

    </div>
  );
}
