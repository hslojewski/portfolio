import { Routes, Route } from "react-router-dom";
import moment from 'moment';

import './App.scss';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Content from './Content';

const React = require('react'),
      { useState, useEffect } = require('react');

const App = () => {
  var [tags, setTags] = useState({ tools: {}, skills: {}, affiliations: {}, roles: {} });
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState({});
  const [projectData, setProjectData] = useState({});
  const [activeTags, setActiveTags] = useState({});
  const [colorMode, setColorMode] = useState("light");
  const [season, setSeason] = useState("");
  const [filterType, setFilterType] = useState("AND");
  const [tagAccordions, setTagAccordions] = useState({tools: false, skills: false, affiliations: false, roles: false});
  const [isNavVisible, setNavVisibility] = useState(false);


  var initializeSeason = () => {
    // // debugger;
    // const date = new Date('2017-4-28');
    // const start = new Date('2017-4-20');
    // const end = new Date('2017-5-16');
    const springBegins = 3; // March
    const summerBegins = 5; // May
    const autumnBegins = 7; // July
    // const winterBegins = 11;
    // // console.log("month: "+moment().month());

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

  var initializeColorMode = () => {
    // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   setColorMode("dark");
    // } else if (window.matchMedia("(prefers-color-scheme: light)").matches){
    //   setColorMode("light");
    // } else{
      var localTimeHour = parseInt(moment().local().format("H"));
      setColorMode((localTimeHour > 6 && localTimeHour < 18) ? "light" : "dark");
    // }
  }

  var toggleColorMode = () => {
    colorMode === "light" ? setColorMode('dark') : setColorMode('light');
  }
  
  var getTags = (projects) => {
    tags = { tools: {}, skills: {}, affiliations: {}, roles: {} };
    var blahProjects = projects;
    if (Object.keys(allProjects).length) {
      blahProjects = allProjects;
    }
    Object.keys(blahProjects).forEach(projectId => {
      var project = blahProjects[projectId];
      ['tools', 'skills', 'affiliations', 'roles'].forEach(tagType => {
      // ['tools', 'affiliations'].forEach(tagType => {
      // ['affiliations'].forEach(tagType => {
        // debugger;
        if (project[tagType]) {
          project[tagType].forEach(projectTag => {
            // console.log(projects);
            // debugger;
            // if (projectTag in tags[tagType]) {
            //   tags[tagType][projectTag]++;
            // } else {
            //   if (projects[projectId]) {
            //     tags[tagType][projectTag] = 1;
            //   } else {
            //     tags[tagType][projectTag] = 0;
            //   }
            //   debugger;
            // }
            // console.log(projectId);
            // if (projectTag === "DePaul University" && projectId === "health-activity-infographic") {
            //   debugger;
            // }

            if (projects[projectId]) {
              if (projectTag in tags[tagType]) {
                tags[tagType][projectTag]++;
              } else {
                tags[tagType][projectTag] = 1;
              }
            } else {
              // debugger;
              if (!tags[tagType][projectTag]) {
                // debugger;
                tags[tagType][projectTag] = 0;
              };
            }
          });
        };
      });
    });
    // console.log(tags);
    // debugger;
    setTags({...tags});
  }

  var getProjectsAndTags = () => {
    var projectsListPath = `${process.env.PUBLIC_URL}/projects_list.json`;
    fetch(projectsListPath)
      .then(response => {
        return response.json();
      }).then(result => {
          setAllProjects(result);
          setProjects(result);
          getTags(result);
      }).catch((e: Error) => {
        // console.log(e.message);
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
        // console.log(e.message);
      });
  }

  var updateProjectsList = (activeTags) => {
    // console.log(projects);
    // console.log(activeTags);
    var activeTagProjectsList = [];
    var activeTagProjectsSet = new Set();
    var projectsToDisplay = [];
    var ignoredProjectsSet = new Set();
    var ignoredProjectsList = [];
    var projectsToIgnore = [];
    if (Object.keys(activeTags).length) {
      Object.keys(activeTags).forEach(category => {
        // debugger;
        Object.keys(allProjects).forEach(projectPath => {
          // debugger;
            console.log("blah active tags:");
            console.log(activeTags[category]);
            var allProjectsTags = allProjects[projectPath][category].map(a => a.toLowerCase());
            console.log("blah project's tags:");
            console.log(allProjectsTags);
          if (allProjectsTags.some(tag => activeTags[category].includes(tag))) {
            // debugger;
            console.log("project's tags:");
            console.log(allProjects[projectPath][category]);
            console.log("active tags:");
            console.log(activeTags[category]);
            // debugger;
            // activeTagProjectsSet.add(projectPath);
            // activeTagProjectsList = Array.from(activeTagProjectsSet);
            // projectsToDisplay = activeTagProjectsList;
            activeTags[category].forEach(tag => {
              if (allProjectsTags.includes(tag)) {
                activeTagProjectsSet.add(projectPath);
                activeTagProjectsList = Array.from(activeTagProjectsSet);
                projectsToDisplay = activeTagProjectsList;
              } else {
                ignoredProjectsSet.add(projectPath);
                ignoredProjectsList = Array.from(ignoredProjectsSet);
                projectsToIgnore = ignoredProjectsList;
              }
            });
          } else {
            // debugger;
            ignoredProjectsSet.add(projectPath);
            ignoredProjectsList = Array.from(ignoredProjectsSet);
            projectsToIgnore = ignoredProjectsList;
            console.log("projectsToIgnore");
            console.log(projectsToIgnore);
            // debugger;
          }
          console.log("blahblah projectsToDisplay");
          console.log(projectsToDisplay);
          projectsToDisplay = projectsToDisplay.filter(project => {
            if (!projectsToIgnore.includes(project)) {
              return project;
            }
          });
          // debugger;
        });
      });
      console.log("projectsToDisplay");
      console.log(projectsToDisplay);
      // debugger;
      var blah = {};
      projectsToDisplay.forEach(a => {
        blah[a] = allProjects[a];
      })
      getTags(blah);
      setProjects(blah);
      debugger;
    } else {
      getTags(allProjects);
      setProjects(allProjects);
    }
  }

  var updateActiveTagsAndProjects = (selectedTag) => {
    var updatedActiveTags = activeTags;
    if (Object.keys(activeTags).includes(selectedTag.title)) {
      if (activeTags[selectedTag.title].includes(selectedTag.tag)) {
        updatedActiveTags[selectedTag.title] = activeTags[selectedTag.title].filter(a => a !== selectedTag.tag);
        if (updatedActiveTags[selectedTag.title].length === 0) {
          delete updatedActiveTags[selectedTag.title];
        }
        setActiveTags(updatedActiveTags);
        updateProjectsList(updatedActiveTags);
      } else {
        updatedActiveTags[selectedTag.title] = updatedActiveTags[selectedTag.title].concat(selectedTag.tag);
        updateProjectsList(updatedActiveTags);
      }
    } else {
      activeTags[selectedTag.title] = [selectedTag.tag]
      updatedActiveTags = activeTags;
      setActiveTags(updatedActiveTags);
      updateProjectsList(updatedActiveTags);
    }
    console.log("activeTags");
    console.log(activeTags);
  }

  var toggleFilterType = () => {
    setFilterType(filterType === "AND" ? "OR" : "AND");
    // console.log(filterType);
  }

  var clearActiveTags = () => {
    setActiveTags({});
    updateProjectsList({});
  }

  var toggleAccordion = (tagType) => {
    tagAccordions[tagType] = !tagAccordions[tagType];
    setTagAccordions({...tagAccordions});
  }

  var toggleNav = () => {
    setNavVisibility(!isNavVisible);
  }

  var closeNav = () => {
    setNavVisibility(false);
  }

  var orderChronologically = (projects) => {
    var blah = {};
    Object.keys(allProjects).forEach(a => {
      blah[a] = allProjects[a].date;
      // console.log(allProjects[a].date);
      // debugger;
    });
    var reverseChronYears = Array.from(new Set(Object.values(blah))).sort().reverse();
    // console.log("reverseChronYears");
    // console.log(reverseChronYears);
    var orderedProjects = [];
    reverseChronYears.forEach(year => {
      Object.keys(projects).forEach(a => {
        if (year === projects[a].date && !orderedProjects.includes(a)) {
          orderedProjects.push(a);
        }
      })
    });
    return orderedProjects;
  }

  var getUrlFilters = () => {
    var params = Object.fromEntries(new URLSearchParams(window.location.hash.replace("#/projects?","")));
    var categories = ['roles', 'affiliations', 'tools', 'skills'];
    var activeTags = {};
    Object.keys(params).forEach(paramKey => {
      if (categories.includes(paramKey)) {
        activeTags[paramKey] = params[paramKey].split(",");
      }
    })
    console.log("activeTags");
    console.log(activeTags);
    setActiveTags(activeTags);
    // updateProjectsList(activeTags);
  }

  useEffect(() => {
    getUrlFilters();
    getProjectsAndTags();
    initializeSeason();
    initializeColorMode();
  }, [])
  
  return (
    <div className={colorMode + "-mode " + season}>
      <div id="image-modal" className="modal">
        <span className="close-modal">&times;</span>
        <img loading="lazy"className="modal-content" id="modal-image" alt="modal" />
      </div>
      <Nav
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        isNavVisible={isNavVisible}
        toggleNav={toggleNav}
        closeNav={closeNav}
      />
      <Routes>
        <Route exact="true" path="/"
               element={
               <Home
                  getProjectData={getProjectData}
                  projectData={projectData}
                  updateActiveTagsAndProjects={updateActiveTagsAndProjects}
                  projects={projects}
                  orderChronologically={orderChronologically}
               />
              }
        />
        <Route path="/about"
               element={
                <About
                  getProjectData={getProjectData}
                  projectData={projectData}
                  updateActiveTagsAndProjects={updateActiveTagsAndProjects}
                  projects={projects}
                  orderChronologically={orderChronologically}
                  closeNav={closeNav}
                />
               }
        />
        <Route path="/projects"
               element={
                <Projects
                  projects={projects}
                  tools={tags.tools}
                  skills={tags.skills}
                  affiliations={tags.affiliations}
                  roles={tags.roles}
                  // tags={tags}
                  toggleFilterType={toggleFilterType}
                  filterType={filterType}
                  activeTags={activeTags}
                  updateActiveTagsAndProjects={updateActiveTagsAndProjects}
                  clearActiveTags={clearActiveTags}
                  toggleAccordion={toggleAccordion}
                  orderChronologically={orderChronologically}
                  tagAccordions={tagAccordions}
                  closeNav={closeNav}
                  
                />
              }
        />
        {Object.keys(projects).map((projectPath, i) => {
          var path = "/projects/" + projectPath;
          return (
            <Route path={path}
                   key={i} 
                   element={
                    <Content
                      projectPath={projectPath}
                      thumbnail={projects[projectPath].thumbnail}
                      data={projectData}
                      getProjectData={getProjectData}
                      title={projects[projectPath].title}
                      tags={{
                        tools: projects[projectPath].tools,
                        skills: projects[projectPath].skills,
                        affiliations: projects[projectPath].affiliations,
                        roles: projects[projectPath].roles
                      }}
                      date={projects[projectPath].date}
                      type="project"
                      orderChronologically={orderChronologically}
                      
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
