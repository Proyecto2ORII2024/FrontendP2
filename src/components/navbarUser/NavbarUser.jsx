import { useState } from "react";
import logoUnicauca from "../../assets/Logo_Unicauca.png"
import AsideUser from "../asideUser/AsideUser";
import { Link, useNavigate } from "react-router-dom";

function NavbarUser() {
  const [open, setOpen] = useState(true);
  const manejarClick = () => {
    setOpen(!open); // Alterna entre true y false
  };
  const navigate = useNavigate();
  const Menus = [
    {title: "Inicio", src:"initNav", Link:"/user"},
    {title: "Convenios", src:"agreementsNav", Link:"/user/agreement"},
    {title: "Formularios", src:"formsNav"},
    {title: "Registrar Usuarios", src:"regNav", Link:"/user/registrar"},
    {title: "Cambiar Contraseña", src:"changePasswordNav", Link:"/changePassword"},
    {title: "Cerrar Sesión", src:"logoutNav"},
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
                    <img src={`./src/assets/${menu.src}.svg`} className="w-5"/>
                    {menu.title}
                  </button>
                </li>
              ))} 
          </div>
          <img 
              src="./src/assets/menuNavbar.svg" 
              className={`absolute cursor-pointer right-3 top-7 w-7 lg:hidden`} 
              onClick={manejarClick} 
            />
        </nav>
        <section className="flex items-center gap-4">
          <AsideUser open={open} setOpen={setOpen}/>
        </section>
      </div>
      
    );
  }
  
  export default NavbarUser;