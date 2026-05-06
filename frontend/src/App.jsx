import { useEffect, useState } from "react";
import NavBar from "./component/NavBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice.js";


function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));

    } catch (error) {


      if (error.response?.status === 401) {
        navigate("/login");
        return;
      };

      console.error(error);


    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default App;
