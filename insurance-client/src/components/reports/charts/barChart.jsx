import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';
import Chart from 'react-apexcharts';


function BarChart(props) {
    const { chartData, type } = props;
    console.log("chartData", type)

    return (
        <Chart options={chartData.options} series={chartData.series} type={type} width={500} height={320} />
    )
}

export default BarChart;
