import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function SignInPage({ func }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signed-in successfully");
        /* If <App/> relies on func(true) to switch to login mode you can call that here.
           But the router redirect is all you really need. */
        // navigate("/Homepage");           // ⬅️ send user to the home/dashboard
      })
      .catch((err) => alert("Login failed: " + err.message));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                onClick={loginUser}
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 hover:scale-95 transition-transform neon-shadow neon-shadow-hover"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <span
                  onClick={() => func(false)}
                  className="font-medium text-cyan-700 hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
