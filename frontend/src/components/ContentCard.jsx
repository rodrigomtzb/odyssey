const ContentCard = ({ children }) => {
  return (
    <div className="content mb-3 px-3 pt-4 pb-3 border bg-secondary-subtle rounded">
      {children}
    </div>
  );
};

export default ContentCard;
