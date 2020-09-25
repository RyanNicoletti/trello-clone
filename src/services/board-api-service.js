import TokenService from "./token-service";
import config from "../config";

const boardApiService = {
  postBoard(title) {
    return fetch(`${config.API_ENDPOINT}/boards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default boardApiService;
