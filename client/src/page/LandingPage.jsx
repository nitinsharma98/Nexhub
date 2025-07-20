import { useState } from "react";
import Signup from "../components/Entry/Signup";
import Login from "../components/Entry/Login";

function LandingPage(){

    const [entry , setentry] = useState("signup");

    return (
        <>
        <div className="landing">
                <div className="one">
                <center>
                    <h1>Welcome to NexHub</h1>
                    <hr /><br /><br />
                    <p>
                        NexHub isn’t just another coding website. It’s your complete development ecosystem. Whether you're a beginner building your first app or a pro refining large-scale solutions, NexHub offers everything you need — from pre-optimized code snippets to industry-recognized certifications.
                        <br /> <br />
                        We’ve blended the best of learning platforms, developer tools, and social collaboration into one powerful space. Get instant access to reusable, production-ready code for real projects, post your own code templates, and explore a growing library of components built by developers like you.
                    </p>
                    <br /><br />
                    <ul>
                        <li>🚀 Free & Paid Ready-to-Use Code Templates</li>
                        <li>🎓 Industry-Grade Courses & Internships with Certificates</li>
                        <li>💼 Direct Access to Job Opportunities</li>
                        <li>🤝 Collaborate in Live Coding Teams & Communities</li>
                        <li>❓ Post Doubts & Get Real-Time Help from Fellow Coders</li>
                        <li>🌐 Build Your Coding Profile Like a Social Network
                    </li>
                    </ul>   
                    <br /> <br />
                    { (entry === "login") ?
                         <p>Not a member yet? <span style={{cursor:'pointer' , color:'red'}} onClick={()=> setentry("signup")}> Signup</span></p> :
                         <p>Already have an account? <span style={{cursor:'pointer' , color:'red'}} onClick={()=> setentry("login")}> Login</span></p>  
                    }
                       
                                         
                </center>
                </div>
                <div className="two">
                   { (entry === "login") ? <Login /> : <Signup />}
                </div>
            </div>
        </>
    )
}

export default LandingPage;