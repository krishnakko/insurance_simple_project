import React from 'react';
import Chart from 'react-apexcharts';


function LineChart(props) {
    const { chartData, type } = props;
    console.log("chartData", type)

    return (
        <Chart options={chartData.options} series={chartData.series} type={type} width={600} height={320} />
    )
}

export default LineChart;
