var express = require('express');
var router = express.Router();
const {handleSignUp,handleLogin, getUserDetails}=require("../controllers/users");
const { handleNewProject, getAllProjects, deleteProject, getProjectData, updateProjectData } = require('../controllers/projects');

router.post("/signup", handleSignUp); 

router.post("/login", handleLogin);

router.post("/getUserDetails",getUserDetails);

router.post("/createProject",handleNewProject);

router.post("/getProjects",getAllProjects);

router.delete("/deleteProject",deleteProject);

router.post("/getProject",getProjectData)

router.post("/updateProject", updateProjectData);


module.exports = router;
