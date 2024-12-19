import React from 'react'
import logo from '../assets/images/1-removebg-preview.png'
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { toggleClass } from '../helper';
import { IoMdDownload } from "react-icons/io";

const EditorNavbar = ({project}) => {
  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo w-[10%]">
          <img src={logo} className='w-[85%]'/>
        </div>
        <p>File /<span className='text-[gray]'>{project}</span></p>
        <i className='p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px] '><IoMdDownload /></i>
       </div>
    </>
  )
}

export default EditorNavbar