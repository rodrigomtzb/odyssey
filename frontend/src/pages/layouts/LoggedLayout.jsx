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
        <div className="bg-general">
            <Sidebar menuItems={menuItems} />
            <main className="content p-3" style={{marginLeft: '250px'}}>
                <Outlet />
            </main>
        </div>
    );
} 

export default LoggedLayout