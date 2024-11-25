import { useState, useContext } from "react";
import logoUnicauca from "../../assets/Logo_Unicauca.png"
import AsideUser from "../asideUser/AsideUser";
import { useNavigate } from "react-router-dom";
import initNav from "../../assets/initNav.svg";
import agreementsNav from "../../assets/agreementsNav.svg";
import formsNav from "../../assets/formsNav.svg";
import menuNavbar from "../../assets/menuNavbar.svg";

import { AuthContext } from "../../context/LoginContext";

import USerDropdown from "../userDropDown/UserDropDown";

function NavbarUser() {
  const [open, setOpen] = useState(true);

  const { singout } = useContext(AuthContext);

  const manejarClick = () => {
    setOpen(!open); // Alterna entre true y false
  };
  const navigate = useNavigate();
  const Menus = [
    {title: "Inicio", src:initNav, Link:"/user"},
    {title: "Convenios", src:agreementsNav, Link:"/user/agreement"},
    {title: "Formularios", src:formsNav, Link:"/form"}
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
              <USerDropdown onChangePassword={() => navigate("/changePassword")} onLogOut={()=>singout()}/>
          </div>
          <img 
              src={menuNavbar} 
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