'use client'
import {React, useState, useEffect} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  defaults,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

defaults.font.size = 20;

export const options = {
  responsive: true,
  scales: {
    y:  {
          min: 0,
          max: 500,
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
    datalabels: {
        font: {
          weight: 'bold',
          size: 30,
        }
    }
  },
};

const labels = ['TEAM 2 - Two of Hearts', 'TEAM 5 - Five New', 'TEAM 8 - NoBrainer', 'TEAM 9 - Ninekathon'];

export default  () => {
  const[chartData, setChartData] = useState({
  labels,
  datasets: [
    {
      label: 'Vote',
      data: [0,0,0,0],
      backgroundColor: ['rgba(255, 99, 132, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                              'rgba(255, 205, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1
    }
  ],
});

  const[data, setData] = useState(0);

  const loadData = async () => {
      const response = await fetch("https://"+ window.location.hostname + "/api/chart", {cache: "no-store"});
      let responseData =  await response.json();

      setChartData({
        labels,
        datasets: [
          {
            label: 'Vote',
            data: responseData.data,
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                              'rgba(255, 205, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            borderWidth: 1
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
    <div className="min-w-[1000px] p-5 items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Bar options={options} data={chartData} plugins={ChartDataLabels} width={1200} height={500}  />
    </div>
  );
};
