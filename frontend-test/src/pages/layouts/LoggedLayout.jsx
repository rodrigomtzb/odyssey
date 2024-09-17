import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const LoggedLayout = () => {
    const token = localStorage.getItem('token');
    const menuItems = [
        { title: 'Inicio', path: '/' },
        { title: 'Recursos Humanos', path: '/hr' },
        {
          title: 'Panel de Control',
          subItems: [
            { title: 'Usuarios', path: '/users' },
          ],
        },
      ];

    return (
        <div>
            <Sidebar menuItems={menuItems}/>
            <div className="content p-5" style={{marginLeft: '250px'}}>
                <Outlet />
            </div>
        </div>
    );
} 

export default LoggedLayout