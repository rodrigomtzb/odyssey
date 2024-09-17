import React from 'react';
import Sidebar from '../components/Sidebar'

const App = () => {
  const menuItems = [
    { title: 'Inicio', path: '/' },
    {
      title: 'Opciones Desplegables 1',
      subItems: [
        { title: 'Opción 1.1', path: '/opcion1' },
        { title: 'Opción 1.2', path: '/opcion2' },
      ],
    },
    {
      title: 'Opciones Desplegables 2',
      subItems: [
        { title: 'Opción 2.1', path: '/opcion3' },
        { title: 'Opción 2.2', path: '/opcion4' },
      ],
    },
    { title: 'Contacto', path: '/contact' },
  ];

  return (
    <div className="d-flex">
      <Sidebar menuItems={menuItems} />
      <div className="p-4 w-100">
        <h1>Jelou Bitches</h1>
      </div>
    </div>
  );
};

export default App;
