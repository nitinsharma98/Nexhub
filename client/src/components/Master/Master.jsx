import { useEffect, useState } from "react";
import API from "../../axiosconfig";import Details from "./Details";
import Certification from "./Certification";
import Showcontacts from "./Showcontacts";
import Getapplies from "./Getapplies";
import Setlinks from "./Setlinks";
import Uploadcode from "./Uploadcode";
import Upbtn from "../Utility/Upbtn";
const Master = () => {

    const [userData, setUserData] = useState(null);
    const [op , setop] = useState("Details");
    
      useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await API.get('/auth/me', { withCredentials: true });
            setUserData(res.data.user);
          } catch (err) {
            console.error("Failed to fetch user", err);
          }
        };
    
        fetchUser();
      }, []);
    
      if (!userData) return <p>Loading profile...</p>;

      const name = userData.fullName;
      const email = userData.email;

      if(name === 'Nexhub_Official' ){      // && email === 'some22@gmail.com'
           return(
            <>
            <div style={{display:'flex' , justifyContent:'space-around', gap:'2rem' , margin:'1rem auto' }}>
              <div style={{border:'1px solid red' , color:'red' , background:'black', width:'10vw', padding:'3px' , cursor:'pointer'}} onClick={()=>setop("Details") } >Details</div>
              <div style={{border:'1px solid red' , color:'red' , background:'black', width:'10vw', padding:'3px' , cursor:'pointer'}} onClick={()=>setop("Make") } >Make Certificate</div>
              <div style={{border:'1px solid red' , color:'red' , background:'black', width:'10vw', padding:'3px' , cursor:'pointer'}} onClick={()=>setop("Upload") } >Upload Code</div>
              <div style={{border:'1px solid red' , color:'red' , background:'black', width:'10vw', padding:'3px' , cursor:'pointer'}} onClick={()=>setop("Set") } >Set Links</div>
              <div style={{border:'1px solid red' , color:'red' , background:'black', width:'10vw', padding:'3px' , cursor:'pointer'}} onClick={()=>setop("Show") } >Show contacts</div>
              <div style={{border:'1px solid red' , color:'red' , background:'black', width:'10vw', padding:'3px' , cursor:'pointer'}} onClick={()=>setop("Get") } >Get Applies</div>
            </div>

            {op === "Details" ? <Details/> : op === "Upload" ? <Uploadcode/> :  op === "Make" ? <Certification/> : op === "Set" ? <Setlinks/> : op === "Show" ? <Showcontacts/> : <Getapplies/> }

            <Upbtn/>
            </>
           )
      }

    return (
        <>
        <p>{name}you are not owner of this community</p>
        </>
    )
}

export default Master;