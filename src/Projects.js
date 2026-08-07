import { useEffect } from 'react';
import TagsList from './TagsList';
import FilteredProjects from './FilteredProjects';
import { useAppContext } from './AppContext';

const Projects = () => {
    const {
        clearActiveTags, activeTags = {}, projects = {}, filterType = "AND"
    } = useAppContext();

    useEffect(() => {
        document.querySelector('body').scrollTo({
            top: 0,
            left: 0
        });
        document.title = "Projects | Heidi Slojewski";

        return () => {
            clearActiveTags();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <TagsList title="Roles" />
                <TagsList title="Affiliations" />
                <TagsList title="Tools" />
                <TagsList title="Skills" />
                <h2>List</h2>
                <FilteredProjects projects={projects} activeTags={activeTags} filterType={filterType} />
            </div>
        </div>
    );
};

export default Projects;
