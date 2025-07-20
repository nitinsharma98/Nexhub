import { IoIosSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import API from "../../axiosconfig";
import { useNavigate } from "react-router";

const Comchat = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null); // to store user info
  const [loading, setLoading] = useState(true);
  
  const [data, setdata] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/home/community/me', { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


   useEffect(() => {
    if (user) fetchChat();
  }, [user]);

   const fetchChat = async () => {
    try {
      const res = await API.get("/home/community/comV/getgroupchat");
      setdata(res.data.chats);
    }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }
  };

   const Sendmsg = async (e) => {
    e.preventDefault();
    const text = inputRef.current.value;
    try {
      await API.post("/home/community/comV/sendgroupchat", { text });
      inputRef.current.value = "";
      fetchChat();
    }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }
  };

   useEffect(() => {
    if (!loading && !user) {
      alert("Not a community member. Please login or register.");
      navigate("/setting/communityregister");
    }
  }, [loading, user, navigate]);

    if (loading) return <p>Loading...</p>;
    

  return (
    <div style={{ height: "90vh", width: "100%", padding: "1%" }}>
      <div style={{  overflowY: "auto", padding: "10px" }}>
        {[...data].reverse().map((item, index) => {
          const isOfficial = item.username === "Nexhub_Official";
          return (
            <div key={index} style={{ display: "flex", justifyContent: isOfficial ? "flex-start" : "flex-end", marginBottom: "12px" }}>
              <div style={{ backgroundColor: isOfficial ? "#e1f5fe" : "#dcf8c6", padding: "10px 15px", borderRadius: "15px", maxWidth: "70%", wordBreak: "break-word", whiteSpace: "pre-wrap", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                <p style={{ fontWeight: "bold", margin: 0, color: "#444", fontSize: "14px" }}> {item.username} </p>
                <p style={{ margin: "4px 0", color: "#333", fontSize: "15px" }}> {item.text} </p>
                <p style={{ fontSize: "11px", color: "gray", textAlign: "right", margin: 0 }}>
                  {new Date(item.time).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={Sendmsg} style={{ width: "100%", display: "flex", justifyContent: "space-evenly",  position: "fixed", bottom: "0", left: "0", padding: "5px", backgroundColor: "#f8f9fa"}}>
        <input ref={inputRef} type="text" maxLength={100} placeholder="Type your message..." style={{ width: "90%", padding: "10px", borderRadius: "20px", border: "1px solid #ccc", outline: "none", fontSize: "14px" }} required/>
        <button className="btn btn-rounded btn-info"><IoIosSend /></button>
      </form>
    </div>
  );
};

export default Comchat;
