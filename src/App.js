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
  const [tags, setTags] = useState({ tools: [], skills: [], affiliations: [] });
  const [projects, setProjects] = useState({});
  const [projectData, setProjectData] = useState({});
  const [activeTags, setActiveTags] = useState([]);
  const [colorMode, setColorMode] = useState("light");
  const [season, setSeason] = useState("");
  const [filterType, setFilterType] = useState("AND");

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

  var getProjectsAndTags = () => {
    var projectsListPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    fetch(projectsListPath)
      .then(response => {
        return response.json();
      }).then(result => {
          setProjects(result);
          Object.keys(result).forEach(projectId => {
            var project = result[projectId];
            ['tools', 'skills', 'affiliations'].forEach(tagType => {
              if (project[tagType]) {
                tags[tagType] = Array.from(new Set(tags[tagType].concat(project[tagType])));
              }
            });
          });
          setTags(tags);
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  var getProjectData = (projId) => {
    var projPath = `${process.env.PUBLIC_URL}/projects/${projId}.json`;
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
          setProjectData(result);
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }

  var displayProjects = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
    } else {
      setActiveTags(activeTags.concat(tag));
    }
  }

  var toggleFilterType = () => {
    setFilterType(filterType === "AND" ? "OR" : "AND");
    console.log(filterType);
  }

  var clearActiveTags = () => {
    setActiveTags([]);
  }

  useEffect(() => {
    getProjectsAndTags();
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
                  toggleFilterType={toggleFilterType}
                  filterType={filterType}
                  activeTags={activeTags}
                  displayProjects={displayProjects}
                  clearActiveTags={clearActiveTags}
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
                      title={projects[projectPath].title}
                      tags={{
                        tools: projects[projectPath].tools,
                        skills: projects[projectPath].skills,
                        affiliations: projects[projectPath].affiliations
                      }}
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
