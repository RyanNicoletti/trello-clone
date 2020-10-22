import React, { useState } from "react";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import Button from "../Button";
import ConfirmPasswordInput from "./Inputs/ConfirmPasswordInput";
import { Link } from "react-router-dom";
import authApiService from "../../services/auth-api-service";
import "./registrationform.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email: email, password: password };
      const res = await authApiService.postUser(user);
      window.location = "/homepage";
      console.log(res);
    } catch (res) {
      return setErrorMessage({ errorMessage: res.error });
    }
  };

  return (
    <div className="registration-page">
      <form onSubmit={handleSubmit}>
        <div className="registration-flex-container">
          <h1 className="registration-header">Sign up for your account</h1>
          <div className="form-group">
            <EmailInput
              value={email}
              handleChange={(e) => {
                setEmail(e.target.value);
              }}
              placeHolder="Enter email"
            />
            <div>{error && <span>{error.errorMessage}</span>}</div>
          </div>

          <div className="form-group">
            <PasswordInput
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
            />
          </div>

          <div className="form-group">
            <ConfirmPasswordInput
              value={confirmPassword}
              handleChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          <Button theme="registration-button" type="submit">
            Sign Up
          </Button>
          <div>
            <Link to="/login" className="route-to-login">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
