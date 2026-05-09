import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addFriends } from "../redux/friendsSlice"
import { useEffect } from "react";
import axios from "axios";

const Friends = () => {
  const dispatch = useDispatch();
  const friendsData = useSelector(items => items.friends);
  console.log(friendsData)


  const fetchFriends = async () => {

    try {
      const res = await axios.get("http://localhost:3000/user/connection", { withCredentials: true });

      dispatch(addFriends(res.data.data));

    } catch (error) {

      console.error(error);
    }

  }

  useEffect(() => {
    fetchFriends();
  },[])

  return <>
    <div className="card w-96 bg-blue-300 card-sm shadow-sm m-5">
      <div className="card-body">
        <h2 className="card-title">Small Card</h2>
      </div>
    </div>
  </>
}

export default Friends;