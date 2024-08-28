import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import imgLogo from '../../../assets/img/logo-04.png';

const Menu = () => {

  useEffect( () => {

    document.getElementsByClassName('btn-menu')[0].onclick = function() {
      var boxOne = document.getElementsByClassName('cnt-menu')[0];
      let elmnt = document.getElementById('mvnCnt');
      console.log( elmnt );
      if(elmnt.value === 'Play') 
      { 
        elmnt.value = 'Pause';
        boxOne.classList.remove('horizTranslateReverse'); 
        boxOne.classList.add('horizTranslate');
      } else {
        elmnt.value = 'Play';
        boxOne.classList.remove('horizTranslate');  
        boxOne.classList.add('horizTranslateReverse');  
      }  
    }
    
  
  } )

  return (
    <aside className="barra-lateral col-md-12 h-md-10 col-lg-auto p-0" >
      <div className='logo'>
        <img src={imgLogo} />
      </div>
      <div className='cnt-menu'>
        <div className='btn-menu'>
        <i className="bi bi-list d-lg-block d-xl-none" width='30px' heigth='30px'></i>
         <input type='hidden' value="Play" id="mvnCnt" />
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
          <Link to="../">
              <i className="bi bi-box-arrow-right"></i>
              Salir
          </Link>
        </nav>
      </div>

    </aside>

  )
}

export default Menu
