const DefinitionList = ({ definitions, index = "" }) => {
  return (
    <dl className="row">
      {definitions
        .filter((definition) => definition.description)
        .map((definition) => (
          <div className="d-flex row" key={definition.title + index}>
            <div className="col-lg-4 col-12">
              <dt className="col-auto">{definition.title}:</dt>
            </div>
            <div className="col-lg-8 col-12">
              {Array.isArray(definition.description) ? (
                <ul className="col">
                  {definition.description.map((item, i) => (
                    <li key={`${item}-${i}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <dd className="col">{definition.description}</dd>
              )}
            </div>
          </div>
        ))}
    </dl>
  );
};

export default DefinitionList;
