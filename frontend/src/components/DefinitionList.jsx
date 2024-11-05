const DefinitionList = ({ definitions, index = ""  }) => {
  return (
    <dl className="row">
      {definitions
        .filter((definition) => definition.description)
        .map((definition) => (
          <div className="d-flex" key={definition.title + index}>
            <div className="col-4">
              <dt className="col-auto">{definition.title}:</dt>
            </div>
            <div className="col-8">
              <dd className="col">{definition.description}</dd>
            </div>
          </div>
        ))}
    </dl>
  );
};

export default DefinitionList;
