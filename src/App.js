import { Routes, Route, Link, } from "react-router-dom";
import moment from 'moment';

import './App.scss';

import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Project from './Project';
import Tag from './Tag';

const React = require('react'),
      { useState, useEffect } = require('react');

const App = () => {
  const [projects, setProjects] = useState({});
  const [projectData, setProjectData] = useState({});
  const [colorMode, setColorMode] = useState("light");
  const [season, setSeason] = useState("");
  const [tags, setTags] = useState([]);

  var checkSeason = (moment) => {
    // debugger;
    // const date = new Date('2017-4-28');
    // const start = new Date('2017-4-20');
    // const end = new Date('2017-5-16');
    const springBegins = 2; // March
    const summerBegins = 4; // May
    const autumnBegins = 6; // July
    // const winterBegins = 11;
    // console.log("month: "+moment().month());

    const currentMonth = moment().month();
    if (currentMonth <= springBegins) {
      setSeason("winter");
    } else if (currentMonth <= summerBegins) {
      setSeason("spring");
    } else if (currentMonth <= autumnBegins) {
      setSeason("summer");
    } else {
      setSeason("autumn");
    }
  }

  var toggleColorMode = () => {
    colorMode === "light" ? setColorMode('dark') : setColorMode('light');
  }

  var getProjects = () => {
    var projectsPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    // var projectsPath = './projects_list.json';
    fetch(projectsPath)
      .then(response => {
        return response.json();
      }).then(result => {
          // debugger;
          var allProjects = result;
          setProjects(allProjects);
          getTags(allProjects);
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

  var getTags = (allProjects) => {
    var allTags = [];
    Object.keys(allProjects).map((projectPath, i) => {
      allTags = new Set([...allTags, ...allProjects[projectPath].tags]);
    });
    setTags(Array.from(allTags));
  }

  // if (window.location.hash.includes("#/projects/")) {
  //   getProjectData();
  // }

  useEffect(() => {
    getProjects();
    checkSeason(moment);
  }, [])

  return (
    <div class={colorMode+"-mode "+season}>
      <Nav colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects projects={projects}
                                                   tags={tags} />} />
        {Object.keys(projects).map((projectPath, i) => {
          var path = "/projects/" + projectPath;
          return (
            <Route path={path} key={i} 
                   element={<Project projId={projectPath}
                                     getProjectData={getProjectData}
                                     data={projectData} />} />
          );
        })}
        {tags.map((tag, i) => {
          var path = "tags/" + tag;
          return (
            <Route path={path} key={i} 
                   element={<Tag projects={projects}
                                 tag={tag} />} />
          );
        })}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
