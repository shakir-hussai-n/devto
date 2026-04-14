import {useEffect,useState} from "react";
import NavBar from "./component/NavBar.jsx";
import { Outlet,useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "./redux/userSlice.js";


function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const[loader,setLoader]=useState(true)
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      
      
    } catch (error) {
      if(error.response?.status === 401){
        navigate("/login");
      }
     console.log(error);
       
      
    }finally{
      setLoader(false)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if(loader) return <p>Loading.......</p>
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default App;
