import React, { useState, useEffect } from "react";
import A from "../../../images/Getprojects.png";
import B from "../../../images/Uploadyourcode.png";
import C from "../../../images/Certificate.png";

const Basecodes = () => {
  const slides = [
    {
      title: "Internships & Jobs",
      desc: "Find remote and on-site opportunities to grow your career.",
      image: C,
      link: "/home/work",
    },
    {
      title: "Upload Your Code",
      desc: "Showcase and share your code with the developer community.",
      image: B,
      link: "/community/uploadcodes",
    },
    {
      title: "Download Ready Projects",
      desc: "Access prebuilt projects to boost your productivity.",
      image: A,
      link: "/learn/codes",
    },
    {
      title: "Get Documentation",
      desc: "Get full documentation of coding to enhance your skills and ideas.",
      image: "https://tse2.mm.bing.net/th/id/OIP.Xc66DaqUsB8wClxItVCfKgHaDQ?pid=Api&P=0&h=180",
      link: "/learn/docs",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, current]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        margin: "30px auto",
        overflow: "hidden",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        fontFamily: "Segoe UI, sans-serif",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <a
          href={slide.link}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: current === index ? "block" : "none",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize:"cover",
              backgroundPosition: "center",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "2rem",
              transition: "transform 0.3s ease",
              transform: paused ? "scale(1.03)" : "scale(1)",
              color: "#fff",
              position: "relative",
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.5)",
                padding: "1rem",
                borderRadius: "10px",
                maxWidth: "90%",
              }}
            >
              <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{slide.title}</h2>
              <p style={{ fontSize: "1rem" }}>{slide.desc}</p>
            </div>
          </div>
        </a>
      ))}

      {/* Navigation Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: current === i ? "#EF0D00" : "#ccc",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      {/* Responsive fixes */}
      <style>
        {`
          @media (max-width: 768px) {
            div[style*="height: 300px"] {
              height: 220px !important;
              padding: 1rem !important;
            }
            h2 {
              font-size: 1.2rem !important;
            }
            p {
              font-size: 0.95rem !important;
            }
          }

          @media (max-width: 480px) {
            div[style*="height: 300px"] {
              height: 180px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Basecodes;
