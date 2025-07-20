import { FaWhatsapp ,  FaInstagram ,  FaTelegram , FaGithub , FaLinkedinIn , FaExternalLinkSquareAlt } from "react-icons/fa";

const Footer = ({data}) => {
  return (
    <footer
      style={{
        marginLeft:'1rem',
        backgroundColor: "#1f1f27",
        color: "#fff",
        padding: "3rem 4%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "3rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >


      {/* Quick Links */}
      <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
       <h3 style={{ color: '#EF0D00' }}>Quick Links</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          <li><a href="/community/chats" style={linkStyle}>Community</a></li>
          <li><a href="/home/work" style={linkStyle}>Internships</a></li>
          <li><a href="/learn/codes" style={linkStyle}>Code Templates</a></li>
          <li><a href="/community/uploadcodes" style={linkStyle}>Upload your Code</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
       <h3 style={{ color: '#EF0D00' }}>Contact</h3>
        <p style={{ marginTop: '1rem', color: '#ccc' }}>
          Email: <a href="mailto:support@nexhub.com" style={linkStyle}>{data.gmail}</a><br />
          Phone: <span style={{ color: '#ccc' }}>{data.contact}</span>
        </p>
      </div>

      {/* Social Media */}
      <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
        <h3 style={{ color: "#fff", marginBottom: "1rem" }}>Follow Us</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href={data.telegram} style={iconStyle}><FaTelegram color="skyblue" style={{fontSize:'larger'}} /></a>
          <a href={data.instagram} style={iconStyle}><FaInstagram color="pink" style={{fontSize:'larger'}}/></a>
          <a href={data.whatsapp} style={iconStyle}><FaWhatsapp color="green" style={{fontSize:'larger'}} /></a>
          <a href={data.github} style={iconStyle}><FaGithub color="black" style={{fontSize:'larger'}} /></a>
          <a href={data.linkdin} style={iconStyle}><FaLinkedinIn color="blue" style={{fontSize:'larger'}} /></a>
          <a href={data.nokri} style={iconStyle}><FaExternalLinkSquareAlt color="purple" style={{fontSize:'larger'}} /></a>
        </div>
      </div>

      {/* Bottom line */}
      <div style={{ width: "100%", textAlign: "center", marginTop: "2rem", color: "#888", fontSize: "0.9rem" }}>
        &copy; {new Date().getFullYear()} NexHub. All rights reserved.
      </div>
    </footer>
  );
};

const linkStyle = {
  color: "#bbb",
  textDecoration: "none",
  display: "block",
  marginBottom: "0.5rem",
};

const iconStyle = {
  fontSize: "1.5rem",
  color: "#EF0D00",
  textDecoration: "none",
  transition: "0.3s ease",
};

export default Footer;
