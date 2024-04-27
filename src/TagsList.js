const React = require('react');

class TagsList extends React.Component {
  render() {
    
    const {
        displayProjects, toggleAccordion,
        title = "", tags = {}, activeTags = [], tagAccordions = {}
    } = this.props;

    var isAccordionOpen = tagAccordions[title.toLowerCase()] === true ? "open" : "close";
    // debugger;
    var activeFilterTags = [];
    Object.keys(tags).forEach(tag => {
        if (activeTags.includes(tag)) {
            activeFilterTags.push(tag);
        }
    })
    return (
        <div className={["tag", title.toLowerCase(), isAccordionOpen].join(" ")}>
            <div className="tag-title" onClick={()=>toggleAccordion(title.toLowerCase())}>
                <h3>{title}</h3>
                <div className="tag-count">{activeFilterTags.length}</div>
            </div>
            <ul className="tags-list">
            {Object.keys(tags).sort().map((tag, i) => {
                // debugger;
                var tagLinkClasses = [];
                if (activeTags.includes(tag)) {
                    tagLinkClasses.push("active");
                }
                if (tags[tag] === 0) {
                    tagLinkClasses.push("disabled");
                }
                return(
                    <li key={i}>
                        <button onClick={()=>displayProjects(tag)} className={tagLinkClasses}>
                            {tag} ({tags[tag]})
                        </button>
                    </li>
                );
            })}
            </ul>
        </div>
    )
  }
}

export default TagsList;
