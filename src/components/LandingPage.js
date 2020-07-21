import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="landing-page-header">Trello Clone</h1>
      <h3>Trello Clone: project manager build with React</h3>
      <h5>Create project boards and prioritize tasks.</h5>
      <Link to="/register-account">
        <Button theme="sign-up-button">Sign up</Button>
      </Link>
      <Link to="Login">
        <Button theme="Login-button">Log in</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
