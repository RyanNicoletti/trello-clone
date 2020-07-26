import React, { useState } from "react";
import Button from "./Button";

const HomePage = () => {
  const [displayBoardTitleInput, setBoardTitleInput] = useState(false);

  if (!displayBoardTitleInput) {
    return (
      <div>
        <h1>My Projects</h1>

        <button onClick={() => setBoardTitleInput(true)}>
          Add new board
        </button>

        <ul>
          <li></li>
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h1>My Projects</h1>
      <button onClick={() => setBoardTitleInput(false)}>
        Add new board
      </button>
      <label htmlFor="new-board-title">Board Title: </label>
      <input type="text"></input>
      <label htmlFor="create-board">Create Board</label>
      <button>create board</button>

      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default HomePage;
