import { Link } from "react-router-dom";

const React = require('react');

class Tag extends React.Component {
  render() {
    const { projects = {}, tag = "" } = this.props;

    return (
        <div>
          <h1>{tag}</h1>
          <ul>
          {Object.keys(projects).map(projectPath => {   
              if (projects[projectPath].tags.includes(tag)) {
                  var path = "/projects/" + projectPath;
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
