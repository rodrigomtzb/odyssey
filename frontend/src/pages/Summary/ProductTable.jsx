import React, { useState } from 'react';

const ProductTable = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto A', price: 100, stock: 20 },
    { id: 2, name: 'Producto B', price: 200, stock: 15 },
    { id: 3, name: 'Producto C', price: 150, stock: 25 },
  ]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.stock} unidades</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;