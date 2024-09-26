const TitleSection = ({text}) => {
  return (
    <div
      className="bg-gd d-flex align-items-center p-2 mb-4 rounded"
      style={{ width: "fit-content" }}
    >
      <h5 className="m-0">
        {text}
      </h5>
    </div>
  );
};

export default TitleSection;
