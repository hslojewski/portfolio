import React from 'react';
import parse from 'html-react-parser';


class Project extends React.Component {

  componentWillMount() {
    // debugger;
    const { getProjectData, projId = '', data = {} } = this.props;
    getProjectData(projId);
  }

  render() {
    // debugger;
    const { data = {} } = this.props;
    return (
      <div>
        <h1>Project: {data.title}</h1>
        <p>{data.description}</p>
        <p>
          <strong>Tools & Skills: </strong>
          {data.tools_and_skills.map(tool => {
            return(<span>{tool}, </span>);
          })}
        </p>
        <p><strong>Affiliation: </strong>{data.affiliation}</p>
        <p>{data.content && data.content.map(section => {
          return(
            <div>
              <h3>{section.title}</h3>
              <p>{parse(section.detail)}</p>
              {section.images && section.images.map(image => {
                return(<img src={image.src} alt={image.alt} class={image.classes} />);
                }
              )}
            </div>
          );
        })}</p>
      </div>
    );
  }
}

export default Project;
