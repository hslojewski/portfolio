import TagsList from './TagsList';
import FilteredProjects from './FilteredProjects';


const React = require('react');

class Projects extends React.Component {
    componentDidMount() {
        document.querySelector('body').scrollTo({
            top: 0,
            left: 0
        });
        document.title = "Projects | Heidi Slojewski";
    }

    componentWillUnmount() {
        const { clearActiveTags } = this.props;
        clearActiveTags();
    }

    render() {
        const {
            updateActiveTagsAndProjects, clearActiveTags, toggleAccordion, orderChronologically, closeNav,
            activeTags = {}, tools = [], skills = [], affiliations = [], roles = [], projects = {}, filterType = "AND", tagAccordions = {}
        } = this.props;

        console.log("activeTags:");
        console.log(activeTags);
        // debugger;

        return (
            <div className="page">
                <div className="page-content projects-list">
                    <h1>Projects</h1>
                    <div className="filters-header">
                        <div className="title">
                            <h2>Filters</h2>
                            <span>({Object.values(activeTags).length ? Object.values(activeTags).flat().length : Object.values(activeTags).length})</span>
                        </div>
                        <div className={"clear-all "}>
                            <button onClick={clearActiveTags} className={Object.values(activeTags).length === 0 ? "disabled" : null}>Clear all filters</button>
                        </div>
                    </div>
                    <TagsList title="Roles" tags={roles} activeTags={activeTags} updateActiveTagsAndProjects={updateActiveTagsAndProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
                    <TagsList title="Affiliations" activeTags={activeTags} tags={affiliations} updateActiveTagsAndProjects={updateActiveTagsAndProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
                    <TagsList title="Tools" tags={tools} activeTags={activeTags} updateActiveTagsAndProjects={updateActiveTagsAndProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
                    <TagsList title="Skills" tags={skills} activeTags={activeTags} updateActiveTagsAndProjects={updateActiveTagsAndProjects} toggleAccordion={toggleAccordion} tagAccordions={tagAccordions} />
                    <h2>List</h2>
                    <FilteredProjects projects={projects} activeTags={activeTags} filterType={filterType} updateActiveTagsAndProjects={updateActiveTagsAndProjects} orderChronologically={orderChronologically} closeNav={closeNav}  />
                </div>
            </div>
        );
    }
}

export default Projects;
