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
  const [activeTags, setActiveTags] = useState([]);
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

  var initializeColorMode = () => {
    var localTimeHour = parseInt(moment().local().format("H"));
    setColorMode((localTimeHour > 6 && localTimeHour < 18) ? "light" : "dark");
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
            console.log(projects);
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
            console.log(projectId);
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
    console.log(tags);
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

  var updateProjectsList = (activeTags) => {
    console.log(projects);
    console.log(activeTags);
    // // debugger;
    var activeTagProjectsList = [];
    var activeTagProjectsSet = new Set();
    var projectsToDisplay = [];
    var ignoredProjectsSet = new Set();
    var ignoredProjectsList = [];
    var projectsToIgnore = [];
    if (activeTags.length) {
      activeTags.forEach(tag => {
        Object.keys(allProjects).map(projectPath => {
          var tools = allProjects[projectPath].tools || [],
              skills = allProjects[projectPath].skills || [],
              affiliations = allProjects[projectPath].affiliations || [],
              roles = allProjects[projectPath].roles || [],
              tags = tools.concat(skills).concat(affiliations).concat(roles);
          if (tags.includes(tag)) {
            activeTagProjectsSet.add(projectPath);
            activeTagProjectsList = Array.from(activeTagProjectsSet);
            projectsToDisplay = activeTagProjectsList;
          } else {
            ignoredProjectsSet.add(projectPath);
            ignoredProjectsList = Array.from(ignoredProjectsSet);
            projectsToIgnore = ignoredProjectsList;
          }
          projectsToDisplay = projectsToDisplay.filter(project => {
            if (!projectsToIgnore.includes(project)) {
              return project;
            }
          });
        });
      })
      var blah = {};
      projectsToDisplay.forEach(a => {
        blah[a] = allProjects[a];
      })
      getTags(blah);
      setProjects(blah);
      // debugger;
    } else {
      getTags(allProjects);
      setProjects(allProjects);
    }
  }

  var displayProjects = (tag) => {
    var updatedActiveTags = activeTags;
    if (activeTags.includes(tag)) {
      // // debugger;
      // setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
      updatedActiveTags = activeTags.filter(activeTag => activeTag !== tag);
      setActiveTags(updatedActiveTags);
      // // debugger;
      // getTags(projects);
      updateProjectsList(updatedActiveTags);
    } else {
      // // debugger;
      updatedActiveTags = activeTags.concat(tag);
      setActiveTags(updatedActiveTags);
      // getTags(projects);
      updateProjectsList(updatedActiveTags);
    };
    console.log(activeTags);
    // debugger;
  }

  var toggleFilterType = () => {
    setFilterType(filterType === "AND" ? "OR" : "AND");
    console.log(filterType);
  }

  var clearActiveTags = () => {
    setActiveTags([]);
    updateProjectsList([]);
  }

  var toggleAccordion = (tagType) => {
    tagAccordions[tagType] = !tagAccordions[tagType];
    setTagAccordions({...tagAccordions});
  }

  var toggleNav = () => {
    setNavVisibility(!isNavVisible);
  }

  var orderChronologically = (projects) => {
    var blah = {};
    Object.keys(allProjects).map(a => {
      blah[a] = allProjects[a].date;
      console.log(allProjects[a].date);
      // debugger;
    });
    var reverseChronYears = Array.from(new Set(Object.values(blah))).reverse();
    console.log("reverseChronYears");
    console.log(reverseChronYears);
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

  useEffect(() => {
    getProjectsAndTags();
    initializeSeason();
    initializeColorMode();
  }, [])

  return (
    <div className={colorMode + "-mode " + season}>
      <Nav
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        isNavVisible={isNavVisible}
        toggleNav={toggleNav}
      />
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route path="/about"
               element={
                <About
                  getProjectData={getProjectData}
                  projectData={projectData}
                  displayProjects={displayProjects}
                  projects={projects}
                  orderChronologically={orderChronologically}
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
                  displayProjects={displayProjects}
                  clearActiveTags={clearActiveTags}
                  toggleAccordion={toggleAccordion}
                  orderChronologically={orderChronologically}
                  tagAccordions={tagAccordions}
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
