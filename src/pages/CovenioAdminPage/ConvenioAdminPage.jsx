import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";

import { styles } from "./styles.js";

function ConvenioAdminPage() {

    const convenios = [
        {
            pais: "Alemania",
            institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
            codigo: "25-32.7 040 2023",
            descripcion: "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores."
        },
        {
            pais: "Alemania",
            institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
            codigo: "25-32.7 040 2023",
            descripcion: "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores."
        },  
    ];

  return (
    <>
        <main>
            <h2 className="w-full mt-5 p-5 text-lg text-center">A continuación se presenta una lista con todos los convenios registrados, seleccione aquellos que seran mostrados a los funcionarios de las facultades.</h2>
            <section className="w-full mb-5">
                <button className={`${styles.blueButton} xl:ml-48 lg:ml-32 md:ml-20 ml-10`}>
                    Crear Convenio
                </button>
            </section>
            <section className="w-full flex justify-center px-20 mb-5">
                <table className="w-full text-left table-auto border-collapse md:table">
                    <thead className="hidden md:table-header-group">
                        <tr className="bg-[#928F9A]">
                            <th className={`${styles.thIn} w-[150px]`}>Pais</th>
                            <th className={`${styles.thIn} w-[300px]`}>Institución</th>
                            <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
                            <th className={`${styles.thIn} w-[350px]`}>Descripción</th>
                            <th className={`${styles.thIn} w-[250px]`}>Acciones</th>
                            <th className={`py-3 text-xl w-[250px]`}>Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {convenios.map((convenio, index) => (
                            <tr className={`md:${index%2!=0 ? "bg-[#E4E1EC]" : "bg-[#FBF8FF]"} flex flex-col md:table-row border-b`} key={convenio.codigo}>
                                <td className={styles.tdIn}><span className="md:hidden font-bold">Pais: </span>{convenio.pais}</td>
                                <td className={styles.tdIn}><span className="md:hidden font-bold">Instiución: </span>{convenio.institucion}</td>
                                <td className={styles.tdIn}><span className="md:hidden font-bold">Cosido: </span>{convenio.codigo}</td>
                                <td className={styles.tdIn}><span className="md:hidden font-bold">Descripción: </span>{convenio.descripcion}</td>
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
                                <span className="md:hidden font-bold">Seleccionar: </span>
                                    <input className="h-[25px] w-[25px]" type="checkbox" />
                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </section>
            <section className="w-full mb-5 flex justify-end">
                <button className={`${styles.blueButton} xl:mr-48 lg:mr-32 md:mr-20 mr-10`}>
                    Guardar Selecciones
                </button>
            </section>
        </main>
    </>
  );
}

export default ConvenioAdminPage;