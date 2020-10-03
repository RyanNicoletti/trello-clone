import React, { useState } from "react";
import listApiService from "../services/list-api-service";

const BoardPage = () => {
  const [listTitle, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [error, setErrorMessage] = useState({ errorMessage: null });

  const boardId = window.location.pathname.split("/").pop();

  const createNewList = (e) => {
    e.preventDefault();
    listApiService
      .postList(listTitle, boardId)
      .then((list) => {
        setLists((lists) => [...lists, list]);
      })
      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
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
        <button type="submit">Add list</button>
      </form>
      <div>{error && <span>{error.errorMessage}</span>}</div>

      <div className="list-container">
        {lists.map((list) => (
          <div key={list.id}>{list.list_title}</div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
