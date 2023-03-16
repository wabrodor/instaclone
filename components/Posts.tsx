import Post from "./Post"
import styles from "@/styles/Posts.module.css"
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase";

export default function Posts({data : session}) {

  const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      return onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      );
    }, []);


 
  return (
    <div className= {styles.wrapper}>
      {posts.map( post =>{
      
        return <Post key={post.id}
        id= {post.id} 
        data = {session}
       username = {post.data().username}
       caption = {post.data().caption}
       image= {post.data().image}
      userImg = {post.data().userImg}
        />

      })
    }
  
    </div>
  );
}
