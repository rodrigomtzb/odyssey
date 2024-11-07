const TagList = ({ tags }) => {
    return (
        <>
        <h4>Tags:</h4>
      <div>
        {tags.map((tag) => (
            <span key={tag.id} className="fw-bold me-2">
            #{tag.description}
          </span>
        ))}
      </div>
        </>
    );
  };
  
  export default TagList;
  