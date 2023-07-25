// requests.js
const linkAPI = "https://ajax.test-danit.com/api/v2/cards/";

const sendRequest = async (entity = "", method = "GET", token, config) => {
  return await fetch(`${linkAPI}${entity}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...config,
  }).then((response) => {
    if (response.ok) {
      if (method !== "DELETE") {
        return response.json();
      } else {
        return response;
      }
    } else {
      return new Error(
        `Something went wrong with fetch request: entity - ${entity}, method - ${method}!`
      );
    }
  });
};

export const createNewVisit = (token, requestBody) =>
  sendRequest("", "POST", token, {
    body: JSON.stringify(requestBody),
  });

export const deleteVisit = (visitId, token) =>
  sendRequest(visitId, "DELETE", token);

export const editVisitById = (visitId, token, requestBody) =>
  sendRequest(visitId, "PUT", token, {
    body: JSON.stringify(requestBody),
  });

export const getAllVisits = (token) => sendRequest("", "GET", token);

export const getVisitById = (visitId, token) =>
  sendRequest(visitId, "GET", token);
