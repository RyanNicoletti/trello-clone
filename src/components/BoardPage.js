import React, { useState } from "react";
import listApiService from "../services/list-api-service";

const BoardPage = () => {
  const [listTitle, setListName] = useState("");
  const [lists, setLists] = useState([]);

  const createNewList = (e) => {
    e.preventDefault();
    listApiService
      .postList(listTitle)
      .then((list) => setLists((lists) => [...lists, list]));
  };

  return (
    <div>
      <form onSubmit={createNewList}>
        <label htmlFor="list-title">Add a list: </label>
        <input
          id="list-title"
          type="text"
          name="list-title"
          value={listTitle}
          onChange={(e) => setListName(e.target.value)}
          required
          autoComplete="off"
          placeholder="Enter list title..."
        ></input>
      </form>
      <button type="submit">Add list</button>
      <div>{lists}</div>
    </div>
  );
};

export default BoardPage;
