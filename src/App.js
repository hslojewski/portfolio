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
  const [projectTools, setProjectTools] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [projectSkills, setProjectSkills] = useState([]);
  const [projectAffiliation, setProjectAffiliation] = useState("");
  const [colorMode, setColorMode] = useState("light");
  const [season, setSeason] = useState("");
  const [tags, setTags] = useState({});
  const [tools, setTools] = useState([]);
  const [skills, setSkills] = useState([]);
  const [affiliations, setAffiliations] = useState([]);

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
          getTools(allProjects);
          getSkills(allProjects);
          getAffiliations(allProjects);
          // debugger;
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

  var getAffiliationProjects = (affiliation) => {
    console.log(tags);
    console.log(projects);
    console.log(projectData);
    debugger;
  }

  var getProjectTools = (projId) => {
    var projPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
        console.log(projId);
          setProjectTools(result[projId].tools);
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  var getProjectSkills = (projId) => {
    var projPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
        console.log(projId);
        setProjectSkills(result[projId].skills);
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  var getProjectAffiliation = (projId) => {
    var projPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
        setProjectAffiliation(result[projId].affiliation);
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  var getTags = (allProjects) => {
    var allTags = [];
    Object.keys(allProjects).map((projectPath, i) => {
      allTags = allTags.concat(allProjects[projectPath].tags || []);
    });
    const blah = {
      tools: getTools(allProjects),
      skills: getSkills(allProjects),
      affiliations: getAffiliations(allProjects),
    }
    // debugger;
    // setTags(Array.from(new Set(allTags)));
    setTags(blah);
  }

  var getTools = (allProjects) => {
    var allTools = [];
    Object.keys(allProjects).map((projectPath, i) => {
      // allTools = new Set(allTools.concat(allProjects[projectPath].tools));
      allTools = allTools.concat(allProjects[projectPath].tools || []);
    });
    // debugger;
    setTools(Array.from(new Set(allTools)));
    return Array.from(new Set(allTools));
  }

  var getSkills = (allProjects) => {
    var allSkills = [];
    Object.keys(allProjects).map((projectPath, i) => {
      // allSkills = new Set(allSkills.concat(allProjects[projectPath].skills));
      allSkills = allSkills.concat(allProjects[projectPath].skills || []);
    });
    setSkills(Array.from(new Set(allSkills)));
    return Array.from(new Set(allSkills));
  }

  var getAffiliations = (allProjects) => {
    var allAffiliations = [];
    Object.keys(allProjects).map((projectPath, i) => {
      // allAffiliations = new Set(allAffiliations.concat(allProjects[projectPath].affiliation));
      // debugger;
      allAffiliations = allProjects[projectPath].affiliation ? allAffiliations.concat(allProjects[projectPath].affiliation) : allAffiliations;
    });
    setAffiliations(Array.from(new Set(allAffiliations)));
    return Array.from(new Set(allAffiliations));
  }

  var displayProjects = (tag) => {
    console.log("activeTags.includes(tag): ", activeTags.includes(tag));
    // debugger;
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
    } else {
      setActiveTags(activeTags.concat(tag));
    }
    console.log("App Component -- activeTags: ", activeTags);
    // debugger;
    // 
  }

  // if (window.location.hash.includes("#/projects/")) {
  //   getProjectData();
  // }

  useEffect(() => {
    getProjects();
    checkSeason(moment);
  }, [])

  return (
    <div className={colorMode+"-mode "+season}>
      <Nav colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route exact="true"path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects projects={projects}
                                                   tags={tags}
                                                   tools={tools}
                                                   skills={skills}
                                                   affiliations={affiliations}
                                                   getAffiliationProjects={getAffiliationProjects}
                                                   activeTags={activeTags}
                                                   setActiveTags={setActiveTags}
                                                   displayProjects={displayProjects}
                                        />} />
        {Object.keys(projects).map((projectPath, i) => {
          var path = "/projects/" + projectPath;
          return (
            <Route path={path} key={i} 
                   element={<Project projId={projectPath}
                                     getProjectData={getProjectData}
                                     getProjectTools={getProjectTools}
                                     getProjectSkills={getProjectSkills}
                                     getProjectAffiliation={getProjectAffiliation}
                                     data={projectData}
                                     tools={projectTools}
                                     skills={projectSkills}
                                     affiliation={projectAffiliation}
                            />} />
          );
        })}
        {tools.concat(skills).concat(affiliations).map((tag, i) => {
          var path = "/tags/" + tag;
          // console.log(path);
          // console.log(tag);
          // console.log(tags);
          // console.log(tools.concat(skills).concat(affiliations));
          // debugger;
          return (
            <Route path={path} key={i} 
                    element={<Tag projects={projects}
                                  tag={tag}
                            />}
            />
          );
        })}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
