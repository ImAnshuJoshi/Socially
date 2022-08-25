import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext'
import { useState } from "react";
import axios from 'axios';

export default function Share() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc,setDesc]=useState("");
  const [file,setFile] = useState(null);

  const submitHandler = async (e) =>{
    e.preventDefault();
     const newPost={
      userId:user._id,
      desc:desc
     }

     if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:8800/api/upload", data);
        // window.location.reload();
      } catch (err) {}
    }
    else{
      console.log("No file chosen");
    }
     try{
      await axios.post('http://localhost:8800/api/posts/',newPost);
     }
     catch(err){
        console.log(err);
     }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture: PF+"person/noavatar.png"} alt="" />
          <input
            placeholder={"What's in your mind "+user.username+"?"}
            onChange={(e)=>{setDesc(e.target.value)}}
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{setFile(e.target.files[0])}}></input>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
