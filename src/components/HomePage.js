import React, { useState } from "react";
import BoardList from "./BoardList";
import AddBoard from "./AddBoard";

const HomePage = () => {
  const initialBoardList = [];
  const [displayBoardTitleInput, setBoardTitleInput] = useState(false);
  const [boards, updateBoardList] = useState(initialBoardList);
  const [boardName, updateBoardName] = useState("");

  const handleBoardNameChange = (e) => {
    updateBoardName(e.target.value);
  };

  const addBoard = () => {
    const newBoardList = boards.concat({ name: boardName });
    updateBoardList(newBoardList);
    updateBoardName("");
  };

  return !displayBoardTitleInput ? (
    <div>
      <h1>My Projects</h1>

      <button onClick={() => setBoardTitleInput(true)}>
        Create new board
      </button>

      <BoardList boards={boards} />
    </div>
  ) : (
    <div>
      <h1>My Projects</h1>
      <button onClick={() => setBoardTitleInput(false)}>
        Create new board
      </button>
      <AddBoard
        name={boardName}
        onBoardNameChange={handleBoardNameChange}
        onBoardAdd={addBoard}
      />

      <BoardList boards={boards} />
    </div>
  );
};

export default HomePage;
