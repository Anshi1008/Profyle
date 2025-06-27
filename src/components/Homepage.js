import React, { useEffect, useState } from 'react';
import '../App.css';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { addFollower ,addPost,getUser} from '../App'
const Homepage = ({curr1}) =>{
  const [postArray,SetPostArray] = useState([]);
    const navigate = useNavigate();
    let curr = curr1.data();
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

  let p = []; // Initialize array for storing user data

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

    const func = async (user,id)=>{
      let f = true;
      console.error("function called");
        navigate('/UserProfile',{ state: { f,curr,user, id } });
    }
    useEffect(() => {
        // This function will run only once when the component mounts
        // async function fetchData() {
        //   let n = curr.following.length;
        //   for (let i = 0; i < n; i++) {
        //     let newpost = await getUser(curr.following[i],false);
        //     if (newpost !== null) {
        //       let p = postArray;
        //       p.push(newpost);
        //       SetPostArray(p);
        //     //   console.log("on other side got a return value as ", newpost.data());
        //     }
        //   }
        // }
        async function fetchData() {
          // let n = curr.following.length;
          let postPromises = []; // Array to store promises
          console.log("inside fetch user");
          console.log(curr.following+" inside fetch user");
          if(!curr.following.includes("pp@gmail.com"))curr.following.push("pp@gmail.com");
          if(!curr.following.includes("osama@gmail.com"))curr.following.push("osama@gmail.com");
          if(!curr.following.includes("jj@gmail.com"))curr.following.push("jj@gmail.com");
          if(!curr.following.includes("harry@gmail.com"))curr.following.push("harry@gmail.com");
          console.log(curr.following);
          let n = curr.following.length;

          for (let i = 0; i < n; i++) {
            // Fetch user concurrently
            postPromises.push(getUser(curr.following[i], false));
          }
        
          // Resolve all promises concurrently
          let posts = await Promise.all(postPromises);
        
          // Filter out null posts and update the post array
          let validPosts = posts.filter(newpost => newpost !== null);
          SetPostArray(prevArray => [...prevArray, ...validPosts]);
          // console.log("now after fetching posts we have postarray len = ",postArray.length);
        }        
        fetchData();
        // Clean-up function (if necessary)
      }, []);



    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData) => {
    addPost(curr1,formData.title,formData.imageLink,new Date().toLocaleDateString());
    // Handle submission logic (e.g., send data to backend)
  };

    return (
    <div className='homepage-outer-container'>
        <div className='flex bg-gray-500 homepage-inner-container'>
            <div className='homepage-left-container bg-gray-800'>
                <div className='left-inner-div'>
                    <img src={curr.profileImage} onClick={()=>func(curr,curr1.id)} className="profile-image-home" alt="loading image" />
                    <div className='whats-new-today-div' onClick={handleOpenModal}>
                        What's new today?
                    </div>
                </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                      />

            {postArray.map((item,index)=>{
            return (
                     <div className='left-inner-div-posts' key={item.id}>
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                            <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src={item.data().profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={()=>func(postArray[index].data(),postArray[index].id)}
                        />
                        </div>
                        <span onClick={()=>func(item.data(),item.id)} className="font-bold cursor-pointer">{item.data().username}</span>
                        </div>
                        <div className="text-gray-600 text-sm">{item.data().posts[item.data().posts.length-1].date}</div>
                       </div>

                        {/* Post Title */}
                        <div className="px-4 py-2">
                          <h2 className="text-xl font-semibold mb-2 tittle">{item.data().posts[item.data().posts.length-1].tittle}</h2>
                        </div>

                {/* Post Image */}
                        <div className="w-full h-96 overflow-hidden">
                          <img
                            src= {item.data().posts[item.data().posts.length-1].image}
                            alt="Post"
                            className="w-full h-full object-cover"
                          />
                        </div>
                    </div>
            )})}

                <div className='left-inner-div-posts overflow-hidden'>
                <h1 className='text-center font-bold text-lg'>Add Friends to View More Posts</h1>
                </div>
            </div>
            
        <div className='homepage-right-container bg-slate-200'>

                <div className="homepage-right-profile-info bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
                    <div className="container lg:w-full xl:w-full sm:w-full md:w-full    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                        <div className=" h-32 overflow-hidden" >
                            <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                        </div>
                        <div className="flex justify-center px-5  -mt-12">
                            <img className="h-32 w-32 bg-white p-2 rounded-full homepage-right-profile-info-image" src={curr.profileImage} alt="" />

                        </div>
                        <div className=" ">
                            <div className="text-center homepage-right-profile-info-text-container">
                                <h2 className="text-gray-800 text-3xl font-bold">{curr.username}</h2>
                                <a className="text-gray-400 mt-2 hover:text-blue-500" href={curr.website} target="BLANK()">@{curr.username}</a>
                                <p className="mt-2 text-gray-500 text-sm sm:mt-1">{curr.about}</p>
                            </div>
                            <hr className="mt-6" />
                            <div className="flex  bg-gray-50 ">
                                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer" onClick={()=>followfollowingHandler("Followers",curr)}>
                                    <p><span className="font-semibold">{curr.followers.length} </span> Followers</p>
                                </div>
                                <div className="border"></div>
                                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer" onClick={()=>followfollowingHandler("Following",curr)}>
                                    <p> <span className="font-semibold">{curr.following.length} </span> Following</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    </div>
    );
}

export default Homepage