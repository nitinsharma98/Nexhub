import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const Mainpage = ({setTheme , theme , user}) => {

    return (
        <>
        <Navbar setTheme={setTheme} theme={theme} user={user} />
        <div className="mainpage">
            <Outlet/>
        </div>
        </>
    )
}

export default Mainpage;