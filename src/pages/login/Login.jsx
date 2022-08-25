import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apicalls";
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext.js'
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user,isFetching,dispatch} = useContext(AuthContext);  

    const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email, password: password},
      dispatch
    );
      console.log(email, password);
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocioFolio</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocioFolio.
          </span>
        </div>
        <div className="loginRight">
    <form action="" 
    onSubmit={handleClick}
    >
          <div className="loginBox">
            <input placeholder="Email" type="email" value={email} onChange={e=> setEmail(e.target.value) }required className="loginInput" />
            <input placeholder="Password" type="password" required value={password} onChange={e=> setPassword(e.target.value)}className="loginInput" />
            <button className="loginButton" disabled={isFetching} type="submit">{isFetching ?"Loading":"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
    </form>
        </div>
      </div>
    </div>
  );
}
