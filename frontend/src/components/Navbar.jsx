import React, { useEffect, useState } from 'react'
import logo from '../assets/images/1-removebg-preview.png'
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { api_base_url, toggleClass } from '../helper';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const [userData,setUserData]=useState(null);
  const [err,setErr]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    fetch(api_base_url+"/getUserDetails",{
      mode : "cors",
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        token : localStorage.getItem("token"),
      }),
    }).then(res => res.json()).then(data=>{
      if(data.success===true){
        setUserData(data.user);
      }else{
        setErr(data.message);
      }
      
    });
  },[])

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();

  }


  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="left logo">
          <img src={logo} className="w-[100px]"/>
        </div>
        <div>
          <button className='btnBlue !bg-red-400 min-w-[90px] hover:!bg-red-600 !mx-2 ' onClick={logout}>Logout</button>
          <Avatar onClick={()=>{toggleClass(".dropDownNavbar","hidden")}} name={userData ? userData.name : ""} size="50" className='rounded-[50%] cursor-pointer' />
        </div>

        <div className='dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[120px]'>
          <div className='py-[10px] border-b-[1px] border-b-[#fff]'>
          <h3 className='text-[17px] ' style={{lineHeight:1}}>{userData ? userData.name : ""}</h3>
          </div>
          {/* <i className='flex items-center gap-2 my-3 mv-2' style={{fontStyle:"normal"}}><MdLightMode className='text-[20px]'/>Light Mode</i> */}
          <i className='flex items-center gap-2 my-3 mv-2 cursor-pointer' style={{fontStyle:"normal"}} onClick={() => setIsGridLayout(!isGridLayout)}><IoGrid className='text-[20px]'/>Toggle Grid</i>
        </div>
      </div>
    </>
  )
}

export default Navbar
