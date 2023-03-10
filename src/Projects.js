import { Link } from "react-router-dom";

const React = require('react');

class Projects extends React.Component {
  render() {
    const { projects = {}, tags = [] } = this.props;

    return (
        <div>
        <h1>Projects</h1>
        <ul>
        {Object.keys(projects).map(projectPath => {            
            return(
                <li><Link exact to={projectPath}>{projects[projectPath].title}</Link></li>
            );
        })}
        </ul>
        <h2>Tags</h2>
        <ul>
        {tags.map(tag => {
            return(
                <li><Link exact to={"/tags/"+tag}>{tag}</Link></li>
            );
        })}
        </ul>


        <div>Category/Tags</div>
        <ul>
            <li>disney</li>
            <li>web</li>
            <li>lmu</li>
            <li>volunteer</li>
            <li>for class</li>
            <li>professional</li>
            <li>depaul</li>
            <li>types of projects</li>
            <ul>
            <li>prototypes</li>
            <li>wireframes</li>
            <li>evaluations/testing</li>
            <li>infographics</li>
            <li>site launches</li>
            </ul>
        </ul>
        <div>the projects</div>
        <ul>
            <li>depaul</li>
            <ul>
                <li>interactive infographic: twitter</li>
                <li>print infographic: twitter</li>
                <li>titanic infographic</li>
                <li>health infographic</li>
                <li>good/bad graph analysis</li>
                <li>nyc schools app design</li>
                <li>sears mobile design</li>
                <li>social design patterns music</li>
                <li>dcom accessibility</li>
                <li>touchscreen motor impairments</li>
                <li>grubhub user testing</li>
                <li>diva den</li>
                <li>buy car app</li>
                <li>inkformation</li>
                <li>french laundry recipe</li>
                <li>la zoo app</li>
                <li>survivor infographic</li>
                <li>chicago museum app</li>
                <li>weather extension</li>
                <li>car vitals app</li>
                <li>know who's knocking</li>
            </ul>
            <li>lmu</li>
            <ul>
                <li>bookshop database</li>
                <li>jungmann society site</li>
            </ul>
            <li>disney</li>
            <ul>
                <li>video player, ccpa, etc.</li>
                <li>all the recent site launches</li>
                <li>sw homepage redesign</li>
                <li>disney movies portal</li>
                <li>disney junior</li>
                <li>avatar.com launch</li>
                <li>blog sunsets</li>
                <li>google amp support</li>
                <li>20cs launches</li>
                <li>disney news launch</li>
                <li>natgeo films launch</li>
                <li>babynames disney family</li>
                <li>disney plus promos</li>
                <li>retailer plugin wp</li>
                <li>dining plan for wdw parks</li>
                <li>graph db ui</li>
            </ul>
            </ul>
        </div>
    );
  }
}

export default Projects;
