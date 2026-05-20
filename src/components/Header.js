import React from "react";
import logo from "../assets/images/logo2.png";

function Header({ setPage, setIsLoggedIn }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="GameVerse Logo" className="logo-img" />
        <h2>Mini GameVerse</h2>
      </div>
      <div>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("scoreboard")}>Scoreboard</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>
    </div>
  );
}
export default Header;