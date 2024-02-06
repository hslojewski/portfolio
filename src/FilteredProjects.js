import { Link } from "react-router-dom";

const React = require('react');

class FilteredProjects extends React.Component {
  render() {
    const { projects = {}, activeTags = [], filterType = "AND" } = this.props;

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
              tags = tools.concat(skills).concat(affiliations);
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
    console.log("projectsToDisplay");
    console.log(projectsToDisplay);
    console.log("projectsToIgnore");
    console.log(projectsToIgnore);
    if (filterType === "AND") {
      // debugger;
      projectsToDisplay = projectsToDisplay.filter(project => {
        if (!projectsToIgnore.includes(project)) {
          return project;
        }
      });
    }
    return (
        <div>
          <h2>List</h2>
          {projectsToDisplay.length > 0 &&
            projectsToDisplay.map(path => {
              return(
                <li><Link exact="true" to={path}>{projects[path].title}</Link></li>
              )
            })
          }
        </div>
    )
  }
}

export default FilteredProjects;
