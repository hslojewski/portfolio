import React from 'react';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

class Project extends React.Component {

  componentWillMount() {
    const {
      getProjectData,
      projectPath = ''
    } = this.props;
    getProjectData(projectPath);
  }

  render() {
    const { data = {}, tags = {}, title = "" } = this.props;

    return (
      <div className="content">
        <Link to="/projects">Back to Projects</Link>
        <h1>Project: {title}</h1>
        <p>{data.description}</p>
        <p>
          <strong>Tools & Skills: </strong>
          {tags.tools && tags.tools.map((tool, i) => {
            return(<span>{tool}{tags.tools.length - 1 === i ? "" : ", "}</span>);
          })}
        </p>
        <p>
          <strong>Skills: </strong>
          {tags.skills && tags.skills.map((skill, i) => {
            return(<span>{skill}{tags.skills.length - 1 === i ? "" : ", "}</span>);
          })}
        </p>
        <p>
          <strong>Affiliation: </strong>
          {tags.affiliations && tags.affiliations.map((affiliation, i) => {
            return(<span>{affiliation}{tags.affiliations.length - 1 === i ? "" : ", "}</span>);
          })}
        </p>
        <p>{data.content && data.content.map(section => {
          return(
            <div className={"section "+ section.classes}>
              {section.wrap_images && section.wrap_images.map(image => {
                return(<img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />);
                }
              )}
              <h2>{section.title}</h2>
              <p>{parse(section.detail)}</p>
              {section.button &&
                <button className={section.button.classes} src={section.button.url}>{section.button.title}</button>
              }
              {section.images && section.images.map(image => {
                return(<img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />);
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
