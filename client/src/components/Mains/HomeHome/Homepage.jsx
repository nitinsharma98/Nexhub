import { useState , useEffect } from "react";
import API from "../../../axiosconfig";
import About from "./About";
import Basecodes from "./Basecodes";
import Clock from "./Clock";
import Faqs from "./Faqs";
import Footer from "./Footer";
import Realfooter from "./RealFooter";
import ReviewSection from "./Reviews";
import Slides from "./Slides";

const Homepage = () => {

    const [data , setdata] = useState([]);

    const links = async() => { 
       try{
         const res = await API.get("/home/getmasterlinks");
        setdata(res.data.links); 
       }catch(error){
        setData(null)
       }
    }

    useEffect(()=>{
        links();
    },[])

    return  (
       <div className="homemain">
            <div id="time">
                <Clock/>
            </div>
            <br /><br /><br /><br />

             <div id="basecodes">
                <Basecodes/> 
            </div>
            <br /><br /><br /><br />
             
            <div id="about">
                <About/>
            </div>
            <br /><br /><br /><br />

            <div id="slides">
                <Slides/>
            </div>
            <br /><br /><br /><br />

            <hr /><br /><br />

            <div id="faqs">
                <Faqs/>
            </div>
            <br /><br /><br /><br />

            <div id="footer">
                <Realfooter data={data}/>
            </div>
            <br />
            <div id="links">
                <Footer data={data} />
            </div>
             <br /><br /><br /><br />
             <hr />
             <br /><br />

            <div id="reviews">
                <ReviewSection/>
            </div>

       </div>
    )
}

export default Homepage;