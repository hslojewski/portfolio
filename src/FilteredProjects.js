import { Link } from "react-router-dom";

const React = require('react');

class FilteredProjects extends React.Component {
  render() {
    const {
      orderChronologically, closeNav,
      projects = {}, activeTags = [], filterType = "AND", numToDisplay =  null
    } = this.props;

    // This component is used two different ways with two different activeTags shapes:
    // 1. From the Projects page: activeTags is the category-keyed object ({tools: [...]})
    //    used for the page-level filters. `projects` has already been filtered by App.js
    //    in that case, so there's nothing more to do here.
    // 2. From Content.js (e.g. About/Home "related projects" sections): activeTags is a
    //    flat list of tag strings from that project's own JSON, e.g.
    //    ["Platform Product Manager", "Software Engineer"]. A project matches if any of
    //    its tools/skills/affiliations/roles tags are in that list.
    var selectedTags = Array.isArray(activeTags) ? activeTags.filter(Boolean) : [];

    var projectsToDisplay = Object.keys(projects);
    if (selectedTags.length) {
      projectsToDisplay = projectsToDisplay.filter(path => {
        var project = projects[path];
        var projectTags = [].concat(
          project.tools || [], project.skills || [], project.affiliations || [], project.roles || []
        );
        return filterType === "OR"
          ? selectedTags.some(tag => projectTags.includes(tag))
          : selectedTags.every(tag => projectTags.includes(tag));
      });
    }

    var orderedProjects = orderChronologically(projects);
    projectsToDisplay = orderedProjects.filter(a => projectsToDisplay.includes(a));
    
    if (numToDisplay && projectsToDisplay.length) {
      projectsToDisplay = projectsToDisplay.slice(0, numToDisplay);
    }

    return (
        <div>
          {projectsToDisplay.length > 0 &&
            <div className="project-list-wrapper">
              <ul className={projectsToDisplay.length === 1 ? "one-item" : (projectsToDisplay.length === 2 ? "two-items" : null)}>
              {projectsToDisplay.map((path, i) => {
                return(
                  <li key={i} className="project-detail">
                    <Link exact="true" to={"/projects/" + path} onClick={closeNav}>
                      <img loading={i > 5 ? "lazy" : null} src={[process.env.PUBLIC_URL, projects[path].thumbnail].join("/")} alt={projects[path].thumbnail_alt} />
                      <h3>{projects[path].title}</h3>
                    </Link>
                  </li>
                )
              })}
              </ul>
            </div>
          }
          {projectsToDisplay.length === 0 &&
            <div></div>
          }
        </div>
    )
  }
}

export default FilteredProjects;
