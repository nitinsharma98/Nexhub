import React, { useState, useEffect } from "react";
import API from "../../../axiosconfig";

const ReviewSection = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  
        useEffect(() => {
          const fetchUser = async () => {
            try {
              const res = await API.get('/auth/me', { withCredentials: true });
              setUserData(res.data.user);
            } catch (err) {
              console.error("Failed to fetch user", err);
            }
          };
      
          fetchUser();
        }, []);

  const fetchReviews = async () => {
    try {
      const res = await API.get("/home/showreviews");
      setReviews(res.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/home/reviews", { comment, rating });
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error("Review submit error:", error.response?.data || error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await API.get(`/home/deletereviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
    alert("This is not your Review!!");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ color: "#EF0D00", marginBottom: "1rem" }}>Leave a Review</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows="3"
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            resize: "none",
            fontSize: "14px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
          <label style={{ marginRight: "10px", fontSize: "14px" }}>Rating:</label>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              style={{
                fontSize: "20px",
                cursor: "pointer",
                color: num <= rating ? "#EF0D00" : "#ccc",
                transition: "color 0.2s",
              }}
              role="button"
              aria-label={`${num} star`}
            >
              {num <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#EF0D00",
            color: "white",
            padding: "8px 18px",
            borderRadius: "6px",
            marginTop: "1rem",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Submit Review
        </button>
      </form>

      <h3 style={{ marginBottom: "1rem", color: "#EF0D00" }}>User Reviews</h3>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {reviews.map((r) => (
            <div
              key={r._id}
              style={{
                background: "#fff",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                position: "relative",
                fontSize: "14px",
              }}
            >
              <strong style={{ color: "#333" }}>{r.username}</strong>
              <p style={{ margin: "4px 0 6px", color: "#555" }}>{r.comment}</p>
              <div style={{ fontSize: "16px", color: "#EF0D00" }}>
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
              {r.username === userData.fullName && <button
                onClick={() => handleDelete(r._id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  color: "#EF0D00",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                title="Delete Review"
              >
                ✖
              </button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
