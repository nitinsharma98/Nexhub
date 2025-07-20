import { useState, useEffect } from "react";
import API from "../../axiosconfig";

const ShowSpPost = () => {
  const [data, setdata] = useState(null);
  const [id, setid] = useState(null);

  function getLast24Chars(str) {
    return str.slice(-24); 
  }

  const handleCopy = async (link) => {
      try {
        await navigator.clipboard.writeText(link);
        alert(`link copied: ${link} `);
      } catch (err) {
        alert("Copy failed", err);
      }
  };

  useEffect(() => {
    const extractedId = getLast24Chars(window.location.href);
    setid(extractedId);
  }, []);

  useEffect(() => {
    const PostDetails = async () => {
      try {
        if (id) {
          const res = await API.get(`/home/showpost/${id}`);
          setdata(res.data.postData);
        }
      }catch (err) {
      if (err.response && err.response.status === 400 || 401 || 402 || 403) {
        alert("No such post exists");
      } 
      else {
        alert("Something went wrong. Please try again.");
        console.error("Server error:", err);
      } 
    }
    };
    PostDetails();

  }, [id]);

    
  return (
    <>
    {data ? 
    <>
                
     <div style={{margin:"1rem"}}>
        <div style={{ border:"2px solid red" , borderRadius:'15px' , background:'grey' , maxWidth:'900px' , margin:' 2rem auto'}}>
           <div style={{display:'flex' , justifyContent:'space-between' , padding:'1rem'}}>
                <p style={{ height:'50px' ,  color:'black' , fontWeight:'bolder' , fontSize:'larger' , borderRadius:'10px'}} >{data.username}</p>
                <p>{data.createdAt}</p>
           </div>
            <img src={data.pic} style={{height:'100%' , width:"100%" , border:'1px solid grey' , borderRadius:'7px'}}/>
            <p style={{borderRadius:"10px"}}>{data.about}</p> 
            <div style={{display:"flex" , justifyContent:'space-evenly' , borderTop:'2px solid black' , borderRadius:"5px"}}>
                    <span>Like</span>
                    <span>Comment</span>
                    <span  onClick={()=>handleCopy(`/connections/sppost/${data._id}`)} style={{cursor:'pointer'}}>Share</span>
            </div>
        </div>
     </div>
    </> :
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        padding: "2rem"
      }}>
        <h1>No such post exists!</h1>
      </div>
    </div>
    }
    </>
    )
}

export default ShowSpPost;
