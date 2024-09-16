import React from "react";
import '../App.css';
import { useState } from "react";
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth"; // Fix import statement
import { Button } from "@mui/material";
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
// function SignUpPage({func}) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const signUpIwthGoogle = () =>{
//         signInWithPopup(auth,googleProvider);
//     } 
//     const createUser =() =>{
//         createUserWithEmailAndPassword(auth,email,password).then(value=>alert("success")).catch(value=>alert("user already exists "+value));
//     }
//     return ( // Add return statement
//         <div className="container w-full  h-2/4">
//             <h1>SignUp page</h1>
//             <input className="border border-black p-3 m-2" onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" />
//             <br/>

//             <input className="border border-black p-3 m-2" onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder="enter your password" />
//             <br/>

//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={createUser} >Sign Up</button>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={signUpIwthGoogle} >Sign Up with google</button>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={ ()=>func(true) }>Already have an account</button>
//         </div>
//     );
// }
// export default SignUpPage;


function SignUpPage({func}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const signUpIwthGoogle = () =>{
        signInWithPopup(auth,googleProvider);
    } 
    function validateEmail(email) {
        // Regex pattern for basic email validation
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }  
    const createUser =(e) =>{
        e.preventDefault();
        if(!validateEmail(email)){
            alert("Enter a valid Email");
            return;
        }
        if(confirmPassword!=password){
            alert("Password must match with Confirm Password");
            return;
        }
        createUserWithEmailAndPassword(auth,email,password).then(value=>alert("success")).catch(value=>alert("user already exists "+value));
    }
    return ( // Add return statement
        <section class="bg-gray-50 dark:bg-gray-900 h-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} value={password} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <button onClick={e=>createUser(e)} class="w-full bg-blue-400 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase bg-gradient-to-r from-pink-500 to-blue-500 border-none cursor-pointer transition-transform transform hover:scale-95 neon-shadow neon-shadow-hover">Create an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Button onClick={ ()=>func(true)} class="font-medium text-blue-500 text-primary-600 hover:underline dark:text-primary-500">Login here</Button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    );
}
export default SignUpPage;
