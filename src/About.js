import Content from './Content';

const React = require('react');

class About extends React.Component {

  render() {

    const {
      getProjectData, displayProjects, orderChronologically,
      projects = {}, projectData = {}
    } = this.props;
    
    return (
      <div>
        <Content
          title="Hi! I'm Heidi"
          projectPath="about"
          data={projectData}
          getProjectData={getProjectData}
          projects={projects}
          displayProjects={displayProjects}
          orderChronologically={orderChronologically}
        />





<br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h2>About</h2>
        <div>Summary</div>
        <div>Education</div>
        <ul>
          <li>depaul - HCI</li>
          <li>hackbright - software engineering</li>
          <li>lmu - MIS</li>
        </ul>
        <div>Skills</div>
        <ul>
          <li>tech/SWE</li>
            <ul>
              <li>javascript</li>
              <li>react</li>
              <li>html</li>
              <li>css</li>
              <li>git</li>
              <li>backbone</li>
              <li>ruby</li>
              <li>php/wordpress</li>
              <li>mustache</li>
              <li>ruby on rails</li>
              <li>angular</li>
              <li>docker</li>
              <li>python</li>
            </ul>
          <li>ux</li>
            <ul>
              <li>prototyping</li>
              <li>wireframes</li>
              <li>sitemaps</li>
              <li>usability testing</li>
              <li>task analysis</li>
              <li>inquiry methods</li>
              <li>user research</li>
            </ul>
          <li>product</li>
          <li>other</li>
          <ul>
            <li>accessibility</li>
            <li>internationalization/localization</li>
            <li>photoshop</li>
            <li>illustrator</li>
            <li>excel/spreadsheets</li>
          </ul>
        </ul>
        <div>Experience</div>
        <ul>
          <li>disney</li>
          <li>freelance</li>
          <li>lmu</li>
          <li>neopets</li>
        </ul>
        <div>Projects - link to Projects</div>
        <div>way to tag posts related to the Experiences, like "All projects related to time at Disney"</div>
      </div>
    );
  }
}

export default About;
