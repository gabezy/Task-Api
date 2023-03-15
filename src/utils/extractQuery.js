export const extrartQuery = (query) => {
  const splittedQuery = query.substring(1).split("&");
  const params = splittedQuery.reduce((queryParams, params) => {
    const [key, value] = params.split("=");
    queryParams[key] = value;

    return queryParams;
  }, {});
  return params;
};
