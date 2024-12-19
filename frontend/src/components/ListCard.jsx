import React, { useState } from 'react'
import code from "../assets/images/code.png"
import remove from "../assets/images/remove.png"
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const ListCard = ({item}) => {
  const [isDelete,setIsDelete]=useState(false);
  const navigate =useNavigate();

  const deleteProj=(id)=>{
    fetch(api_base_url+"/deleteProject",{
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projId : id,
      })
    }).then(res=>res.json()).then(data=>{
        if(data.success){
          setIsDelete(false);
          window.location.reload();
        }else{
          alert(data.message);
          setIsDelete(false);
        }
      })
  }

  return (
    <>
      <div className="listcard mb-2 w-[full] flex items-center justify-between p-[20px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]" >
        <div className='flex items-center gap-2' onClick={()=>navigate(`/editore/${item._id}`)}>
            <img src={code} className='w-[80px]'/>
            <div>
                <h1 className='text-[25px]'>{item.title}</h1>
                <p className='text-[gray] text-[14px] -mt-1'> Created on :{new Date(item.date).toDateString()}</p>
            </div>
        </div>
        <div>
            <img src={remove} onClick={()=>{setIsDelete(true)}} className='w-[50px] cursor-pointer'/>
        </div>

        {
          isDelete?
            <div className='model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col'>
          <div className='mainModel w-[25vw] h-[20vh] bg-[#141414] rounded-lg p-[20px]'>
            <h3 className='text-3xl'>Do you want to delete <br/> this Project</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button className='p-[10px] rounded-lg bg-[#ff4343] text-white cursor-pointer min-w-[49%]' onClick={()=>deleteProj(item._id)}>Delete</button>
              <button onClick={()=>{setIsDelete(false)}} className='p-[10px] rounded-lg bg-[#1a1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>

        </div> : ""
        }
      </div>

    </>
  )
}

export default ListCard
