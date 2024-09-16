import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { UserDataChangeHandler } from './App';
const EditProfile = () => {
const location = useLocation();
const navigate = useNavigate();
const {user} = location.state || {};
  const [about, setAbout] = useState(user.about || '');
  const [branch, setBranch] = useState(user.branch || '');
  const [contact, setContact] = useState(user.contact || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const [username, setUsername] = useState(user.username || '');
  const [website, setWebsite] = useState(user.website || '');

  const changeData = async () => {
    // Handle the data change logic
    const curr = await UserDataChangeHandler(about,branch,contact,profileImage,username,website,user.email);
    // console.log("change data called with values ",about," ",branch," ",contact," ",profileImage," ",username," ",website);
        let f = true;
        navigate('/UserProfile',{ state: { f,curr,user:curr, id:"123" } });
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

export default EditProfile;
