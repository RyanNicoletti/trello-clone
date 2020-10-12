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
        body: JSON.stringify({ title, list_id: listId }),
      });
      const task = await res.json();
      return task;
    } catch (err) {
      console.log(err);
    }
  },
  async getAllTasks(listId) {
    const res = await fetch(
      `${config.API_ENDPOINT}/tasks?listid=${listId}`,
      {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    );
    return res.json();
  },
};

export default taskApiService;
