import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [gmail, setEmail] = useState("elonmusk@gmail.com");
  const [password, setPassword] = useState("ELON@gmail.com1");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          gmail,
          password,
        },
        { withCredentials: true },
      );
      
      dispatch(addUser(res.data.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "something wrong!");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="card w-96 bg-base-300 card-xl shadow-sm my-5">
          <form
            onSubmit={loginHandler}
            className="card-body flex flex-col gap-4"
          >
            <h2 className="card-title justify-center">Login</h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium md">
                Email ID :
              </label>
              <label className="input validator join-item">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  id="email"
                  type="email"
                  value={gmail}
                  placeholder="mail@site.com"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password :
              </label>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>
            <div className="card-actions flex-col  gap-3 items-start">
              <p className="text-red-500">{error}</p>
              <button type="submit" className="btn btn-primary self-center">
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
