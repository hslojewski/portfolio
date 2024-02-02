import { Link } from "react-router-dom";

const React = require('react');

class Tag extends React.Component {
  render() {
    // debugger;
    const { projects = {}, tag = "" } = this.props;
  
    return (
        <div class="content">
          {/* <Link to="/projects">Back to Projects</Link> */}
          <h1>{tag}</h1>
          <ul>
          {Object.keys(projects).map(projectPath => {
            var tools = projects[projectPath].tools || [],
                skills = projects[projectPath].skills || [],
                affiliations = projects[projectPath].affiliation || "",
                tags = tools.concat(skills).concat(affiliations);
            console.log(tags.includes(tag));
            console.log(tag);
            // debugger;
            if (tags.includes(tag)) {
              console.log(tags);
              var path = "/projects/" + projectPath;
              console.log(path);
              return(
                  <li><Link exact to={path}>{projects[projectPath].title}</Link></li>
              );
            }
          })}
          </ul>
        </div>
    );
  }
}

export default Tag;
