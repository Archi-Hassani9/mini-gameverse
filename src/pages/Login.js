import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    setFormValid(isValid);
  }, [username, password]);

  const handleLogin = () => {
    if (!formValid) {
      return;
    }

    if (username === "admin" && password === "12345678") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-box">
      <img src={logo} alt="GameVerse Logo" className="login-logo" />
      <h2>Welcome to GameVerse</h2>
      <p>Enter your credentials to start playing</p>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {usernameError && <p className="error-text">{usernameError}</p>}

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <p className="error-text">{passwordError}</p>}

      <div>
      <button onClick={handleLogin} disabled={!formValid}>
        Login
      </button>
      </div>
    </div>
  );
}

export default Login;