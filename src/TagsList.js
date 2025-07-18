const React = require('react');

class TagsList extends React.Component {
  render() {
    
    const {
        updateActiveTagsAndProjects, toggleAccordion,
        title = "", tags = {}, activeTags = {}, tagAccordions = {}
    } = this.props;

    var isAccordionOpen = tagAccordions[title.toLowerCase()] === true ? "open" : "close";
    // debugger;
    var activeFilterTags = [];
    Object.keys(tags).forEach(tag => {
        if ((activeTags[title.toLowerCase()]||[]).includes(tag)) {
            activeFilterTags.push(tag);
        }
    })
    // debugger;
    console.log("activeFilterTags ",activeFilterTags);
    
    return (
        <div className={["tag", title.toLowerCase(), isAccordionOpen].join(" ")}>
            <div className="tag-title" tabIndex="0" onClick={()=>toggleAccordion(title.toLowerCase())} onKeyUp={(e)=>e.key === 'Enter' ? toggleAccordion(title.toLowerCase()) : null}>
                <h3>{title}</h3>
                <div className="tag-count">{activeFilterTags.length}</div>
            </div>
            <ul className="tags-list">
            {Object.keys(tags).sort().map((tag, i) => {
                // debugger;
                var tagLinkClasses = [];
                if ((activeTags[title.toLowerCase()]||[]).includes(tag)) {
                    tagLinkClasses.push("active");
                }
                if (tags[tag] === 0) {
                    tagLinkClasses.push("disabled");
                }
                // debugger;
                return(
                    <li key={i}>
                        <button onClick={()=>updateActiveTagsAndProjects({title: title.toLowerCase(), tag: tag})} className={tagLinkClasses}>
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
