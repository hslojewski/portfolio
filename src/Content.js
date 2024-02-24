import React from 'react';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { InstagramEmbed } from 'react-social-media-embed';
import { FaRegKeyboard, FaCode, FaSitemap } from "react-icons/fa6";
import FilteredProjects from './FilteredProjects';

class Content extends React.Component {

  componentDidMount() {
    const {
      getProjectData, displayProjects, orderChronologically,
      projectPath = '', projects = {}
    } = this.props;
    getProjectData(projectPath);
  }
  render() {
    const {
      displayProjects, orderChronologically,
      projectPath = '', data = {}, tags = { tools: [], skills: [], affiliations: [], roles: [] }, date = null, title = null, type = null, projects = {}
    } = this.props;

    var eduIconComponents = {
      "FaSitemap": FaSitemap,
      "FaCode": FaCode,
      "FaRegKeyboard": FaRegKeyboard
    };
    
    
    return (
      <div className="content">
        {type === "project" &&
          <div className="projects-link">
            <Link to="/projects" className="projects-link">Back to Projects</Link>
          </div>
        }
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
        {tags.affiliations.length > 0 &&
          <p>
            <strong>Affiliation: </strong>
            {tags.affiliations && tags.affiliations.map((affiliation, i) => {
              return(<span key={i}>{affiliation}{tags.affiliations.length - 1 === i ? "" : ", "}</span>);
            })}
          </p>
        }
        {tags.roles.length > 0 &&
          <p>
            <strong>Role: </strong>
            {tags.roles && tags.roles.map((role, i) => {
              return(<span key={i}>{role}{tags.roles.length - 1 === i ? "" : ", "}</span>);
            })}
          </p>
        }
        {date &&  
          <p>
            <strong>Date: </strong>
            <span>{date}</span>
          </p>
        }
        {(data.content||[]).length > 0 &&
          <div>{(data.content||[]).map((section, i) => {
            return(
              <div key={i} className={"section "+ section.classes}>
                {section.wrap_images && section.wrap_images.map((image, i) => {
                  return(<img key={i} src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />);
                  }
                )}
                <h2>{section.title}</h2>
                <h3>{section.sub_title}</h3>
                <div>{parse(section.detail)}</div>
                {((section.projectsList||{}).filters||[]).length > 0 &&
                  <div class="projects-list">
                    <FilteredProjects
                      projects={projects}
                      activeTags={(section.projectsList||{}).filters}
                      filterType={(section.projectsList||{}).filterType}
                      displayProjects={displayProjects}
                      orderChronologically={orderChronologically}
                      numToDisplay={6}
                    />
                  </div>
                }
                {(section.buttons||[]).length > 0 &&
                  <div class="buttons-list">
                    {(section.buttons||[]).map((button, i) => {
                      return(
                        <Link to={button.url} key={i} className={button.classes.concat(" button")}>
                          <button className={button.classes}>{button.title}</button>
                        </Link>
                      );
                    })}
                  </div>
                }
                {(section.images||[]).length > 0 &&
                  <div className="image-container">
                    {(section.images||[]).map((image, i) => {
                      return(
                        <span key={i} className={"meh " + image.containerClasses}>
                          <img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />
                          {image.caption && <caption>{image.caption}</caption>}
                        </span>
                      );
                    })}
                  </div>
                }
                {section.video &&
                  <iframe src={section.video} width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                }
                {section.instagramEmbed &&
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <InstagramEmbed url={section.instagramEmbed} width={550} />
                  </div>
                }
                {(section.icons||[]).length > 0 &&
                  <div className="section-icon-list">
                    {section.icons.map((icon, i) => {
                      var Component = eduIconComponents[icon.component];
                      return(
                        <div key={i}  className="icon-details">
                          <Component key={i} size={icon.width} />
                          {icon.degree && <div className="degree">{icon.degree}</div>}
                          {icon.source && icon.source.map((source, i) => {
                            return (<div className="source">{source}</div>);
                          })}
                        </div>
                      );  
                    })}
                  </div>
                }
              </div>
            );
          })}</div>
        }


        {type === "project" &&
          <div className="projects-link">
            <Link to="/projects">Back to Projects</Link>
          </div>
        }
      </div>
    );
  }
}

export default Content;
