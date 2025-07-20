import { useState } from "react";

const faqsData = [
  {
    question: "What is NexHub?",
    answer: "NexHub is a platform where developers can collaborate, share code, get internships, jobs, and access professional development tools and training."
  },
  {
    question: "Are the courses and templates free?",
    answer: "We offer both free and premium resources. Free templates and starter kits are available along with high-quality paid options."
  },
  {
    question: "How do I apply for internships or jobs?",
    answer: "You can navigate to the 'Internships' or 'Jobs' section in the navigation bar and apply directly with your profile information."
  },
  {
    question: "Do I get a certificate after completion?",
    answer: "Yes! After successfully completing courses or internships, a verified certificate is issued which you can download."
  }
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      <div style={styles.wrapper}>
        {faqsData.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div style={styles.questionBox} onClick={() => toggleFaq(index)}>
              <span>{faq.question}</span>
              <span style={styles.icon}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div style={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "3rem 10%",
    backgroundColor: "#f7f7f7",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#EF0D00",
    marginBottom: "2rem",
    fontSize: "2rem"
  },
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  faqItem: {
    marginBottom: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
    transition: "0.3s",
  },
  questionBox: {
    padding: "1rem 1.5rem",
    fontWeight: "600",
    fontSize: "1rem",
    color: "#333",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
  },
  icon: {
    fontSize: "1.3rem",
    color: "#EF0D00",
  },
  answer: {
    padding: "1rem 1.5rem",
    color: "#555",
    fontSize: "0.95rem",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fafafa",
  }
};

export default Faqs;
