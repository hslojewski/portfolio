import Content from './Content';

const React = require('react');

class About extends React.Component {

  render() {

    const {
      getProjectData, displayProjects, orderChronologically,
      projects = {}, projectData = {}
    } = this.props;
    
    return (
      <Content
        title="Hi! I'm Heidi"
        projectPath="about"
        data={projectData}
        getProjectData={getProjectData}
        projects={projects}
        displayProjects={displayProjects}
        orderChronologically={orderChronologically}
      />
    );
  }
}

export default About;
