import React from 'react';
import SalesCard from './SalesCard';
import InventoryCard from './InventoryCard';
import ProfitCard from './ProfitCard';
import SalesChart from './SalesChart';
import ProductTable from './ProductTable';
import SmartReportButton from './SmartReportButton';

const Summary = () => {
  return (
    <div className="dashboard-container">

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4 mb-4">
            <SalesCard />
          </div>
          <div className="col-md-4 mb-4">
            <InventoryCard />
          </div>
          <div className="col-md-4 mb-4">
            <ProfitCard />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h5>Ventas por Semana</h5>
              </div>
              <div className="card-body">
                <SalesChart />
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>Reporte Inteligente</h5>
                <SmartReportButton />
              </div>
              <div className="card-body">
                <p id="report-text" className="text-muted">
                  Haz clic en "Generar Reporte" para obtener insights sobre tus ventas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Lista de Productos</h5>
              </div>
              <div className="card-body">
                <ProductTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;