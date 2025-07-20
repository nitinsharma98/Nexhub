import './App.css';
import API from "./axiosconfig"; // already has withCredentials
import { useEffect, useState } from "react";
import {createBrowserRouter , createRoutesFromElements , Route , RouterProvider} from "react-router-dom"

import LandingPage from "./page/LandingPage";
import Mainpage from "./page/Mainpage";
import HomeLayout from "./layouts/HomeLayout";
import Loader from "./components/Utility/Loader";
import HomeHome from './components/Mains/HomeHome';
import Getyoursite from './components/Mains/Getyoursite';
import Certificate from './components/Mains/Certificate';
import Workwithus from './components/Mains/Workwithintern';
import Editme from './components/Mains/Editme';
import Recomended from './components/Mains/Recomended';
import Friends from './components/Mains/Friends';
import Posts from './components/Mains/Posts';
import Comchat from './components/Mains/Comchat';
import Uploadcodes from './components/Mains/Uploadcodes';
import Profile from './components/Mains/Profie';
import Newpost from './components/Mains/NewPost';
import Notification from './components/Mains/Notification';
import Codes from './components/Mains/Codes';
import ComRegister from './components/Mains/Comregister';
import Master from './components/Master/Master';
import Homebase from './components/Utility/Homebase';
import Docs from './components/Mains/Docs';
import ShowSpPost from './components/Utility/ShowSpPost';
import NotFound from './components/Utility/NotFound';




function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me', { withCredentials: true });
        setUser(res.data.user);
        // alert(`Logged in as:, ${res.data.user.fullName}`);
      } catch (err) {
        setUser(null); 
        // alert("User not logged in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div> <Loader/> </div>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomeLayout user={user} />}>
          <Route index element={<Homebase/>} />
          <Route path='home' element={<Mainpage setTheme={setTheme} theme={theme} user={user} />}>
            <Route index element={<HomeHome/>}/>
            <Route path='getsite' element={<Getyoursite/>}/>
            <Route path='getcertificate' element={<Certificate/>}/>
            <Route path='work' element={<Workwithus/>}/>
          </Route>
          <Route path='connections' element={<Mainpage  setTheme={setTheme} theme={theme} user={user} />}>
            <Route path='recomended' element={<Recomended/>}/>
            <Route path='friends' element={<Friends/>}/>
            <Route path='posts' element={<Posts/>}/>
            <Route path='notifications' element={<Notification/>}/>
            <Route path='sppost'  >
              <Route path=':id' element={<ShowSpPost/>} />
            </Route>   
          </Route>
          <Route path='learn' element={<Mainpage  setTheme={setTheme} theme={theme} user={user} />}>
            <Route path='com_posts' element={<Posts/>}/>
            <Route path='codes' element={<Codes/>}/>
            <Route path='docs' element={<Docs/>}/>
          </Route>
          <Route path='community' element={<Mainpage  setTheme={setTheme} theme={theme} user={user} />}>
            <Route path='chats' element={<Comchat/>}/>
            <Route path='codes' element={<Codes/>}/>
            <Route path='uploadcodes' element={<Uploadcodes/>}/>
          </Route>
          <Route path='setting' element={<Mainpage  setTheme={setTheme} theme={theme} user={user} />}>
            <Route path='myprofile' element={<Profile/>}/>
            <Route path='editprofile' element={<Editme/>}/>
            <Route path='communityregister' element={<ComRegister/>}/>
            <Route path='newpost' element={<Newpost/>}/>
            <Route path='MASTER_COM' element={<Master/>}/>
          </Route>
          <Route path="auth" element={<LandingPage/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Route>
    )
  )

  return (
    <div className={`main ${theme}`}>
        <RouterProvider router={router}/>  
    </div>
  );
}

export default App;