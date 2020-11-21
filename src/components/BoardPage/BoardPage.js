import React, { useState, useEffect } from "react";
import listApiService from "../../services/list-api-service";
import "./boardpage.css";
import TaskList from "../TaskList/TaskList";
import boardApiService from "../../services/board-api-service";
import { Link, useParams } from "react-router-dom";

const BoardPage = ({ setBoards, boards }) => {
  const { boardId } = useParams();
  const [listTitle, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [error, setErrorMessage] = useState({ errorMessage: null });

  // find board by matching board id in the database to board id in params
  const board = boards.find((board) => board.id + "" === boardId);

  // fetch all lists based on the boards id
  useEffect(() => {
    async function fetchListsByBoardId() {
      const taskLists = await listApiService.getAllLists(boardId);
      setLists(taskLists);
    }
    fetchListsByBoardId();
  }, [boardId]);

  // fetch all boards based on users ID and update state to equal the logged in users boards
  useEffect(() => {
    async function fetchBoardsByUserId() {
      const usersboards = await boardApiService.getAllBoards();

      setBoards(usersboards);
    }
    fetchBoardsByUserId();
  }, [setBoards]);

  // send post request to the server to create new list and add the new list to UI
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

  // send delete request to server to delete board based on this boards id
  const deleteBoard = async () => {
    const currentBoards = boards;
    const res = await boardApiService.deleteBoard(boardId);
    const boardsAfterDelete = currentBoards.filter(
      (board) => board.id !== boardId
    );
    window.location = "/homepage";
    return setBoards(boardsAfterDelete);
  };

  // render lists on board page
  const renderLists = () => {
    return lists.map((list) => (
      <TaskList
        taskList={list}
        listArray={lists}
        key={list.id}
        updateLists={setLists}
      />
    ));
  };

  return (
    <div className="boardpage">
      <div className="board-header">{board?.title}</div>
      <div className="delete-board" onClick={deleteBoard}>
        Delete board
      </div>

      <div>{error && <span>{error.errorMessage}</span>}</div>
      <div className="board-lists">
        {renderLists()}
        <form onSubmit={createNewList} className="task-list">
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
          <button className="add-list-button" type="submit">
            Add a list
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardPage;
