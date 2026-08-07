import { useAppContext } from './AppContext';

const TagsList = ({ title = "" }) => {
  const {
    tags: allTags, activeTags = {}, updateActiveTagsAndProjects, toggleAccordion, tagAccordions = {}
  } = useAppContext();

  const tags = allTags[title.toLowerCase()] || {};

  var isAccordionOpen = tagAccordions[title.toLowerCase()] === true ? "open" : "close";
  var activeFilterTags = [];
  Object.keys(tags).forEach(tag => {
      if ((activeTags[title.toLowerCase()]||[]).includes(tag)) {
          activeFilterTags.push(tag);
      }
  })

  return (
      <div className={["tag", title.toLowerCase(), isAccordionOpen].join(" ")}>
          <div className="tag-title" tabIndex="0" onClick={()=>toggleAccordion(title.toLowerCase())} onKeyUp={(e)=>e.key === 'Enter' ? toggleAccordion(title.toLowerCase()) : null}>
              <h3>{title}</h3>
              <div className="tag-count">{activeFilterTags.length}</div>
          </div>
          <ul className="tags-list">
          {Object.keys(tags).sort().map((tag, i) => {
              var tagLinkClasses = [];
              if ((activeTags[title.toLowerCase()]||[]).includes(tag)) {
                  tagLinkClasses.push("active");
              }
              if (tags[tag] === 0) {
                  tagLinkClasses.push("disabled");
              }
              return(
                  <li key={i}>
                      <button onClick={()=>updateActiveTagsAndProjects({title: title.toLowerCase(), tag: tag})} className={tagLinkClasses}>
                          {tag} ({tags[tag]})
                      </button>
                  </li>
              );
          })}
          </ul>
      </div>
  )
};

export default TagsList;
