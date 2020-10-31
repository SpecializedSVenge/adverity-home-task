import React from "react";
import useGlobal from "../store";
import Graph from "./Graph";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  graph: {
    display: "flex",
    flex: 2,
    flexDirection: "column"
  }
});

const buildData = data => {
  if (!data) return {};

  return {
    datasets: [
      {
        label: "Clicks",
        data: data.reduce((acc, item) => {
          if (!item.values[0]) return acc;
          acc.push({
            t: moment(item.date, "DD.MM.YYYY").toDate(),
            y: item.values[0]
          });
          return acc;
        }, []),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y-axis-1"
      },
      {
        label: "Impressions",
        data: data.reduce((acc, item) => {
          if (!item.values[1]) return acc;
          acc.push({
            t: moment(item.date, "DD.MM.YYYY").toDate(),
            y: item.values[1]
          });
          return acc;
        }, []),
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-2"
      }
    ]
  };
};
const buildHeaderText = (companies, dataSource) => {
  const dataSourceText = dataSource.length
    ? `Datasource "${dataSource.join(",")}"`
    : "All Datasource";
  const companiesText = companies.length
    ? `Campaingns  "${companies.join(",")}"`
    : "All Campaingns";

  return `${dataSourceText}; ${companiesText}`;
};
const Dashboard = () => {
  const [globalState] = useGlobal();
  const classes = useStyles();

  const graphData = buildData(globalState.filteredData);
  const headerText = buildHeaderText(
    globalState.selectedCompanies,
    globalState.selectedDatasource
  );
  return (
    <div className={classes.graph}>
      <Graph data={graphData} headerText={headerText} />
    </div>
  );
};

export default Dashboard;
