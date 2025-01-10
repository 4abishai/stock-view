import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import stockData from "./data/stockData.js";

const CandlestickChart = ({ selectedCompany, showSMA }) => {
  const [chartData, setChartData] = useState(stockData.meta); // Default data (Meta)
  const [smaData, setSmaData] = useState([]); // State for SMA data

  // Update chart data when the selected company changes
  useEffect(() => {
    setChartData(stockData[selectedCompany]);
  }, [selectedCompany]);

  // Calculate and set SMA data when chartData changes or showSMA is toggled
  useEffect(() => {
    if (showSMA) {
      const sma = calculateSMA(chartData, 10); // Calculate 10-day SMA
      setSmaData(sma);
    } else {
      setSmaData([]);
    }
  }, [chartData, showSMA]);

  // Function to calculate the simple moving average (SMA)
  const calculateSMA = (data, period) => {
    if (!data || data.length < period) return [];

    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const avg = slice.reduce((sum, point) => sum + point[4], 0) / period; // Closing prices are at index 4
      sma.push([data[i][0], avg]); // Use the same timestamp as the last point in the period
    }
    return sma;
  };

  // Highcharts options
  const options = {
    chart: {
      backgroundColor: "#fff",
      height: 600,
    },
    rangeSelector: {
      selected: 1,
      buttonTheme: {
        fill: "#8058bc",
        style: {
          color: "#ffffff",
        },
        states: {
          hover: {
            fill: "#7daaf5",
          },
          select: {
            fill: "#000000",
          },
        },
      },
      labelStyle: {
        color: "#ffffff",
      },
    },
    plotOptions: {
      candlestick: {
        color: "#ff0000", // Bearish candlestick color
        upColor: "#008000", // Optionally define the bullish color
      },
    },
    series: [
      {
        type: "candlestick",
        name: `${(selectedCompany || "meta").toUpperCase()} Stock Price`,
        data: chartData,
        dataGrouping: {
          units: [
            ["week", [1]],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
        tooltip: {
          valueDecimals: 2,
        },
      },
      ...(showSMA && smaData.length
        ? [
            {
              type: "line",
              name: "10-day SMA",
              data: smaData,
              tooltip: {
                valueDecimals: 2,
              },
              color: "#FF0000",
              zIndex: 2,
            },
          ]
        : []),
    ],
    xAxis: {
      gridLineColor: "#cccccc",
    },
    yAxis: {
      gridLineColor: "#ced3db",
    },
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default CandlestickChart;
