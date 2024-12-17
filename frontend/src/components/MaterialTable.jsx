import { getParseFloat } from "../utils";

const MaterialTable = ({items, total}) => {
  return (
    <>
      <h5>Materiales</h5>
      <div className="table-responsive-sm" id="materialTableSection">
        <table className="table align-middle table-hover table-sm table-responsive table-bordered border-black table-secondary">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>P/U</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.material.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit.abbreviation}</td>
                <td>${getParseFloat(item.unit_price) || "N/A"}</td>
                <td>${getParseFloat(item.total_ammount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h6>
        Total: $<span>{getParseFloat(total)}</span>
      </h6>
    </>
  );
};

export default MaterialTable
