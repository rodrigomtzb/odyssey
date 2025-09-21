import React, { useState } from 'react';
import axios from 'axios';

const SmartReportButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // Simulamos datos de ventas para enviar a OpenAI
      const salesData = {
        currentWeekSales: 5800,
        previousWeekSales: 5000,
        topProducts: ['Producto A', 'Producto C'],
      };

      // Llamada a la API de OpenAI :cite[10]
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Analiza los datos de ventas: 
                        Ventas semana actual: $${salesData.currentWeekSales}, 
                        Ventas semana anterior: $${salesData.previousWeekSales}, 
                        Productos destacados: ${salesData.topProducts.join(', ')}.
                        Genera un reporte breve en español con insights clave.`,
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reportText = response.data.choices[0].message.content;
      document.getElementById('report-text').innerText = reportText;
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      document.getElementById('report-text').innerText = 'Error al generar el reporte.';
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className="btn btn-sm btn-info" 
      onClick={handleGenerateReport}
      disabled={loading}
    >
      {loading ? 'Generando...' : 'Generar Reporte'}
    </button>
  );
};

export default SmartReportButton;