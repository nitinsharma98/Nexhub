import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(tick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        display: isMobile ? "block" : "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.8rem", color: "#EF0D00" }}>Welcome to NexHub</h1>
        <p style={{ fontSize: "1.2rem", color: "inherit" }}>
          Empowering Developers | Building Careers | Launching Innovation
        </p>
      </div>

      {/* Clock Card */}
      <div
        style={{
          padding: "2rem",
          margin: "2rem auto",
          maxWidth: "400px",
          width: "90%",
          backgroundColor: "#1f1f27",
          color: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          textAlign: "center",
          fontFamily: "Segoe UI, sans-serif",
          transition: "all 0.3s ease-in-out",
          float: isMobile ? "none" : "right",
        }}
      >
        <div style={{ fontSize: "2.5rem", fontWeight: "600" }}>
          {formatTime(time)}
        </div>
        <div style={{ fontSize: "1rem", marginTop: "0.5rem", color: "#ccc" }}>
          {formatDate(time)}
        </div>
      </div>
    </div>
  );
};

export default Clock;
