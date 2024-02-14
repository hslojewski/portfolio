import { Link } from "react-router-dom";

const React = require('react');

class TagsList extends React.Component {
  render() {
    const {
        displayProjects,
        title = "", tags = {}, activeTags = []
    } = this.props;
    
    return (
        <div>
            <h2>{title}</h2>
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
                    <li>
                        <Link key={i} onClick={()=>displayProjects(tag)} className={tagLinkClasses}>
                            {tag} ({tags[tag]})
                        </Link>
                    </li>
                );
            })}
            </ul>
        </div>
    )
  }
}

export default TagsList;
