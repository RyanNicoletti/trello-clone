import React from "react";

const ConfirmPasswordInput = ({ value, handleChange, placeholder }) => {
  return (
    <input
      id="registration-confirm-password"
      type="password"
      name="confirm-password"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="confirmpw-input"
      required
    />
  );
};

export default ConfirmPasswordInput;
