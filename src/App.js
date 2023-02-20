import { Routes, Route, Link, } from "react-router-dom";

import './App.css';

import Home from './Home';
import About from './About';
import Projects from './Projects';
import Project from './Project';

const React = require('react'),
      { useState, useEffect } = require('react');

const App = () => {
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({});
  // const [projectsData, setProjectsState] =  React.useState(blah);

  var getProjects = () => {
    var projectsPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    // var projectsPath = './projects_list.json';
    fetch(projectsPath)
      .then(response => {
        return response.json();
      }).then(result => {
          var allProjects = result;
          setProjects(allProjects);
      }).catch((e: Error) => {
        console.log(e.message);
      });

      // .then(res => res.json())
      // .then((menu) => {
      //     console.log('blah');
      //     debugger;
      //     console.log(menu);
      // })
  }

  var getProjectData = (projId) => {
    // debugger;
    // var projId = window.location.hash.replace("#/projects/","");
    var projPath = `${process.env.PUBLIC_URL}/projects/${projId}.json`;
    var that = this;
    // var projectsPath = './projects_list.json';
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
          // var allProjects = result;
          // setProjects(allProjects);
          
          // setItem(result);
          // console.log(that);
          // debugger;
          setProjectData(result);
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  // if (window.location.hash.includes("#/projects/")) {
  //   getProjectData();
  // }

  useEffect(() => {
    getProjects();
  }, [])
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
        {projects.map((project, i) => {
          // var a = projectsData;
          // var locat = window.location.hash.replace("#/","");
          // debugger;
          // if (project == locat)
          // var proj = projects[i];
          var path = "/projects/" + project.path;
          return (
            <Route path={path} key={i} 
                   element={<Project projId={project.path}
                                     getProjectData={getProjectData}
                                     data={projectData} />} />
          );
        })}
      </Routes>
    </div>
  );
}

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/email">Email</Link></li>
      <li><Link to="/linkedin">LinkedIn</Link></li>
      <li><Link to="/resume">Resume</Link></li>
    </ul>
  );
}

export default App;
