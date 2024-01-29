import React from 'react';
import parse from 'html-react-parser';
import { Routes, Route, Link, } from "react-router-dom";

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
      <div class="content">
        <Link to="/projects">Back to Projects</Link>
        <h1>Project: {data.title}</h1>
        <p>{data.description}</p>
        <p>
          <strong>Tools & Skills: </strong>
          {data.tools_and_skills && data.tools_and_skills.map(tool => {
            return(<span>{tool}, </span>);
          })}
        </p>
        <p><strong>Affiliation: </strong>{data.affiliation}</p>
        <p>{data.content && data.content.map(section => {
          return(
            <div class={"section "+ section.classes}>
              {section.wrap_images && section.wrap_images.map(image => {
                return(<img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} class={image.classes} />);
                }
              )}
              <h2>{section.title}</h2>
              <p>{parse(section.detail)}</p>
              {section.button &&
                <button class={section.button.classes} src={section.button.url}>{section.button.title}</button>
              }
              {section.images && section.images.map(image => {
                return(<img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} class={image.classes} />);
                }
              )}
              {section.video &&
                <iframe src={section.video} width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              }
            </div>
          );
        })}</p>
        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  }
}

export default Project;
