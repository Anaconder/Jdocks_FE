import React from "react";
import "../styles/Login.css";

export default function Login() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="../index.html">
              <img src="../images/home.png" alt="home icon" />
              Home
            </a>
          </li>

          <li className="search-wrapper">
            <form id="search-bar">
              <input type="text" name="q" placeholder="Search" />
              <button type="submit">
                <img src="../images/search-icon.png" alt="search icon" />
              </button>
            </form>
          </li>

          <li>
            <a href="#">
              <img src="../images/Qoute.png" alt="document icon" />
              Quote
            </a>
          </li>
          <li>
            <a href="./Inventory.html">
              <img src="../images/Inventory.png" alt="Inventory icon" />
              Inventory
            </a>
          </li>
          <li>
            <a href="./Login.html">
              <img src="../images/usericon-small.png" alt="user icon" />
              Log In
            </a>
          </li>
        </ul>
      </nav>

      <form id="lform">
        <fieldset>
          <div style={{ textAlign: "center" }}>
            <img src="../images/user icon.png" alt="User Icon" />
          </div>
          <h1>Login</h1>

          <label htmlFor="Email" className="subhead">
            Email Address
            <input
              className="textIn"
              type="text"
              name="UserName"
              id="Email"
              placeholder="example@123.com"
            />
          </label>

          <br />

          <label htmlFor="Password" className="subhead">
            Password
            <input
              className="textIn"
              type="password"
              placeholder="Password"
              id="Password"
            />
          </label>

          <br />

          <div id="bottombox">
            <label htmlFor="checkbox">
              Remember me
              <input type="checkbox" name="checkbox" id="checkbox" />
            </label>
            <a href="">Forgot Password</a>
          </div>

          <br />

          <input type="submit" value="Login" id="Login" />
        </fieldset>
      </form>
    </>
  );
}
