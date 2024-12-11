const ContentCard = ({ children }) => {
  return (
    <div className="content mb-3 p-3 border bg-secondary-subtle rounded">
      {children}
    </div>
  );
};

export default ContentCard;
