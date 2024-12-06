const MaterialTableTemplate = ({ data }) => {
  return (
    <div className="table-responsive-sm" id="materialTableSection">
      <table className="table align-middle table-hover table-sm table-responsive table-bordered border-black table-secondary">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>P/U</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.material.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unitId}</td>
              <td>{item.unitPrice || "N/A"}</td>
              <td>
                {item.unitPrice ? (
                  item.totalAmmount
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    value={item.totalAmmount}
                    onChange={(e) =>
                      handleSubtotalChange(index, e.target.value)
                    }
                  />
                )}
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeMaterial(item.id)}
                  >
                    <i className="bi bi-trash-fill" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
