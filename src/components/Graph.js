import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1"
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          drawOnArea: false
        }
      }
    ],
    xAxes: [
      {
        type: "time",
        distribution: "series"
      }
    ]
  }
};

const Graph = ({ data, headerText }) => (
  <>
    <div className="header">
      <h4 className="title">{headerText}</h4>
    </div>
    <Line data={data} options={options} />
  </>
);

export default Graph;
