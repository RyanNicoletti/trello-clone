import React from "react";

const PasswordInput = ({ value, handleChange }) => {
  return (
    <input
      id="registration-password"
      type="password"
      name="password"
      value={value}
      onChange={handleChange}
      required
    />
  );
};

export default PasswordInput;
