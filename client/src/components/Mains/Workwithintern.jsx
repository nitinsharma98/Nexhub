import { useRef } from "react";
import API from "../../axiosconfig";
import Upbtn from "../Utility/Upbtn";

const Workwithintern = () => {

    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const workRef = useRef();
    const domainRef = useRef();
    const experienceRef = useRef();
    const lastLpaRef = useRef();
    const collegeRef = useRef();
    const cgpaRef = useRef();
    const passingyearRef = useRef();
    const aboutRef = useRef();

    const handleWorkWithus =async () =>{

        const name = nameRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const work = workRef.current.value;
        const domain = domainRef.current.value;
        const experience = experienceRef.current.value;
        const lastLpa = lastLpaRef.current.value;
        const college = collegeRef.current.value;
        const cgpa = cgpaRef.current.value;
        const passingyear = passingyearRef.current.value;
        const about = aboutRef.current.value; 

        try{
            const res = await API.post( "/home/workwithus" , {name , phone , email , work , domain , experience , lastLpa , college , cgpa , passingyear , about});
            alert("success");
        }catch (err) {
            if (err.response && err.response.status === 400 || 401 || 402 || 403) {
                alert("Invalid input: " + err.response.data.message);
            } 
            else {
                alert("Something went wrong. Please try again.");
                console.error("Server error:", err);
            } 
        }
    }
    

    return (
        <>



<form
  style={{
    padding: '2rem 4%',
    backgroundColor: '#fdfdfd',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '1100px',
    margin: '5vh auto'
  }}
  onSubmit={handleWorkWithus}
>
  <h3 className="text-center mb-4" style={{ color: '#EF0D00', fontWeight: '600' }}>
    Work With Us
  </h3>

  <style>
    {`
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type=number] {
        -moz-appearance: textfield;
      }

      select.form-control {
        background-color: white;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='gray' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 5.5l6 6 6-6' stroke='%23666' stroke-width='2'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 14px 14px;
        padding-right: 2.5rem;
      }

      input.form-control,
      select.form-control,
      textarea.form-control {
        border-radius: 8px;
        border: 1px solid #ccc;
        transition: border-color 0.3s ease;
      }

      input.form-control:focus,
      select.form-control:focus,
      textarea.form-control:focus {
        border-color: #EF0D00;
        box-shadow: 0 0 0 0.1rem rgba(239, 13, 0, 0.25);
      }
    `}
  </style>

  <div className="row g-3">
    <div className="col-md-6">
      <input type="text" className="form-control" ref={nameRef} placeholder="Full Name" required />
    </div>
    <div className="col-md-6">
      <input type="number" className="form-control" ref={phoneRef} placeholder="Phone Number" required />
    </div>

    <div className="col-md-6">
      <input type="email" className="form-control" ref={emailRef} placeholder="Email Address" required />
    </div>
    <div className="col-md-6">
      <select className="form-control" ref={workRef} required>
        <option value="">Select Work Type</option>
        <option value="Training">Training</option>
        <option value="Internship">Internship</option>
        <option value="Join us">Join Us</option>
        <option value="Course">Course</option>
      </select>
    </div>

    <div className="col-md-6">
      <input type="text" className="form-control" ref={domainRef} placeholder="Domain (e.g., MERN)" required />
    </div>
    <div className="col-md-6">
      <input type="text" className="form-control" ref={experienceRef} placeholder="Experience (e.g., 2 years)"  />
    </div>

    <div className="col-md-6">
      <input type="number" className="form-control" ref={lastLpaRef} placeholder="Last LPA (if any)" />
    </div>
    <div className="col-md-6">
      <input type="text" className="form-control" ref={collegeRef} placeholder="College Name"  />
    </div>

    <div className="col-md-6">
      <input type="number" className="form-control" ref={cgpaRef} placeholder="Current CGPA"  />
    </div>

    <div className="col-12">
      <p >Passing year</p>
      <input type="date" className="form-control" ref={passingyearRef} placeholder="Passing Year"  />
    </div>

    <div className="col-12">
      <input type="text" className="form-control" ref={aboutRef} placeholder="Tell us about yourself..."  />
    </div>

    <div className="col-12 text-end">
      <button type="submit" className="btn btn-danger px-4 py-2 mt-3" style={{ borderRadius: '25px', fontWeight: '500' }}>
        Submit
      </button>
    </div>
  </div>
</form>

        <Upbtn/>









        {/* <form style={{padding:'1% 5%'}} onSubmit={handleWorkWithus}> <br/>
                <input type="text" className="form-control" ref={nameRef} id="name" placeholder="Enter Name" required/> <br/>
                <input type="number" className="form-control" ref={phoneRef} id="phone" placeholder="Phone no." required/> <br/>
                <input type="email" className="form-control" ref={emailRef} id="email" placeholder="Email" required/> <br/>
                <select className="form-control" id="work" ref={workRef} required>
                    <option value="Training">Training</option>
                    <option value="Internship">Internship</option>
                    <option value="Join us">Join us</option>
                    <option value="Course">Course</option>
                </select> <br />
                <input type="text" className="form-control" ref={domainRef} id="domain" placeholder="Domain" required/> <br/>
                <input type="text" className="form-control" ref={experienceRef} id="experience" placeholder="Experience" required/> <br/>
                <input type="number" className="form-control" ref={lastLpaRef} id="lastlpa" placeholder="Last LPA" required/> <br/>
                <input type="text" className="form-control" ref={collegeRef} id="college" placeholder="College name" required/> <br/>
                <input type="number" className="form-control" ref={cgpaRef} id="cgpa" placeholder="Current CGPA" required/> <br/>
                <input type="date" className="form-control" ref={passingyearRef} id="passingyear" placeholder="Passing Year" required/> <br/>
                <input type="text" className="form-control" ref={aboutRef} id="about" placeholder="About..." required/>
                <br />
                <button className="btn btn-rounded btn-danger" style={{float:'right'}}>Submit</button>
        </form>        */}
        </>
    )
}

export default Workwithintern;