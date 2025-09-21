import React from 'react';

const ProfitCard = () => {
  return (
    <div className="card text-white bg-warning h-100">
      <div className="card-body">
        <h5 className="card-title">Ganancia Acumulada</h5>
        <p className="card-text display-6">$28,590</p>
        <p className="card-text">Este mes</p>
      </div>
    </div>
  );
};

export default ProfitCard;