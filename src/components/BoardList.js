import React from "react";
import { Link } from "react-router-dom";

const BoardList = (props) => {
  return (
    <ul>
      {props.boards.map((board) => (
        // board.id is coming from the back end
        <li key={board.id}>
          {board.name}
          {/* <Link to={"project-board/" + board.id}>{board.name}</Link> */}
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
