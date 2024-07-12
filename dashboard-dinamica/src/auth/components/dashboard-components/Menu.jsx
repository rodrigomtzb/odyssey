import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Menu = () => {
  return (
    <aside className="barra-lateral col-12 col-sm-auto p-0" >
      <div className='logo'>
        <img src="../src/assets/img/logo-04.png" />
      </div>
      <div className='btn-menu'>
      <i className="bi bi-list d-md-none" width='30px' heigth='30px'></i>
      </div>
      <nav className="menu d-flex d-md-block justify-content-center flex-wrap">
        <NavLink to="/dashboard/rh">
            <i className="bi bi-diagram-3-fill"></i>
            Recursos Humanos
        </NavLink>
        <NavLink to="/dashboard/tesoreria">
            <i className="bi bi-cash-coin"></i>
            Finanzas
        </NavLink>
        <NavLink to="proyectos">
            <i className="bi bi-buildings-fill"></i>
            Proyectos
        </NavLink>
        <NavLink to="estadisticas">
            <i className="bi bi-graph-up-arrow"></i>
            Inventario
        </NavLink>
        <NavLink to="notificaciones">
            <i className="bi bi-envelope-check-fill"></i>
            Notificaciones
        </NavLink>
        <Link to="..\">
            <i className="bi bi-box-arrow-right"></i>
            Salir
        </Link>
      </nav>

    </aside>

  )
}

export default Menu
