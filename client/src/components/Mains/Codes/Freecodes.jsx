import React, { useEffect, useState } from "react";            /// instructions 
import API from "../../../axiosconfig"; 

const Freecodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCodes = async () => {
    try {
      const res = await API.get("/home/codes"); 
      setCodes(res.data.data);
    } catch (error) {
      alert(`Error fetching codes:, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const containerStyle = {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px"
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px"
  };

  const aboutStyle = {
    fontSize: "15px",
    color: "#555",
    marginBottom: "10px"
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "10px"
  };

  const tagStyle = {
    display: "inline-block",
    padding: "4px 10px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    borderRadius: "8px",
    fontSize: "12px",
    marginRight: "8px",
    marginBottom: "6px"
  };

  const linkStyle = {
    marginTop: "12px",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "500"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "26px", textAlign: "center", marginBottom: "30px", color: "#222" }}>
        Free Code Templates
      </h2>

      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
      ) : codes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No codes available.</p>
      ) : (
        <div style={gridStyle}>
          {codes.map((code, index) => (
            <div key={index} style={cardStyle}>
              {code.images && code.images.length > 0 && (
                <img src={code.images[0]} alt="code" style={imageStyle} />
              )}
              <div style={titleStyle}>{code.title}</div>
              <div style={aboutStyle}>{code.about}</div>
              <div>
                {code.tags?.map((tag, i) => (
                  <span key={i} style={tagStyle}>#{tag}</span>
                ))}
              </div>
              {code.links?.github && (
                <a
                  href={code.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  🔗 View on GitHub
                </a>
              )}
              <div style={{ fontSize: "13px", color: "#999", marginTop: "12px" }}>
                {code.author || "By NexHub Community"}
              </div>
              <div style={{height:'100px' , color:'red' , fontSize:'smaller'}}>
                {code.code}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Freecodes;
