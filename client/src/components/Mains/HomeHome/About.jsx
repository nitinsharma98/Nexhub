import React from "react";
import A from "../../../images/Codes.png";
import B from "../../../images/Dashboard.png";
import C from "../../../images/Certificate.png";

const About = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
        lineHeight: 1.7,
        color: "inherit", // darker base text color
      }}
    >

      {/* Overview */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#EF0D00" }}>Our Vision</h2>
        <p>
          NexHub is your all-in-one platform built to ignite your coding journey. Whether
          you're a beginner eager to learn or an experienced developer looking to
          collaborate, NexHub provides the tools and resources to help you succeed.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#EF0D00" }}>About use</h2>
        <p>
          Only registered users can use Nexhub , only community registerded members can use community features . <br />
          On NexHub you can get best code templates ready to use inside your codes without any modification.
        </p>
      </section>

      {/* Features Overview Grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        {[
          { title: "Internships & Jobs", desc: "Explore curated remote and on-site openings." },
          { title: "Upload Your Code", desc: "Share, showcase, and host your code effortlessly." },
          { title: "Get Project Codes", desc: "Download ready-to-integrate project templates." },
          { title: "Earn Certifications", desc: "Get certified and boost your developer profile." },
          { title: "Ask Doubts", desc: "Get instant help from experts and peers." },
          { title: "Create Posts", desc: "Engage with fellow developers socially." },
          { title: "Reviews & Ratings", desc: "Post reviews about tools and experiences." },
          { title: "Remote Work Zone", desc: "Work from anywhere with trusted clients." },
           { title: "Coding Social Media", desc: "Similar to social media platform with codeing hub." },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#f9f9f9",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ color: "#EF0D00", fontSize: "1.2rem" }}>{item.title}</h3>
            <p style={{ color: "#222" }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Deep Dive Content */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#EF0D00" }}>Why NexHub Stands Out</h2>
        <ul style={{ paddingLeft: "1.5rem", color: "inherit" }}>
          <li>✅ Personalized Dashboard with user stats and activity</li>
          <li>✅ Verified Certificates & Internship Completion Badges</li>
          <li>✅ Full-Stack MERN Projects & Template Downloads</li>
          <li>✅ Real-time Chat & Doubt Forum</li>
          <li>✅ GitHub and LinkedIn Profile Linking</li>
          <li>✅ Job & Internship Alerts with Apply Tracker</li>
          <li>✅ Admin Dashboard to manage user activities, posts, and more</li>
        </ul>
      </section>

      {/* Visual Mock Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#EF0D00", marginBottom: "1.5rem" }}>
          Inside NexHub: Sneak Peek
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {["Dashboard", "Code Upload", "Internship Board"].map(
            (label, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  padding: "1rem",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    height: "160px",
                    background: "#ddd",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                  }}
                >
                   <img
                      src={
                        label === "Dashboard"
                          ? B
                          : label === "Code Upload"
                          ? A
                          : C
                      }
                      alt={label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                </div>
                <p style={{ color: "#222" }}>{label}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          textAlign: "center",
          padding: "2rem 1rem",
          background: "#EF0D00",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontSize: "1.6rem" }}>Ready to launch your developer journey?</h2>
        <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
          Join NexHub today and be part of a growing tech ecosystem.
        </p>
        <button
          style={{
            marginTop: "1rem",
            padding: "0.7rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            background: "#fff",
            color: "#EF0D00",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <a href="/setting/communityregister">Get Started</a>
        </button>
      </section>
    </div>
  );
};

export default About;
