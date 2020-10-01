import TokenService from "./token-service";
import config from "../config";

const listApiService = {
  async postList(listTitle) {
    try {
      const listInDb = await fetch(`${config.API_ENDPOINT}/lists`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ listTitle }),
      });
      return listInDb.json();
    } catch (error) {
      return console.log(error, "error posting new list");
    }
  },
};

export default listApiService;
