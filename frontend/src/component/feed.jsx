import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {

    try {
      const fetchFeed = await axios.get("http://localhost:3000/feed?page=1&limit=3", { withCredentials: true });
      dispatch(addFeed(fetchFeed.data));

    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    getFeed();
  }, []);


  return (
    <>
      {feed && ( <div className="flex justify-center" ><UserCard  data={feed[2]} /></div>)}
    </>
  );
};

export default Feed;
