import { FaAngleDoubleUp } from "react-icons/fa";

function Upbtn (){

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    };

    return (
        <>
         <FaAngleDoubleUp style={{position:'fixed' , bottom:'10px' , right:'10px' ,  fontSize:'4rem' , padding:'10px' , cursor:'pointer'}}  onClick={scrollToTop} />
        </>
    )
}

export default Upbtn;