import React from 'react';
import Chart from 'react-apexcharts';


function LineChart(props) {
    const { chartData, type } = props;

    return (
        <Chart options={chartData.options} series={chartData.series} type={type} width={600} height={320} />
    )
}

export default LineChart;
