import { useState , useRef ,  useEffect } from "react";
import Themebtn from "../Utility/Themebtn";
import { SiNextdotjs } from "react-icons/si"; // icon of nexhub
import { TbLogin2 } from "react-icons/tb";
import { CiSquarePlus } from "react-icons/ci";
import NavPoints from "./NavPoint";
import API from "../../axiosconfig";
import { useNavigate } from "react-router";

const Navbar = ({theme , setTheme , user}) =>{             // other than toggle i copy grom gpt for outside click to hide

   const profp = "data:image/jpeg;base64,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";
    
    const [showMenu, setShowMenu] = useState('none');
    const navigate = useNavigate();

    const toggleMenu = () => {
        if(showMenu === 'none'){
            setShowMenu('show');
        }else{
            setShowMenu('none');
        }
    };

    const menuRef = useRef(null);  
    const buttonRef = useRef(null); 

        useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowMenu('none');
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleLogout = async () => {
        try {
        await API.post("/auth/logout");
        alert("Logged out");
        navigate("/");
        window.location.reload();
        } catch (err) {
        alert("Logout failed");
        }
    };

    return(
        <>
        <div className='navbar'>
           
            <h1 className="logo" onClick={() => {navigate("/home")}}><SiNextdotjs style={{color:'linear-gradient(  #23232B, #EF0D00 )', fontSize:'4rem'}} className='navicon' /></h1>

            <div><NavPoints/></div>
        
            <div style={{display:'flex' , padding:'5px' , alignItems:'center'}}>
                <Themebtn theme={theme} setTheme={setTheme} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="rightnav" style={{background:`url(${profp})` , backgroundSize:'cover' }} onClick={toggleMenu} ref={buttonRef} />
            </div>
        
        </div>
        <ul className={`rightnavul ${showMenu}`}  ref={menuRef}  >
            <li onClick={handleLogout}><TbLogin2 className="navicon" style={{color:' #EF0D00'}} /> &nbsp;&nbsp;&nbsp; Logout</li>
            <li onClick={()=> {navigate("/auth")}}><CiSquarePlus className="navicon" style={{color:' #EF0D00'}} /> &nbsp;&nbsp;&nbsp; Signup</li>
        </ul>


        </>
    )
}

export default Navbar;
