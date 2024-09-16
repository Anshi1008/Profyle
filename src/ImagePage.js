import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { handleImageDelete } from './App';
const ImagePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let {email,post,index,usermail} = location.state || {};
  const handleDelete = async () => {
    console.log(`Delete post at index ${index}`);
    // You can implement the delete functionality here
    let curr = await handleImageDelete(email,index,post.tittle);
    console.log(curr)
    if(!curr){
      console.log("returned null after deleting")
      return;
    }  
      let f = true;
    let user =  curr;
    let id = "123";
      navigate('/UserProfile',{ state: { f,curr,user, id } });
  };
  post = post ||  {
    image: 'https://images.unsplash.com/photo-1667118398369-d333910433d9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMj3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tittle: `this is the post form gg Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    date: '5/12/2024',
  };
  index = index ||  0; 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      style={{ marginTop: 'max(8vh,4vw)' }}
    >
      <div className="relative mb-4">
        <img
          src={post.image}
          alt={post.tittle}
          className="w-full h-auto max-h-[500px] object-contain rounded-lg"
        />
        <div className="absolute top-2 right-2">
          <div className="relative">
            {
            usermail==email?(
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>):""
            }
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.tittle}</h2>
      <p className="text-gray-500">{post.date}</p>
    </div>
  );
};
export default ImagePage;