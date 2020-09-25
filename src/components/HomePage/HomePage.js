import React, { useState } from "react";
import boardApiService from "../../services/board-api-service";
import "./homepage.css";

const HomePage = () => {
  const [title, setBoardTitle] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });

  const createBoard = (e) => {
    e.preventDefault();
    boardApiService.postBoard(title);
  };

  return (
    <div>
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
      <div>{error && <span>{error.errorMessage}</span>}</div>
    </div>
  );
};

export default HomePage;
