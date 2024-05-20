import { useEffect, useState } from 'react';
import Nav from './components/Nav'
import './App.css';
import Profile_page from './components/Profile_page';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import Homepage from './components/Homepage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { app } from './firebase';
import { getDatabase,ref,set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut } from 'firebase/auth';
// const db = getDatabase(app);
const auth = getAuth(app);

// import Temp from './Temp';
function App() {
  // const putData = () =>{
  //   set(ref(db,"user/aditya"),{
  //     id:1,
  //     name:"Aditya Mishra",
  //     age:20
  //   });
  // };
  // const [authors,setAuthor] = useState([]);
  
  // useEffect(()=>{
    //   const fetchData = async () => {
      //     const result = await fetch('http://localhost:5000/users');
      //     const res = await result.json();
      //     setAuthor(res);
      //   }
      //   fetchData();
      // },[])
      
      // const submitAuthor = async () => {
        //   const myData = {
          //     name : "aditya mishra",
  //     password: "12345",
  //     age : 5
  //   }
  //   try{
    
    //     const res = await fetch('http://localhost:5000/users',{
      //       method : 'post',
      //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify(myData)
        //     })
        //     const result  = await res.json();
        //     await setAuthor(prev => [...prev,result])
        //     console.log(authors);
        //   }catch(e){
  //     console.log(e);
  //   }
  // }
  const [userExists,setUserExists] = useState(false);
  const [user,setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        // alert("you are now logged in");
        setUser(user);
      }else{
        // alert("you are now logged out");
        setUser(null);
      }
    })
  },[])

  return (
    // <>
    //    <button onClick={submitAuthor}>save new data</button>
    //    <div className='container'>
    //    <h2>Authors are : </h2>
    //    {authors.map( a=>
    //   <ul>
    //     <li>Name:{a.name}</li>
    //     <li>password:{a.password}</li>
    //     <li>age:{a.age}</li>
    //   </ul>
    //   )}
    //  </div> 
    //   </>
    <>
      {user ? (
        <div className='appdiv'>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path = "/" element={<h1 className='text-green-500'> this is the base page</h1>} />
            <Route path = "/add" element={<h1 className='text-green-500'> adding is the base page</h1>} />
            <Route path = "/update" element={< Profile_page />} />
            <Route path = "/Homepage" element={< Homepage />} />
          </Routes>
          </BrowserRouter>
        <p>Welcome, User! You are logged in. your email is {user.email}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={ ()=>signOut(auth) }>Log Out</button>
        </p>
        </div>
      ) : (
        <p>
          {
            userExists?(
              <p>
                <SignInPage/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={ ()=>setUserExists(false) }>Create a new account</button>
              </p>
            ):(
              <p>
                <SignUpPage/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={ ()=>setUserExists(true) }>Already have an account</button>
              </p>
            )
          }
        </p>
      )}
  </>
  );
}

export default App;
