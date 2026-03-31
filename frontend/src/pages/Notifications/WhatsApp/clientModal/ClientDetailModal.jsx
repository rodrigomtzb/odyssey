import React, { useState, useEffect, useRef } from "react";
import "./ClientDetailModal.css";

const ClientDetailModal = ({ isOpen, onClose, client }) => {


  /*
  MOCK INFO
  */  

  const messages = [
    {
      id: 1,
      from: "client",
      text: "Hola, quienes son ustedes?",
      time:"2026-02-11 07:18:48"
    },
    {
      id: 2,
      from: "agent",
      text:"Hola, soy Odyssey, asistente virtual de SMART INNOVATION SYSTEMS. ¿Con quién tengo el gusto?",
      time:"2026-02-11 07:18:53"
    }
    ];

    const orders = [

        {
            id: 1,
            product: "tenedores",
            amount:"$32.50",
            status:"registrado",
            date:"2026-02-11 07:18:48"
        },
        {
            id: 1,
            product: "platos",
            amount:"$22.00",
            status:"registrado",
            date:"2026-02-11 07:18:48"
        }

    ];

  /*
  FIN MOCK INFO
  */


  const [activeTab, setActiveTab] = useState("chat");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === "chat" && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab, client]);

  if (!isOpen || !client) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h3>{client.name}</h3>
            <span className="phone">{client.phone}</span>
          </div>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* TABS */}
        <div className="modal-tabs">
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            💬 WhatsApp
          </button>
          <button
            className={activeTab === "order" ? "active" : ""}
            onClick={() => setActiveTab("order")}
          >
            🧾 Pedido
          </button>
          <button
            className={activeTab === "info" ? "active" : ""}
            onClick={() => setActiveTab("info")}
          >
            👤 Información
          </button>
        </div>

        {/* CONTENT */}
        <div className="modal-content">
          {activeTab === "chat" && (
            <div className="chat-container">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-bubble ${msg.from === "agent" ? "agent" : "client"}`}
                >
                  <div className="message-text">{msg.text}</div>
                  <div className="message-meta">
                    <span>{msg.time}</span>
                    {msg.contextError && <span className="error">⚠ contexto</span>}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}

          {activeTab === "order" && (
            <div className="order-container">
              {orders.length === 0 ? (
                <p className="empty">Sin pedidos registrados</p>
              ) : (
                    orders.map((order, i) => (
                  <div key={i} className="order-card">
                    <h4>Pedido #{order.id}</h4>
                    <p><strong>Producto:</strong> {order.product}</p>
                    <p><strong>Monto:</strong> ${order.amount}</p>
                    <p><strong>Fecha:</strong> {order.date}</p>
                    <span className={`order-status ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "info" && (
            <div className="info-container">
              <div className="info-item">
                <label>Nombre</label>
                <span>{client.name}</span>
              </div>
              <div className="info-item">
                <label>Teléfono</label>
                <span>{client.phone}</span>
              </div>
              <div className="info-item">
                <label>Estatus actual</label>
                <span>{client.status}</span>
              </div>
              <div className="info-item">
                <label>Última conversación</label>
                <span>{client.lastMessageDate}</span>
              </div>
              <div className="info-item">
                <label>Último cambio de estatus</label>
                <span>{client.lastStatusChange}</span>
              </div>
              <div className="info-item">
                <label>Score IA</label>
                <span className="score">{client.score}/100</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;
