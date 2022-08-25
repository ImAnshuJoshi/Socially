import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios';
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext.js'

export default function Feed({username}) {
  const [posts , setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(async ()=>{
    const FetchPosts=( async ()=>{
      // console.log('feed rendered');
      const res=username 
      ?await axios.get('http://localhost:8800/api/posts/profile/'+ username)
      :await  axios.get("http://localhost:8800/api/posts/timeline/"+user._id)
      setPosts(
        res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date (p1.createdAt);
        })
        );
    })
    FetchPosts();
  },[username,user._id])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
