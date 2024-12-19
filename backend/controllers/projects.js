var User=require("../models/userModel");
var jwt=require("jsonwebtoken");
var bcrypt=require("bcryptjs");
const Project= require('../models/projectModel');

const secret="$uperm@n";

const handleNewProject=async (req,res)=>{
    const {token,title}=req.body;
    const data=jwt.verify(token,secret);
    const user=await User.findOne({ _id:data.userId});
  
    if(user){
      let project = await Project.create({
        title : title,
        createdBy : user._id,
      });
  
  
      return res.json({success : true , message : "Project Created SuccessFully",projectId:project._id});
    }else {
      return res.json({success : false , message : "User Not Found"});
    }
  }

const getAllProjects=async (req,res)=>{
    let {token}=req.body;
    const data=jwt.verify(token,secret);
    const user=await User.findOne({ _id:data.userId});
  
    if(user){
      let projects =await Project.find({ createdBy:user._id})
      return res.json({success : true ,message : "Projects Fetched successfully",projects:projects });
    }else{
      return res.json({success : false,message :"user not found"});
    }
  
  }


const deleteProject=async (req,res)=>{
    const { token , projId} = req.body;
    const data=jwt.verify(token,secret);
    const user=await User.findOne({ _id:data.userId});
  
    if(user){
      const project = await Project.findOneAndDelete({_id:projId});
      return res.json({success : true , message : "Project Deleted SuccessFully"});
    }else{
      return res.json({success: false, message : "user Not found"});
    }
  }

const getProjectData=async(req,res)=>{
    const {token,projId}=req.body;
    const data=jwt.verify(token,secret);
    const user=await User.findOne({ _id:data.userId});
  
    if(user){
      const project=await Project.findOne({_id:projId});
      return res.json({success: true,message : "Project Fetched Successfully",project : project});
    }else{
      return res.json({success: false ,message : "User not Found"});
    }
  
  
  }

const updateProjectData=async (req, res) => {
    let { token, htmlCode, cssCode, jsCode, projId } = req.body;
    const data=jwt.verify(token,secret);
    let user = await User.findOne({ _id: data.userId });
  
    if (user) {
      let project = await Project.findOneAndUpdate(
        { _id: projId },
        { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
        { new: true }
      );
  
      if (project) {
        return res.json({ success: true, message: "Project updated successfully" });
      } else {
        return res.json({ success: false, message: "Project not found!" });
      }
    } else {
      return res.json({ success: false, message: "User not found!" });
    }
  }


module.exports={
    handleNewProject,
    getAllProjects,
    deleteProject,
    getProjectData,
    updateProjectData,
}