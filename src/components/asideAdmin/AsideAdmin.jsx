import logoUnicauca from "../../assets/Logo_Unicauca_Azul.png"
import { useNavigate } from "react-router-dom";
import init from "../../assets/init.svg";
import agreements from "../../assets/agreements.svg";
import forms from "../../assets/forms.svg";
import statistics from "../../assets/statistics.svg";
import reg from "../../assets/reg.svg";
import logout from "../../assets/logout.svg";
import asideLeft from "../../assets/asideLeft.svg";

function AsideAdmin({open, setOpen}) {
    const navigate = useNavigate();
    const Menus = [
      {title: "Inicio", src:init, Link:"/admin"},
      {title: "Convenios", src:agreements ,Link:"/admin/agreement"},
      {title: "Movilidad", src:forms, Link:"/admin/movilidad"},
      {title: "Estadísticas", src:statistics, Link:"/statistics"},
      {title: "Registrar Usuarios", src:reg, gap: true, Link:"/usuarios"},
      {title: "Cerrar Sesión", src:logout}
    ]
    return (
      <div className={`flex fixed h-full z-30 w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 
        -translate-x-full ${!open && "translate-x-0"} transition-all`}>
          <section className={`w-72
          duration-300
          bg-white relative p-5 pt-8`}>
            <img 
              src={asideLeft} 
              className={`absolute cursor-pointer -right-4 top-40 w-10 bottom-2 border-info-dark`} 
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
              <img src={logoUnicauca} className={`w-20 duration-300`}/>
              <h2 className={`text-primary origin-left font-bold text-l duration-300`}>
                Oficina de Relaciones Internacionales e Interinstitucionales
              </h2>
            </div>
            <ul className={`pt-20`}>
              {Menus.map((menu,index)=>(
                <li key={index} className={`text-primary-dark text-sm font-bold flex items-center 
                gap-x-2 cursor-pointer p-x hover:text-primary-light rounded-md
                ${menu.gap ? "mt-60" : "mt-1"}`}>
                  <button className="flex" onClick={() => navigate(menu.Link)}>
                    <img src={menu.src} className="w-5"/>
                    {menu.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
    );
  }
  
  export default AsideAdmin;