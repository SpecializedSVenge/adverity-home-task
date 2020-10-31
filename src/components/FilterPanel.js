import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

import useGlobal from "../store";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-evenly",
    marginRight: 40
  },
  title: {
    alignSelf: "center"
  }
}));

const FilterPanel = () => {
  const classes = useStyles();

  const [globalState, globalActions] = useGlobal();

  const { campaingns, dataSource } = globalState;

  const [selectedDatasource, setDatasourse] = React.useState([]);

  const [selectedCompanies, setCompanies] = React.useState([]);

  const [applyDisable, setApplyDisable] = React.useState(true);

  const handleChangeDatasourse = event => {
    setDatasourse(event.target.value);
    setApplyDisable(false);
  };

  const handleChangeCompanies = event => {
    setCompanies(event.target.value);
    setApplyDisable(false);
  };

  const handleApplyClick = () => {
    globalActions.filter.changeFilter({
      selectedCompanies,
      selectedDatasource
    });

    setApplyDisable(true);
  };

  return (
    <div className={classes.panel}>
      <h4 className={classes.title}>Filter dimension value</h4>

      <FormControl className={classes.formControl}>
        <InputLabel id="data-sourses-label">Data Sourse</InputLabel>
        <Select
          labelId="data-sourses-label"
          id="data-sourses"
          multiple
          value={selectedDatasource}
          onChange={handleChangeDatasourse}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {dataSource.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="companies-label">Campaingns</InputLabel>
        <Select
          labelId="companies-label"
          id="companies"
          multiple
          value={selectedCompanies}
          onChange={handleChangeCompanies}
          input={<Input />}
        >
          {campaingns.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        disabled={applyDisable}
        onClick={handleApplyClick}
      >
        Apply
      </Button>
    </div>
  );
};

export default FilterPanel;
