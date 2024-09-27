import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import search from "../../assets/icons/search.svg";

import { styles } from "./styles.js";

function ListaUsuarioPage() {


    const estudiantes = [
        {
            Correo: "ORI@UNICAUCA.EDU.CO",
            Rol: "Admin"
        },
        {
            Correo: "INGENIERIA@UNICAUCA.EDU.CO",
            Rol: "USUARIO"
        }
    ];

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
                                type="text"
                                placeholder="Ingresa la información que deseas buscar"
                                className="w-[90%] outline-none bg-transparent"
                            />
                            <img src={search} alt="search icon" />
                        </article>
                    </section>
                </section>
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
                            {estudiantes.map((estudiantes, index) => (
                                <tr className={`md:${index % 2 != 0 ? "bg-[#E4E1EC]" : "bg-[#FBF8FF]"} flex flex-col md:table-row border-b`} key={estudiantes.Correo}>
                                    <td className={`${styles.tdIn} h-[100px]`}><span className="md:hidden font-bold">Correo: </span>{estudiantes.Correo}</td>
                                    <td className={styles.tdIn}><span className="md:hidden font-bold">Rol: </span>{estudiantes.Rol}</td>
                                    <td className={styles.tdIn}><span className="md:hidden font-bold">Acciones: </span>
                                        <div className="flex justify-around px-10">
                                            <button className="">
                                                <img className={styles.buttonAction} src={editIcon} alt="editIcom" />
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
            </main>
        </>
    );

}
export default ListaUsuarioPage;