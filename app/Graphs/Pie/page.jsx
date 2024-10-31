import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components for Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ dataSet }) => {
  const totalEmotion = dataSet.reduce((sum, item) => sum + item.emotion, 0);
  const totalLogic = dataSet.reduce((sum, item) => sum + item.logic, 0);

  const chartData = {
    labels: ['Total Emotion', 'Total Logic'],
    datasets: [
      {
        data: [totalEmotion, totalLogic],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
