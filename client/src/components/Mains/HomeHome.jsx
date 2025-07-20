import Navbar from "../Navbar/Navbar";
import Homenav from "./HomeHome/Homenav";
import Homepage from "./HomeHome/Homepage";

const HomeHome = () => {
  return (
    <>
    <div style={{ display: 'flex' }}>
      <Homenav />
      <div style={{ flexGrow: 1, overflowY: 'auto', height: '90vh' }}>
        <Homepage />
      </div>
    </div>
    </>
  );
};

export default HomeHome;
