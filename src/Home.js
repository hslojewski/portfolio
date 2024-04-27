import Content from './Content';

const React = require('react');

class Home extends React.Component {

  render() {

    const {
      getProjectData, displayProjects, orderChronologically,
      projects = {}, projectData = {}
    } = this.props;
    
    return (
      <Content
        projectPath="home"
        title="Heidi Slojewski"
        titleAlignment="center"
        data={projectData}
        getProjectData={getProjectData}
        projects={projects}
        displayProjects={displayProjects}
        orderChronologically={orderChronologically}
      />
    );
  }
}

export default Home;
