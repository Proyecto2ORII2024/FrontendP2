
import { useState } from "react";
import logoUnicauca from "../../assets/Logo_Unicauca_Azul.png"
import NavbarUser from "../navbar/NavbarUser";

function AsideUser({open}) {
    const Menus = [
      {title: "Inicio", src:"init"},
      {title: "Convenios", src:"agreements"},
      {title: "Formularios", src:"forms"},
      {title: "Registra Usuarios", src:"reg", gap: true},
      {title: "Cerrar Sesión", src:"logout"},
    ]
    return (
      <div className="flex">
        <aside className={`${open ? "w-72" : "w-0"}
        duration-300
        bg-white shadow-lg relative p-5 pt-8`}>

          <div className="flex gap-x-4 items-center">
            <img src={logoUnicauca} className={`w-20 duration-300 ${!open && "scale-0"}`}/>
            <h2 className={`text-primary origin-left font-bold text-l duration-300 ${!open && "scale-0"}`}>
              Oficina de Relaciones Internacionales e Interinstitucionales
            </h2>
          </div>
          <ul className={`pt-20 ${!open && 'scale-0'}`}>
            {Menus.map((menu,index)=>(
              <li key={index} className={`text-primary-dark text-sm font-bold flex items-center 
              gap-x-2 cursor-pointer p-x hover:bg-slate-500 rounded-md
              ${menu.gap ? "mt-80" : "mt-2"}`}>
                <img src={`./src/assets/${menu.src}.svg`} className="w-5"/>
                <span className={`${!open && 'hidden'} origin-left duration-200`}>
                  {menu.title}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }
  
  export default AsideUser;