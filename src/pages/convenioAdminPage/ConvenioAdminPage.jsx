import { useState } from "react";
import { useNavigate } from "react-router-dom";

import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import search from "../../assets/icons/search.svg";

import Accordeon from "../../components/acordeonBox/Acordeon.jsx";
import MainButton from "../../components/buttons/MainButton.jsx";

import styles from "./styles.js";

function ConvenioAdminPage() {
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

  const handleSelect = (e, id) => {
    setConvenios(
      convenios.map((convenio) =>
        convenio.codigo === id
          ? { ...convenio, selected: e.target.checked }
          : convenio
      )
    );
    setSearchAgreement(
      searchAgreement.map((convenio) =>
        convenio.codigo === id
          ? { ...convenio, selected: e.target.checked }
          : convenio
      )
    );
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      setSearchAgreement(
        convenios.filter((convenio) =>
          convenio.codigo.toLowerCase().includes(e.target.value.toLowerCase()) || convenio.pais.toLowerCase().includes(e.target.value.toLowerCase()) || convenio.institucion.toLowerCase().includes(e.target.value.toLowerCase()) || convenio.descripcion.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <main>
        <h2 className="w-full mt-5 p-5 text-lg text-center">
          A continuación se presenta una lista con todos los convenios
          registrados, seleccione aquellos que seran mostrados a los
          funcionarios de las facultades.
        </h2>
        <section className="w-full flex gap-3 md:gap-0 mb-5 flex-col md:flex-row justify-between">
          <MainButton
            onClick={() => navigate("/admin/convenio/create")}
            text="Crear Convenio"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            className="xl:ml-48 lg:ml-32 md:ml-20 mx-5"
          />

          <article className="bg-grays w-[350px] rounded-full py-2 px-5 border-2 border-gray-500 flex items-center justify-between xl:mr-48 lg:mr-32 md:mr-20 m-auto">
            <input
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
                    <tr className="bg-[#928F9A]">
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
                      <th className={`${styles.thIn} w-[250px]`}>Acciones</th>
                      <th className={`${styles.thIn} w-[250px]`}>
                        Seleccionar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {convenios.map((convenio, index) => (
                      <tr
                        className={`${
                          index % 2 != 0 ? "md:bg-[#E4E1EC]" : "md:bg-[#FBF8FF]"
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
                        <td className={styles.tdIn}>
                          <div className="flex md:justify-center items-center">
                            <span className="md:hidden font-bold">
                              Acciones:{" "}
                            </span>
                            <div className="flex md:gap-0 justify-around w-[80%]">
                              <button>
                                <img
                                  className={styles.buttonAction}
                                  src={editIcon}
                                  alt="editIcom"
                                />
                              </button>
                              <button>
                                <img
                                  className={styles.buttonAction}
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className={styles.tdOut}>
                          <div className="flex md:justify-center gap-2">
                            <span className="md:hidden font-bold">
                              Seleccionar:{" "}
                            </span>
                            <input
                              className="h-[25px] w-[25px]"
                              type="checkbox"
                              value={convenio.codigo}
                              checked={convenio.selected}
                              onChange={(e) => handleSelect(e, convenio.codigo)}
                            />
                          </div>
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
                    <tr className="bg-[#928F9A]">
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
                      <th className={`${styles.thIn} w-[250px]`}>Acciones</th>
                      <th className={`${styles.thIn} w-[250px]`}>
                        Seleccionar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {convenios.map((convenio, index) => (
                      <tr
                        className={`${
                          index % 2 != 0 ? "md:bg-[#E4E1EC]" : "md:bg-[#FBF8FF]"
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
                        <td className={styles.tdIn}>
                          <div className="flex md:justify-center items-center">
                            <span className="md:hidden font-bold">
                              Acciones:{" "}
                            </span>
                            <div className="flex md:gap-0 justify-around w-[80%]">
                              <button>
                                <img
                                  className={styles.buttonAction}
                                  src={editIcon}
                                  alt="editIcom"
                                />
                              </button>
                              <button>
                                <img
                                  className={styles.buttonAction}
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className={styles.tdOut}>
                          <div className="flex md:justify-center gap-2">
                            <span className="md:hidden font-bold">
                              Seleccionar:{" "}
                            </span>
                            <input
                              className="h-[25px] w-[25px]"
                              type="checkbox"
                              value={convenio.codigo}
                              checked={convenio.selected}
                              onChange={(e) => handleSelect(e, convenio.codigo)}
                            />
                          </div>
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
                <tr className="bg-[#928F9A]">
                  <th className={`${styles.thIn} w-[150px]`}>Pais</th>
                  <th className={`${styles.thIn} w-[300px]`}>Institución</th>
                  <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
                  <th className={`${styles.thIn} w-[350px]`}>Descripción</th>
                  <th className={`${styles.thIn} w-[200px]`}>
                    Fecha de inicio
                  </th>
                  <th className={`${styles.thIn} w-[250px]`}>Acciones</th>
                  <th className={`${styles.thIn} w-[250px]`}>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {searchAgreement.map((convenio, index) => (
                  <tr
                    className={`${
                      index % 2 != 0 ? "md:bg-[#E4E1EC]" : "md:bg-[#FBF8FF]"
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
                    <td className={styles.tdIn}>
                      <div className="flex md:justify-center items-center">
                        <span className="md:hidden font-bold">Acciones: </span>
                        <div className="flex md:gap-0 justify-around w-[80%]">
                          <button>
                            <img
                              className={styles.buttonAction}
                              src={editIcon}
                              alt="editIcom"
                            />
                          </button>
                          <button>
                            <img
                              className={styles.buttonAction}
                              src={deleteIcon}
                              alt="deleteIcon"
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdOut}>
                      <div className="flex md:justify-center gap-2">
                        <span className="md:hidden font-bold">
                          Seleccionar:{" "}
                        </span>
                        <input
                          className="h-[25px] w-[25px]"
                          type="checkbox"
                          value={convenio.codigo}
                          checked={convenio.selected}
                          onChange={(e) => handleSelect(e, convenio.codigo)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        <section className="w-full mb-5 flex justify-end">
          <MainButton
            text="Guardar Selecciones"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            className="mt-5 xl:mr-48 lg:mr-32 md:mr-20 mr-10"
          />
        </section>
      </main>
    </>
  );
}

export default ConvenioAdminPage;
