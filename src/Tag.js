import { Link } from "react-router-dom";

const React = require('react');

class Tag extends React.Component {
  render() {
    const { projects = {}, activeTags = [] } = this.props;
    console.log("Tag Component -- activeTags: ", activeTags);
    // debugger;
    return (
        <div className="content">
          {/* <Link to="/projects">Back to Projects</Link> */}
          <h1>Active Tags: {activeTags.map(activeTag => {
                              debugger;
                              return(
                                <span>{activeTag}, </span>
                              )
                            })}
          </h1>
          <ul>
          {Object.keys(projects).map(projectPath => {
            var tools = projects[projectPath].tools || [],
                skills = projects[projectPath].skills || [],
                affiliations = projects[projectPath].affiliation || "",
                tags = tools.concat(skills).concat(affiliations);
            // console.log(tags);
            // debugger;
            tags.forEach(tag => {
              if (activeTags.includes(tag)) {
                // console.log(activeTags);
                var path = "/projects/" + projectPath;
                console.log(path);
                debugger;
                return(
                    <li><Link exact="true"to={path}>{projects[projectPath].title}</Link></li>
                );
              }
            });
          })}
          </ul>
        </div>
    );
  }
}

export default Tag;
