import React, { useState, useMemo, useEffect, useRef } from "react";
import "./dashboard/styles/whatsapplogaudit.css";

const WhatsAppLogAudit = ({ logs }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const endRef = useRef(null);

  /* ===============================
     Agrupar conversaciones
  =============================== */
  const conversations = useMemo(() => {
    const map = {};
    logs.forEach((log) => {
      if (!map[log.phone_number]) {
        map[log.phone_number] = [];
      }
      map[log.phone_number].push(log);
    });

    Object.keys(map).forEach((k) => {
      map[k].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    });

    return map;
  }, [logs]);

  const currentConversation = conversations[selectedClient] || [];

  /* ===============================
     Scroll al último mensaje
  =============================== */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation]);

  /* ===============================
     Métricas ejecutivas
  =============================== */
  const metrics = useMemo(() => {
    if (!currentConversation.length) return null;

    let responseTimes = [];
    let lastInbound = null;
    let outboundStreak = 0;
    let contextErrors = 0;

    currentConversation.forEach((m) => {
      if (m.direction === "INBOUND") {
        lastInbound = new Date(m.timestamp);
        outboundStreak = 0;
      }

      if (m.direction === "OUTBOUND") {
        outboundStreak++;
        if (lastInbound) {
          responseTimes.push(
            (new Date(m.timestamp) - lastInbound) / 1000
          );
          lastInbound = null;
        }
        if (outboundStreak > 1) contextErrors++;
      }
    });

    const avgResponse =
      responseTimes.reduce((a, b) => a + b, 0) /
      (responseTimes.length || 1);

    return {
      avgResponse: Math.round(avgResponse),
      contextErrors,
      totalMessages: currentConversation.length,
    };
  }, [currentConversation]);

  return (
    <div className="wa-exec-container">
      {/* ================= CLIENTES ================= */}
      <aside className="wa-exec-sidebar">
        <h3>Clientes</h3>
        <div className="wa-client-list">
          {Object.keys(conversations).map((phone) => {
            const conv = conversations[phone];
            return (
              <div
                key={phone}
                className={`wa-client-item ${
                  phone === selectedClient ? "active" : ""
                }`}
                onClick={() => setSelectedClient(phone)}
              >
                <div className="wa-avatar">{phone.slice(-2)}</div>
                <div>
                  <div className="wa-phone">{phone}</div>
                  <div className="wa-preview">
                    {conv[conv.length - 1]?.message?.slice(0, 28)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ================= CHAT ================= */}
      <main className="wa-exec-chat">
        {!selectedClient ? (
          <div className="wa-placeholder">
            Selecciona un cliente para auditar la conversación
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="wa-chat-header">
              <strong>{selectedClient}</strong>

              {metrics && (
                <div className="wa-metrics">
                  <span>
                    ⏱ Resp. prom: <b>{metrics.avgResponse}s</b>
                  </span>
                  <span>
                    ⚠️ Contexto: <b>{metrics.contextErrors}</b>
                  </span>
                  <span>
                    💬 Msgs: <b>{metrics.totalMessages}</b>
                  </span>
                </div>
              )}
            </div>

            {/* Mensajes */}
            <div className="wa-chat-body">
              {currentConversation.map((m, i) => (
                <div
                  key={i}
                  className={`wa-msg ${
                    m.direction === "OUTBOUND" ? "sent" : "received"
                  }`}
                >
                  <div className="wa-bubble">
                    {m.message}
                    <div className="wa-time">
                      {new Date(m.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default WhatsAppLogAudit;
