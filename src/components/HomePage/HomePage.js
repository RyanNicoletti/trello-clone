import React, { useEffect, useState } from "react";
import boardApiService from "../../services/board-api-service";
import "./homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [title, setBoardTitle] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoardsByUserId() {
      const usersboards = await boardApiService.getAllBoards();
      setBoards(usersboards);
    }
    fetchBoardsByUserId();
  }, []);

  const createBoard = (e) => {
    e.preventDefault();
    boardApiService
      .postBoard(title)
      .then((board) => {
        setBoards((boards) => [...boards, board]);
      })
      .then(() => setBoardTitle(""))

      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
  };

  return (
    <div className="home-component-wrapper">
      <div className="boards-wrapper">
        <div className="board-container">
          {boards.map((board) => (
            <Link
              className="project-board"
              key={board.id}
              to={`/boardpage/${board.id}`}
            >
              <div className="board-title">{board.title}</div>
            </Link>
          ))}
        </div>
        <form className="createBoardForm" onSubmit={createBoard}>
          <label htmlFor="boardTitle">Board title</label>
          <input
            required
            name="title"
            type="text"
            id="boardTitle"
            value={title}
            onChange={(e) => setBoardTitle(e.target.value)}
          ></input>
          <button type="submit">Create new board</button>
        </form>
      </div>

      <div>{error && <span>{error.errorMessage}</span>}</div>
    </div>
  );
};

export default HomePage;
