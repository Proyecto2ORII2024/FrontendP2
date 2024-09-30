import { useState, useEffect } from "react";

import search from "../../assets/icons/searchIcon.svg";

import Accordeon from "../../components/acordeonBox/Acordeon.jsx";
import AgreementUserTable from "../../components/agreementUserTable/AgreementUserTable.jsx";

import { obtainAgreements } from "../../services/agreement.service.js";

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
    </>
  );
}

export default AgreementUserPage;
