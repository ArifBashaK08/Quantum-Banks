"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {

  const data = {
    datasets: [
      {
        lable: "Banks",
        data: [1250, 2531, 1000],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91f8"]
      }
    ],
    labels: ["SBI", "HDFC", "Airtel"]
  }
  return <Doughnut data={data}
    options={{
      cutout: "60%",
      plugins: {
        legend: {
          display: false
        }
      }
    }} />
}
export default DoughnutChart