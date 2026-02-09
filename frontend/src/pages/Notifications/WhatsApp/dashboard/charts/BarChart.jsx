import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Importante: Registramos Tooltip y Legend para que la gráfica sea interactiva
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ title, labels, data, color }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        // Si pasas un solo color, todas las barras serán iguales.
        // Si pasas un array de colores, cada barra será distinta.
        backgroundColor: color || "rgba(75, 192, 192, 0.2)", 
        borderColor: color || "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ocultamos la leyenda superior si el título ya explica la gráfica
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que el eje Y empiece en 0
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
}