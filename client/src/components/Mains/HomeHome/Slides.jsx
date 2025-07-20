import React, { useState, useEffect } from "react";

const Slides = () => {
  const slides = [
    {
      title: "Try and catch",
      desc: "Best way to use catch block.",
      use: "Use this feature to get optimized error show , use message for every controller in backend.",
      code: `try{ 
              // your try logic 
          }catch (err) {
            // If the error is from backend validation (status 400)
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          // Unexpected server error (like 500)
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }`,
      bg: "#f5f5f5",
    },
    {
      title: "server.js / app.js",
      desc: "Basic server file code",
      use: "nodemon filename.js",
      code: `
      const express = require('express');
      const mongoose = require('mongoose');
      const cookieParser = require('cookie-parser');
      // const dotenv = require('dotenv');
      // dotenv.config();
      const app = express();
      
      const cors = require("cors");
      app.use(cors({
        origin: "http://localhost:5173", // frontend URL
        credentials: true
      }));
      
      app.use(express.json());
      app.use(cookieParser());
      
      mongoose.connect(MONGO_URL)
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log(err));
      
      app.use("/route1" , Routesof1);
      app.use("/routen" , Routesofn); 
      
      app.use("/", (req, res) => {
        res.status(404).json({
          success: false,
          message: "No route exists!",
        });
      });
      
      app.listen(8080, () => {
        console.log("Server is running at 8080 port.");
      });
      `,
      bg: "#f6ddcc",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [copyMsg, setCopyMsg] = useState("Copy");

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCopy = () => {
    navigator.clipboard.writeText(slides[current].code).then(() => {
      setCopyMsg("Copied!");
      setTimeout(() => setCopyMsg("Copy"), 1500);
    });
  };

  useEffect(() => {
    const auto = setInterval(() => next(), 8000);
    return () => clearInterval(auto);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <button
        onClick={prev}
        style={{
          fontSize: "2rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#EF0D00",
          padding: "0 1rem",
        }}
      >
        ⟨
      </button>

      <div
        style={{
          background: slides[current].bg,
          padding: "2rem",
          borderRadius: "12px",
          textAlign: "left",
          flex: 1,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transition: "all 0.5s ease",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", color: "#EF0D00", marginBottom: "0.8rem" }}>
          {slides[current].title}
        </h2>

        <p style={{ fontSize: "1rem", color: "#333", marginBottom: "0.6rem" }}>
          <strong>Description:</strong> {slides[current].desc}
        </p>

        <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1rem" }}>
          <strong>Use:</strong> {slides[current].use}
        </p>

        <div
  style={{
    background: "#333",
    color: "#fff",
    padding: "0.8rem",
    borderRadius: "6px",
    fontFamily: "monospace",
    fontSize: "0.95rem",
    marginBottom: "0.8rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    height: "250px",
    overflow: "hidden",
    position: "relative",
  }}
>
  <div
    style={{
      overflowX: "auto",
      maxHeight: "100%",
      whiteSpace: "pre-wrap",
      flex: 1,
      paddingRight: "1rem",
      wordBreak: "break-word",
    }}
  >
    {slides[current].code}
  </div>
  <button
    onClick={handleCopy}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "#EF0D00",
      border: "none",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.8rem",
      zIndex: 2,
    }}
    >
        {copyMsg}
    </button>
    </div>

      </div>

      <button
        onClick={next}
        style={{
          fontSize: "2rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#EF0D00",
          padding: "0 1rem",
        }}
      >
        ⟩
      </button>
    </div>
  );
};

export default Slides;
