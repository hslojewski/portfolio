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
      projectPath = "", projects = {}
    } = this.props;
    getProjectData(projectPath);
    
  }
  render() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    const {
      displayProjects, orderChronologically,
      projectPath = "", thumbnail = "", data = {}, tags = { tools: [], skills: [], affiliations: [], roles: [] }, date = null, title = null, type = null, projects = {}
    } = this.props;

    var eduIconComponents = {
      "FaSitemap": FaSitemap,
      "FaCode": FaCode,
      "FaRegKeyboard": FaRegKeyboard
    };
    
    
    return (
      <div>
        {thumbnail &&
          <div className="content-banner">
            <img src={[process.env.PUBLIC_URL, thumbnail].join("/")} alt="" />
          </div>
        }
        <div className="page-content blahmeh second-column">
          {type === "project" &&
            <span className="projects-link">
              <Link to="/projects" className="projects-link">Back to Projects</Link>
            </span>
          }
          <h1>{title}</h1>
          <p className="description">{data.description}</p>
          <div className="meta">
            {tags.tools.length > 0 &&
              <span className="meta-item tools">
                <strong>Tools: </strong>
                {tags.tools.map((tool, i) => {
                  return(<span key={i}>{tool}{tags.tools.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {tags.skills.length > 0 &&
              <span className="meta-item">
                <strong>Skills: </strong>
                {tags.skills.map((skill, i) => {
                  return(<span key={i}>{skill}{tags.skills.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {tags.affiliations.length > 0 &&
              <span className="meta-item">
                <strong>Affiliation: </strong>
                {tags.affiliations && tags.affiliations.map((affiliation, i) => {
                  return(<span key={i}>{affiliation}{tags.affiliations.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {tags.roles.length > 0 &&
              <span className="meta-item">
                <strong>Role: </strong>
                {tags.roles && tags.roles.map((role, i) => {
                  return(<span key={i}>{role}{tags.roles.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {date &&  
              <span className="meta-item date">
                <strong>Date: </strong>
                <span>{date}</span>
              </span>
            }
          </div>
          {type === "project" && <hr className="content-divider"></hr>}
          {(data.content||[]).length > 0 &&
            <div>{(data.content||[]).map((section, i) => {
              return(
                <div key={i} className={"section "+ section.classes}>
                  {section.wrap_images && section.wrap_images.map((image, i) => {
                    return(<img key={i} src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />);
                    }
                  )}
                  <h2>{section.title}</h2>
                  <h3>{section.subtitle}</h3>
                  {section.detail &&
                    <div>{parse(section.detail)}</div>
                  }
                  {((section.projectsList||{}).filters||[]).length > 0 &&
                    <div className="projects-list">
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
                    <div className="buttons-list">
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
                        if (image.windowWrapper === "device") {
                          return(
                            <div key={i} className={"image device " + image.containerClasses}>
                              <div className="content">
                                <img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />
                              </div>
                            </div>
                          );
                        } else if (image.windowWrapper === "browser") {
                          return(
                            <div key={i} className={"image browser " + image.containerClasses}>
                              <div className="browser-navigation-bar">
                                <i></i><i></i><i></i>
                                <input value={image.browserDestination} disabled />
                              </div>
                              <div className="browser-container">
                                <img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />
                              </div>
                            </div>
                          );
                        } else {
                          return(
                            <div key={i} className={"image " + image.containerClasses}>
                              <img src={[process.env.PUBLIC_URL, image.src].join("/")} alt={image.alt} className={image.classes} />
                              {image.caption && <caption>{image.caption}</caption>}
                            </div>
                          );
                        };
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
                          <div key={i} className="icon-details">
                            <Component key={i} size={icon.width} />
                            {icon.degree && <div className="degree">{icon.degree}</div>}
                            {icon.source && icon.source.map((source, i) => {
                              return (<div key={i} className="source">{source}</div>);
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
            <div className="projects-link bottom">
              <Link to="/projects">Back to Projects</Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Content;
