import { Link } from "react-router-dom";

const React = require('react');

class FilteredProjects extends React.Component {
  render() {
    const {
      orderChronologically,
      projects = {}, activeTags = [], filterType = "AND"
    } = this.props;

    var activeTagProjectsList = [];
    var activeTagProjectsSet = new Set();
    var projectsToDisplay = [];
    var ignoredProjectsSet = new Set();
    var ignoredProjectsList = [];
    var projectsToIgnore = [];

    if (activeTags.length) {
      activeTags.forEach(tag => {
        Object.keys(projects).map(projectPath => {
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
      })
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
    var projectsToDisplay = orderedProjects.filter(a => projectsToDisplay.includes(a));

    return (
        <div>
          <h2>List</h2>
          {projectsToDisplay.length > 0 &&
            <div className="project-list-wrapper">
              <ul className={projectsToDisplay.length === 1 ? "one-item" : (projectsToDisplay.length === 2 ? "two-items" : null)}>
              {projectsToDisplay.map((path, i) => {
                return(
                  <li key={i} className="project-detail">
                    <Link exact="true" to={path}>
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
            <div>No projects match that combination of filters. Try something else!</div>
          }
        </div>
    )
  }
}

export default FilteredProjects;
