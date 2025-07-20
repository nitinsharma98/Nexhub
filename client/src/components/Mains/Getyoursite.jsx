import { useRef } from "react";
import API from "../../axiosconfig";

const Getyoursite = () => {

    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const budgetRef = useRef();
    const useforRef = useRef();
    const tillweeksRef = useRef();
    const aboutRef = useRef();
const handlebook = async (event) => {
    event.preventDefault(); // ✅ Prevent page refresh

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const address = addressRef.current.value;
    const budget = budgetRef.current.value;
    const usefor = useforRef.current.value;
    const tillWeeks = tillweeksRef.current.value;
    const about = aboutRef.current.value;

    try {
        const res = await API.post("/home/contact", {
            name, phone, email, address, budget, usefor, tillWeeks, about
        });
        alert("Success");

            nameRef.current.value = "";
            phoneRef.current.value = "";
            emailRef.current.value = "";
            addressRef.current.value = "";
            budgetRef.current.value = "";
            useforRef.current.value = "";
            tillweeksRef.current.value = "";
            aboutRef.current.value = "";

    } catch (err) {
        if (err.response && [400, 401, 402, 403].includes(err.response.status)) {
            alert("Invalid input: " + err.response.data.message);
        } else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
        }
    }
};


    return (
        <>

       <form
  style={{
    margin: ' 2rem auto',
    width: '80vw',
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  }}
  onSubmit={handlebook}
>
  <h3 className="text-center mb-4" style={{ color: '#EF0D00', fontWeight: '600' }}>Book a Service</h3>

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
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='gray' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 16px 16px;
        padding-right: 2.5rem;
      }

      input.form-control, textarea.form-control, select.form-control {
        border-radius: 8px;
        border: 1px solid #ccc;
        box-shadow: none;
        transition: border-color 0.3s ease;
      }

      input.form-control:focus,
      textarea.form-control:focus,
      select.form-control:focus {
        border-color: #EF0D00;
        box-shadow: 0 0 0 0.1rem rgba(239, 13, 0, 0.25);
      }
    `}
  </style>

  <div className="mb-3">
    <input type="text" className="form-control" ref={nameRef} placeholder="Full Name" required />
  </div>

  <div className="mb-3">
    <input type="Number" className="form-control" ref={phoneRef} placeholder="Phone Number" required />
  </div>

  <div className="mb-3">
    <input type="email" className="form-control" ref={emailRef} placeholder="Email Address" required />
  </div>

  <div className="mb-3">
    <input type="text" className="form-control" ref={addressRef} placeholder="Your Address" required />
  </div>

  <div className="mb-3">
    <select className="form-control" ref={useforRef} required>
      <option value="">Select Use Case</option>
      <option value="Personal use">Personal Use</option>
      <option value="Organization">Organization</option>
      <option value="local use">Local Use</option>
    </select>
  </div>

  <div className="mb-3">
    <input type="number" className="form-control" ref={budgetRef} placeholder="Estimated Budget (₹)" required />
  </div>

  <div className="mb-3">
    <input type="number" className="form-control" ref={tillweeksRef} placeholder="Number of Weeks" required />
  </div>

  <div className="mb-3">
    <textarea className="form-control" rows="4" ref={aboutRef} placeholder="Tell us about your requirement..." required />
  </div>

  <div className="text-end">
    <button type="submit" className="btn btn-danger px-4 py-2" style={{ borderRadius: '25px', fontWeight: '500' }}>
      Submit
    </button>
  </div>
</form>










        {/* <form style={{margin:'5vw 15vw' , width:'70vw'}} onSubmit={handlebook}> <br/>
                <input type="text" className="form-control" ref={nameRef} id="name" placeholder="Enter Name" required/> <br/>
                <input type="number" className="form-control" ref={phoneRef} id="phone" placeholder="Phone no." required/> <br/>
                <input type="email" className="form-control" ref={emailRef} id="email" placeholder="Email" required/> <br/>
                <input type="text" className="form-control" ref={addressRef} placeholder="Address" required/> <br/>
                <select className="form-control" id="usefor" ref={useforRef} required>
                    <option value="Personal use">Personal Use</option>
                    <option value="Organization">Organization</option>
                    <option value="local use">Local use</option>
                </select> <br />
                <input type="text" className="form-control" ref={budgetRef} placeholder="Budget" required/> <br/>
                <input type="number" className="form-control" ref={tillweeksRef}  placeholder="tillweeks" required/> <br/>
                <input type="text" className="form-control" ref={aboutRef} id="about" placeholder="About..." required/>
                <br />
                <button className="btn btn-rounded btn-danger" style={{float:'right'}}>Submit</button>
        </form>        */}
        </>
    )
}

export default Getyoursite;