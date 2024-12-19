import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [isCreate,setIsCreate]=useState(false);
  const [projectTitle,setProjectTitle]=useState("");
  const [data,setData]=useState(null);
  const [err,setErr]=useState("");

  const [searchQuery,setSearchQuery]=useState("");

  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const navigate =useNavigate();



  const createProject=(e)=>{
    if(projectTitle==""){
      alert("Please Enter Project Name");
    }
    else{
      fetch(api_base_url+'/createProject',{
        mode : "cors",
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          token : localStorage.getItem("token"),
          title : projectTitle,
        }),
      }).then(res =>res.json()).then(data=>{
        if(data.success){
          setIsCreate(false);
          setProjectTitle("");
          navigate(`/editore/${data.projectId}`)
        }
      })
    }
  }


  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.projects);
      } else {
        setErr(data.message);
      }
    });
  };

  useEffect(() => {
    getProj();
  }, []);


    const [userData,setUserData]=useState(null);
    const [usererr,setUserErr]=useState("");
  
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
          setUserErr(data.message);
        }
        
      });
    },[])



  return (
    <div>
      <Navbar  isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout}/>
      <div className="flex items-center justify-between px-[100px] my-10">
        <h1 className="text-2xl">Hi {userData ?userData.username : ""}!</h1>
        <div className="flex items-center gap-1">
          <div className="mb-3 inputbox border border-zinc-900 !w-[350px]">
            <input type="text" placeholder="Search Here..." className="p-2" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
          </div>
          <button onClick={()=>{setIsCreate(true)}} className="btnBlue rounded-[5px] text-[20px] !p-[5px] !px-[10px] mb-4">
            +
          </button>
        </div>
      </div>

      <div className="cards">
        {isGridLayout ? (
          <div className="grid px-[100px]">
            {filteredData.length > 0 ? filteredData.map((item, index) => (
                  <GridCard key={index} item={item} />
            )) : <p>No projects found</p>}
          </div>
        ) : (
          <div className="list px-[100px]">
            {filteredData.length > 0 ? filteredData.map((item, index) => (
                  <ListCard key={index} item={item} />
            )) : <p>No projects found</p>}
          </div>
        )}
      </div>

      {
        isCreate ? 
        <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.2)] flex items-center justify-center">
        <div className="createModel w-[25vw] h-[22vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
          <h3 className="text-2xl"> Create New Project</h3>

          <div className="inputbox !bg-[#202020] mt-4">
            <input type="text" placeholder="Project Title" onChange={(e)=>{setProjectTitle(e.target.value)}} value={projectTitle}/>
          </div>

          <div className="flex items-center gap-[10px] w-full mt-4">
            <button className="btnBlue rounded-[5px] w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]" onClick={createProject}>Create</button>
            <button onClick={()=>{setIsCreate(false)}} className="btnBlue !bg-[#1a1919] rounded-[5px] w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]">Cancel</button>
          </div>
        </div>
      </div> :""
      }
    </div>
  );
};

export default Home;
