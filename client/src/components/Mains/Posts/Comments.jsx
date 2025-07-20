import React, { useEffect, useState, useRef } from "react";
import API from "../../../axiosconfig";

const Comments = ({ postid }) => {
  const [comments, setComments] = useState([]);
  const textRef = useRef();

  const getComment = async () => {
    try {
      const res = await API.get(`/home/showcomment/${postid}`);
      setComments(res.data.comments || []);
      console.log(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    const comment = textRef.current.value;
    if (!comment.trim()) return alert("Comment can't be empty");

    try {
      const res = await API.put("/home/comment", {
        comment,
        postId: postid,
      });
      alert("Comment posted!");
      textRef.current.value = ""; 
      getComment();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    getComment();
  }, [postid]);

  return (
    <div
      style={{ height: "90vh", minWidth: "250px", width: "50%", position: "fixed", right: "0", top: "10vh", overflow: "scroll", background: "white", padding: "1rem", opacity: "0.9"}}>
      <form onSubmit={postComment}>
        <textarea
          ref={textRef}
          style={{ width: "80%", border: "2px solid black", borderRadius: "15px",}}/>
        <button type="submit">Send</button>
      </form>
      <h2>Comments</h2>
      <div>
        {comments.length > 0 ? (
          comments.map((c, i) => (
            <div
              key={i}
              style={{ marginBottom: "1rem", padding: "0.5rem", borderBottom: "1px solid #ccc",}}>
              <div style={{display:'flex' , justifyContent:'space-between'}}>
                <strong>{c.username || "Anonymous"}</strong>
                <p>{new Date(c.createdAt).toLocaleDateString()}</p>
              </div>
              <p>{c.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
