import React from "react";
import logo from "../assets/images/logo2.png";

function About() {
  return (
    <div className="bgImage">
    <div className="container">
      <img src={logo} alt="GameVerse Logo" className="login-logo" />
      <h2>About GameVerse</h2>

      <div className="card">
        <p>
          <b>Project Description:</b> GameVerse is a neon-themed mini gaming website
          built using ReactJS. It includes multiple interactive games with live score tracking.
        </p>
        <p>
          <b>Games Included:</b> Number Guessing, Rock Paper Scissors, Tic Tac Toe, Memory Card Flip
        </p>
        <p><b>Technologies Used:</b> ReactJS, JavaScript, CSS</p>
        <br />
        <p><b>Developer Name:</b> Archi Hassani</p>
        <p><b>Roll No:</b> 24-BCA-3203</p>
        <p><b>Class:</b> TY BCA | Div-C</p>
      </div>
    </div>
    </div>
  );
}

export default About;