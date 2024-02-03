import { Link } from "react-router-dom";

const React = require('react');

class ProjectsList extends React.Component {
  render() {
    const { projects = {}, activeTags = [] } = this.props;

    var activeTagProjectsList = [];
    var activeTagProjectsSet = new Set();
    var projectsToDisplay = [];
    console.log('activeTags: ',activeTags);
    if (activeTags.length) {
      activeTags.forEach(tag => {
        // if (Object.keys(projectStuff).length) {
        //   debugger;
        // }
        console.log(projects);
        Object.keys(projects).map(projectPath => {
          console.log('projectPath: ',projectPath);
          debugger;
          var tools = projects[projectPath].tools || [],
              skills = projects[projectPath].skills || [],
              affiliations = projects[projectPath].affiliation || [],
              tags = tools.concat(skills).concat(affiliations);
          console.log('tags: ',tags);
          console.log('tag: ',tag);
          // debugger;
          if (tags.includes(tag)) {
            activeTagProjectsSet.add(projectPath);
            activeTagProjectsList = Array.from(activeTagProjectsSet);
            projectsToDisplay = activeTagProjectsList;
          }
        });
      })
    } else {
      projectsToDisplay = Object.keys(projects);
    }
    console.log(projectsToDisplay);
    
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

export default ProjectsList;
