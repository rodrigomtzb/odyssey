import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function LineChart({ title, labels, data }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <Line data={{ labels, datasets: [{ data }] }} />
    </div>
  );
}
