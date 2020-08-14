import React from "react";

const AddBoard = (props) => {
  return (
    <div>
      <input
        type="text"
        value={props.name}
        onChange={props.onBoardNameChange}
      />
      <button type="button" onClick={props.onBoardAdd}>
        Add Board
      </button>
    </div>
  );
};

export default AddBoard;
