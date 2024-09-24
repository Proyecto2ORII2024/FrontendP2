import { useState } from "react";
import logoUnicauca from "../../assets/Logo_Unicauca_Azul.png"

function AsideAdmin() {
    const [open, setOpen] = useState(false);
    const Menus = [
      {title: "Inicio", src:"init"},
      {title: "Convenios", src:"agreements"},
      {title: "Formularios", src:"forms"},
      {title: "Estadísticas", src:"statistics"},
      {title: "Tabla de Usuarios", src:"userTable", gap: true},
      {title: "Registra Usuarios", src:"reg"},
      {title: "Cerrar Sesión", src:"logout"},
    ]
    return (
      <div className="flex">
        <aside className={`${open ? "w-72" : "w-20"}
        duration-300
        h-screen bg-white shadow-lg relative border-r border-primary p-5 pt-8`}>
          <img 
            src="./src/assets/asideLeft.svg" 
            className={`absolute cursor-pointer -right-3 top-9 w-7 bottom-2 border-info-dark ${!open && 'rotate-180'}`} 
            onClick={() => setOpen(!open)}
          />

          <div className="flex gap-x-4 items-center">
            <img src="./src/assets/Logo_Unicauca_Azul.png" className={`w-20 duration-300 ${!open && "scale-0"}`}/>
            <h2 className={`text-primary origin-left font-bold text-l duration-300 ${!open && "scale-0"}`}>
              Oficina de Relaciones Internacionales e Interinstitucionales
            </h2>
          </div>
          <ul className="pt-20">
            {Menus.map((menu,index)=>(
              <li key={index} className={`text-primary-dark text-sm font-bold flex items-center 
              gap-x-2 cursor-pointer p-x hover:bg-slate-500 rounded-md
              ${menu.gap ? "mt-60" : "mt-2"}`}>
                <img src={`./src/assets/${menu.src}.svg`} className="w-5"/>
                <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }
  
  export default AsideAdmin;