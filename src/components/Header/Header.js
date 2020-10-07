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
        <Link onClick={handleLogout} to="/">
          Logout
        </Link>
      </div>
    );
  };

  const renderLoginButton = () => {
    return (
      <div className="loggedOutHeader">
        <Link className="createacc" to="/register-account">
          Create Account
        </Link>

        <Link className="login" to="/login">
          Log in
        </Link>
      </div>
    );
  };

  return (
    <nav className="header">
      <div className="left"></div>
      <div className="center">Trello</div>
      <div className="right">
        {TokenService.hasAuthToken()
          ? renderLogoutButton()
          : renderLoginButton()}
      </div>
    </nav>
  );
};

export default Header;
