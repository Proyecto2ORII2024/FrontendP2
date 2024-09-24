import { useState } from "react";
import logoUnicauca from "../../assets/Logo_Unicauca.png"
import AsideUser from "../asideUser/AsideUser";
import { Link } from "react-router-dom";

function NavbarUser() {
  const [open, setOpen] = useState(false);
  const manejarClick = () => {
    setOpen(!open); // Alterna entre true y false
  };
  const Menus = [
    {title: "Inicio", src:"initNav"},
    {title: "Convenios", src:"agreementsNav"},
    {title: "Formularios", src:"formsNav"},
    {title: "Registrar Usuarios", src:"regNav", gap: true},
    {title: "Cerrar Sesión", src:"logoutNav"},
  ]
    return (
      <div>
        <nav className="bg-primary-dark p-4 flex items-center">
          <div className="container mx-auto flex justify-between items-center gap-8">
            <img 
              src={logoUnicauca}
              alt="Universidad del Cuca" 
              className="h-11 mr-2"
            />
            {Menus.map((menu,index) => (
                <li key={index} className="hidden lg:block text-white text-sm font-bold items-center gap-x-2 p-x
                hover:bg-slate-500 rounded-md cursor-pointer">
                  <img src={`./src/assets/${menu.src}.svg`} className="w-5"/>
                  {menu.title}
                </li>
              ))} 
          </div>
          <img 
              src="./src/assets/menuNavbar.svg" 
              className={`absolute cursor-pointer right-3  top-9 w-7 lg:hidden`} 
              onClick={manejarClick} 
            />
        </nav>
        <section className="flex items-center gap-4">
          <AsideUser open={open}/>
        </section>
      </div>
      
    );
  }
  
  export default NavbarUser;