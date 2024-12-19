import React, { useState } from "react";
import code from "../assets/images/code.png";
import remove from "../assets/images/remove.png";
import { useNavigate } from "react-router-dom";

const GridCard = ({item}) => {
  const [isDelete,setIsDelete]=useState(false);
  const navigate=useNavigate();

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
        })}).then(res=>res.json()).then(data=>{
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
      <div className="gridcard bg-[#141414] w-[270px] h-[180px] rounded-lg shadow-lg shadow-black/50 cursor-pointer hover:bg-[#202020]">
      <div onClick={()=>navigate(`/editore/${item._id}`)}>
        <img src={code} className="w-[100px]" />
          <h3 className="px-3 text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
      </div>
      <div className="px-3 flex items-center justify-between">
            <p className="text-[14px] text-[gray] " onClick={()=>navigate(`/editore/${item._id}`)}>Created : {new Date(item.date).toDateString()} </p>
            <img src={remove} onClick={()=>{setIsDelete(true)}} className="w-[30px] cursor-pointer" />
          </div>
        

        {isDelete ? (
          <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col">
            <div className="mainModel w-[25vw] h-[20vh] bg-[#141414] rounded-lg p-[20px]">
              <h3 className="text-3xl">
                Do you want to delete <br />this Project
              </h3>
              <div className="flex w-full mt-5 items-center gap-[10px]">
                <button className="p-[10px] rounded-lg bg-[#ff4343] text-white cursor-pointer min-w-[49%]" onClick={()=>deleteProj(item._id)}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsDelete(false);
                  }}
                  className="p-[10px] rounded-lg bg-[#1a1919] text-white cursor-pointer min-w-[49%]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GridCard;
