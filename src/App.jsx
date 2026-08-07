import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from "react-router-dom";

import './App.scss';
import { AppProvider } from './AppContext';
import { withBase } from './publicUrl';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Content from './Content';

const App = () => {
  const [tags, setTags] = useState({ tools: {}, skills: {}, affiliations: {}, roles: {} });
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
    const springBegins = 3; // March
    const summerBegins = 5; // May
    const autumnBegins = 7; // July
    const currentMonth = new Date().getMonth();
    const today = new Date();

    if (today.getMonth() === 11) {
      setSeason("teal");
    } else if (currentMonth <= springBegins) {
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
    var localTimeHour = new Date().getHours();
    setColorMode((localTimeHour > 6 && localTimeHour < 18) ? "light" : "dark");
  }

  var toggleColorMode = () => {
    colorMode === "light" ? setColorMode('dark') : setColorMode('light');
  }

  // Builds a fresh tag-count object from scratch rather than mutating the
  // `tags` state directly, so the only way `tags` ever changes is via setTags.
  var getTags = (projects) => {
    var newTags = { tools: {}, skills: {}, affiliations: {}, roles: {} };
    var blahProjects = projects;
    if (Object.keys(allProjects).length) {
      blahProjects = allProjects;
    }
    Object.keys(blahProjects).forEach(projectId => {
      var project = blahProjects[projectId];
      ['tools', 'skills', 'affiliations', 'roles'].forEach(tagType => {
        if (project[tagType]) {
          project[tagType].forEach(projectTag => {
            if (projects[projectId]) {
              if (projectTag in newTags[tagType]) {
                newTags[tagType][projectTag]++;
              } else {
                newTags[tagType][projectTag] = 1;
              }
            } else {
              if (!newTags[tagType][projectTag]) {
                newTags[tagType][projectTag] = 0;
              };
            }
          });
        };
      });
    });
    setTags(newTags);
  }

  var getProjectsAndTags = () => {
    var projectsListPath = withBase('projects_list.json');
    fetch(projectsListPath)
      .then(response => {
        return response.json();
      }).then(result => {
          setAllProjects(result);
          setProjects(result);
          getTags(result);
      }).catch((e) => {
        // console.log(e.message);
      });
  }

  var getProjectData = (projId) => {
    var projPath = withBase(`projects/${projId}.json`);
    fetch(projPath)
      .then(response => {
        return response.json();
      }).then(result => {
          setProjectData(result);
      }).catch((e) => {
        // console.log(e.message);
      });
  }

  // Within a single category, selecting multiple tags is always an OR
  // (e.g. Tools: "Squarespace" or "WordPress" - a project needs just one).
  // The AND/OR toggle controls how categories combine with each other
  // (e.g. Tools AND Affiliations both needing a match, vs either one).
  var categoryHasMatch = (project, category, selectedTagsInCategory) => {
    return (project[category] || []).some(tag => selectedTagsInCategory.includes(tag));
  }

  var updateProjectsList = (activeTags, filterTypeOverride) => {
    var currentFilterType = filterTypeOverride || filterType;
    var activeCategories = Object.keys(activeTags).filter(category => (activeTags[category] || []).length > 0);

    var projectsToDisplay = allProjects;
    if (activeCategories.length) {
      var projectMatchesSelection = currentFilterType === "OR"
        ? (project) => activeCategories.some(category => categoryHasMatch(project, category, activeTags[category]))
        : (project) => activeCategories.every(category => categoryHasMatch(project, category, activeTags[category]));

      projectsToDisplay = Object.fromEntries(
        Object.entries(allProjects).filter(([, project]) => projectMatchesSelection(project))
      );
    }

    getTags(projectsToDisplay);
    setProjects(projectsToDisplay);
  }

  // Builds a new activeTags object (and a new array for the affected
  // category) instead of mutating the activeTags state in place.
  var updateActiveTagsAndProjects = (selectedTag) => {
    var currentTagsForTitle = activeTags[selectedTag.title] || [];
    var updatedTagsForTitle = currentTagsForTitle.includes(selectedTag.tag)
      ? currentTagsForTitle.filter(a => a !== selectedTag.tag)
      : currentTagsForTitle.concat(selectedTag.tag);

    var updatedActiveTags = { ...activeTags };
    if (updatedTagsForTitle.length === 0) {
      delete updatedActiveTags[selectedTag.title];
    } else {
      updatedActiveTags[selectedTag.title] = updatedTagsForTitle;
    }

    setActiveTags(updatedActiveTags);
    updateProjectsList(updatedActiveTags);
  }

  var toggleFilterType = () => {
    var newFilterType = filterType === "AND" ? "OR" : "AND";
    setFilterType(newFilterType);
    updateProjectsList(activeTags, newFilterType);
  }

  var clearActiveTags = () => {
    setActiveTags({});
    updateProjectsList({});
  }

  var toggleAccordion = (tagType) => {
    setTagAccordions({ ...tagAccordions, [tagType]: !tagAccordions[tagType] });
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

  useEffect(() => {
    getProjectsAndTags();
    initializeSeason();
    initializeColorMode();
  }, [])

  // Everything here is global app state/behavior that would otherwise have
  // to be threaded as props through Home/About/Projects/Content and further
  // down into TagsList/FilteredProjects. Route- or instance-specific values
  // (e.g. which project a given <Content> is showing) are still passed as
  // ordinary props below.
  const appContextValue = useMemo(() => ({
    projects,
    allProjects,
    tags,
    activeTags,
    filterType,
    tagAccordions,
    projectData,
    getProjectData,
    updateActiveTagsAndProjects,
    clearActiveTags,
    toggleFilterType,
    toggleAccordion,
    orderChronologically,
    closeNav
  }), [
    projects, allProjects, tags, activeTags, filterType, tagAccordions, projectData,
    getProjectData, updateActiveTagsAndProjects, clearActiveTags, toggleFilterType,
    toggleAccordion, orderChronologically, closeNav
  ]);

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
      <AppProvider value={appContextValue}>
        <Routes>
          <Route exact="true" path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          {Object.keys(projects).map((projectPath, i) => {
            var path = "/projects/" + projectPath;
            return (
              <Route path={path}
                     key={i}
                     element={
                      <Content
                        key={projectPath}
                        projectPath={projectPath}
                        thumbnail={projects[projectPath].thumbnail}
                        title={projects[projectPath].title}
                        tags={{
                          tools: projects[projectPath].tools,
                          skills: projects[projectPath].skills,
                          affiliations: projects[projectPath].affiliations,
                          roles: projects[projectPath].roles
                        }}
                        date={projects[projectPath].date}
                        type="project"
                        projects={allProjects}
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
      </AppProvider>
      <Footer />
    </div>
  );
}

export default App;
