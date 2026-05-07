import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ useData }) => {

  const dispatch = useDispatch();

  const { firstName, lastName, gender, age } = useData;

  const [editFirstName, setFirstName] = useState(firstName);
  const [editLastName, setLastName] = useState(lastName);
  const [editGender, setGender] = useState(gender);
  const [editAge, setAge] = useState(age);
  const [error, setError] = useState("");
  const [showAlrtMessage, setAlrtMessage] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch("http://localhost:3000/profile/edit", { firstName: editFirstName, lastName: editLastName, gender: editGender, age: editAge }, { withCredentials: true });

      dispatch(addUser(res.data));
      setAlrtMessage(true);
      setTimeout(()=>{
        setAlrtMessage(false);
      },1000);

    } catch (err) {
      setError(err.response.data);
    }
  }



  return <>
    <fieldset className="fieldset bg-base-200 border-base-300 m-8 rounded-box w-xs border p-4">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        value={editFirstName}
        id="firstName"
        className="input"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        value={editLastName}
        id="lastName"
        className="input"
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="gender">Gender</label>
      <input
        type="text"
        value={editGender}
        id="gender"
        className="input"
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="age">Age</label>
      <input
        type="text"
        value={editAge}
        id="age"
        className="input"
        onChange={(e) => setAge(e.target.value)}
      />

      <p className=" alert-warning">
        {error}
      </p>

      <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save Profile</button>

    </fieldset>

    {showAlrtMessage && (<div className="toast toast-top toast-center my-15">
      <div className="alert alert-success">
        <span>Your profile has been updated.</span>
      </div>
    </div>)}

  </>

};

export default EditProfile;
