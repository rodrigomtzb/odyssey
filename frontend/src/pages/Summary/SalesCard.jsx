import React from 'react';

const SalesCard = () => {
  return (
    <div className="card text-white bg-primary h-100">
      <div className="card-body">
        <h5 className="card-title">Ventas del Día</h5>
        <p className="card-text display-6">$5,430</p>
        <p className="card-text">+15% respecto a ayer</p>
      </div>
    </div>
  );
};

export default SalesCard;