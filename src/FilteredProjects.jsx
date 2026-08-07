import { Link } from "react-router-dom";
import { useAppContext } from './AppContext';
import { withBase } from './publicUrl';

const FilteredProjects = ({
  projects = {}, activeTags = [], filterType = ["AND"], numToDisplay = null, order = null
}) => {
  const { orderChronologically, closeNav } = useAppContext();

  // activeTags can be given in two shapes - this component figures out
  // which one it got and matches accordingly:
  // 1. A flat list of tag strings, e.g. ["Platform Product Manager", "Software Engineer"]
  //    (used by project-JSON-driven "featured projects" sections). A project
  //    matches if any/all of its tags (any category) are in that list.
  // 2. A category-keyed object, e.g. { tools: ["Squarespace"], affiliations: [...] }
  //    (used for Related Projects, where a caller wants matching scoped per
  //    category rather than one flat pool of tags).
  var tagCategories = ['tools', 'skills', 'affiliations', 'roles'];
  var isCategorized = activeTags && !Array.isArray(activeTags) && typeof activeTags === 'object';
  var activeCategories = isCategorized ? tagCategories.filter(category => (activeTags[category] || []).length > 0) : [];
  var selectedFlatTags = isCategorized ? [] : (Array.isArray(activeTags) ? activeTags.filter(Boolean) : []);
  var hasActiveSelection = isCategorized ? activeCategories.length > 0 : selectedFlatTags.length > 0;
  var requiredMatchCount = isCategorized ? activeCategories.length : selectedFlatTags.length;

  // Number of active categories (or, for the flat shape, "tags") a project matches.
  var matchStrength = (project) => {
    if (isCategorized) {
      return activeCategories.filter(category => (project[category] || []).some(tag => activeTags[category].includes(tag))).length;
    }
    var projectTags = [].concat(project.tools || [], project.skills || [], project.affiliations || [], project.roles || []);
    return selectedFlatTags.filter(tag => projectTags.includes(tag)).length;
  };

  // filterType is one or more of "AND"/"OR", tried in order - e.g.
  // ["AND", "OR"] means "AND-matches first, then anything OR-matches".
  // A single value like "AND" or "OR" is also accepted for simple cases.
  var filterTypes = Array.isArray(filterType) ? filterType : [filterType];
  var satisfies = (project, ft) => {
    var strength = matchStrength(project);
    return ft === "OR" ? strength > 0 : strength === requiredMatchCount;
  };
  // The tier is the earliest (lowest-index) filterType a project satisfies.
  // A project satisfying none of the given filterTypes is excluded entirely.
  var tierFor = (project) => {
    for (var i = 0; i < filterTypes.length; i++) {
      if (satisfies(project, filterTypes[i])) {
        return i;
      }
    }
    return -1;
  };

  var projectsToDisplay = Object.keys(projects);
  if (hasActiveSelection) {
    projectsToDisplay = projectsToDisplay.filter(path => tierFor(projects[path]) !== -1);
  }

  // `order` lets a caller supply a specific display order instead of the
  // default chronological sort.
  var orderedProjects = order || orderChronologically(projects);
  projectsToDisplay = orderedProjects.filter(a => projectsToDisplay.includes(a));

  // With multiple filterTypes, earlier tiers (e.g. AND) rank before later
  // ones (e.g. OR); Array.sort is stable, so chronological order is
  // preserved within each tier.
  if (hasActiveSelection && filterTypes.length > 1) {
    projectsToDisplay = [...projectsToDisplay].sort((a, b) => tierFor(projects[a]) - tierFor(projects[b]));
  }

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
                    <img loading={i > 5 ? "lazy" : null} src={withBase(projects[path].thumbnail)} alt={projects[path].thumbnail_alt} />
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
};

export default FilteredProjects;
