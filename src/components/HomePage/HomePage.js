import React from "react";
import Column from "../Column/Column";
import "./homepage.css";

const HomePage = () => {
  return (
    <div className="column-container">
      <Column title="Open"></Column>
      <Column title="In Progress"></Column>
      <Column title="In Review"></Column>
      <Column title="Complete"></Column>
    </div>
  );
};

export default HomePage;
