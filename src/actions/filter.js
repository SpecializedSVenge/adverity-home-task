import { prepareFilterData } from "../utils/util.js";

export const changeFilter = (store, filterData) => {
  const data = store.state.data;

  store.setState({
    selectedCompanies: filterData.selectedCompanies,
    selectedDatasource: filterData.selectedDatasource,
    filteredData: prepareFilterData(
      data,
      filterData.selectedDatasource,
      filterData.selectedCompanies
    )
  });
};
