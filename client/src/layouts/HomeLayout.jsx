import { Outlet , useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomeLayout = ({user}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);


    return(
        <>
            <Outlet/>
        </>
    )
}

export default HomeLayout;