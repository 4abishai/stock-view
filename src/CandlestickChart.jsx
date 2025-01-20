import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import stockData from "./data/stockData.js";

Highcharts.setOptions({
  lang: {
    rangeSelectorFrom: 'From',
    rangeSelectorTo: 'To'
  }
});

const CandlestickChart = ({ selectedCompany, showSMA, smaDays }) => {
  const [chartData, setChartData] = useState(stockData.meta);
  const [smaData, setSmaData] = useState([]);

  useEffect(() => {
    setChartData(stockData[selectedCompany]);
  }, [selectedCompany]);

  useEffect(() => {
    if (showSMA && smaDays > 0) {
      const sma = calculateSMA(chartData, smaDays);
      setSmaData(sma);
    } else {
      setSmaData([]);
    }
  }, [chartData, showSMA, smaDays]);

  const calculateSMA = (data, period) => {
    if (!data || data.length < period) return [];

    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const avg = slice.reduce((sum, point) => sum + point[4], 0) / period;
      sma.push([data[i][0], avg]);
    }
    return sma;
  };

  const options = {
    chart: {
      backgroundColor: "#fff",
      height: 600,
    },
    rangeSelector: {
      inputPosition: {
        align: "left",
        x: 0,
        y: 0,
      },
      buttonPosition: {
        align: "right",
        x: 0,
        y: 0,
      },
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1 M",
        },
        {
          type: "month",
          count: 3,
          text: "3 M",
        },
        {
          type: "month",
          count: 6,
          text: "6 M",
        },
        {
          type: "year",
          count: 1,
          text: "1 Yr",
        },
        {
          type: "all",
          text: "All",
        },
      ],
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
        color: "#7c7c7c",
      },
    },
    plotOptions: {
      candlestick: {
        color: "#ff0000",
        upColor: "#008000",
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
              name: `${smaDays}-day SMA`,
              data: smaData,
              tooltip: {
                valueDecimals: 2,
              },
              zIndex: 2,
              color: "#ebd534",
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