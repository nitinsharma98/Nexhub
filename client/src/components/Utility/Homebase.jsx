import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homebase = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home"); // 🔁 safe to navigate here
  }, [navigate]);

  return null; // or a loading spinner if needed
};

export default Homebase;
