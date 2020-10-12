import React from "react";
import { Link } from "react-router-dom";

const BoardNotFoundPage = () => {
  return (
    <Content className="NotFoundPage">
      <h2>Page Not Found</h2>
      <p>
        Board deleted: <Link to={HomePage}>return to homepage</Link>
      </p>
    </Content>
  );
};

export default BoardNotFoundPage;
