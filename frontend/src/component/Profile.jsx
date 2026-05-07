import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const select = useSelector((store) => store.user);

  return <>{select && <EditProfile useData={select} />}</>;
};

export default Profile;
