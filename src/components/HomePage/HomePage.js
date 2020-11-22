import React, { useEffect, useState } from "react";
import boardApiService from "../../services/board-api-service";
import "./homepage.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fetchBoards, {
  fetchBoardsSuccess,
} from "../../redux/boards/boards.actions";

const HomePage = () => {
  const [title, setBoardTitle] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });
  const boardsData = useSelector((state) => state.usersBoards);
  const dispatch = useDispatch();

  // fetch all boards based on logged in users' id
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const createBoard = (e) => {
    e.preventDefault();
    boardApiService
      .postBoard(title)
      .then((board) => ({
        boardsData: [...boardsData.boards, board],
      }))
      .then((boards) => {
        dispatch(fetchBoardsSuccess(boards.boardsData));
        setBoardTitle("");
      })

      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
  };

  return boardsData.loading ? (
    <h2>Loading...</h2>
  ) : boardsData.error ? (
    <h2>{boardsData.error}</h2>
  ) : (
    <div className="home-page">
      <div className="board-container">
        {boardsData &&
          boardsData.boards &&
          boardsData.boards.map((board) => (
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

      <div className="error-message-wrapper">
        {error && (
          <span className="error-message">{error.errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default HomePage;
