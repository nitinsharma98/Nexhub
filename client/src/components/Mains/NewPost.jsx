import React, { useState } from "react";
import API from "../../axiosconfig";

const Newpost = () => {
  const [about, setAbout] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/home/createpost", { about, pic });
      if (res.data.success) {
        setMessage("✅ Post created successfully!");
        setAbout("");
        setPic("");
      }
    }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ color: "#EF0D00", marginBottom: "1rem" }}>Create a Post</h2>

      <form onSubmit={handlePost} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            resize: "vertical"
          }}
        />

        <input
          type="url"
          value={pic}
          onChange={(e) => setPic(e.target.value)}
          placeholder="Optional image URL"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#EF0D00",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};



export default Newpost;