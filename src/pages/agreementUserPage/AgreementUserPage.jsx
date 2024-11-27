import { useState, useEffect } from "react";

import search from "../../assets/icons/searchIcon.svg";

import Accordeon from "../../components/acordeonBox/Acordeon.jsx";
import AgreementUserTable from "../../components/agreementUserTable/AgreementUserTable.jsx";

import UserLayout from "../../layouts/UserLayout.jsx";

import { obtainAgreements } from "../../services/agreement.service.js";

/**
 * AgreementUserPage component fetches and displays a list of agreements.
 * It allows users to search through the agreements by agreement number, country, institution, or description.
 * 
 * @component
 * @example
 * return (
 *   <AgreementUserPage />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @function
 * @name AgreementUserPage
 * 
 * @description
 * This component uses several state variables:
 * - `isSearching`: A boolean indicating if a search is being performed.
 * - `searchAgreement`: An array of agreements that match the search criteria.
 * - `nationalAgreements`: An array of national agreements.
 * - `internationalAgreements`: An array of international agreements.
 * - `agreements`: An array of all agreements.
 * 
 * The component fetches the agreements data on mount using the `useEffect` hook and the `obtainAgreements` function.
 * It provides a search input field that filters the agreements based on the user's input.
 * 
 * @requires obtainAgreements
 * @requires UserLayout
 * @requires Accordeon
 * @requires AgreementUserTable
 */
function AgreementUserPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchAgreement, setSearchAgreement] = useState([]);
  const [nationalAgreements, setNationalAgreements] = useState([]);
  const [internationalAgreements, setInternationalAgreements] = useState([]);
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const agreementsData = await obtainAgreements();
      setNationalAgreements(agreementsData.NATIONAL);
      setInternationalAgreements(agreementsData.INTERNATIONAL);
      setAgreements(agreementsData.ALL);
    };
    fetchData();
  }, []);

  /**
   * Handles the search functionality for agreements.
   * Filters the agreements based on the search input and updates the state accordingly.
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
    <UserLayout>
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
                <AgreementUserTable agreements={nationalAgreements} />
              </section>
            </Accordeon>
            <Accordeon title="Internacional">
              <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none">
                <AgreementUserTable agreements={internationalAgreements} />
              </section>
            </Accordeon>
          </>
        ) : (
          <section className="w-full flex justify-center mb-5 max-h-screen overflow-auto border md:border-none  px-5 lg:px-20 ">
            <AgreementUserTable agreements={searchAgreement} />
          </section>
        )}
      </main>
    </UserLayout>
  );
}

export default AgreementUserPage;
