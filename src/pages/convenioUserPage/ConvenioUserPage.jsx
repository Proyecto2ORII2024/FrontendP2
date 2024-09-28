import { useState } from "react";

import search from "../../assets/icons/searchIcon.svg";

import Accordeon from "../../components/acordeonBox/Acordeon.jsx";

import styles from "../convenioAdminPage/styles.js";

function ConvenioUserPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchAgreement, setSearchAgreement] = useState([]);
  const [convenios, setConvenios] = useState([
    {
      pais: "Alemania",
      institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
      codigo: "25-32.7 040 2023",
      fechaInicio: "2023-01-01",
      descripcion:
        "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores.",
      selected: true,
    },
    {
      pais: "Alemania",
      institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
      codigo: "25-32.8 040 2023",
      fechaInicio: "2023-01-01",
      descripcion:
        "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores.",
      selected: false,
    },
    {
      pais: "Alemania",
      institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
      codigo: "25-32.9 040 2023",
      fechaInicio: "2023-01-01",
      descripcion:
        "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores.",
      selected: true,
    },
    {
      pais: "Alemania",
      institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
      codigo: "25-32.10 040 2023",
      fechaInicio: "2023-01-01",
      descripcion:
        "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores.",
      selected: false,
    },
    {
      pais: "Alemania",
      institucion: "SERVICIO ALEMÁN DE INTERCAMBIO ACADÉMICO (DAAD)",
      codigo: "25-32.11 040 2023",
      fechaInicio: "2023-01-01",
      descripcion:
        "Otorgar una subvención no reembolsable para la financiación de proyectos en el programa de financiación viajes de estudio para grupos de estudiantes extranjeros en Alemania, con fondos del Ministerio Federal de Relaciones Exteriores.",
      selected: true,
    },
  ]);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      setSearchAgreement(
        convenios.filter(
          (convenio) =>
            convenio.codigo
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            convenio.pais
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            convenio.institucion
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            convenio.descripcion
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <main>
        <section className="w-full flex gap-3 md:gap-0 mb-5 flex-col mt-8 md:flex-row justify-between items-center">
          <h2 className="w-full p-5 text-lg text-center">
            A continuación se presenta una tabla con los convenios activos
            actualmente.
          </h2>
          <article className="bg-grays w-[350px] rounded-full py-2 px-5 border-2 border-gray-500 flex items-center justify-between xl:mr-48 lg:mr-32 md:mr-20 m-auto">
            <input
              id="search"
              type="text"
              placeholder="Ingresa la información que deseas buscar"
              onChange={(e) => handleSearch(e)}
              className="w-[90%] outline-none bg-transparent"
            />
            <img src={search} alt="search icon" />
          </article>
        </section>
        {!isSearching ? (
          <>
            <Accordeon title="Nacional">
              <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none">
                <table className="w-full text-left table-auto border-collapse md:table">
                  <thead className="hidden md:table-header-group">
                    <tr className="bg-grays-dark">
                      <th className={`${styles.thIn} w-[150px]`}>Pais</th>
                      <th className={`${styles.thIn} w-[300px]`}>
                        Institución
                      </th>
                      <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
                      <th className={`${styles.thIn} w-[350px]`}>
                        Descripción
                      </th>
                      <th className={`${styles.thIn} w-[200px]`}>
                        Fecha de inicio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {convenios.map((convenio, index) => (
                      <tr
                        className={`${
                          index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"
                        } flex flex-col md:table-row border-b`}
                        key={convenio.codigo}
                      >
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Pais: </span>
                          {convenio.pais}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Instiución:{" "}
                          </span>
                          {convenio.institucion}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Cosido: </span>
                          {convenio.codigo}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Descripción:{" "}
                          </span>
                          {convenio.descripcion}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Fecha de inicio:{" "}
                          </span>
                          {convenio.fechaInicio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </Accordeon>
            <Accordeon title="Internacional">
              <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none">
                <table className="w-full text-left table-auto border-collapse md:table">
                  <thead className="hidden md:table-header-group">
                    <tr className="bg-grays-dark">
                      <th className={`${styles.thIn} w-[150px]`}>Pais</th>
                      <th className={`${styles.thIn} w-[300px]`}>
                        Institución
                      </th>
                      <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
                      <th className={`${styles.thIn} w-[350px]`}>
                        Descripción
                      </th>
                      <th className={`${styles.thIn} w-[200px]`}>
                        Fecha de inicio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {convenios.map((convenio, index) => (
                      <tr
                        className={`${
                          index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"
                        } flex flex-col md:table-row border-b`}
                        key={convenio.codigo}
                      >
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Pais: </span>
                          {convenio.pais}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Instiución:{" "}
                          </span>
                          {convenio.institucion}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Cosido: </span>
                          {convenio.codigo}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Descripción:{" "}
                          </span>
                          {convenio.descripcion}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Fecha de inicio:{" "}
                          </span>
                          {convenio.fechaInicio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </Accordeon>
          </>
        ) : (
          <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none  px-5 lg:px-20 ">
            <table className="w-full text-left table-auto border-collapse md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-grays-dark">
                  <th className={`${styles.thIn} w-[150px]`}>Pais</th>
                  <th className={`${styles.thIn} w-[300px]`}>Institución</th>
                  <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
                  <th className={`${styles.thIn} w-[350px]`}>Descripción</th>
                  <th className={`${styles.thIn} w-[200px]`}>
                    Fecha de inicio
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchAgreement.map((convenio, index) => (
                  <tr
                    className={`${
                      index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"
                    } flex flex-col md:table-row border-b`}
                    key={convenio.codigo}
                  >
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Pais: </span>
                      {convenio.pais}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Instiución: </span>
                      {convenio.institucion}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Cosido: </span>
                      {convenio.codigo}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Descripción: </span>
                      {convenio.descripcion}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">
                        Fecha de inicio:{" "}
                      </span>
                      {convenio.fechaInicio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </>
  );
}

export default ConvenioUserPage;
