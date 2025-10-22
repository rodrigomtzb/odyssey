import React, { useEffect, useState } from "react";
import { Title, ContentCard} from "../../../components";
import { Select, Input, TitleSection  } from "../../../components/Form";
import { Col, Button } from "react-bootstrap";

const SalesHistory = () => {
  const [branches, setBranches] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);

  const [filters, setFilters] = useState({
    branchId: "",
    startDate: "",
    endDate: "",
    search: "",
  });

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // --- MOCK DATA ---
  useEffect(() => {
    // Sucursales Mock
    const mockBranches = [
      { id: 1, name: "Sucursal Centro" },
      { id: 2, name: "Sucursal Norte" },
      { id: 3, name: "Sucursal Sur" },
    ];
    setBranches(mockBranches);

    // Ventas Mock
    const mockSales = Array.from({ length: 25 }).map((_, i) => ({
      id: i + 1,
      branch: mockBranches[i % 3],
      product: { name: ["Laptop Pro", "Mouse Óptico", "Teclado Gamer"][i % 3] },
      variant: {
        color: ["Negro", "Gris", "Blanco"][i % 3],
        size: ["M", "L", "XL"][i % 3],
        unitPrice: [15000, 500, 1200][i % 3],
      },
      quantity: Math.floor(Math.random() * 5) + 1,
      customerName: ["Carlos Pérez", "María López", "Ana Torres"][i % 3],
      date: new Date(
        2025,
        9,
        Math.floor(Math.random() * 20) + 1,
        10,
        Math.floor(Math.random() * 60)
      ).toISOString(),
    }));

    setSales(mockSales);
    setFilteredSales(mockSales);
  }, []);

  // --- FILTROS ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let data = [...sales];

    if (filters.branchId) {
      data = data.filter(
        (s) => s.branch.id === parseInt(filters.branchId)
      );
    }

    if (filters.startDate) {
      data = data.filter(
        (s) => new Date(s.date) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      data = data.filter(
        (s) => new Date(s.date) <= new Date(filters.endDate)
      );
    }

    if (filters.search.trim() !== "") {
      const searchLower = filters.search.toLowerCase();
      data = data.filter(
        (s) =>
          s.customerName?.toLowerCase().includes(searchLower) ||
          s.product.name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredSales(data);
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ branchId: "", startDate: "", endDate: "", search: "" });
    setFilteredSales(sales);
  };

  const totalPages = Math.ceil(filteredSales.length / pageSize);
  const paginated = filteredSales.slice((page - 1) * pageSize, page * pageSize);

  // --- EXPORT CSV ---
  const exportCSV = () => {
    const headers = [
      "Sucursal",
      "Producto",
      "Variante",
      "Cantidad",
      "Cliente",
      "Fecha",
      "Precio Unitario",
      "Total",
    ];
    const rows = filteredSales.map((s) => [
      s.branch.name,
      s.product.name,
      `${s.variant.color || ""} ${s.variant.size || ""}`,
      s.quantity,
      s.customerName || "-",
      new Date(s.date).toLocaleString(),
      s.variant.unitPrice,
      (s.variant.unitPrice * s.quantity).toFixed(2),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((r) => {
      csv += r.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales_history.csv";
    link.click();
  };

  // --- RENDER ---
  return (
    <>
      <TitleSection>
        <Title text="🧾 Historial de Ventas" />
      </TitleSection>

      <ContentCard>
        <div className="filters mb-4">
          <div className="row">
            <Col md={3}>
              <Select
                label="Sucursal"
                name="branchId"
                value={filters.branchId}
                onChange={handleFilterChange}
                options={[
                  { value: "", label: "Todas" },
                  ...branches.map((b) => ({
                    value: b.id,
                    label: b.name,
                  })),
                ]}
              />
            </Col>

            <Col md={2}>
              <Input
                label="Desde"
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </Col>

            <Col md={2}>
              <Input
                label="Hasta"
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </Col>

            <Col md={3}>
              <Input
                label="Búsqueda"
                type="text"
                name="search"
                value={filters.search}
                placeholder="Cliente o producto"
                onChange={handleFilterChange}
              />
            </Col>

            <Col md={2} className="d-flex align-items-end">
              <Button text="Filtrar" type="button" onClick={applyFilters} />
            </Col>
          </div>

          <div className="mt-3 d-flex gap-2">
            <Button text="Limpiar" variant="secondary" onClick={clearFilters} />
            <Button text="Descargar CSV" variant="secondary" onClick={exportCSV} />
          </div>
        </div>

        {/* TABLA DE RESULTADOS */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Sucursal</th>
                <th>Producto</th>
                <th>Variante</th>
                <th>Cantidad</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-3">
                    No hay registros disponibles
                  </td>
                </tr>
              ) : (
                paginated.map((s) => (
                  <tr key={s.id}>
                    <td>{s.branch.name}</td>
                    <td>{s.product.name}</td>
                    <td>{s.variant.color} {s.variant.size}</td>
                    <td>{s.quantity}</td>
                    <td>{s.customerName}</td>
                    <td>{new Date(s.date).toLocaleString()}</td>
                    <td>${s.variant.unitPrice}</td>
                    <td>${(s.variant.unitPrice * s.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div className="pagination mt-3 d-flex justify-content-between align-items-center">
            <Button
              text="◀ Anterior"
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            <span>
              Página {page} de {totalPages}
            </span>
            <Button
              text="Siguiente ▶"
              variant="secondary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </div>
        )}
      </ContentCard>
    </>
  );
};

export default SalesHistory;
