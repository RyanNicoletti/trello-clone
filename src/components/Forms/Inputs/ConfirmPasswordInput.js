import React from "react";

const ConfirmPasswordInput = ({ value, handleChange }) => {
  return (
    <input
      id="registration-confirm-password"
      type="password"
      name="confirm-password"
      value={value}
      onChange={handleChange}
      required
    />
  );
};

export default ConfirmPasswordInput;
