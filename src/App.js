import React, { useEffect } from "react";
import "./App.css";
import useGlobal from "./store";
import Dashboard from "./components/Dashboard";
import FilterPanel from "./components/FilterPanel";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6 30%, #FFF 77%);",
    display: "flex"
  },

  spinner: {
    position: "fixed",
    left: "50%",
    top: "20%"
  }
});
const App = () => {
  const [globalState, globalActions] = useGlobal();
  const classes = useStyles();

  useEffect(() => {
    globalActions.data.getDataFromCsv();
  }, []);
  return (
    <div className={classes.root}>
      {globalState.isError && <h1> Some error happen</h1>}
      <FilterPanel />
      <Dashboard />
      {globalState.isLoading && (
        <CircularProgress className={classes.spinner} />
      )}
    </div>
  );
};

export default App;
