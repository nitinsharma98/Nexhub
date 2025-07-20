import Allposts from "./Posts/Allposts";
import Communityposts from "./Posts/Communityposts";
import Upbtn from "../Utility/Upbtn";

const Posts = () => {

    if(window.location.href === 'http://localhost:5173/learn/com_posts'){
        return(
            <>
                <Communityposts/>
                <Upbtn/>
            </>
        )
    }

    return (
        <>
        <Allposts/>
        <Upbtn/>
        </>
    )
}

export default Posts;