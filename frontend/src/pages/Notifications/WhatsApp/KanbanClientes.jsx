import React, { useState, useMemo } from "react";
import ClientDetailModal from "./clientModal/ClientDetailModal";

export default function KanbanClientes() {
  const ESTATUS = [
    "primera interacción",
    "presenta interes",
    "datos de su negocio",
    "agenda llamada",
    "no interesado",
    "no contesta",
  ];

  const initialClients = [
    {
      id: 1,
      nombre: "Juan Pérez",
      phone: "+52 5512345678",
      status: "primera interacción",
      lastMessageAt: "2026-02-08T10:30:00",
      statusChangedAt: "2026-02-08T10:30:00",
      score: 45,
    },
    {
      id: 2,
      nombre: "María López",
      phone: "+52 5587654321",
      status: "presenta interes",
      lastMessageAt: "2026-02-08T11:10:00",
      statusChangedAt: "2026-02-08T11:00:00",
      score: 72,
    },
    {
      id: 3,
      nombre: "Carlos Gómez",
      phone: "+52 5599988877",
      status: "agenda llamada",
      lastMessageAt: "2026-02-07T17:40:00",
      statusChangedAt: "2026-02-07T16:20:00",
      score: 88,
    },
  ];

  const [clients, setClients] = useState(initialClients);
  const [draggingId, setDraggingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const moveClient = (clientId, newStatus) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              status: newStatus,
              statusChangedAt: new Date().toISOString(),
              score: calculateScore({ ...c, status: newStatus }),
            }
          : c
      )
    );
  };

  const openModal = ( client )=>{
    setModalOpen(true);
    setSelectedClient(client);
  };

  const calculateScore = (client) => {
    let score = 20;
    if (client.status === "presenta interes") score += 30;
    if (client.status === "datos de su negocio") score += 50;
    if (client.status === "agenda llamada") score += 70;
    if (client.status === "no interesado") score = 5;
    if (client.status === "no contesta") score = 10;
    return Math.min(score, 100);
  };

  const metrics = useMemo(() => {
    const result = {};
    ESTATUS.forEach((e) => {
      const list = clients.filter((c) => c.status === e);
      const avgTime = list.length
        ? Math.round(
            list.reduce((acc, c) => {
              const diff =
                new Date().getTime() - new Date(c.statusChangedAt).getTime();
              return acc + diff;
            }, 0) /
              list.length /
              60000
          )
        : 0;
      result[e] = { count: list.length, avgMinutes: avgTime };
    });
    return result;
  }, [clients]);

  return (
    <>
    <div style={styles.page}>
      <h1 style={styles.title}>Seguimiento de Clientes</h1>
      <div style={styles.kanban}>
        {ESTATUS.map((status) => (
          <div
            key={status}
            style={styles.column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => moveClient(draggingId, status)}
          >
            <div style={styles.columnHeader}>
              <span>{status}</span>
              <small>
                {metrics[status].count} clientes · ⏱️ {metrics[status].avgMinutes} min
              </small>
            </div>
            <div style={styles.columnBody}>
              {clients
                .filter((c) => c.status === status)
                .map((client) => (
                  <div
                    key={client.id}
                    style={styles.card}
                    draggable
                    onDragStart={() => setDraggingId(client.id)}
                  >
                    <div style={styles.cardTitle}>{client.nombre}</div>
                    <div style={styles.score}>🧠 Score: {client.score}</div>
                    <div style={styles.buttons} onClick={() => openModal(client)}>
                      <button style={styles.btn}>WhatsApp</button>
                      <button style={styles.btn}>Pedido</button>
                      <button style={styles.btn}>Info</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <ClientDetailModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      client={selectedClient}
    />

    </>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    padding: 20,
    fontFamily: "Inter, Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  kanban: {
    display: "flex",
    gap: 16,
    overflowX: "auto",
    height: "calc(100% - 80px)",
  },
  column: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    minWidth: 280,
    display: "flex",
    flexDirection: "column",
  },
  columnHeader: {
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    textTransform: "capitalize",
  },
  columnBody: {
    padding: 12,
    overflowY: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  card: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    borderRadius: 12,
    padding: 12,
    cursor: "grab",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  score: {
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 8,
  },
  buttons: {
    display: "flex",
    gap: 6,
  },
  btn: {
    flex: 1,
    border: "none",
    borderRadius: 8,
    padding: "6px 8px",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
  },
};
