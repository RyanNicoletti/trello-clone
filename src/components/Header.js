import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";

const Header = () => {
  const handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallback();
    IdleService.clearCallbackEvents();
  };

  const renderLogoutButton = () => {
    return (
      <div className="loggedInHeader">
        <Link onClick={handleLogout()} to="/">
          Logout
        </Link>
      </div>
    );
  };

  const renderLoginButton = () => {
    return (
      <div className="loggedOutHeader">
        <Link to="/register-account">Create Account</Link>
        <Link to="/login">Log in</Link>
      </div>
    );
  };

  return (
    <nav className="header">
      {TokenService.hasAuthToken()
        ? renderLogoutButton()
        : renderLoginButton()}
    </nav>
  );
};

export default Header;
