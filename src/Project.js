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
                return(
                  <span>
                    <img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />
                    {image.caption && <caption>{image.caption}</caption>}
                  </span>
                );
                }
              )}
              {section.video &&
                <iframe src={section.video} width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              }
              {section.instagram_embed &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InstagramEmbed url={section.instagram_embed} width={550} />
              </div>
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
