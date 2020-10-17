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

  const board = boards.find((board) => board.id + "" === boardId);

  useEffect(() => {
    async function fetchListsByBoardId() {
      const taskLists = await listApiService.getAllLists(boardId);
      setLists(taskLists);
    }
    fetchListsByBoardId();
  }, [boardId]);

  useEffect(() => {
    async function fetchBoardsByUserId() {
      const usersboards = await boardApiService.getAllBoards();

      setBoards(usersboards);
    }
    fetchBoardsByUserId();
  }, [setBoards]);

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
    const currentBoards = boards;
    boardApiService.deleteBoard(boardId).then((res) => {
      const boardsAfterDelete = currentBoards.filter(
        (board) => board.id !== boardId
      );
      setBoards(boardsAfterDelete);
      return res;
    });
  };

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
      <Link to="/homepage">
        <div className="delete-board" onClick={deleteBoard}>
          delete board
        </div>
      </Link>

      <div>{error && <span>{error.errorMessage}</span>}</div>
      <div className="board">
        {renderLists()}
        <form onSubmit={createNewList} className="task-list">
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
      </div>
    </div>
  );
};

export default BoardPage;
