import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { addFollower } from './App';
import { getUser } from './App';
import './App.css';
const UserProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {f, curr,user,id } = location.state || {};
    const [followState,setFollowState] = useState(false);
    const [flag,setFlag] = useState(false);
    let editPageNavigator = ()=>{
      navigate('/editProfile',{state : {user}});
    }
    let ImageClickHandller = (index,post) =>{
      let usermail = curr.email;
      navigate('/Post',{ state: {email,post,index,usermail } });
    }
    const follow = async () =>{
      let flagbit = await addFollower(email,curr);
      setFollowState(flagbit);
      console.log(" flagbit for follow = "+followState);
    }
//     const followfollowingHandler = async (string,curr)=>{
//       console.log("followfollowingHandler called with "+string);
//       if(string == "Following"){
//         //follwoing search start
//         let p = [];
//         // let n = curr.following.length;
//         // console.log(curr.following+" "+curr.following.length);
//         for (let i = 0; i < curr.following.length; i++) {
//           let newpost = await getUser(curr.following[i],true);
//           if (newpost !== null) {
//             p.push(newpost.data() );
//           }
//         }
//         navigate('/searchResult',{ state: {string:string,users:p,curr:curr} });
//         //follwoing search end
//       }
//       if(string == "Followers"){
//         //follwoing search start
//         let p = [];
//         let n = curr.following.length;
//         // console.log(curr.followers+" "++" "+n);
//         for (let i = 0; i < curr.followers.length; i++) {
//           if(curr.followers[i]==undefined || curr.followers[i]==null)continue;
//           let newpost = await getUser(curr.followers[i],true);
//           if (newpost !== null) {
//             p.push(newpost.data());
//           }
//         }
//         navigate('/searchResult',{ state: {string:string,users:p,curr:curr} });
//         //follwoing search end
//       }
// }
const followfollowingHandler = async (string, curr) => {
  console.log("followfollowingHandler called with " + string);

  let p = []; // Array to store user data

  if (string === "Following") {
    // Collect promises for all following users
    let promises = curr.following.map(followingUser => getUser(followingUser, true));

    // Resolve all promises concurrently
    let posts = await Promise.all(promises);

    // Filter valid users and push their data
    p = posts.filter(newpost => newpost !== null).map(newpost => newpost.data());

    // Navigate to the search result page with the users
    navigate('/searchResult', { state: { string: string, users: p, curr: curr } });
  }

  if (string === "Followers") {
    // Collect promises for all followers, ensuring no undefined or null entries
    let promises = curr.followers
      .filter(follower => follower !== undefined && follower !== null) // Remove invalid followers
      .map(follower => getUser(follower, true));

    // Resolve all promises concurrently
    let posts = await Promise.all(promises);

    // Filter valid users and push their data
    p = posts.filter(newpost => newpost !== null).map(newpost => newpost.data());

    // Navigate to the search result page with the users
    navigate('/searchResult', { state: { string: string, users: p, curr: curr } });
  }
};

    const friendsShowHandler = (string) =>{
      if(user.email!=curr.email)return;
      followfollowingHandler(string,curr);
    }
    const {
    username,
    website,
    email,
    about,
    contact,
    branch,
    followers,
    following,
    posts,
    profileImage,
  } = user;
  useEffect(()=>{
    if (typeof variable === 'function') {
      setFlag(true);
    }
    for(let i of curr.following){
      if(i==email)setFollowState(true);
    }
  },[])
  return (
    <div className="p-8 max-w-6xl mx-auto" style={{ marginTop: 'max(8vh,4vw)' }}>
      {/* Profile Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg"> {/* Darker shade of white */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-3xl font-bold">{username}</h2>
              <p className="text-gray-600">{branch}</p>
              <a href={website} className="text-blue-500 hover:underline">
                @{username}
              </a>
            </div>
          </div>
          {
            curr.email===email?(
              <button
          onClick={()=>editPageNavigator()}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 edit-follow-button"
          >
            Edit
          </button>
            ):(
          <button
          onClick={()=>follow()}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 edit-follow-button"
          >
            {followState?("UnFollow"):("Follow")}
          </button>)
          }
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="text-gray-800 mt-2">{about}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <p className="text-gray-600 mt-1">{contact}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Email</h4>
            <p className="text-gray-600 mt-1">{email}</p>
          </div>
          <div className={user.email==curr.email?"cursor-pointer":""} onClick={()=>friendsShowHandler("Followers")}>
            <h4 className={`text-lg font-semibold ${user.email==curr.email?"cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600":""}`}>Followers</h4>
            <p className={`text-gray-600 mt-1 ${user.email==curr.email?"ml-3":""}`}>{followers.length} Followers</p>
          </div>
          <div className={user.email==curr.email?"cursor-pointer":""} onClick={()=>friendsShowHandler("Following")}>
            <h4 className={`text-lg font-semibold ${user.email==curr.email?"cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600":""}`}>Following</h4>
            <p className={`text-gray-600 mt-1 ${user.email==curr.email?"ml-3":""}`}>{following.length} Following</p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Posts</h3>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post, index) => (
            <div key={index} onClick={()=>ImageClickHandller(index,post)} className="cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg"> {/* Darker shade of white */}
              <img 
                src={post.image}
                alt={post.tittle}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold">{post.tittle}</h4>
              <p className="text-gray-500 mt-2">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
// import React, { useState,useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { addFollower } from './App';

// const UserProfile = () => {
//     const location = useLocation();
//     const {f, curr,user,id } = location.state || {};
//     const [followState,setFollowState] = useState(false);

//     const follow = async () =>{
//       let flagbit = await addFollower(email,curr);
//       setFollowState(flagbit);
//     }
//     const {
//     username,
//     website,
//     email,
//     about,
//     contact,
//     branch,
//     followers,
//     following,
//     posts,
//     profileImage,
//   } = user;
//   useEffect(()=>{
//     for(let i of curr.following){
//       if(i==email)setFollowState(true);
//     }
//   },[])
//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-40">
//       <div className="flex items-center space-x-4">
//         <img className="w-24 h-24 rounded-full object-cover" src={profileImage} alt="Profile" />
//         <div>
//           <h1 className="text-2xl font-bold">{username}</h1>
//         </div>
//       </div>

//       <div className="mt-6 space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">About</h2>
//           {
//             curr.email===email?(""):(<button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>follow()}>
//               {followState?("UnFollow"):("Follow")}
//             </button>)
//           }
//           {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>addFollower(email,curr)}>Follow</button> */}
          
//         </div>
//         <p>{about}</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h3 className="text-lg font-semibold">Email</h3>
//             <p>{email}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold cursor-pointer text-blue-500"><a href={website} target="_blank" rel="noreferrer">
//         website
//       </a></h3>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Contact</h3>
//             <p>{contact}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Branch</h3>
//             <p>{branch}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h3 className="text-lg font-semibold">Followers</h3>
//             <p>{followers.length}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Following</h3>
//             <p>{following.length}</p>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold">Posts</h3>
//           <div className="space-y-2">
//             {posts.length}
//             {/* {posts.map((post, index) => (
//               <div key={index} className="border p-4 rounded-lg">
//                 {post}
//               </div>
//             ))} */}
//           </div>
//         </div>
//       </div>
// {/* hello */}
//     </div>
//   );
// };

// export default UserProfile;
