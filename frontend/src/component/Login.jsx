import React from "react";
import {useState} from "react";





const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (event) =>{
    event.preventDefault();
   console.log(email,password)

  }

  return (
    <>
      <div className="flex justify-center">
      <div className="card w-96 bg-base-300 card-xl shadow-sm my-5">
        <form  onSubmit = {loginHandler} className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          
            <p>{email}</p>
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
              <input type="email" value = {email} placeholder="mail@site.com" required onChange = {(event)=>setEmail(event.target.value)}/>
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          
            <p>{password}</p>
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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              value = {password}
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

          <div className="justify-center card-actions">
              <button type="submit" className="btn btn-primary">login</button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
