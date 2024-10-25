import { useState } from "react";
import logoUnicauca from "../../assets/Logo_Unicauca.png"
import AsideAdmin from "../asideAdmin/AsideAdmin";
import { useNavigate } from "react-router-dom";
import initNav from "../../assets/initNav.svg";
import agreementsNav from "../../assets/agreementsNav.svg";
import formsNav from "../../assets/formsNav.svg";
import statisticsNav from "../../assets/statisticsNav.svg";
import regNav from "../../assets/regNav.svg";
import logoutNav from "../../assets/logoutNav.svg";
import menuNavbar from "../../assets/menuNavbar.svg";
import changePassword from "../../assets/changePasswordNav.svg"

function NavbarAdmin() {
    const [open, setOpen] = useState(true);
    const manejarClick = () => {
        setOpen(!open); // Alterna entre true y false
    };
    const navigate = useNavigate();
    const Menus = [
        {title: "Inicio", src:initNav, Link:"/admin"},
        {title: "Convenios", src:agreementsNav ,Link:"/admin/agreement"},
        {title: "Movilidad", src:formsNav, Link:"/admin/movilidad"},
        {title: "Estadísticas", src:statisticsNav, Link:"/statistics"},
        {title: "Registrar Usuarios", src:regNav, Link:"/user/list"},
        {title: "Cambiar Contraseña", src:changePassword, Link:"/changePassword"},
        {title: "Cerrar Sesión", src:logoutNav}
    ]
        return (
        <div>
            <nav className="bg-primary-dark p-4 flex items-center">
            <section className="left-50">
                <img 
                src={logoUnicauca}
                alt="Universidad del Cuca" 
                className="h-11 mr-20"
                />
            </section>
            <div></div>
            <div className="container mx-auto flex justify-between items-center gap-8">
                {Menus.map((menu,index) => (
                    <li key={index} className="hidden lg:block text-white text-sm font-bold items-center gap-x-1 p-1
                    hover:text-primary-light rounded-md cursor-pointer">
                    <button className="flex gap-x-2" onClick={() => navigate(menu.Link)}>
                        <img src={menu.src} className="w-5"/>
                        {menu.title}
                    </button>
                    </li>
                ))} 
            </div>
            <img 
                src={menuNavbar}
                className={`absolute cursor-pointer right-3 top-7 w-7 lg:hidden`} 
                onClick={manejarClick} 
                />
            </nav>
            <section className="flex items-center gap-4">
            <AsideAdmin open={open} setOpen={setOpen}/>
            </section>
        </div>
        
        );
}

export default NavbarAdmin;