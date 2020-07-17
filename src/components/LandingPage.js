import React from "react";
import Button from "./Button";

const LandingPage = () => {
  return (
    <React.Fragment>
      <h1 className="landing-page-header">Trello Clone</h1>
      <h3>Trello Clone: project manager build with React</h3>
      <h5>Create project boards and prioritize tasks.</h5>
      <Button theme="sign-up-button">Create account</Button>
      <Button theme="Login-button">Log in</Button>
    </React.Fragment>
  );
};

export default LandingPage;
