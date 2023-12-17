'use client'
import {React, useState, useEffect} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y:  {
          min: 0,
          max: 500,
          step: 1,
        },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Hackathon Voting Result',
    },
  },
};

const labels = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

export default  () => {
  const[chartData, setChartData] = useState({
  labels,
  datasets: [
    {
      label: 'Vote',
      data: [0,0,0,0],
      backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(255, 255, 132, 0.5)','rgba(255, 132, 132, 0.5)','rgba(132, 99, 132, 0.5)',]
    }
  ],
});

  const[data, setData] = useState(0);

  const loadData = async () => {
      const response = await fetch("http://"+ window.location.hostname + "/api/chart", {cache: "no-store"});
      let responseData =  await response.json();

      setChartData({
        labels,
        datasets: [
          {
            label: 'Vote',
            data: responseData.data,
            backgroundColor: ['red','green', 'blue','white']
          }
        ],
      });
  }

  //Auto-refresh chart after 1000ms
  useEffect( () => {
    const timer = window.setInterval(() => {
      loadData();
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

return (
    <div>
      <Bar options={options} data={chartData} width={600} height={300} />
    </div>
  );
};
