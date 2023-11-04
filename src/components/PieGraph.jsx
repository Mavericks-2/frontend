import React from 'react';
import LineGraphStyle from "../styles/LineGraphStyle.css";
import { Pie } from "@ant-design/charts";

function PieGraph(props) {
    const data = props.data ? props.data : [
        {
            type: "分类一",
            value: 27,
        },
        {
            type: "分类二",
            value: 25,
        },
        {
            type: "分类三",
            value: 18,
        },
        {
            type: "分类四",
            value: 15,
        },
        {
            type: "分类五",
            value: 10,
        },
        {
            type: "其他",
            value: 5,
        },
    ];

    const config = {
        appendPadding: 10,
        data: data,
        angleField: props.yField || "value",
        colorField: props.xField || "type",
        radius: 0.9,
        label: {
            type: "inner",
            offset: "-30%",
            content: function content(_ref) {
                var percent = _ref.percent;
                return "".concat((percent * 100).toFixed(0), "%");
            },
            style: {
                fontSize: 8,
                textAlign: "center",
            },
        },
        interactions: [{ type: "element-active" }],
    };

    return <Pie {...config} />;
}

export default PieGraph;