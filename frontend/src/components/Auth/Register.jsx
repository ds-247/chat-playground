import React, { useState } from "react";
import Joi from "joi-browser";
import { register } from "../../services/userService";
import auth from "../../services/authService";
import "./login.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const schema = {
    name: Joi.string().min(5).required().label("Name"),
    username: Joi.string().min(3).required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
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

  const handleLogin = () => {
    window.location = "/login";
  };

  const handleRegister = async () => {
    const errors = validate();
    setValidationErrors(errors || {});
    if (errors) return;

    try {
      const res = await register(formData);
      if (res.status.toString() === "200") {
        auth.loginWithJwt(res.headers["x-auth-token"]);
        window.location = "/"
      }
    } catch (error) {
      console.log("error while registering the user");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Registeration Form</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input-field"
          />
          {validationErrors.name && (
            <small className="form-error-mssg">{validationErrors.name}</small>
          )}
        </div>

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
            <small className="form-error-mssg">
              {validationErrors.username}
            </small>
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
            <small className="form-error-mssg">
              {validationErrors.password}
            </small>
          )}
        </div>

        <div className="form-button-group">
          <button
            type="button"
            onClick={handleRegister}
            className="register-button"
          >
            Register
          </button>
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
