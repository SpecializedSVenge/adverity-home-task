import _ from "lodash";

export const omitByKey = (data, iterator) =>
  _.mapValues(_.groupBy(data, iterator), clist =>
    clist.map(item => _.omit(item, iterator))
  );

export const groupByKey = (data, iterator) => _.groupBy(data, iterator);

const nest = (seq, keys) => {
  if (!keys.length) return seq;
  var first = keys[0];
  var rest = keys.slice(1);
  return _.mapValues(_.groupBy(seq, first), function(value) {
    return nest(value, rest);
  });
};

export const formatData = data => {
  const formattedData = nest(data, [
    item => item[0],
    item => item[1],
    item => item[2]
  ]);

  delete formattedData["undefined"];
  prepareFilterData(formattedData);
  return formattedData;
};

export const getDataSourses = data => {
  return Object.keys(nest(data, [item => item[1]])).filter(
    value => value !== "undefined"
  );
};

export const getCompanies = data => {
  return Array.from(
    new Set(
      Object.keys(nest(data, [item => item[2]])).map(
        data => data.split("-")[0].split("|")[0]
      )
    )
  );
};

export const prepareFilterData = (
  data,
  selectedDatasource = [],
  selectedCompanies = []
) => {
  const filteredObject = Object.entries(data).reduce((acc, curr) => {
    const date = curr[0];

    const filteredDatasource = selectedDatasource.length
      ? _.pick(curr[1], selectedDatasource)
      : curr[1];

    if (_.isEmpty(filteredDatasource)) return acc;

    const result = Object.values(filteredDatasource).reduce(
      (acc, curr) => {
        const filteredCompanies = selectedCompanies.length
          ? _.pickBy(curr, (_value, key) =>
              selectedCompanies.some(company => key.includes(company))
            )
          : curr;
        if (_.isEmpty(filteredCompanies)) return acc;

        Object.values(filteredCompanies).forEach(arr =>
          arr.forEach(i => {
            acc[0] += +i[3];
            acc[1] += +i[4];
          })
        );
        return acc;
      },
      [0, 0]
    );
    if (result) acc.push({ date, values: result });
    return acc;
  }, []);

  return filteredObject;
};
