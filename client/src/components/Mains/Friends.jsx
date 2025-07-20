import { useEffect, useState } from "react";
import API from "../../axiosconfig";

const Friends = () => {

  const im = "data:image/jpeg;base64,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";
  const [friends, setfriends] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/home/getmyfriends");
        setfriends(res.data.friends);
      }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <p>Chatting feature will come soon</p> <br /> <br /> <hr /> <br />
    <div>
      <h3>My Friends</h3>
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend._id} style={{display:'flex' , height:'80px' , width:'300px' , border:'2px solid red' , background:'white' , padding:'10px' , justifyContent:"space-between"}}>
            <img src={friend.profilePic === "" && im} alt="Friend" style={{ width: "60px" , height:'60px' , borderRadius:'50%' , border:'1px solid black' }} /> 
            <span>{friend.fullName}</span>
          </div> 
        ))
      ) : (
        <p>No friends found</p>
      )}
    </div>
    </>
  );
};

export default Friends;















//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await API.get('/auth/me', { withCredentials: true });
//         setfriends(res.data.user.friends);
//         console.log( res.data.user.friends);
//       } catch (err) {
//         setfriends(null); 
//         console.log("User not logged in");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//    if (loading) return <div> Loading... </div>;
//    if (!friends || friends.length === 0) {
//     return <div>No friends found.</div>;
//   }

//   return (
//     <div>
//       <h2>My Friends</h2>
//       {friends.map((friend, i) => (
//         <div key={i}>
//           <p>Friend ID: {friend._id || friend.id || friend}</p>
//         </div>
//       ))}
//     </div>
//   );

// }