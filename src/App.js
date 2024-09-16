import { useEffect, useState } from 'react';
import Nav from './components/Nav'
import './App.css';
import Profile_page from './components/Profile_page';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import Homepage from './components/Homepage';
import { BrowserRouter,Routes,Route,Switch, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { app } from './firebase';
import { getDatabase,ref,set } from 'firebase/database';
import { getFirestore, collection, addDoc,  query, where, getDocs, doc,getDoc, updateDoc, arrayUnion, arrayRemove  } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut } from 'firebase/auth';
import Temp from './Temp';
import SearchResultPage from './SearchResultPage';
import UserProfile from './UserProfile';
import ImagePage from './ImagePage';
import EditProfile from './EditProfile';
const auth = getAuth(app);

const firestore = getFirestore(app);
  
  // const getUser = async (email,flag) =>{
  //   console.log("data fetched in getuser for email = ",email);
  //   const q = query(collection(firestore, "UserData"), where("email", "==", email));
  //   let snapshot = await getDocs(q);
  //   const currentUserDoc = snapshot.docs[0];
    
  //   if(currentUserDoc.data().posts.length==0 && !flag)return null;
  //   return await currentUserDoc;
  // }
  const getUser = async (email,flag) =>{
    // console.log("data fetched in getuser for email = ",email);
    const q = query(collection(firestore, "UserData"), where("email", "==", email));
    let snapshot = await getDocs(q);
    const currentUserDoc = snapshot.docs[0];
    
    if(currentUserDoc.data().posts.length==0 && !flag)return null;
    return await currentUserDoc;
  }
  
  const addPost = async (curr1,tittle,image,date) =>{
    // console.log("data changes in addpost");
    const currentUserDocRef = doc(firestore, 'UserData', curr1.id);
    // console.log("data fetched for addpost for id = ",curr1.id);
    await updateDoc(currentUserDocRef, {
      posts: arrayUnion({
        tittle:tittle,
        image:image,
        date:date
      })
    });
  }
  const addFollower = async (email, curr) => {
    
    // console.log("data changes in addFollower");
    try {
      // Fetch the current user's document
      const currentUserQuery = query(collection(firestore, "UserData"), where("email", "==", curr.email));
      const currentUserSnapshot = await getDocs(currentUserQuery);
      
      if (currentUserSnapshot.empty) {
        console.log("Current user not found");
        return false;
      }
      
      const currentUserDoc = currentUserSnapshot.docs[0];
      const currentUserDocRef = doc(firestore, 'UserData', currentUserDoc.id);
      const currentUser = currentUserDoc.data();
      // Get the friend's data
      const friendQuery = query(collection(firestore, "UserData"), where("email", "==", email));
      let friendSnapshot = await getDocs(friendQuery);
      
      if (friendSnapshot.empty) {
        console.log("No user found with the given email");
        return false;
      }
      
      const friendDoc = friendSnapshot.docs[0];
      const friendData = friendDoc.data();
      const friendDocRef = doc(firestore, 'UserData', friendDoc.id);
      
      // Check if the friend is already a follower
      const isFollower = currentUser.following.includes(email);
      const isFollowing = friendData.followers.includes(curr.email);
      
      if (isFollower) {
        // Remove follower
        await updateDoc(currentUserDocRef, {
          following: arrayRemove(email)
        });
        await updateDoc(friendDocRef, {
          followers: arrayRemove(curr.email)
        });
        console.log("Follower removed successfully");
        return false;
        // alert("Follower removed successfully");
      } else {
        // Add follower
        await updateDoc(currentUserDocRef, {
          following: arrayUnion(email)
        });
        await updateDoc(friendDocRef, {
        followers: arrayUnion(curr.email)
      });
      console.log("Follower added successfully");
      return true;
      // alert("Follower added successfully");
    }
  } catch (error) {
    console.error("Error updating follower: ", error);
    // console.error("Error updating follower");
    return false;
  }
  return false;
}

