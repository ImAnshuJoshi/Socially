import "./register.css";
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Register() {

  const [username,setUsername]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  const handleClick=async (e)=>{
    e.preventDefault();

    if(password!==passwordAgain){
      // password.current.setCustomValidity("Passwords dont match!");
      console.log("Passwords dont match");
    } 
    else{
      const user= {
        username,
        email,password,
      }
      try{
        console.log('hi axios')
        await axios.post('http://localhost:8800/api/auth/register',user);
        navigate("/login");
        console.log('hi');
        console.log(user);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <form action="" onSubmit={handleClick}>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput"  value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <input placeholder="Email" className="loginInput" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder="Password" className="loginInput" type="password" minLength="6" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <input placeholder="Password Again" type="password" className="loginInput" value={passwordAgain} onChange={(e)=>{setPasswordAgain(e.target.value)}}/>
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
