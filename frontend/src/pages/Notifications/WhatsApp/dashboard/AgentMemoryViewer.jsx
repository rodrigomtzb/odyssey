import React, { useState } from "react";

const AgentMemoryViewer = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const formatJSON = (json) => {
    try {
      return JSON.stringify(
        typeof json === "string" ? JSON.parse(json) : json,
        null,
        2
      );
    } catch (e) {
      return json;
    }
  };

  const getTypeFromJSON = (json) => {
    try {

      const objJson = JSON.parse(json);
      return objJson.type;
      
    } catch (e) {
      return json;
    }
  };

  return (
    <div className="memory-container">
      <div className="memory-list">
        <h3>🧠 Agent Memory Log</h3>

        <div className="memory-table">
          {data.map((item) => (
            <div
              key={item.id}
              className={`memory-row ${
                selectedItem === item ? "active" : ""
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="memory-index">#{item.id}</div>
              <div className="memory-meta">
                <div className="memory-role">{getTypeFromJSON(item.message)}</div>
                <div className="memory-role">{item.sessionId}</div>
                <div className="memory-role">{item.fechaRegistro}</div>
                <div className="memory-preview">
                  {item.message?.substring(0, 80)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="memory-detail">
        {selectedItem ? (
          <>
            <h3>📄 Detalle del Mensaje</h3>
            <pre className="json-viewer">
              {formatJSON(selectedItem.message)}
            </pre>
          </>
        ) : (
          <div className="memory-placeholder">
            Selecciona un evento para ver el detalle del mensaje
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentMemoryViewer;
