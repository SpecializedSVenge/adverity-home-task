import React from "react";
import globalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  data: [],
  filteredData: [],
  campaingns: [],
  selectedCompanies: [],
  dataSource: [],
  selectedDatasource: [],
  isError: false,
  isLoading: false
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;
