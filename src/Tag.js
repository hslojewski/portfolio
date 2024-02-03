import { Link } from "react-router-dom";

const React = require('react');

class Tag extends React.Component {
  render() {
    const { projects = {}, activeTags = [] } = this.props;
    console.log("Tag Component -- activeTags: ", activeTags);

    var activeTagProjectsList = [];
    var activeTagProjectsSet = new Set();
    var activeTagProjectsRender = [];
    activeTags.forEach(tag => {
      Object.keys(projects).map(projectPath => {
        var tools = projects[projectPath].tools || [],
            skills = projects[projectPath].skills || [],
            affiliations = projects[projectPath].affiliation || [],
            tags = tools.concat(skills).concat(affiliations);
        if (tags.includes(tag)) {
          // console.log(activeTags);
          var path = "/projects/" + projectPath;
          console.log(path);
          debugger;
          activeTagProjectsSet.add(projectPath);
          activeTagProjectsList = Array.from(activeTagProjectsSet);
        }
      });
    })

    
    return (
        <div className="content">
          {/* <Link to="/projects">Back to Projects</Link> */}
          <h1>Active Tags: {activeTags.map(activeTag => {
                              // debugger;
                              return(
                                <span>{activeTag}, </span>
                              )
                            })}
          </h1>
          {activeTags.length > 0 &&
            <ul>
              {activeTagProjectsList.map(path => {
                return(
                  <li><Link exact="true" to={path}>{projects[path].title}</Link></li>
                )
              })}
            </ul>
          }
        </div>
    )
  }
}

export default Tag;
