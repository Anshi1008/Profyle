import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Fix import statement
import { app } from '../firebase';
const auth = getAuth(app);

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Loginuser =() =>{
        signInWithEmailAndPassword(auth,email,password).then(value=>alert("signed in success")).catch((err)=>alert("user does not exists "+err));
    }
    return ( // Add return statement
        <div className="container w-full  h-2/4">
            <h1>SignIn page</h1>
            <input className="border border-black p-3 m-2" onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" />
            <br/>

            <input className="border border-black p-3 m-2" onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder="enter your password" />
            <br/>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={Loginuser} >Sign In</button>
        </div>
    );
}
export default SignInPage;