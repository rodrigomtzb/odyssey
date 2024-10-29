import React from 'react';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ExportToExcel = () => {
  const tableData = [
    { nombre: 'Juan', edad: 30, ciudad: 'Madrid' },
    { nombre: 'Ana', edad: 25, ciudad: 'Barcelona' },
    { nombre: 'Luis', edad: 28, ciudad: 'Valencia' }
  ];

  const exportToExcel = () => {
    // Crea una nueva hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    // Crea un libro de trabajo
    const workbook = XLSX.utils.book_new();
    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    // Exporta el archivo
    XLSX.writeFile(workbook, 'datos.xlsx');
  };

  return (
    <div className='col-3 mt-3'>
      <Button onClick={exportToExcel} variant='gd'>Generar Excel</Button>
    </div>
  );
};

export default ExportToExcel;
