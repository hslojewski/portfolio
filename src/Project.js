import React from 'react';


class Project extends React.Component {

  componentWillMount() {
    // debugger;
    const { getProjectData, projId = '', data = {} } = this.props;
    getProjectData(projId);
  }

  render() {
    // debugger;
    const { data = {} } = this.props;
    return (
      <div>
        <h2>Project: {data.title}</h2>
      </div>
    );
  }
}

export default Project;
