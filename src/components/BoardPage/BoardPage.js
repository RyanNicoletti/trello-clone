import React, { useState, useEffect } from "react";
import listApiService from "../../services/list-api-service";
import "./boardpage.css";
import TaskList from "../TaskList/TaskList";

const BoardPage = () => {
  const [listTitle, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [error, setErrorMessage] = useState({ errorMessage: null });
  const boardId = window.location.pathname.split("/").pop();

  useEffect(() => {
    async function fetchListsByBoardId() {
      const taskLists = await listApiService.getAllLists(boardId);
      setLists(taskLists);
    }
    fetchListsByBoardId();
  }, [boardId]);

  const createNewList = (e) => {
    e.preventDefault();
    listApiService
      .postList(listTitle, boardId)
      .then((list) => {
        setLists((lists) => [...lists, list]);
        setListName("");
      })
      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
  };

  const deleteBoard = () => {
    console.log("deleted board");
  };

  return (
    <div className="boardpage-container">
      <div className="delete-board" onClick={deleteBoard}>
        delete board
      </div>
      <form onSubmit={createNewList}>
        <label htmlFor="listTitle">Add a list: </label>
        <input
          id="listTitle"
          type="text"
          name="listTitle"
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
          <TaskList
            taskList={list}
            listArray={lists}
            key={list.id}
            updateLists={setLists}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
