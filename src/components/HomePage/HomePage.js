import React, { useEffect, useState } from "react";
import boardApiService from "../../services/board-api-service";
import "./homepage.css";
import { Link } from "react-router-dom";

const HomePage = ({ setBoards, boards }) => {
  const [title, setBoardTitle] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });

  // fetch all boards based on logged in users' id
  useEffect(() => {
    async function fetchBoardsByUserId() {
      const usersboards = await boardApiService.getAllBoards();
      setBoards(usersboards);
    }
    fetchBoardsByUserId();
  }, [setBoards]);

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
    <div className="home-page">
      <div className="board-container">
        {boards?.map((board) => (
          <Link
            className="board-card"
            key={board.id}
            to={`/boardpage/${board.id}`}
          >
            <p className="board-title">{board.title}</p>
          </Link>
        ))}
        <form className="create-board-form" onSubmit={createBoard}>
          <input
            required
            placeholder="Add board title"
            name="title"
            type="text"
            id="board-title"
            value={title}
            onChange={(e) => setBoardTitle(e.target.value)}
          ></input>
          <button className="add-board-btn" type="submit">
            Create new board
          </button>
        </form>
      </div>

      <div>{error && <span>{error.errorMessage}</span>}</div>
    </div>
  );
};

export default HomePage;
