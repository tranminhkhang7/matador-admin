import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { Button } from '@material-ui/core';
import AuthService from '../services/AuthService';

function Signin() {
  let navigate = useNavigate();

  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      // setLoadingModalOpen(true);
      const payload = { email, password };

      var pathname = "/settings/account";
      AuthService.login(payload)
        .then((res) => {
          // console.log(res.data.token);


          // Set the cookies
          const accessToken = res.data.token;
          const userRole = 'admin'; // chỉnh lại nhe

          const cookieOptions = {
            expires: new Date(Date.now() + 3600 * 1000 * 24), // Set the expiration date to 24 hours from now
            path: '/',
            secure: true, // Only send the cookie over HTTPS
            // httpOnly: true, // Prevent JavaScript code from accessing the cookie
          };

          document.cookie = `access_token=${JSON.stringify(accessToken)}; SameSite=strict; ${Object.entries(cookieOptions).map(([k, v]) => `${k}=${v}`).join('; ')}`;
          document.cookie = `user_role=${JSON.stringify(userRole)}; SameSite=strict; ${Object.entries(cookieOptions).map(([k, v]) => `${k}=${v}`).join('; ')}`;

          navigate("/books");
          // setLoadingModalOpen(false);
          // toast.success("Welcome Back");
        })
        .catch((err) => {
          // setIsError(true);
          // setErrorMessage(err.response.data.message);
          // setLoadingModalOpen(false);
          // console.log(err.response.data);
        });
    } else {

      // setErrorMessage("Usename or password cannot be empty!");
    }

  };

  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"></div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Welcome back! ✨</h1>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input
                      required
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      id="email"
                      className="form-input w-full"
                      type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      id="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="on" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    {/* <Link className="text-sm underline hover:no-underline" to="/reset-password">Forget password?</Link> */}
                  </div>
                  <input type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" />




                </div>
              </form>

            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full"
            src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            width="760"
            height="1024"
            alt="Authentication" />
        </div>

      </div>

    </main>
  );
}

export default Signin;