import { useState , useRef } from "react";
import API from "../../axiosconfig";

const ComRegister = () => {

    const [state , setstate] = useState('Login');

    const emailRef = useRef();
    const passwordRef = useRef();
    
    const SemailRef = useRef();
    const SpasswordRef = useRef();
    const SnameRef = useRef();

    const VerfRef = useRef();

    const Login = async(e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try{
            const res = await API.post("/home/community/loginplus" , {email , password});
        alert("Login success");
        emailRef.current.value = "";
        passwordRef.current.value = "";
        }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }
    }

    const Signup = async(e) => {
        e.preventDefault();
        const email = SemailRef.current.value;
        const password = SpasswordRef.current.value;
        const name = SnameRef.current.value;
        
        try{
            const res = await API.post("/home/community/signupplus" , {email , password , name});
        alert("Check Email for OTP verification.");
        SemailRef.current.value = "";
        SpasswordRef.current.value = "";
        SnameRef.current.value="";

        } catch (err) {
      // If the error is from backend validation (status 400)
      if (err.response && err.response.status === 400 || 401 || 402 || 403) {
        alert("Invalid : " + err.response.data.message);
      } 
      // Unexpected server error (like 500)
      else {
        alert("Something went wrong. Please try again.");
      } 
    }
    }

    const Verify = async (e)=>{
        e.preventDefault();
        const code = VerfRef.current.value;

        try{
            const res = await API.post("/home/community/verification" , {code});
            alert("Verified");
            VerfRef.current.value="";
        } catch (err) {
      // If the error is from backend validation (status 400)
      if (err.response && err.response.status === 400 || 401 || 402 || 403) {
        alert("Invalid : " + err.response.data.message);
      } 
      // Unexpected server error (like 500)
      else {
        alert("Something went wrong. Please try again.");
        console.error("Server error:", err);
      } 
    }
    }

    return (
        <>



        {
  state === 'Login' ? (
    <>
      <form onSubmit={Login} style={{ maxWidth: '400px', margin: '5vh auto', padding: '2rem', boxShadow: '0 0 15px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: '#fff' }}>
        <h3 className="text-center mb-4">Community Login</h3>

        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" ref={emailRef} required />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" ref={passwordRef} required />
        </div>

        <div className="d-grid">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>

      <p className="text-center mt-4">
        Not a community member? <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => setstate('Signup')}>Signup</span>
      </p>
    </>
  ) : (
    <>
      <form onSubmit={Signup} style={{ maxWidth: '400px', margin: '4vh auto', padding: '2rem', boxShadow: '0 0 15px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: '#fff' }}>
        <h3 className="text-center mb-4">Community Signup</h3>

        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" ref={SemailRef} required />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" ref={SpasswordRef} required />
        </div>

        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Full Name" ref={SnameRef} required />
        </div>

        <div className="d-grid">
          <button className="btn btn-success" type="submit">Signup</button>
        </div>
      </form>

      <form onSubmit={Verify} style={{ maxWidth: '400px', margin: '2vh auto', padding: '1rem', boxShadow: '0 0 10px rgba(0,0,0,0.05)', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Verification Code" ref={VerfRef} required />
        </div>
        <div className="d-grid">
          <button className="btn btn-warning" type="submit">Confirm</button>
        </div>
      </form>

      <p className="text-center mt-4">
        Already a community member? <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => setstate('Login')}>Login</span>
      </p>
    </>
  )
}








        {/* {
            state === 'Login' ?
            <>
                <form onSubmit={Login}>
                    <input type="email" placeholder="email" ref={emailRef}/> <br />
                    <input type="text" placeholder="password" ref={passwordRef}/> <br />
                    <button>Login</button>
                </form>
                <br /><br /><br /><br /><br /><br />
                <p>Not a community member? Click here to <span style={{color:'red' , cursor:'pointer'}} onClick={()=> setstate('Signup')}>Signup.</span></p>
            </> :
            <>
                <form onSubmit={Signup}>
                    <input type="email" placeholder="email" ref={SemailRef}/> <br />
                    <input type="password" placeholder="password" ref={SpasswordRef}/> <br />
                    <input type="text" placeholder="name" ref={SnameRef}/> <br />
                    <button>Signup</button>
                </form>

                <form onSubmit={Verify}>
                    <input type="number" placeholder="Verification code " ref={VerfRef}></input>
                    <button> Confirm </button>
                </form>

                <br /><br /><br /><br /><br /><br />
                <p>A community member? Click here to <span style={{color:'red' , cursor:'pointer'}} onClick={()=>setstate('Login')}>Login.</span></p>
            </>
        }      */}
        </>
    )
}

export default ComRegister;