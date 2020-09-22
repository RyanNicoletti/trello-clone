import React from "react";
import "./column.css";

const Column = ({ title }) => {
  return (
    <div className="column-wrapper">
      <div className="column">
        <header className="col-title">{title}</header>
      </div>
    </div>
  );
};

export default Column;
