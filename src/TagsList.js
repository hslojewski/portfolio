import { Link } from "react-router-dom";

const React = require('react');

class TagsList extends React.Component {
  render() {
    
    const {
        displayProjects, toggleAccordion,
        title = "", tags = {}, activeTags = [], tagAccordions = {}
    } = this.props;

    var isAccordionOpen = tagAccordions[title.toLowerCase()] === true ? "open" : "close";
    
    return (
        <div className={["tag", title.toLowerCase(), isAccordionOpen].join(" ")}>
            <h3 className="tag-title" onClick={()=>toggleAccordion(title.toLowerCase())}>{title}</h3>
            <ul className="tags-list">
            {Object.keys(tags).map((tag, i) => {
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
