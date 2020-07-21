import React, { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "@/components";

const RegistrationForm = () => {
  const [email, setEmail] = setState("");
  const [password, setPassword] = setState("");
  const [confirmPassword, setConfirmPassword] = setState("");

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-group">
          <div>
            <label htmlFor="registration-email">Email</label>
          </div>
          <EmailInput
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="registration-password">Password</label>
          </div>
          <PasswordInput
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div classname="form-group">
          <div>
            <label htmlFor="registration-confirmPassword">
              Confirm Password
            </label>
          </div>
          <ConfirmPasswordInput
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </fieldset>
      <Button theme="registration-button">Create Account</Button>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </form>
  );
};

export default RegistrationForm;
