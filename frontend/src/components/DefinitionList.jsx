const DefinitionList = ({ definitions }) => {
  return (
    <dl className="row">
      {definitions.map((definition) => (
        <div className="d-flex">
          <div className="col-3">
            <dt className="col-auto">{definition.title}:</dt>
          </div>
          <div className="col-9">
            <dd className="col">{definition.description}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
};

export default DefinitionList;
