const React = require('react');

class ActiveFilters extends React.Component {
  render() {
    const { activeTags = [] } = this.props;
    
    return (
        <div>
          <h2>Filters:</h2>
          {activeTags.length > 0 &&
            activeTags.map((activeTag, i) => {
              return(
                <span>{activeTag + ((activeTags.length - 1) === i ? "" : ", ")}</span>
              )
            })
          }
          {activeTags.length === 0 && <span>(None)</span>}
        </div>
    )
  }
}

export default ActiveFilters;
