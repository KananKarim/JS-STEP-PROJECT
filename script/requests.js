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
        `There is a problem at fetching request: entity - ${entity}, method - ${method}!`
      );
    }
  });
};

export const addVisitor = (token, requestBody) =>
  sendRequest("", "POST", token, {
    body: JSON.stringify(requestBody),
  });

export const deleteVisitor = (visitId, token) =>
  sendRequest(visitId, "DELETE", token);

export const putVisitorsID = (visitId, token, requestBody) =>
  sendRequest(visitId, "PUT", token, {
    body: JSON.stringify(requestBody),
  });

export const getVisitors = (token) => sendRequest("", "GET", token);

export const getVisitorsID = (visitId, token) =>
  sendRequest(visitId, "GET", token);
