import React, { useState } from 'react'
import logodark from "../assets/images/1.png"
import logo from "../assets/images/2.png"
import removedLogo from '../assets/images/1-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper'

const Login = () => {
    const [email,setEmail]=useState("");
    const [psd,setPsd]=useState("");

    const [err,setErr]=useState("");

    const navigate=useNavigate();

    const submitForm=(e)=>{
        e.preventDefault();
        fetch(api_base_url+"/login" , {
          mode : "cors",
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email : email,
            password : psd,
          })
        }).then (res=>res.json()).then(data=>{
          if(data.success===true){
            localStorage.setItem("token",data.token);
            localStorage.setItem("isLoggedIn",true);
            setTimeout(() => {
              window.location.href ="/";
            }, 200);
          }else{
            setErr(data.message);
          }
        })
    }

  return (
    <>
      <div className='w-full h-screen signupContainer'>
        <div className='w-[100%] h-[10%] flex items-start justify-center'> 
            <img className='w-[10%]' src={removedLogo} alt='logo'></img>
        </div>
        <div className='h-[90%] w-[100%] flex items-center justify-center'>
            <div className='bg-zinc-800 p-5 w-[40%] h-[60%] flex items-center justify-center rounded-md' >
                <form onSubmit={submitForm} action='' className='w-[80%]'>
                    <div className='mb-3 inputbox border border-zinc-900'>
                        <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email' className='p-2'/>
                    </div>
                    <div className='mb-5 inputbox border border-zinc-900'>
                        <input onChange={(e)=>{setPsd(e.target.value)}} type='password' placeholder='Password' className='p-2'/>
                    </div>
                    <p className='text-zinc-300 mb-4'>Won't Have an account <Link to='/signup' className='text-blue-400'>Sign Up</Link></p>
                    <p  className='text-red-500 text[14px] my-2'>{err}</p>
                    <button className="btnBlue w-[100%]">Login</button>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login