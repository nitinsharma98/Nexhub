import { useState, useEffect } from "react";
import API from "../../axiosconfig";
import Upbtn from "../Utility/Upbtn";

const Notification = () => {
  const [incomingReqs, setIncomingReqs] = useState([]);
  const [acceptedReqs, setAcceptedReqs] = useState([]);
  const [ongoing , setOngoing] = useState([]);

  const AcceptReq = async (reqid) => {
    try{
        const res = await API.put(`/home/friend-request/${reqid}/accept`);
    alert("accepted");
    } catch (err) {
        if (err.response && err.response.status === 400 || 401 || 402 || 403) {
            alert(err.response.data.message);
        } 
        else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
        } 
      }
  }

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const res = await API.get("/home/friend-requests");
        setIncomingReqs(res.data.incomingReqs || []);
        setAcceptedReqs(res.data.acceptedReqs || []);
      } catch (err) {
        if (err.response && err.response.status === 400 || 401 || 402 || 403) {
            alert(err.response.data.message);
        } 
        else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
        } 
      }
    };

    const fetchOngoing = async () => {
        try{
            const res = await API.get("/home/outgoing-friend-requests");
            setOngoing(res.data);
        } catch (err) {
        if (err.response && err.response.status === 400 || 401 || 402 || 403) {
            alert(err.response.data.message);
        } 
        else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
        } 
      }
    }

    fetchReq();
    fetchOngoing();
  }, []);

  return (
    <div>
      <h4 style={{textAlign:'center' , color:'red'}}>Incoming Requests</h4>
     <div style={{display:'flex' , gap:'2%' , flexWrap:'wrap'}}>
         {incomingReqs.length > 0 ? (
        incomingReqs.map((req, i) => (
          <div key={i} style={{width:'150px', border:'2px solid red', padding:'5px' , borderRadius:'10px' , background:'black'}}>
            <p style={{textAlign:'center'}}>{req.sender.fullName}</p>
            <img src={req.sender.profilePic} alt="Sender" style={{width:'100%' , borderRadius:'10px'}} /> <br /> <br />
            <button className="btn btn-rounded btn-danger" style={{width:'100%'}} onClick={() => AcceptReq(req._id)}>Accept</button>
          </div>
        ))
      ) : (
        <p>No incoming requests</p>
      )}
     </div>



      <br /> <br /><hr /><br />
      
      <h4 style={{textAlign:'center', color:'red'}}>Ongoing Requests</h4>
      <div style={{display:'flex' , gap:'2%' , flexWrap:'wrap'}}>
        {ongoing.length > 0 ? (
            ongoing.map((req,i)=> (
                <div key={i} style={{width:'150px', border:'2px solid red', padding:'5px' , borderRadius:'10px' , background:'black'}}>
                    <p style={{textAlign:'center'}}>{req.recipient.fullName}</p>
                    <img src={req.recipient.profilePic} alt="Sender" style={{width:'100%' , borderRadius:'10px'}} /> <br /> <br />
                </div>
            ))
        ): (
            <p>No Ongoing requests</p>
        )}
      </div>
      





      <br /> <br /><hr /><br />

      <h4 style={{textAlign:'center', color:'red'}}>Accepted Requests by other users</h4>
      <div style={{display:'flex' , gap:'2%' , flexWrap:'wrap'}}>
        {acceptedReqs.length > 0 ? (
        acceptedReqs.map((req, i) => (
          <div key={i} style={{width:'150px', border:'2px solid red', padding:'5px' , borderRadius:'10px' , background:'black'}}>
            <p style={{textAlign:'center'}}>{req.recipient.fullName}</p>
            <img src={req.recipient.profilePic} alt="Recipient Profile pic" style={{width:'100%' , borderRadius:'10px'}}/> <br /> <br />
          </div>
        ))
      ) : (
        <p>No accepted requests</p>
      )}
      </div>
      <Upbtn/>
    </div>
  );
};

export default Notification;
