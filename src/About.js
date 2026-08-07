import React from 'react';
import Content from './Content';

class About extends React.Component {

  componentDidMount() {
    document.title = "About | Heidi Slojewski";
  }

  render() {

    const {
      getProjectData, updateActiveTagsAndProjects, orderChronologically, closeNav,
      projects = {}, projectData = {}
    } = this.props;
    
    return (
      <Content
        title="Hi! I'm Heidi"
        projectPath="about"
        data={projectData}
        getProjectData={getProjectData}
        projects={projects}
        updateActiveTagsAndProjects={updateActiveTagsAndProjects}
        orderChronologically={orderChronologically}
        closeNav={closeNav}
        projectAmount={8}
        
      />
    );
  }
}

export default About;
