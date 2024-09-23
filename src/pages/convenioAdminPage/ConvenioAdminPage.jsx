import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import search from "../../assets/icons/searchIcon.svg";

import Accordeon from "../../components/acordeonBox/Acordeon.jsx";
import MainButton from "../../components/buttons/MainButton.jsx";
import EditConvenio from "../../components/editConvenio/EditConvenio.jsx";
import DeleteConvenio from "../../components/deleteConvenio/DeleteConvenio.jsx";

import { obtainAgreements } from "./agreementMiddleware.js";

import styles from "./styles.js";

function ConvenioAdminPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [nationalAgreements, setNationalAgreements] = useState([]);
  const [internationalAgreements, setInternationalAgreements] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [searchAgreement, setSearchAgreement] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [agreementId, setAgreementId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const agreementsData = await obtainAgreements();
      setNationalAgreements(agreementsData.NATIONAL);
      setInternationalAgreements(agreementsData.INTERNATIONAL);
      setAgreements(agreementsData.ALL);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      setSearchAgreement(
        agreements.filter(
          (convenio) =>
            convenio.agreementNumber
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            convenio.country
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            convenio.institution
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            convenio.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase())

        )
      );
    }
  };

  return (
    <>
      <main>

        <EditConvenio open={open} setOpen={setOpen} agreementId={agreementId}/>
        <DeleteConvenio open={openDelete} setOpen={setOpenDelete} agreementId={agreementId} />

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
                      <th className={`${styles.thOut} w-[250px]`}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nationalAgreements.map((agreement, index) => (
                      <tr
                        className={`${
                          index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"
                        } flex flex-col md:table-row border-b`}
                        key={agreement.agreementNumber}
                      >
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Pais: </span>
                          {agreement.country}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Instiución:{" "}
                          </span>
                          {agreement.institution}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Codigo: </span>
                          {agreement.agreementNumber}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Descripción:{" "}
                          </span>
                          {agreement.description}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Fecha de inicio:{" "}
                          </span>
                          {agreement.startDate}
                        </td>
                        <td className={styles.tdOut}>
                          <div className="flex md:justify-center items-center">
                            <span className="md:hidden font-bold">
                              Acciones:
                            </span>
                            <div className="flex md:gap-0 justify-around w-[80%]">
                              <button onClick={() => {setOpen(true); setAgreementId(agreement.agreementNumber)}}>
                                <img
                                  className={styles.buttonAction}
                                  src={editIcon}
                                  alt="editIcom"
                                />
                              </button>
                              <button onClick={() => {setOpenDelete(true); setAgreementId(agreement.agreementNumber)}}>
                                <img
                                  className={styles.buttonAction}
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                />
                              </button>
                            </div>
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
                      <th className={`${styles.thOut} w-[250px]`}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internationalAgreements.map((agreement, index) => (
                      <tr
                        className={`${

                          index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"

                        } flex flex-col md:table-row border-b`}
                        key={agreement.agreementNumber}
                      >
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Pais: </span>
                          {agreement.country}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Instiución:{" "}
                          </span>
                          {agreement.institution}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">Codigo: </span>
                          {agreement.agreementNumber}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Descripción:{" "}
                          </span>
                          {agreement.description}
                        </td>
                        <td className={styles.tdIn}>
                          <span className="md:hidden font-bold">
                            Fecha de inicio:{" "}
                          </span>
                          {agreement.startDate}
                        </td>
                        <td className={styles.tdOut}>
                          <div className="flex md:justify-center items-center">
                            <span className="md:hidden font-bold">
                              Acciones:{" "}
                            </span>
                            <div className="flex md:gap-0 justify-around w-[80%]">
                            <button onClick={() => {setOpen(true); setAgreementId(agreement.agreementNumber)}}>
                                <img
                                  className={styles.buttonAction}
                                  src={editIcon}
                                  alt="editIcom"
                                />
                              </button>
                              <button onClick={() => {setOpenDelete(true); setAgreementId(agreement.agreementNumber)}}>
                                <img
                                  className={styles.buttonAction}
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                />
                              </button>
                            </div>
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

                <tr className="bg-grays-dark">
                  <th className={`${styles.thIn} w-[150px]`}>Pais</th>
                  <th className={`${styles.thIn} w-[300px]`}>Institución</th>
                  <th className={`${styles.thIn} w-[200px]`}>Codigo</th>
                  <th className={`${styles.thIn} w-[350px]`}>Descripción</th>
                  <th className={`${styles.thIn} w-[200px]`}>
                    Fecha de inicio
                  </th>
                  <th className={`${styles.thOut} w-[250px]`}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {searchAgreement.map((agreement, index) => (
                  <tr
                    className={`${

                      index % 2 != 0 ? "md:bg-grays" : "md:bg-grays-light"

                    } flex flex-col md:table-row border-b`}
                    key={agreement.agreementNumber}
                  >
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Pais: </span>
                      {agreement.country}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Instiución: </span>
                      {agreement.institution}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Codigo: </span>
                      {agreement.agreementNumber}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">Descripción: </span>
                      {agreement.description}
                    </td>
                    <td className={styles.tdIn}>
                      <span className="md:hidden font-bold">
                        Fecha de inicio:{" "}
                      </span>
                      {agreement.startDate}
                    </td>
                    <td className={styles.tdOut}>
                      <div className="flex md:justify-center items-center">
                        <span className="md:hidden font-bold">Acciones: </span>
                        <div className="flex md:gap-0 justify-around w-[80%]">
                        <button onClick={() => {setOpen(true); setAgreementId(agreement.agreementNumber)}}>
                            <img
                              className={styles.buttonAction}
                              src={editIcon}
                              alt="editIcom"
                            />
                          </button>
                          <button onClick={() => {setOpenDelete(true); setAgreementId(agreement.agreementNumber)}}>
                            <img
                              className={styles.buttonAction}
                              src={deleteIcon}
                              alt="deleteIcon"
                            />
                          </button>
                        </div>
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
