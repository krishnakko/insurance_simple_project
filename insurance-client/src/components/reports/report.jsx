import React, { useState, useEffect } from 'react';
import BarChart from './charts/barChart';
import LineChart from './charts/lineChart';
import { getReportsData } from '../../requests';
import { monthMap, chartInfo } from '../../staticData/insuranceStatic';
import './report.scss';


function ChartReport(props) {
    const [apiData, setApiData] = useState({ "count": 0, "data": [] });
    const [chartData, setChartData] = useState(chartInfo);
    const [loader, setLoader] = useState(false);
    const [reportType, setReportType] = useState("bar");

    const getMonths = (data) => {
        let months = [];
        data.forEach(record => {
            months.push(monthMap[record.year_month.slice(-2)]);
        })
        return months;
    }


    useEffect(() => {
        setLoader(true);
        getReportsData().then(data => {
            setApiData(data);
            setLoader(false);
        })
    }, [])

    useEffect(() => {
        const months = getMonths(apiData["data"]);
        const values = apiData["data"].map(record => record.policies);

        // Initializing  the chart
        let chartInfo = {
            series: [{
                name: "Yearly Policy Information",
                data: values
            }],
            options: {
                // chart: {
                //     id: "yearly-policy"
                // },
                chart: {
                    id: "yearly-policy",
                    height: 350,
                    // type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                stroke: {
                    curve: 'straight',
                    show: true,
                    width: 2,
                    // colors: ['transparent']
                },
                xaxis: {
                    categories: months,
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                // colors: colors,
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                title: {
                    text: 'Monthly based policies',
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                },
            },
        };
        setChartData(chartInfo);
    }, [apiData])


    return (
        <div className="chartTopDiv">
            <div>
                <span>Policies Report</span>
            </div>
            <div className="viewBy">
                <span >View by:</span>
                <span className={`${reportType === "bar" ? 'active' : ""}`} onClick={() => setReportType("bar")}>Bar chart</span>
                <span className={`${reportType === "line" ? 'active' : ""}`} onClick={() => setReportType("line")}>Line chart</span>
            </div>

            {
                loader ? "" :
                    <div className="policyChart">
                        {
                            reportType === "bar" ? <BarChart chartData={chartData} type={reportType} /> :
                                <LineChart chartData={chartData} type={reportType} />
                        }
                    </div>
            }
        </div>
    )
}

export default ChartReport;
