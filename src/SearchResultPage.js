import React, { useCallback,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './temppage.css';
const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {string,users,curr} = location.state || {};
  const func = async (user,id) =>{
    let f = true;
    navigate('/UserProfile',{ state: { f,curr,user, id } });
  }
  return (
    <div
      className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10"
      style={{ marginTop: 'max(8vh,4vw)' }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 pt-4">{string}</h2>
      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
      {users?(
        <ul className="space-y-6">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex items-center p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={()=>func(user,user.id)}
            >
              <img
                src={user.profileImage}
                alt={`${user.username} profile`}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="ml-8">
                <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-500">
                  {user.username}
                </h3>
                <p className="text-gray-600 mt-2">{user.about}</p>
              </div>
            </li>
          ))}
        </ul>
        ):""
      }
      </div>
    </div>
  );
};

export default SearchResultPage;
