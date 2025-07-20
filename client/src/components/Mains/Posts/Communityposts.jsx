import React, { useEffect, useState } from "react";
import API from "../../../axiosconfig";
import Comment from "./Comments";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?._id;
  // console.log(userId);             // got by gpt but not work here so i use useeffect copy from app.jsx given by gpt why not simply i access it ?

  const [user, setUser] = useState(null);
  const [show , setshow] = useState("false");
  const [postid , setid] = useState(null);

   const handlecomment = async(id) => {
      if(show === "true"){
        setshow("false");
      }else{
        setshow("true");
       setid(id);
      }
    }
  
  


   useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await API.get('/auth/me', { withCredentials: true });
          setUser(res.data.user);
        } catch (err) {
          setUser(null); 
          alert("User Not Found");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);

    const userId = user?._id;
    


  const fetchPosts = async () => {
    try {
      const res = await API.get("/home/showpost");
      setPosts(res.data.reverse());
    } catch (error) {
      alert(`Error fetching posts:, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await API.put(`/home/like/${postId}`);
      updatePostLikes(postId, "like");
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await API.put(`/home/unlike/${postId}`);
      updatePostLikes(postId, "unlike");
    } catch (err) {
      console.error("Unlike error:", err);
    }
  };

  const updatePostLikes = (postId, action) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) return post;
        const alreadyLiked = post.likes?.some((l) => l.likeBy === userId);
        let updatedLikes = [...(post.likes || [])];

        if (action === "like" && !alreadyLiked) {
          updatedLikes.push({ likeBy: userId });
        } else if (action === "unlike" && alreadyLiked) {
          updatedLikes = updatedLikes.filter((l) => l.likeBy !== userId);
        }

        return { ...post, likes: updatedLikes };
      })
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ color: "#EF0D00", marginBottom: "2rem", textAlign: "center" }}>
        Latest Posts
      </h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          {posts
            .filter((post) => post.username === "Nexhub_Official")
            .map((post) => {
            const hasLiked = post.likes?.some((l) => l.likeBy === userId);

            return (
              <div
                key={post._id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={post.pic?.url || post.pic || "https://via.placeholder.com/300"}
                  alt="Post"
                  style={{ width: "100%", height: "180px", objectFit:"contain" }}
                />

                <div style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ fontWeight: "600", color: "#333" }}>{post.username}</span>
                    <span style={{ fontSize: "0.85rem", color: "#777" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#444",
                      fontSize: "0.95rem",
                      marginBottom: "1rem",
                      height:"100px",
                      overflow:"scroll"
                    }}
                  >
                    {post.about || "No description provided."}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {!hasLiked ? (
                        <button
                          onClick={() => handleLike(post._id)}
                          style={{
                            background: "#EF0D00",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "4px 10px",
                            cursor: "pointer",
                          }}
                        >
                          <span>{post.likes?.length || 0}❤️</span> 
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnlike(post._id)}
                          style={{
                            background: "#555",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "4px 10px",
                            cursor: "pointer",
                          }}
                        >
                           <span>{post.likes?.length || 0}💔</span>
                        </button>
                      )}
                    </span>

                    <span style={{ color: "#333" , cursor:'pointer'}} onClick={()=>handlecomment(post._id)}>
                      💬 {post.comments?.length || 0} Comments
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
       {show === "true" && <Comment  postid={postid}/>}
    </div>
  );
};

export default AllPosts;
