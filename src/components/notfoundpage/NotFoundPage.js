import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="board-not-found">
      <h2>Page Not Found</h2>
      <p>
        Board deleted: <Link to="/homepage">return to homepage</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
