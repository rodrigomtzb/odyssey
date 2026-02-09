import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ title, labels, data, backgroundColors }) {

  const defaultColors = [
    "#FF6384", // Rosa/Rojo
    "#36A2EB", // Azul
    "#FFCE56", // Amarillo
    "#4BC0C0", // Turquesa
    "#9966FF", // Morado
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        // Aquí asignamos los colores
        backgroundColor: backgroundColors || defaultColors,
        // Opcional: Color del borde de cada sección
        borderColor: "#ffffff", 
        borderWidth: 2,
        // Opcional: Color al pasar el mouse
        hoverBackgroundColor: backgroundColors || defaultColors,
      },
    ],
  };

  const options = {
    cutout: '70%', // Esto hace el hueco central más grande
    plugins: {
      legend: {
        position: 'bottom', // Mueve las etiquetas abajo
      },
    },
  };

  return (
    <div className="chart-card" style={{ width: '300px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
