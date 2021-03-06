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
      console.log(err, "error posting task");
    }
  },
  async getAllTasks(listId) {
    try {
      const res = await fetch(
        `${config.API_ENDPOINT}/tasks?listid=${listId}`,
        {
          headers: {
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }
      );
      return res.json();
    } catch (error) {
      console.log(error, "error fetching tasks");
    }
  },
  async deleteTask(taskId) {
    try {
      const res = await fetch(
        `${config.API_ENDPOINT}/tasks/delete?id=${taskId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }
      );
      if (res.status === 204) {
        return Promise.resolve(undefined);
      }
    } catch (error) {
      return console.log(error, "error deleting task");
    }
  },
};

export default taskApiService;
