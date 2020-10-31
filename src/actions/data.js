import axios from "axios";
import Papa from "papaparse";
import {
  formatData,
  getDataSourses,
  getCompanies,
  prepareFilterData
} from "../utils/util.js";

export const getDataFromCsv = async store => {
  try {
    store.setState({ isLoading: true });
    const response = await axios.get("./data.csv");
    var results = Papa.parse(response.data);

    if (results.errors.length === 0) {
      const data = results.data.slice(1);
      const formattedData = formatData(data);

      store.setState({
        data: formattedData,
        dataSource: getDataSourses(data),
        filteredData: prepareFilterData(formattedData),
        campaingns: getCompanies(data)
      });
    } else {
      store.setState({ isError: true });
    }
    store.setState({ isLoading: false });
  } catch (error) {
    store.setState({ isError: true });
  }
};
