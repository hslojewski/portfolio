import { Routes, Route } from "react-router-dom";
import moment from 'moment';

import './App.scss';

import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Project from './Project';

const React = require('react'),
      { useState, useEffect } = require('react');

const App = () => {
  const [tags, setTags] = useState({});
  const [projects, setProjects] = useState({});
  const [projectData, setProjectData] = useState({});
  const [activeTags, setActiveTags] = useState([]);
  // const [tags, setTags] = useState({ tools: [], skills: [], affiliations: [] });
  // const [tags, setTags] = useState({});
  const [colorMode, setColorMode] = useState("light");
  const [season, setSeason] = useState("");
  // const [tools, setTools] = useState([]);
  // const [skills, setSkills] = useState([]);
  // const [affiliations, setAffiliations] = useState([]);

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
    fetch(projectsPath)
      .then(response => {
        return response.json();
      }).then(result => {
          // setProjects(allProjects);
          // setAllTags(allProjects);
          getAllProjects(Object.keys(result));
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  var getAllProjects = (projectPathsList) => {
    projectPathsList.forEach(projId => {
      var projPath = `${process.env.PUBLIC_URL}/projects/${projId}.json`;
      fetch(projPath)
        .then(response => {
          return response.json();
        }).then(result => {
            projects[result.path] = result;
            tags.tools = tags.tools ? (Array.from(new Set(tags.tools.concat(result.tools)))) : result.tools;
            tags.skills = tags.skills ? (Array.from(new Set(tags.skills.concat(result.skills)))) : result.skills;
            tags.affiliations = tags.affiliations ? (Array.from(new Set(tags.affiliations.concat(result.affiliation)))) : [result.affiliation];
            setProjects(projects);
            // console.log(result.path);
            // console.log('before: ',tags);
            // // debugger;
            // var updatedTools;
            // if (tags.tools) {
            //   updatedTools = Array.from(new Set(tags.tools.concat(result.tools)))
            // } else {
            //   updatedTools = result.tools;
            // }
            // var updatedTags = {
            //   tools: updatedTools
            //   // tools: Array.from(new Set(tags.tools.concat(result.tools))),
            //   // skills: Array.from(new Set(tags.skills.concat(result.skills))),
            //   // affiliations: Array.from(new Set(tags.affiliations.concat(result.affiliation)))
            // }
            // debugger;
            // setTags(updatedTags);
            setTags(tags);
            // debugger;
        }).catch((e: Error) => {
          console.log(e.message);
        });
    })
  }

  var getProjectData = (projId) => {
    var projPath = `${process.env.PUBLIC_URL}/projects/${projId}.json`;
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
            setProjectData(result);
            // return result;
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  // var setAllTags = (allProjects) => {
  //   var tools = [],
  //       skills = [],
  //       affiliations = [];
  //   Object.keys(allProjects).forEach(projectPath => {
  //     var projData = getProjectData(projectPath);
  //     // console.log("projData: ",projData);
  //     // debugger;
  //     tools = Array.from(new Set(tools.concat(allProjects[projectPath].tools || [])));
  //     skills = Array.from(new Set(skills.concat(allProjects[projectPath].skills || [])));
  //     affiliations = Array.from(new Set(affiliations.concat(allProjects[projectPath].affiliation || [])));
  //   });
  //   setTools(tools);
  //   setSkills(skills);
  //   setAffiliations(affiliations);
  //   // return {
  //   //   tools,
  //   //   skills,
  //   //   affiliations
  //   // };
  // }

  var displayProjects = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
    } else {
      setActiveTags(activeTags.concat(tag));
    }
  }

  useEffect(() => {
    getProjects();
    checkSeason(moment);
  }, [])

  return (
    <div className={colorMode + "-mode " + season}>
      <Nav colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects"
               element={
                <Projects
                  projects={projects}
                  tools={tags.tools}
                  skills={tags.skills}
                  affiliations={tags.affiliations}
                  // tags={tags}
                  activeTags={activeTags}
                  displayProjects={displayProjects}
                />
              }
        />
        {Object.keys(projects).map((projectPath, i) => {
          var path = "/projects/" + projectPath;
          return (
            <Route path={path}
                   key={i} 
                   element={
                    <Project
                      projectPath={projectPath}
                      data={projectData}
                      getProjectData={getProjectData}
                    />
                    }
              />
          );
        })}
        {/* {tools.concat(skills).concat(affiliations).map((tag, i) => {
          var path = "/tags/" + tag;
          return (
            <Route path={path} key={i} 
                    element={<Tag projects={projects}
                                  tag={tag}
                            />}
            />
          );
        })} */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
