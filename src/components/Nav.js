import React from 'react';
import Profile_page from './Profile_page';
import '../App.css';
import { Link } from 'react-router-dom'
const Nav=()=>{
    return (
        <div>
            
            {/* <h1 className='text-green-500 text-center font-bold text-4xl'>I am navbar </h1> */}
            <ul className="flex justify-evenly items-center fixed top-0 w-full bg-blue-400 p-3 font-bold navStyle">
                <li><Link to="/">products</Link></li>
                <li><Link to="/add">Add products</Link></li>
                <li><Link to="/update">update products</Link></li>
                <li><Link to="/Homepage">Homepage</Link></li>
            </ul>
        </div>
    );
}

export default Nav