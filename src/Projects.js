import TagsList from './TagsList';
import ActiveFilters from './ActiveFilters';
import FilteredProjects from './FilteredProjects';


const React = require('react');

class Projects extends React.Component {
  render() {
    const {
        displayProjects, toggleFilterType, clearActiveTags, toggleAccordion, orderChronologically,
        activeTags = [], tools = [], skills = [], affiliations = [], roles = [], projects = {}, filterType = "AND", tagAccordions = {}
    } = this.props;
    
    return (
        <div className="page-content projects-list">
            <h1>Projects</h1>
            <div className="filters-header">
                <div className="title">
                    <h2>Filters</h2>
                    <span>({activeTags.length})</span>
                </div>
                <div className="clear-all">
                    <button onClick={clearActiveTags}>Clear all filters</button>
                </div>
            </div>
            <TagsList title="Tools" tags={tools} activeTags={activeTags} displayProjects={displayProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
            <TagsList title="Skills" tags={skills} activeTags={activeTags} displayProjects={displayProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
            <TagsList title="Affiliations" activeTags={activeTags} tags={affiliations} displayProjects={displayProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
            <TagsList title="Roles" tags={roles} activeTags={activeTags} displayProjects={displayProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
            <h2>List</h2>
            <FilteredProjects projects={projects} activeTags={activeTags} filterType={filterType} displayProjects={displayProjects} orderChronologically={orderChronologically} />
        </div>
    );
  }
}

export default Projects;
