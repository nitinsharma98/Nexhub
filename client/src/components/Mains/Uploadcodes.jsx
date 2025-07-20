import React, { useState } from "react";
import axios from "../../axiosconfig";

const Uploadcodes = () => {
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    about: "",
    instructions: "",
    images: "",
    github: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    try {
      const payload = {
        ...formData,
        images: formData.images.split(",").map((img) => img.trim()),
        links: { github: formData.github },
        tags: formData.tags.split(",").map((tag) => tag.trim())
      };

      const res = await axios.post("/home/uploadffreecodes", payload);
      alert(res.data.message);
    } catch (err) {
  console.error("Upload failed:", err.response?.data || err.message || err);
  alert("Upload failed: " + (err.response?.data?.message || "Check console."));
}
  };

  const containerStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.08)",
    fontFamily: "Segoe UI, sans-serif"
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
    resize: "vertical"
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3"
  };

  const [hovered, setHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Upload Free Code</h2>
      <input name="title" placeholder="Title" style={inputStyle} onChange={handleChange} />
      <textarea name="code" rows={4} placeholder="Paste Code" style={inputStyle} onChange={handleChange} />
      <textarea name="about" rows={3} placeholder="About" style={inputStyle} onChange={handleChange} />
      <textarea name="instructions" rows={3} placeholder="Instructions" style={inputStyle} onChange={handleChange} />
      <input name="images" placeholder="Image URL" style={inputStyle} onChange={handleChange} />
      <input name="github" placeholder="GitHub Link" style={inputStyle} onChange={handleChange} />
      <input name="tags" placeholder="Tags (comma separated)" style={inputStyle} onChange={handleChange} />
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleUpload}
        style={hovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
      >
        Upload Code
      </button>
    </div>
  );
};

export default Uploadcodes;
