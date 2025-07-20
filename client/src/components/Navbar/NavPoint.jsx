import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router";

const NavPoints = () => {
    const [showMenu, setShowMenu] = useState('none');
    const [openDropdown, setOpenDropdown] = useState(null); // 'a', 'b', etc.

    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(prev => prev === 'none' ? 'show' : 'none');
    };

    const handleDropdownClick = (key) => {
        setOpenDropdown(prev => prev === key ? null : key);
    };

    return (
        <>
            <div className="hamburger">
                <GiHamburgerMenu className="hamburgeri" onClick={toggleMenu} />
            </div>

            <ul className={`navhop ${showMenu}`} ref={menuRef}>
                <li onClick={() => handleDropdownClick('a')}>Home <MdOutlineKeyboardArrowDown />
                    <ul className={`nav-nav-options ${openDropdown === 'a' ? 'show' : ''}`}>
                        <NavLink to='/home'><li>Home</li></NavLink>
                        <NavLink to='/home/getsite'><li>Get your Website</li></NavLink>
                        <NavLink to='/home/getcertificate'><li>Certificate</li></NavLink>
                        <NavLink to='/home/work'><li>Work with us</li></NavLink>
                    </ul>
                </li>
                <li onClick={() => handleDropdownClick('b')}>Connection <MdOutlineKeyboardArrowDown />
                    <ul className={`nav-nav-options ${openDropdown === 'b' ? 'show' : ''}`}>
                        <NavLink to='/connections/recomended'><li>Recommended Users</li></NavLink>
                        <NavLink to='/connections/friends'><li>My Friends</li></NavLink>
                        <NavLink to='/connections/posts'><li>Posts</li></NavLink>
                        <NavLink to='/connections/notifications'><li>Notifications</li></NavLink>
                    </ul>
                </li>
                <li onClick={() => handleDropdownClick('c')}>Learn Coding <MdOutlineKeyboardArrowDown />
                    <ul className={`nav-nav-options ${openDropdown === 'c' ? 'show' : ''}`}>
                        <NavLink to='/learn/com_posts'><li>Community Posts</li></NavLink>
                        <NavLink to='/learn/codes'><li>Code Template</li></NavLink>
                        <NavLink to='/learn/docs'><li>Documentation</li></NavLink>
                    </ul>
                </li>
                <li onClick={() => handleDropdownClick('d')}>Community <MdOutlineKeyboardArrowDown />
                    <ul className={`nav-nav-options ${openDropdown === 'd' ? 'show' : ''}`}>
                        <NavLink to='/community/chats'><li>Community Chats</li></NavLink>
                        <NavLink to='/community/codes'><li>Community Codes</li></NavLink>
                        <NavLink to='/community/uploadcodes'><li>Upload your code</li></NavLink>
                    </ul>
                </li>
                <li onClick={() => handleDropdownClick('e')}>Setting <MdOutlineKeyboardArrowDown />
                    <ul className={`nav-nav-options ${openDropdown === 'e' ? 'show' : ''}`}>
                        <NavLink to='/setting/myprofile'><li>My Profile</li></NavLink>
                        <NavLink to='/setting/editprofile'><li>Edit Profile</li></NavLink>
                        <NavLink to='/setting/communityregister'><li>Community Register</li></NavLink>
                        <NavLink to='/setting/newpost'><li>New Posts</li></NavLink>
                        <NavLink to='/setting/MASTER_COM'><li>Community Owner</li></NavLink>
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default NavPoints;
