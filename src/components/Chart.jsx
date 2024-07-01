import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

const Chart = ({ campaignID }) => {
    const [selected, setSelected] = useState("week");
    const [data, setData] = useState([]);
    const umaxUrl = "https://umaxxnew-1-d6861606.deta.app";
    let chartUrl = "";
    let category = [];

    const convertToNumber = (value) => {
        if (typeof value === "string") {
        return Number(value.replace(/[^0-9.-]+/g, ""));
        }
        return value;
    };

    useEffect(() => {
        const getMetricByCampaign = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (selected === "week") {
            chartUrl = `${umaxUrl}/last-week?campaign_id=${campaignID}&tenantId=${localStorage.getItem(
                "tenantId"
            )}`;
            } else if (selected === "month") {
            chartUrl = `${umaxUrl}/last-month?campaign_id=${campaignID}&tenantId=${localStorage.getItem(
                "tenantId"
            )}`;
            } else {
            chartUrl = `${umaxUrl}/last-year?campaign_id=${campaignID}&tenantId=${localStorage.getItem(
                "tenantId"
            )}`;
            }
            const response = await axios.get(chartUrl, {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`,
            },
            });
            setData(response.data.Data);
            category = selected === "year" ? data.map((item) => item.month) : data.map((_, index) => index + 1);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
        };
        getMetricByCampaign();
    }, [selected, campaignID]);

    const dummyData = {
        series: [
        {
            name: "AmountSpent",
            data: data.map((obj) => parseFloat(obj.amountspent.replace(/[^0-9.]/g, ""))),
        },
        {
            name: "RAR",
            data: data.map((obj) => parseFloat(obj.rar.replace(/[^0-9.]/g, ""))),
        },
        {
            name: "CTR",
            data: data.map((obj) => parseFloat(obj.ctr.replace(/[^0-9.]/g, ""))),
        },
        ],
        categories: category,
    };

    const options = {
        chart: {
        type: "area",
        height: 500,
        },
        dataLabels: {
        enabled: false,
        },
        stroke: {
        curve: "smooth",
        },
        xaxis: {
        categories: dummyData.categories,
        },
        colors: ["#FF5733", "#33FF57", "#3357FF", "#F39C12"],
    };

    return (
        <div>
            <div className="w-full flex justify-end">
                <div className="w-1/4 h-fit mb-3 me-3">
                <select
                    className="w-full h-fit px-4 py-2 border-2 border-gray-300 rounded-lg"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                </select>
                </div>
            </div>
            <div id="chart">
                <ApexChart options={options} series={dummyData.series} type="area" height={326} />
            </div>
        </div>
    );
};

export default Chart;

