import React from 'react';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { InstagramEmbed } from 'react-social-media-embed';

class Project extends React.Component {

  componentDidMount() {
    const {
      getProjectData,
      projectPath = ''
    } = this.props;
    getProjectData(projectPath);
  }

  render() {
    const { projectPath = '', data = {}, tags = {}, title = "" } = this.props;
    return (
      <div className="content">
        <Link to="/projects">Back to Projects</Link>
        <h1>{title}</h1>
        <p>{data.description}</p>
        {tags.tools.length > 0 &&
          <p>
            <strong>Tools: </strong>
            {tags.tools.map((tool, i) => {
              return(<span key={i}>{tool}{tags.tools.length - 1 === i ? "" : ", "}</span>);
            })}
          </p>
        }
        {tags.skills.length > 0 &&
          <p>
            <strong>Skills: </strong>
            {tags.skills.map((skill, i) => {
              return(<span key={i}>{skill}{tags.skills.length - 1 === i ? "" : ", "}</span>);
            })}
          </p>
        }
        <p>
          <strong>Affiliation: </strong>
          {tags.affiliations && tags.affiliations.map((affiliation, i) => {
            return(<span key={i}>{affiliation}{tags.affiliations.length - 1 === i ? "" : ", "}</span>);
          })}
        </p>
        <p>
          <strong>Role: </strong>
          {tags.roles && tags.roles.map((role, i) => {
            return(<span key={i}>{role}{tags.roles.length - 1 === i ? "" : ", "}</span>);
          })}
        </p>
        {data.date &&  
        <p>
          <strong>Date: </strong>
          <span>{data.date}</span>
        </p>
        }
        <div>{data.content && data.content.map((section, i) => {
          return(
            <div key={i} className={"section "+ section.classes}>
              {section.wrap_images && section.wrap_images.map((image, i) => {
                return(<img key={i} src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />);
                }
              )}
              <h2>{section.title}</h2>
              <h3>{section.sub_title}</h3>
              <div>{parse(section.detail)}</div>
              {section.button &&
                <button className={section.button.classes} src={section.button.url}>{section.button.title}</button>
              }
              <div className="blah">
              {section.images && section.images.map((image, i) => {
                return(
                  <span key={i} className={"meh " + image.containerClasses}>
                    <img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />
                    {image.caption && <caption>{image.caption}</caption>}
                  </span>
                );
                }
              )}
              </div>
              {section.video &&
                <iframe src={section.video} width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
              }
              {section.instagram_embed &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InstagramEmbed url={section.instagram_embed} width={550} />
              </div>
              }
            </div>
          );
        })}</div>
        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  }
}

export default Project;
