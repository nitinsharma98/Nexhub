import { useRef } from "react";
import { useNavigate } from "react-router";
import API from "../../axiosconfig";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const checkboxRef = useRef();

    const navigate = useNavigate();

 

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailORfullName = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!checkboxRef.current.checked) {
      alert("Please check the checkbox to proceed.");
      return;
    }

    try {
      const res = await API.post("/auth/login", { emailORfullName, password } );
      alert("Login success");
      emailRef.current.value = "";
      passwordRef.current.value = "";
      checkboxRef.current.checked = false;
      navigate("/home");
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
    <form onSubmit={handleLogin} className="landing-form">

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" >Username or Email</label>
        <input type="text" className="form-control" id="exampleInputEmail1" ref={emailRef} required placeholder="Enter your email"/>
      </div> <br />
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" >Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordRef} required placeholder="Password"/>
      </div>
      <br />
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" ref={checkboxRef} />
        <label className="form-check-label" htmlFor="exampleCheck1" required  >I am not a robot!</label>
      </div>
      <br /><br />
      <button type="submit" className="btn btn-rounded btn-danger" style={{float:'right'}}>Login</button>
    </form>
    <br />
   </>
  );
}

export default Login;