import Content from './Content';

const React = require('react');

class About extends React.Component {

  componentDidMount() {
    document.title = "About | Heidi Slojewski";
  }

  render() {

    const {
      getProjectData, displayProjects, orderChronologically, closeNav,
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
        closeNav={closeNav}
        projectAmount={6}
      />
    );
  }
}

export default About;
