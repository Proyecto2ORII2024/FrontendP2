import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import search from "../../assets/icons/searchIcon.svg";

import Accordeon from "../../components/acordeonBox/Acordeon.jsx";
import MainButton from "../../components/buttons/MainButton.jsx";
import EditAgreement from "../../components/editAgreement/EditAgreement.jsx";
import DeleteAgreement from "../../components/deleteAgreement/DeleteAgreement.jsx";
import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import AgreementTable from "../../components/agreementTable/AgreementTable.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";

import { obtainAgreements } from "../../services/agreement.service.js";

/**
 * AgreementAdminPage component is responsible for displaying and managing agreements.
 * It fetches agreements data, handles search functionality, and provides options to edit or delete agreements.
 *
 * @component
 * @example
 * return (
 *   <AgreementAdminPage />
 * )
 *
 * @returns {JSX.Element} The rendered AgreementAdminPage component.
 *
 * @typedef {Object} Agreement
 * @property {string} agreementNumber - The number of the agreement.
 * @property {string} country - The country associated with the agreement.
 * @property {string} institution - The institution associated with the agreement.
 * @property {string} description - The description of the agreement.
 *
 * @typedef {Object} AgreementsData
 * @property {Agreement[]} NATIONAL - Array of national agreements.
 * @property {Agreement[]} INTERNATIONAL - Array of international agreements.
 * @property {Agreement[]} ALL - Array of all agreements.
 *
 * @typedef {Object} NotificationType
 * @property {string} type - The type of notification ("success" or "error").
 * @property {string} title - The title of the notification.
 * @property {boolean} open - Whether the notification is open or not.
 * @property {Function} setOpen - Function to set the open state of the notification.
 *
 * @typedef {Object} EditAgreementProps
 * @property {boolean} open - Whether the edit agreement modal is open or not.
 * @property {Function} setOpen - Function to set the open state of the edit agreement modal.
 * @property {Agreement} agreement - The agreement to be edited.
 * @property {Function} setUpdated - Function to set the updated state.
 *
 * @typedef {Object} DeleteAgreementProps
 * @property {boolean} open - Whether the delete agreement modal is open or not.
 * @property {Function} setOpen - Function to set the open state of the delete agreement modal.
 * @property {string} agreementId - The ID of the agreement to be deleted.
 * @property {Function} setDeleted - Function to set the deleted state.
 *
 * @typedef {Object} AgreementTableProps
 * @property {Agreement[]} agreements - Array of agreements to be displayed in the table.
 * @property {Function} setOpen - Function to set the open state of the edit agreement modal.
 * @property {Function} setAgreementId - Function to set the ID of the selected agreement.
 * @property {Function} setAgreementSelected - Function to set the selected agreement.
 * @property {Function} setOpenDelete - Function to set the open state of the delete agreement modal.
 */
function AgreementAdminPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [nationalAgreements, setNationalAgreements] = useState([]);
  const [internationalAgreements, setInternationalAgreements] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [searchAgreement, setSearchAgreement] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [agreementId, setAgreementId] = useState("");
  const [wasDeleted, setWasDeleted] = useState("");
  const [wasUpdated, setwasUpdated] = useState("");
  const [agreementSelected, setAgreementSelected] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const agreementsData = await obtainAgreements();
      setNationalAgreements(agreementsData.NATIONAL);
      setInternationalAgreements(agreementsData.INTERNATIONAL);
      setAgreements(agreementsData.ALL);
    };
    fetchData();
  }, [wasDeleted, wasUpdated]);

  const navigate = useNavigate();

  /**
   * Handles the search functionality for agreements.
   * Filters the agreements based on the search input and updates the search results.
   *
   * @param {Object} e - The event object from the search input.
   * @param {Object} e.target - The target element of the event.
   * @param {string} e.target.value - The value of the search input.
   */
  const handleSearch = (e) => {
    if (e.target.value === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      setSearchAgreement(
        agreements.filter(
          (agreement) =>
            agreement.agreementNumber
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            agreement.country
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            agreement.institution
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            agreement.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <AdminLayout>
      <main>
        <EditAgreement
          open={open}
          setOpen={setOpen}
          agreement={agreementSelected}
          setUpdated={setwasUpdated}
        />
        <DeleteAgreement
          open={openDelete}
          setOpen={setOpenDelete}
          agreementId={agreementId}
          setDeleted={setWasDeleted}
        />
        <NotificationBox
          type={wasDeleted}
          title={
            wasDeleted === "success"
              ? "Convenio eliminado"
              : "Error al eliminar convenio"
          }
          open={wasDeleted === "success" || wasDeleted === "error"}
          setOpen={() => setWasDeleted("")}
        >
          {wasDeleted === "success" ? (
            <p>El convenio ha sido eliminado exitosamente</p>
          ) : (
            <p>
              Ha ocurrido un error al eliminar el convenio, por favor intente de
              nuevo
            </p>
          )}
        </NotificationBox>
        <NotificationBox
          type={wasUpdated}
          title={
            wasUpdated === "success"
              ? "Convenio editado"
              : "Error al editar convenio"
          }
          open={wasUpdated === "success" || wasUpdated === "error"}
          setOpen={() => setwasUpdated("")}
        >
          {wasUpdated === "success" ? (
            <p>El convenio ha sido editado exitosamente</p>
          ) : (
            <p>
              Ha ocurrido un error al editar el convenio, por favor intente de
              nuevo
            </p>
          )}
        </NotificationBox>

        <section className="flex items-center flex-col md:flex-row">
          <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col md:items-center">
            <h2 className="w-full md:m-5 px-5 pt-3 md:pt-0 text-lg text-center">
              A continuación se presenta una lista con todos los convenios
              registrados.
            </h2>
            <div className="w-fit ml-3 md:ml-0">
            <MainButton
              onClick={() => navigate("/admin/agreement/create")}
              text="Crear Convenio"
              bgColor="primary"
              hoverBg="primary-light"
              textColor="white"
            />
            </div>
          </section>

          <section className="w-full flex gap-3 md:gap-0 mb-3 md:m-5 flex-col md:flex-row justify-between items-center">

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
        </section>
        {!isSearching ? (
          <>
            <Accordeon title="Nacional">
              <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none">
                <AgreementTable
                  agreements={nationalAgreements}
                  setOpen={setOpen}
                  setAgreementId={setAgreementId}
                  setAgreementSelected={setAgreementSelected}
                  setOpenDelete={setOpenDelete}
                />
              </section>
            </Accordeon>
            <Accordeon title="Internacional">
              <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none">
                <AgreementTable
                  agreements={internationalAgreements}
                  setOpen={setOpen}
                  setAgreementId={setAgreementId}
                  setAgreementSelected={setAgreementSelected}
                  setOpenDelete={setOpenDelete}
                />
              </section>
            </Accordeon>
          </>
        ) : (
          <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none  px-5 lg:px-20 ">
            <AgreementTable
              agreements={searchAgreement}
              setOpen={setOpen}
              setAgreementId={setAgreementId}
              setAgreementSelected={setAgreementSelected}
              setOpenDelete={setOpenDelete}
            />
          </section>
        )}
      </main>
    </AdminLayout>
  );
}

export default AgreementAdminPage;
