import { Link } from "react-router-dom";

const React = require('react');

class TagsList extends React.Component {
  render() {
    const {
        displayProjects,
        title = "", tags = []
    } = this.props;
    
    return (
        <div>
            <h2>{title}</h2>
            <ul>
            {tags.map((tag, i) => {
                return(
                    <li><Link key={i} onClick={()=>displayProjects(tag)}>{tag}</Link></li>
                );
            })}
            </ul>
        </div>
    )
  }
}

export default TagsList;
