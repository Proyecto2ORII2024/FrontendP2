import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import checkIcon from "../../assets/icons/checkIcon.svg";
import search from "../../assets/icons/searchIcon.svg";
import { useState } from "react";

import { styles } from "./styles.js";

function ListaUsuarioPage() {
    const [isEditing, setIsEditing] = useState({state:false,index:-1});
    const [value, setValue] = useState("Texto Inicial");
    const [isSearching, setIsSearching] = useState(false);
    const [searchStudent, setSearchStudent] = useState([]);
    const [estudiantes, setEstudiantes] = useState([

        {
            Id:1,
            Correo: "ORI@UNICAUCA.EDU.CO",
            Rol: "Admin",
            Active: false
        },
        {
            Id:2,
            Correo: "INGENIERIA@UNICAUCA.EDU.CO",
            Rol: "USUARIO",
            Active: false
        },
        {
            Id:3,
            Correo: "jsotelop@UNICAUCA.EDU.CO",
            Rol: "USUARIO",
            Active: true
        },
        {
            Id:4,
            Correo: "cgarcias@UNICAUCA.EDU.CO",
            Rol: "USUARIO",
            Active: false
        },
        {
            Id:5,
            Correo: "jorejuelam@UNICAUCA.EDU.CO",
            Rol: "USUARIO",
            Active: false
        },
        {
            Id:6,
            Correo: "jorgevelasco@UNICAUCA.EDU.CO",
            Rol: "Admin",
            Active: true
        }
    ]);

    const esCorreoValido = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo); // Retorna true si el correo es válido, false si no lo es
      }

    const handleEditClick = (e) => {
        const id = parseInt(e.target.id);
        
        if(isEditing.state === false, isEditing.index === -1){
            estudiantes.map(estudiante => estudiante.Id === id ? setValue(estudiante.Correo):null);
            setIsEditing({state:true,index:id});
        }
    };

    const handleSaveClick = (e) => {
        setIsEditing({state:false,index:-1});
        const id = parseInt(e.target.id);
        if(esCorreoValido(value)){
            setEstudiantes(estudiantes.map(estudiante => estudiante.Id === id ? { ...estudiante, Correo: value } : estudiante));
        }

    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
      };

    const handleSearch = (e) => {
        if (e.target.value === "") {
            setIsSearching(false);
        } else {
            setIsSearching(true);
            setSearchStudent(
                estudiantes.filter(
                    (estudiante) =>
                        estudiante.Correo
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()) ||
                        estudiante.Rol
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    const handleCheckboxChange = (e) => {
        const id = parseInt(e.target.id);
        setEstudiantes(estudiantes.map(estudiante => estudiante.Id === id ? { ...estudiante, Active: !estudiante.Active } : estudiante));
    }

    return (
        <>
            <main>
                <section className="flex justify-between">
                    <h2 className="w-full mt-5 p-5 text-lg text-center">
                        A continuación se presenta una tabla con los usuarios registrados actualmente..
                    </h2>
                    <section className="w-full flex gap-3 md:gap-0 mb-5 flex-col md:flex-row justify-between">
                        <article className="bg-grays w-[350px] rounded-full py-2 px-5 border-2 border-gray-500 flex items-center justify-between xl:mr-48 lg:mr-32 md:mr-20 m-auto">
                            <input
                                id="search"
                                type="text"
                                placeholder="Ingresa la información que deseas buscar"
                                className="w-[90%] outline-none bg-transparent"
                                onChange={(e) => handleSearch(e)}
                            />
                            <img src={search} alt="search icon" />
                        </article>
                    </section>
                </section>
                {!isSearching ? (
                    <>
                        <section className="w-full flex justify-center px-20 mb-5">
                            <table className="w-full text-left table-auto border-collapse md:table">
                                <thead className="hidden md:table-header-group">
                                    <tr className="bg-[#928F9A]">
                                        <th className={`${styles.thIn} w-[200px]`}>Correo</th>
                                        <th className={`${styles.thIn} w-[100px]`}>Rol</th>
                                        <th className={`${styles.thIn} w-[150px]`}>Acciones</th>
                                        <th className={`${styles.thIn} w-[100px]`}>Habilitar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantes.map((estudiante, index) => (
                                        <tr className={`md:${index % 2 != 0 ? "bg-[#E4E1EC]" : "bg-[#FBF8FF]"} flex flex-col md:table-row border-b`} key={estudiante.Correo}>
                                            <td className={`${styles.tdIn} h-[100px]`}>
                                                <span className="md:hidden font-bold">
                                                    Correo:
                                                </span>
                                                {isEditing.state && isEditing.index===estudiante.Id ? (
                                                    <input className="bg-grays rounded-full w-[90%] outline-none border pl-4 p-2" type="text" value={value} onChange={(e) => handleInputChange(e)}/>
                                                ):(
                                                    estudiante.Correo
                                                )}
                                            </td>
                                            <td className={styles.tdIn}><span className="md:hidden font-bold">Rol: </span>{estudiante.Rol}</td>
                                            <td className={styles.tdIn}><span className="md:hidden font-bold">Acciones: </span>
                                                <div className="flex justify-around px-10">
                                                    <button className="">
                                                        {isEditing.state && isEditing.index===estudiante.Id ? (
                                                            <img className={styles.buttonAction} src={checkIcon} id={estudiante.Id} onClick={handleSaveClick} alt="checkIcom" />

                                                        ) : (
                                                            <img className={styles.buttonAction} src={editIcon} id={estudiante.Id}  onClick={(e) => handleEditClick(e)} alt="editIcom" />
                                                        )}
                                                    </button>
                                                    <button>
                                                        <img className={styles.buttonAction} src={deleteIcon} alt="deleteIcon" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className={styles.tdOut}>
                                                <span className="md:hidden font-bold">Habilitar: </span>
                                                <input id={estudiante.Id} className="h-[25px] w-[25px]" type="checkbox" checked={estudiante.Active} onChange={(e) => handleCheckboxChange(e)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                ) : (
                    <>
                        <section className="w-full flex justify-center px-20 mb-5">
                            <table className="w-full text-left table-auto border-collapse md:table">
                                <thead className="hidden md:table-header-group">
                                    <tr className="bg-[#928F9A]">
                                        <th className={`${styles.thIn} w-[200px]`}>Correo</th>
                                        <th className={`${styles.thIn} w-[100px]`}>Rol</th>
                                        <th className={`${styles.thIn} w-[150px]`}>Acciones</th>
                                        <th className={`${styles.thIn} w-[100px]`}>Habilitar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchStudent.map((estudiante, index) => (
                                        <tr className={`md:${index % 2 != 0 ? "bg-[#E4E1EC]" : "bg-[#FBF8FF]"} flex flex-col md:table-row border-b`} key={estudiante.Correo}>
                                            <td className={`${styles.tdIn} h-[100px]`}>
                                                <span className="md:hidden font-bold">Correo: </span>
                                                {isEditing.state && isEditing.index===estudiante.Id ? (
                                                    <input className="bg-grays rounded-full w-[90%] outline-none border pl-4 p-2" type="text" value={value} onChange={(e) => handleInputChange(e)}/>
                                                ):(
                                                    estudiante.Correo
                                                )}
                                            </td>
                                            <td className={styles.tdIn}><span className="md:hidden font-bold">Rol: </span>{estudiante.Rol}</td>
                                            <td className={styles.tdIn}><span className="md:hidden font-bold">Acciones: </span>
                                                <div className="flex justify-around px-10">
                                                    <button className="">
                                                    {isEditing.state && isEditing.index===estudiante.Id ? (
                                                            <img className={styles.buttonAction} src={checkIcon} id={estudiante.Id} onClick={handleSaveClick} alt="checkIcom" />

                                                        ) : (
                                                            <img className={styles.buttonAction} src={editIcon} id={estudiante.Id}  onClick={(e) => handleEditClick(e)} alt="editIcom" />
                                                        )}
                                                    </button>
                                                    <button>
                                                        <img className={styles.buttonAction} src={deleteIcon} alt="deleteIcon" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className={styles.tdOut}>
                                                <span className="md:hidden font-bold">Habilitar: </span>
                                                <input className="h-[25px] w-[25px]" type="checkbox" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                )}

            </main>
        </>
    );

}
export default ListaUsuarioPage;