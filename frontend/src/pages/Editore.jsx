import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import EditorNavbar from "../components/EditorNavbar";
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const Editore = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("HTML");

  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");
  const [projectName,setProjectName]=useState("");

  const {ProjectID}=useParams();

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  const changeTheme = () => {
    if (isLightMode) {
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200);
  }, [htmlCode, cssCode, jsCode]);


  useEffect(()=>{
    fetch(api_base_url+"/getProject",{
      mode : "cors",
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projId : ProjectID,
      })}).then(res=>res.json()).then(data=>{
        if(data.success){
          setProjectName(data.project.title);
          setHtmlCode(data.project.htmlCode);
          setCssCode(data.project.cssCode);
          setJsCode(data.project.jsCode);
        }else{
          // alert(data.message);
        }
    })
  },[])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
  
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            projId: ProjectID, 
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert("Project saved successfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.error("Error saving project:", err);
          alert("Failed to save project. Please try again.");
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditorNavbar project={projectName}/>
      <div className="flex">
        <div
          className={`left ${
            isExpanded ? "w-full" : "w-1/2"
          } transition-all duration-300`}
        >
          <div className="tabs flex items-center justify-between gap-2 bg-[#1A1919] h-[60px] px-10">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => setTab("HTML")}
                className={`tab p-[6px] cursor-pointer px-[10px] text-[15px] ${
                  tab === "HTML" ? "bg-[#333]" : "bg-[#1E1E1E]"
                }`}
              >
                HTML
              </div>
              <div
                onClick={() => setTab("CSS")}
                className={`tab p-[6px] cursor-pointer px-[10px] text-[15px] ${
                  tab === "CSS" ? "bg-[#333]" : "bg-[#1E1E1E]"
                }`}
              >
                CSS
              </div>
              <div
                onClick={() => setTab("JavaScript")}
                className={`tab p-[6px] cursor-pointer px-[10px] text-[15px] ${
                  tab === "JavaScript" ? "bg-[#333]" : "bg-[#1E1E1E]"
                }`}
              >
                JavaScript
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i
                className="text-[20px] cursor-pointer"
                onClick={changeTheme}
              >
                <MdLightMode />
              </i>
              <i
                className="text-[20px] cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <FaExpandAlt />
              </i>
            </div>
          </div>

          {tab === "HTML" ? (
            <Editor
              height="85vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || "")}
            />
          ) : tab === "CSS" ? (
            <Editor
              height="85vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
              onChange={(value) => setCssCode(value || "")}
            />
          ) : (
            <Editor
              height="85vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
              onChange={(value) => setJsCode(value || "")}
            />
          )}
        </div>

        <iframe
          id="iframe"
          className={`${
            isExpanded ? "hidden" : "block w-1/2"
          } bg-white min-h-[85vh] text-black transition-all duration-300`}
        ></iframe>
      </div>
    </>
  );
};

export default Editore;
