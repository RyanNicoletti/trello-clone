import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./header.css";

const Header = () => {
  const handleLogout = () => {
    TokenService.clearAuthToken();
    window.location = "/";
    TokenService.clearCallback();
    IdleService.clearCallbackEvents();
  };

  const renderLogoutButton = () => {
    return (
      <div className="loggedInHeader">
        <h1 className="header-middle">
          <Link to="/homepage">Trello Clone</Link>
        </h1>
        <div id="header-right-out" className="header-right">
          <Link className="logout" onClick={handleLogout} to="/">
            Log out
          </Link>
        </div>
      </div>
    );
  };

  const renderLoginButton = () => {
    return (
      <div className="loggedOutHeader">
        <h1 className="header-middle">Trello Clone</h1>
        <div className="header-right">
          <Link className="createacc" to="/register-account">
            Create Account
          </Link>

          <Link className="login" to="/login">
            Log in
          </Link>
        </div>
      </div>
    );
  };

  // conditionally render log in or log out button based on whether user has an auth token
  return (
    <nav className="header">
      {TokenService.hasAuthToken()
        ? renderLogoutButton()
        : renderLoginButton()}
    </nav>
  );
};

export default Header;
