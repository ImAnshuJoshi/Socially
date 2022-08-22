import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios';

export default function Feed({username}) {
  const [posts , setPosts] = useState([]);

  useEffect(async ()=>{
    const FetchPosts=( async ()=>{
      // console.log('feed rendered');
      const res=username 
      ?await axios.get('http://localhost:8800/api/posts/profile/'+username)
      :await  axios.get("http://localhost:8800/api/posts/timeline/6300c2d73b15e0961e4ec1b5")
      setPosts(res.data);
    })
    FetchPosts();
  },[username])
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
