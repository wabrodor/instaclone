import { FiBookmark } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { TbMessageDots } from "react-icons/tb";
import styles from "@/styles/Posts.module.css";
import { useState, useEffect } from "react";
import {
  addDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/Firebase";
import Moment from "react-moment";

export default function Post({
  id,
  username,
  caption,
  image,
  userImg,
  data: session,
}) {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const [getcomments, setGetcomments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const LoginUser = session.user.name
  const LoginImage = session.user.image

  const postLikes = async () => {
   if(hasLiked) {
    await deleteDoc(doc(db, "posts", id, "likes", session.user.id));
   }else {
    await setDoc(doc(db, "posts", id, "likes", session.user.id), {
      username: LoginUser,
    });
   }

  };

  const postComment = async (e) => {
    e.preventDefault();
    const sendComment = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: sendComment,
      username : LoginUser,
      userImg: LoginImage,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setGetcomments(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session.user.id) !== -1
      ),
    [likes]
  );
 


  return (
    <div className={styles.postWrapper}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.userTag}>
          <img src={userImg} />
          <p>{username} </p>
        </div>
        <BsThreeDots />
      </div>
      {/* images */}
      <div className={styles.Post}>
        <img src={image} alt={username} />
      </div>
      {/* buttons */}
      <div className={styles.buttons}>
        <div className={styles.icons}>
          {hasLiked ? (
            <AiFillHeart onClick={() => postLikes()} />
          ) : (
            <AiOutlineHeart onClick={() => postLikes()} />
          )}

          <AiOutlineComment />
          <TbMessageDots />
        </div>
        <div>
          <FiBookmark />
        </div>
      </div>
      {likes.length > 0 && <p className={styles.likeNumber}>{likes.length} like</p>}

      {/* caption */}
      <div className={styles.caption}>
        <p className={styles.username}>{username}</p>
        <p className={styles.captionText}>
          {active ? caption : caption.slice(0, 50)}
          <span
            onClick={() => {
              setActive(!active);
            }}
            className={styles.active}
          >
            {caption.length < 50 || active ? "" : "...readmore"}
          </span>
        </p>
      </div>

      <div className={styles.comment}>
        {/* comments */}
        {getcomments.length > 0 && (
          <div>
            {getcomments.map((comment) => (
              <div key={comment.id} className={styles.comments}>
                <div className={styles.container}>
                  <img src={comment.data().userImg} alt="" />
                  <p>
                    {`@ ${comment.data().username.split(" ").join("")}  ${
                      comment.data().comment
                    }`}
                  </p>
                </div>

                <span>
                  <Moment fromNow>{comment?.data().timestamp?.toDate()}</Moment>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* input */}
      <div className={styles.commentInput}>
        <img src={LoginImage} />
        <form action="">
          <input
            className={styles.textField}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`comment here @ ${LoginUser}`}
          />
          <button
            className={styles.btn}
            type="submit"
            onClick={(e) => postComment(e)}
            disabled={!comment.trim()}
          >
            {" "}
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
