import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import "./landingpage.css";
import landingPageImage from "../../trello-landing.jpeg";

const LandingPage = () => {
  return (
    <div className="hero">
      <div className="landing-flex-wrapper">
        <div className="landing-page-left">
          <h1 className="landing-page-header">
            Trello helps teams work more collaboratively and get more done.
          </h1>
          <p className="landing-page-text">
            Trello’s boards, lists, and cards enable teams to organize and
            prioritize projects in a fun, flexible, and rewarding way.
          </p>
        </div>
        <div className="landing-page-right">
          <img
            src={landingPageImage}
            alt="landing-page"
            className="landing-page-image"
          />
        </div>
      </div>
      <div className="button-flex-wrapper">
        <Link to="/register-account">
          <Button theme="sign-up">Sign up</Button>
        </Link>
        <Link to="Login">
          <Button theme="log-in">Log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
