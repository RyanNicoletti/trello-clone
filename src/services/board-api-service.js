import TokenService from "./token-service";
import config from "../config";

const boardApiService = {
  postBoard(title) {
    return fetch(`${config.API_ENDPOINT}/boards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => {
        return !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .catch((error) => console.log(error, "error posting new board"));
  },
  getAllBoards() {
    return fetch(`${config.API_ENDPOINT}/boards`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      return !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json();
    });
  },
};

export default boardApiService;
