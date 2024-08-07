import makeRequest from "../httpClient";

export const AppealService = {
  getAll(params) {
    return makeRequest({
      url: "/appeals/v1.0/appeals/",
      method: "GET",
      params,
    });
  },
  create(data) {
    return makeRequest({
      url: "/appeals/v1.0/appeals/",
      method: "POST",
      data,
    });
  },
};
