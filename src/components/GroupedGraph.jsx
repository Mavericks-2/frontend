import React, { useState, useEffect } from "react";
import LineGraphStyle from "../styles/LineGraphStyle.css";
import { Column } from "@ant-design/plots";

function GroupedGraph(props) {
  const { data, xField, yField, seriesField } = props;
  const [chartData, setChartData] = useState(data || []);

  useEffect(() => {
    if (!data) {
      asyncFetch();
    } else {
      setChartData(data);
    }
  }, [data]);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json"
    )
      .then((response) => response.json())
      .then((json) => setChartData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data: chartData,
    xField: xField || "月份",
    yField: yField || "月均降雨量",
    isGroup: true,
    seriesField: seriesField || "name",
    dodgePadding: 2,
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  return <Column {...config} />;
}

export default GroupedGraph;
