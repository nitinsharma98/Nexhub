import Freecodes from "./Codes/Freecodes";
import Paidcodes from "./Codes/Paidcodes";
import Upbtn from "../Utility/Upbtn";

const Codes = () => {
    if(window.location.href === 'http://localhost:5173/learn/codes')
    return(
        <>
        <Freecodes/>
        <Upbtn/>
        </>
    ) 

    return(
        <>
         <Paidcodes/>
         <Upbtn/>
         </>
    )
}

export default Codes;