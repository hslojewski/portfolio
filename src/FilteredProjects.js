import { Link } from "react-router-dom";

const React = require('react');

class FilteredProjects extends React.Component {
  render() {
    const {
      orderChronologically, closeNav,
      projects = {}, activeTags = [], filterType = "AND", numToDisplay =  null
    } = this.props;

    var activeTagProjectsList = [];
    var activeTagProjectsSet = new Set();
    var projectsToDisplay = [];
    var ignoredProjectsSet = new Set();
    var ignoredProjectsList = [];
    var projectsToIgnore = [];

    if (activeTags.length) {
      activeTags.forEach(tag => {
        Object.keys(projects).forEach(projectPath => {
          var tools = projects[projectPath].tools || [],
              skills = projects[projectPath].skills || [],
              affiliations = projects[projectPath].affiliations || [],
              roles = projects[projectPath].roles || [],
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
        });
      });
    } else {
      projectsToDisplay = Object.keys(projects);
    }
    if (filterType === "AND") {
      // debugger;
      projectsToDisplay = projectsToDisplay.filter(project => {
        if (!projectsToIgnore.includes(project)) {
          return project;
        }
      });
    }
    var orderedProjects = orderChronologically(projects);
    projectsToDisplay = orderedProjects.filter(a => projectsToDisplay.includes(a));
    
    if (numToDisplay && projectsToDisplay.length) {
      projectsToDisplay = projectsToDisplay.slice(0, numToDisplay);
    }
    // console.log(numToDisplay);
    // console.log(projectsToDisplay);

    return (
        <div>
          {projectsToDisplay.length > 0 &&
            <div className="project-list-wrapper">
              <ul className={projectsToDisplay.length === 1 ? "one-item" : (projectsToDisplay.length === 2 ? "two-items" : null)}>
              {projectsToDisplay.map((path, i) => {
                return(
                  <li key={i} className="project-detail">
                    <Link exact="true" to={"/projects/" + path} onClick={closeNav}>
                      <img src={[process.env.PUBLIC_URL, projects[path].thumbnail].join("/")} alt={projects[path].thumbnail_alt} />
                      <h3>{projects[path].title}</h3>
                    </Link>
                  </li>
                )
              })}
              </ul>
            </div>
          }
          {projectsToDisplay.length === 0 &&
            <div></div>
          }
        </div>
    )
  }
}

export default FilteredProjects;
