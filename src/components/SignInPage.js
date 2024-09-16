import React from "react";
import '../App.css'
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Fix import statement
import { app } from '../firebase';
const auth = getAuth(app);

function SignInPage({func}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Loginuser =() =>{
        signInWithEmailAndPassword(auth,email,password).then(value=>alert("signed in success")).catch((err)=>alert("user does not exists "+err));
    }
    return (
        <section class="bg-gray-50 dark:bg-gray-900 h-screen">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <div class="space-y-4 md:space-y-6">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" id="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} value={password} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                  </div>
                  <button onClick={Loginuser} class="w-full bg-blue-400 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase bg-gradient-to-r from-pink-500 to-blue-500 border-none cursor-pointer transition-transform transform hover:scale-95 neon-shadow neon-shadow-hover">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a onClick={ ()=>func(false)} class="font-medium text-primary-600 hover:underline dark:text-cyan-700 cursor-pointer" >Sign up</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>
        
    );
}
export default SignInPage;