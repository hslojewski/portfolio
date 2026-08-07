import React from 'react';
import Content from './Content';

class Home extends React.Component {

  componentDidMount() {
    document.title = "Heidi Slojewski | Web Developer & Product Manager";
  }

  render() {

    const {
      getProjectData, updateActiveTagsAndProjects, orderChronologically,
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
        updateActiveTagsAndProjects={updateActiveTagsAndProjects}
        orderChronologically={orderChronologically}
        
      />
    );
  }
}

export default Home;
