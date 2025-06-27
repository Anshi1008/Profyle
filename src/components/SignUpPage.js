import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";

const auth           = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function SignUpPage({ func }) {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPassword, setConfirm]   = useState("");

  const navigate = useNavigate();

  const validateEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const createUser = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Enter a valid email");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password must match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created successfully");
        /* After sign-up you can either:
           1. navigate("/Homepage") to auto-login (if you keep auth state),
           2. call func(true) to show the Sign-In page, or
           3. do both. */
        navigate("/Homepage");
      })
      .catch((err) => alert("Unable to sign up: " + err.message));
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => navigate("/Homepage"))
      .catch((err) => alert("Google auth failed: " + err.message));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form className="space-y-4" onSubmit={createUser}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 hover:scale-95 transition-transform neon-shadow neon-shadow-hover"
              >
                Create an account
              </button>

              <button
                type="button"
                onClick={signUpWithGoogle}
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-red-500 hover:bg-red-600 transition-colors"
              >
                Sign up with Google
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <span
                  onClick={() => func(true)}
                  className="font-medium text-blue-500 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
