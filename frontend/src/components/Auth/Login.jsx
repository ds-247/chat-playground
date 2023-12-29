import React, { useState } from "react";
import { login } from "../../services/authService";
import Joi from 'joi-browser';
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async() => {
    const errors = validate();
    setValidationErrors(errors || {});
    if (errors) return;

    // Implement your login logic here
    try {
      await login(formData.username, formData.password);
      window.location = '/';
    } catch (error) {
      console.log("error while logging in the user")
    }
  };

  const handleRegister = () => {
    window.location = "/register";
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input-field"
          />
          {validationErrors.username && (
            <small className="error-message">{validationErrors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input-field"
          />
          {validationErrors.password && (
            <small className="error-message">{validationErrors.password}</small>
          )}
        </div>

        <div className="form-button-group">
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>

          <button
            type="button"
            onClick={handleRegister}
            className="register-button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
