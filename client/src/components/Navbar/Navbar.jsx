import { useState , useRef ,  useEffect } from "react";
import Themebtn from "../Utility/Themebtn";
import { SiNextdotjs } from "react-icons/si"; // icon of nexhub
import { TbLogin2 } from "react-icons/tb";
import { CiSquarePlus } from "react-icons/ci";
import NavPoints from "./NavPoint";
import API from "../../axiosconfig";
import { useNavigate } from "react-router";

const Navbar = ({theme , setTheme , user}) =>{             // other than toggle i copy grom gpt for outside click to hide

    const profp ="https://tse1.mm.bing.net/th/id/OIP.Kiidro98U3GN-0gOU259UwHaHa?pid=Api&P=0&h=180" ;
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

   
        
        document.addEventListener("mousedown", handleClickOutside);


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
