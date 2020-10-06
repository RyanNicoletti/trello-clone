import TokenService from "./token-service";
import config from "../config";

const taskApiService = {
  async postTask(title, listId) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/tasks`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, listId }),
      });
      const task = await res.json();
      return task;
    } catch (err) {
      console.log(err);
    }
  },
};

export default taskApiService;
