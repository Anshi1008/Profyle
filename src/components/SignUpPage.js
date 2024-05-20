import React from "react";
import { useState } from "react";
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth"; // Fix import statement
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signUpIwthGoogle = () =>{
        signInWithPopup(auth,googleProvider);
    } 
    const createUser =() =>{
        createUserWithEmailAndPassword(auth,email,password).then(value=>alert("success")).catch(value=>alert("user already exists "+value));
    }
    return ( // Add return statement
        <div className="container w-full  h-2/4">
            <h1>SignUp page</h1>
            <input className="border border-black p-3 m-2" onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" />
            <br/>

            <input className="border border-black p-3 m-2" onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder="enter your password" />
            <br/>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={createUser} >Sign Up</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={signUpIwthGoogle} >Sign Up with google</button>
        </div>
    );
}
export default SignUpPage;
