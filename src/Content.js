import React from 'react';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { InstagramEmbed } from 'react-social-media-embed';
import { FaRegKeyboard, FaCode, FaSitemap, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import FilteredProjects from './FilteredProjects';

class Content extends React.Component {

  imageModalTrigger() {
    var imageModal = document.getElementById("image-modal"),
        contentImages = document.querySelectorAll(".image-container .image img:not(.ignore-modal)"),
        modalImage = document.getElementById("modal-image"),
        closeIcon = document.getElementsByClassName("close-modal")[0];
    if (contentImages.length) {
      Array.from(contentImages).forEach(contentImage => {
        contentImage.onclick = function(){
          imageModal.style.display = "block";
          modalImage.src = this.src;
          modalImage.alt = this.alt;
        }
      });
    }
    if (closeIcon) {
      closeIcon.onclick = function() { 
          imageModal.style.display = "none";
      }
    }
    window.addEventListener('keydown', e => {
      if (e.key === "Escape") {
        imageModal.style.display = "none";
      }
    });
  }

  componentDidMount() {
    const {
      getProjectData,
      projectPath = "",
    } = this.props;
    getProjectData(projectPath);
    document.querySelector('body').scrollTo({
      top: 0,
      left: 0
    });
  }

  render() {
    const {
      displayProjects, orderChronologically, closeNav, projectAmount = 8,
      thumbnail = "", data = {}, tags = { tools: [], skills: [], affiliations: [], roles: [] }, date = null, title = null, titleAlignment = null, type = null, projects = {}
    } = this.props;

    this.imageModalTrigger();

    var eduIconComponents = {
      "FaSitemap": FaSitemap,
      "FaCode": FaCode,
      "FaRegKeyboard": FaRegKeyboard,
      "FaLinkedinIn": FaLinkedinIn,
      "FaEnvelope": FaEnvelope
    };
    
    
    return (
      <div className="page">
        {thumbnail &&
          <div className="content-banner">
            <img src={[process.env.PUBLIC_URL, thumbnail].join("/")} alt="" />
          </div>
        }
        <div className="page-content blahmeh second-column">
          {type === "project" &&
            <span className="projects-link">
              <Link to="/projects" className="projects-link" onClick={closeNav}>Back to Projects</Link>
            </span>
          }
          <h1 className={titleAlignment}>{title}</h1>
          <p className="description">{data.description}</p>
          <div className="meta">
            {tags.tools.length > 0 &&
              <span className="meta-item tools">
                <strong>Tools: </strong>
                {tags.tools.sort().map((tool, i) => {
                  return(<span key={i}>{tool}{tags.tools.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {tags.skills.length > 0 &&
              <span className="meta-item">
                <strong>Skills: </strong>
                {tags.skills.sort().map((skill, i) => {
                  return(<span key={i}>{skill}{tags.skills.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {tags.affiliations.length > 0 &&
              <span className="meta-item">
                <strong>Affiliation: </strong>
                {tags.affiliations.sort().map((affiliation, i) => {
                  return(<span key={i}>{affiliation}{tags.affiliations.length - 1 === i ? "" : ", "}</span>);
                })}
              </span>
            }
            {tags.roles.length > 0 &&
              <span className="meta-item">
                <strong>Role: </strong>
                {tags.roles.sort().map((role, i) => {
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
                  <h2 className={section.titleAlignment}>{section.title}</h2>
                  <h3 className={section.subtitleAlignment}>{section.subtitle}</h3>
                  {section.detail &&
                    <div>{parse(section.detail)}</div>
                  }
                  {section.projectsList &&
                    <div className="projects-list">
                      <FilteredProjects
                        projects={projects}
                        activeTags={(section.projectsList||{}).filters}
                        filterType={(section.projectsList||{}).filterType}
                        displayProjects={displayProjects}
                        orderChronologically={orderChronologically}
                        numToDisplay={projectAmount}
                        closeNav={closeNav}
                      />
                    </div>
                  }
                  {(section.buttons||[]).length > 0 &&
                    <div className="buttons-list">
                      {(section.buttons||[]).map((button, i) => {
                        if (button.icon) {
                          var Component = eduIconComponents[button.icon];
                        }
                        return(
                          <Link to={button.url} key={i} aria-label="title" className={button.classes.concat(" button")} onClick={closeNav}>
                            <button className={button.classes}>
                              {button.title}
                              {Component && <Component  />}
                            </button>
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
                    <iframe src={section.video} title="video" aria-label="video" width="100%" height="400" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
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
              <Link to="/projects" onClick={closeNav}>Back to Projects</Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Content;