let handleImageDelete = async (email,index,tittle) =>{
    // console.log("data changes in imageDelete");
    try {
      const currentUserQuery =await query(collection(firestore, "UserData"), where("email", "==", email));
      const currentUserSnapshot = await getDocs(currentUserQuery);
      const currentUserDoc =  currentUserSnapshot.docs[0];
      const currentUserDocRef = doc(firestore, 'UserData', currentUserDoc.id);
      const posts =await currentUserDoc.data().posts;
      if(posts.length<=index || posts[index].tittle != tittle)return null;
      if (index > -1 && index < posts.length) {
        posts.splice(index, 1);
      } else {
        console.error("Index out of bounds");
        return null;
      }
      await updateDoc(currentUserDocRef,{posts: posts})
      const updatedDoc = await getDoc(currentUserDocRef);
      console.log("Document successfully updated! returning ",updatedDoc.data());
      return updatedDoc.data();
    } catch (error) {
      console.log("could not delete image "+error);
      return null;
    }
  }

  const UserDataChangeHandler = async (about,branch,contact,profileImage,username,website,email) =>{
    // console.log("data changes in userDataChangeHandler");
    try {
      const currentUserQuery = await query(collection(firestore, "UserData"), where("email", "==", email));
      const currentUserSnapshot = await getDocs(currentUserQuery);
      const currentUserDoc = currentUserSnapshot.docs[0];
      const currentUserDocRef = doc(firestore, 'UserData', currentUserDoc.id);
      await updateDoc(currentUserDocRef,{
        about:about,
        branch:branch,
        contact:contact,
        profileImage:profileImage,
        username:username,
        website:website,
      });
      alert("changes applied successfully");
      const updatedDoc = await getDoc(currentUserDocRef);
      return updatedDoc.data();
    } catch (error) {
      console.log("could not change user data ",error);
      return null;
    }
  }
  
  //ise export karke homepage me se call kar rhe hai
  export { addFollower ,addPost, getUser,handleImageDelete,UserDataChangeHandler};
  // import Temp from './Temp';
  
  
  function isSubsequence(s, t) {
    let i = 0;
    for (let j = 0; j < t.length; j++) {
      if (s[i] === t[j]) {
        i++;
      }
      if (i === s.length) {
        return true;
      }
    }
    return i === s.length;
  }
  
function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userExists,setUserExists] = useState(false);
  const [user,setUser] = useState(null);
  const [flag,setFlag] = useState(false);
  const [u,setu]  =useState();  
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('User signed out successfully.');
      navigate('/'); // Redirect to home page
    })
    .catch((error) => {
      // An error happened during sign-out.
      console.error('Error signing out:', error);
    });
  };
  
  const writeData = async (username,website,email,userAbout,contactDetails,branch,Followers,following,posts) => {
    
    // console.log("data changes in writeData");
    //here wirte logic so that if a user exists with same email then no alter will happen
    const q = await query(collection(firestore, "UserData"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    //first time user aaya hai so we are gonna call function to initailize variables
    // console.log("useeffect worked");
    if(querySnapshot.empty){
      
      await addDoc(collection(firestore,'UserData'),{
        username:username,
        website:website,
        email:email,
        about:userAbout,
        contact:contactDetails,
        branch:branch,
        followers:Followers,
        following:following,
        posts : posts,
        profileImage:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
      });
    }
    const p = query(collection(firestore, "UserData"), where("email", "==", email));
    let k = await getDocs(p);
    
    setu(k.docs[0]);
    setFlag(true);
  };
  let hendleSearchEvent = (initial) =>{
    let tempo = [];
    for(let obj of data){
      if(obj.email == user.email)continue;
      if(isSubsequence(obj.username.toLowerCase(),initial.toLowerCase()) || isSubsequence(initial.toLowerCase(),obj.username.toLowerCase())){
        tempo.push(obj);
      }
    }
    // alert("function called with string s = "+initial);
    navigate('/searchResult',{ state: {string:"Search Results",users:tempo,curr:u.data()} });
  }
  
  
  
  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        // alert("you are now logged in");
        setUser(user);
        
        // console.log("data changes in Useeffect");
        const q = query(collection(firestore, "UserData"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        try {
          const querySnapshot = await getDocs(collection(firestore, "UserData"));
          const dataArray = [];
          querySnapshot.forEach((doc) => {
            dataArray.push({ id: doc.id, ...doc.data() });
          });
          setData(dataArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }  
        writeData('UserName',"https://www.linkedin.com/in/aditya-mishra-b11a63205/",user.email,"nothing specilal in about","6723849","cs-ai",[],[],[]);
      }else{
        setFlag(false);
        setUser(null);
      }
    })
  },[])
  
  return (
    
    <>
      {(user && flag && u)? (
        <div className='appdiv'>   
          <Nav search={hendleSearchEvent} curr={u.data()} user={u.data()} id={u.id}/>
          <Routes>
            {/* <Route path = "/" element={<h1 className='text-green-500'> this is the base page</h1>} /> */}
             {/* <Route path="/" element={<Navigate to="/UserProfile" />} /> */}
             <Route path="/" element={<Navigate to="/Homepage" />} />
            <Route path = "/add" element={<Temp/>} />
            <Route path = "/update" element={< Profile_page />} />
            <Route path = "/Homepage" element={< Homepage curr1={u} />} />
            <Route path = "/UserProfile" element={< UserProfile />} />
            <Route path = "/Post" element={< ImagePage />} />
            <Route path = "/searchResult" element={< SearchResultPage  />} />
            <Route path = "/editProfile" element={< EditProfile />} />
          </Routes>
        <p>Welcome, User! You are logged in. your email is {user.email} and name is {u.data().username}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleLogout}>Log Out</button>
        </p>
        </div>
      ) : (
        <p>
          {
            userExists?(
              <p>
              <Routes>
                <Route path = "/Homepage" element={<Navigate to="/" />} />
              </Routes>
                <SignInPage func={setUserExists}/>
              </p>
            ):(
              <p>
                <SignUpPage func = {setUserExists}/>
              </p>
            )
          }
        </p>
      )}
  </>
  );
}

export default App;
