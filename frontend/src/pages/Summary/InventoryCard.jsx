import React from 'react';

const InventoryCard = () => {
  return (
    <div className="card text-white bg-success h-100">
      <div className="card-body">
        <h5 className="card-title">Inventario Disponible</h5>
        <p className="card-text display-6">128 unidades</p>
        <p className="card-text">Productos en stock</p>
      </div>
    </div>
  );
};

export default InventoryCard;