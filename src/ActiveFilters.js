const React = require('react');

class ActiveFilters extends React.Component {
  render() {
    const { activeTags = {} } = this.props;

    return (
        <div>
          <h2>Filters:</h2>
          {Object.keys(activeTags).length > 0 &&
            activeTags.map((activeTag, i) => {
              return(
                <span>{activeTag + ((Object.keys(activeTags) - 1) === i ? "" : ", ")}</span>
              )
            })
          }
          {Object.keys(activeTags).length === 0 && <span>(None)</span>}
        </div>
    )
  }
}

export default ActiveFilters;
