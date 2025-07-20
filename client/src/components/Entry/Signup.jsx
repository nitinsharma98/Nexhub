import { useRef } from "react";
import API from "../../axiosconfig";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const genderRef = useRef();
  const locationRef = useRef();
  const ageRef = useRef();
  const profilePicRef = useRef();
  const checkboxRef = useRef();


  const handleSignup = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = fullNameRef.current.value;
    const gender = genderRef.current.value;
    const location = locationRef.current.value;
    const age = ageRef.current.value;
    const profilePic = profilePicRef.current.value;

    if (!checkboxRef.current.checked) {
      alert("Please check the checkbox to proceed.");
      return;
    }

    try {
      await API.post("/auth/signup", { email, password , fullName , gender , location , age , profilePic });
      alert("Signup successfully , Now you can login");

      emailRef.current.value = "";
      passwordRef.current.value = "";
      fullNameRef.current.value = "";
      genderRef.current.value = "";
      locationRef.current.value = "";
      ageRef.current.value = "";
      profilePicRef.current.value = "";
      checkboxRef.current.checked = false;      
    } catch (err) {
      // If the error is from backend validation (status 400)
      if (err.response && err.response.status === 400 || 401 || 402 || 403) {
        alert("Invalid input: " + err.response.data.message);
      } 
      // Unexpected server error (like 500)
      else {
        alert("Something went wrong. Please try again.");
        console.error("Server error:", err);
      } 
    }
  };

  return (
   <>
    <form onSubmit={handleSignup}> <br/><br/>
      <div className="mb-3">
        <label htmlFor="email" >Email</label>
        <input type="email" className="form-control" id="email" ref={emailRef} required placeholder="Enter your email"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" >Password</label>
        <input type="password" autoComplete="off"  className="form-control" id="exampleInputPassword1" ref={passwordRef} required placeholder="Password"/>
      </div>
      <div className="mb-3">
        <label htmlFor="fullname" >Username</label>
        <input type="text" className="form-control" id="fullname" ref={fullNameRef} required placeholder="Enter your username"/>
      </div>
      <div className="mb-3">
  <label htmlFor="gender">Gender</label>
  <select className="form-control" id="gender" ref={genderRef} required>
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>
<div className="mb-3">
  <label htmlFor="location">Location</label>
  <input
    type="text"
    className="form-control"
    id="location"
    ref={locationRef}
    required
    placeholder="City, State"
  />
</div>

<div className="mb-3">
  <label htmlFor="age">Age</label>
  <input
    type="number"
    className="form-control"
    id="age"
    ref={ageRef}
    required
    placeholder="Age"
    min={12}
    max={80}
  />
</div>

<div className="mb-3">
  <label htmlFor="profilePic">Profile Picture Link</label>
  <input
    type="url"
    className="form-control"
    id="profilePic"
    ref={profilePicRef}
    placeholder="Paste your image URL"
  />
</div>










      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" ref={checkboxRef} />
        <label className="form-check-label" htmlFor="exampleCheck1" required  >I am not a robot!</label>
      </div>
      <br />
      <button type="submit" className="btn btn-rounded btn-danger" style={{float:'right'}}>Signup</button>
    </form>
   </>
  );
}

export default Signup;
