import TokenService from "./token-service";
import config from "../config";

const listApiService = {
  async postList(listTitle, boardId) {
    try {
      const listInDb = await fetch(`${config.API_ENDPOINT}/lists`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ list_title: listTitle, board_id: boardId }),
      });
      return listInDb.json();
    } catch (error) {
      return console.log(error, "error posting new list");
    }
  },
  async getAllLists(boardId) {
    const res = await fetch(`${config.API_ENDPOINT}/lists?id=${boardId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    });
    return !res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json();
  },
  async deleteList(listId) {
    try {
      const res = await fetch(
        `${config.API_ENDPOINT}/lists/delete?id=${listId}`,
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
      return console.log(error, "error deleting list");
    }
  },
};

export default listApiService;
