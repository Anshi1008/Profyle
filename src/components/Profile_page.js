// import React from "react";

// const Profile_page=()=>{
//     return (
//         <div>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//         </div>
//     )
// }

// export default Profile_page
// import React from "react";

// const Profile_page = () => {
//   const userData = {
//     username: "John Doe",
//     about: "Software Engineer with a passion for building scalable applications.",
//     collegeBranch: "Computer Science, XYZ University",
//     contactInfo: "123-456-7890",
//     email: "johndoe@example.com",
//     profileImage: "https://via.placeholder.com/150", // Replace with a random image URL
//     userWebsite: "https://johndoe.dev",
//     followers: 345,
//     following: 180,
//     posts: [
//       {
//         image: "https://via.placeholder.com/600x400",
//         date: "2024-08-30",
//         title: "Building a Scalable Web Application",
//       },
//       {
//         image: "https://via.placeholder.com/600x400",
//         date: "2024-07-25",
//         title: "Understanding RESTful APIs",
//       },
//     ],
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-[max(8vh,4vw)] p-6 bg-white shadow-lg rounded-lg">
//       <div className="flex items-center space-x-4">
//         <img
//           src={userData.profileImage}
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover"
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{userData.username}</h1>
//           <p className="text-gray-600">{userData.collegeBranch}</p>
//           <p className="text-gray-600">{userData.about}</p>
//           <div className="flex space-x-2 mt-2">
//             <a
//               href={userData.userWebsite}
//               className="text-blue-600 hover:underline"
//             >
//               {userData.userWebsite}
//             </a>
//             <span>•</span>
//             <span>{userData.email}</span>
//             <span>•</span>
//             <span>{userData.contactInfo}</span>
//           </div>
//           <div className="flex space-x-6 mt-4">
//             <span className="font-semibold">{userData.followers} Followers</span>
//             <span className="font-semibold">{userData.following} Following</span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Posts</h2>
//         <div className="space-y-6">
//           {userData.posts.map((post, index) => (
//             <div key={index} className="border rounded-lg p-4 shadow-sm">
//               <img
//                 src={post.image}
//                 alt="Post"
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-bold">{post.title}</h3>
//               <p className="text-gray-500">{post.date}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile_page;
// export default Profile_page;
// import React from "react";

// const Profile_page=()=>{
//     return (
//         <div>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//             <h1 className='text-green-500 text-center font-bold text-4xl'>this is the profile page</h1>
//         </div>
//     )
// }

// export default Profile_page
import React, { useState, useEffect } from 'react';

const Profile_page = () => {
  const user = {
    about: "Software Engineer with a passion for developing innovative programs.",
    branch: "Computer Science and Engineering",
    contact: "user@example.com",
    profileImage: "https://example.com/profile.jpg",
    username: "john_doe",
    website: "https://johndoe.com"
  };
    
  const [about, setAbout] = useState(user.about || '');
  const [branch, setBranch] = useState(user.branch || '');
  const [contact, setContact] = useState(user.contact || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const [username, setUsername] = useState(user.username || '');
  const [website, setWebsite] = useState(user.website || '');

  const changeData = () => {
    // Handle the data change logic
  };

  return (
    <div className="bg-white-dark text-blue-700 px-6 py-4 w-[80%] mx-auto mt-[max(8vh,4vw)]">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">About</label>
        <textarea
          className="w-full p-2 border border-blue-500 rounded"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows="3"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input
          className="w-full p-2 border border-blue-500 rounded"
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Contact</label>
        <input
          className="w-full p-2 border border-blue-500 rounded"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Profile Image URL</label>
        <input
          className="w-full p-2 border border-blue-500 rounded"
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          className="w-full p-2 border border-blue-500 rounded"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Website URL</label>
        <input
          className="w-full p-2 border border-blue-500 rounded"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        onClick={changeData}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Commit Changes
      </button>
    </div>
  );
};

export default Profile_page;

