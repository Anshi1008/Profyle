import React, { useState } from 'react';
import Profile_page from './Profile_page';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom'
const Nav=({search,curr,user,id})=>{
    const navigate = useNavigate();
    const [initial,setInitial] = useState("");
    let func = (e) =>{
        setInitial(e.target.value);
    }
    let searchit = val =>{
        if(val.key=="Enter")search(initial);
    }
    const func1 = async ()=>{
        let f = true;
        console.error("function called");
          navigate('/UserProfile',{ state: { f,curr,user, id } });
      }
    return (
        <div >
            <ul className="flex justify-evenly items-center z-20 fixed top-0 w-full bg-blue-400 p-3 font-bold navStyle">
                {/* {`${curr} ${user} ${id}`} */}
                {/* <li style={{flex:1}}><Link to="/">products</Link></li> */}
                {/* <li style={{flex:1}}><Link to="/add">Ad/dedd</Link></li> */}
                <li className='cursor-pointer' style={{flex:1}} onClick={func1}>Your Profile</li>
                <li style={{flex:1}}><Link to="/Homepage">Homepage</Link></li>
                <li style={{flex:2}}>

                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" value={initial} onChange={func} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." onKeyPress={searchit} required />
                            <button type='submit' onClick={()=>search(initial)} class="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                        </div>

                </li>
            </ul>
        </div>
    );
}

export default Nav