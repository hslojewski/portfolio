const React = require('react');

class Project extends React.Component {

  componentDidMount() {
  }

  render() {
    const { data = {} } = this.props;
    
    return (
      <div>
        <h2>Project: {data.title}</h2>
      </div>
    );
  }
}

export default Project;
