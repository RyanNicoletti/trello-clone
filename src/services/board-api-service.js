import TokenService from "./token-service";
import config from "../config";

const boardApiService = {
  async postBoard(title) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/boards`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
          title,
        }),
      });
      return !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json();
    } catch (error) {
      return console.log(error, "error posting new board");
    }
  },
  async getAllBoards() {
    const res = await fetch(`${config.API_ENDPOINT}/boards`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    });
    return !res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json();
  },
};

export default boardApiService;
