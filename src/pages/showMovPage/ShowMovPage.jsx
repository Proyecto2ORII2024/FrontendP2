import ShowMovilityField from "../../components/showMovilityField/ShowMovilityField";
import { MoveInfo } from "./MoveInfo";
import { getId } from "../../services/movilidad.service.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { FormDict } from "../../utils/FormDict.js";
import { checkDirection } from "../../utils/FormInformation.js";
import facultyOptions from "../../utils/facultyOptions.js";
import { calcDays } from "../updateForm/Information.js";
import DataContainer from "../../components/dataContainer/DataContainer.jsx";
import { formatDateToDDMMYYYYView } from "../../utils/Date.js";
import MainButton from "../../components/buttons/MainButton";
import { useNavigate } from "react-router-dom";

/**
 * ShowMovPage component is responsible for displaying mobility details.
 * It fetches the mobility data by `formId`, calculates the number of days 
 * of stay, determines the direction of mobility, and extracts the year of 
 * the earliest date.
 *
 * @component
 * @example
 * return (
 *   <ShowMovPage />
 * )
 *
 * @returns {JSX.Element} The rendered ShowMovPage component.
 *
 * @state {number} days - The number of days between entry and exit dates.
 * @state {string} direction - The direction of mobility ("IN" or "OUT").
 * @state {string} year - The year of the earliest date (entry or exit).
 * @state {Object} data - The complete form data fetched from the backend.
 * @property {string} data.id - The unique ID of the form.
 * @property {boolean} data.orii - Whether the mobility is internal.
 * @property {string} data.direction - The direction of mobility ("IN" or "OUT").
 * @property {string} data.gender - The gender of the participant.
 * @property {string} data.cta - Additional identifier for the participant.
 * @property {string} data.entryDate - The entry date for mobility.
 * @property {string} data.exitDate - The exit date for mobility.
 * @property {string} data.originProgram - The originating program of mobility.
 * @property {string} data.destinationProgram - The destination program of mobility.
 * @property {string} data.city - The city of the destination.
 * @property {string} data.country - The country of the destination.
 * @property {string} data.teacher - The assigned teacher for the participant (if applicable).
 * @property {string} data.faculty - The associated faculty for the mobility.
 * @property {string} data.funding - The funding amount for mobility.
 * @property {string} data.fundingSource - The source of funding.
 * @property {string} data.destination - The destination address or place.
 * @property {string} data.origin - The origin address or place.
 * @property {Object} data.agreement - Agreement details related to mobility.
 * @property {string} data.agreement.agreementId - The ID of the agreement.
 * @property {string} data.agreement.institution - The institution related to the agreement.
 * @property {string} data.agreement.agreementNumber - The agreement number.
 * @property {string} data.agreement.country - The country of the agreement.
 * @property {string} data.agreement.description - A brief description of the agreement.
 * @property {string} data.agreement.scope - The scope of the agreement.
 * @property {string} data.agreement.startDate - The start date of the agreement.
 * @property {Object} data.event - Event details associated with the mobility.
 * @property {string} data.event.eventId - The ID of the event.
 * @property {string} data.event.description - A description of the event.
 * @property {Object} data.event.eventType - The type of the event.
 * @property {string} data.event.eventType.eventTypeId - The ID of the event type.
 * @property {string} data.event.eventType.name - The name of the event type.
 * @property {Object} data.person - Personal information of the participant.
 * @property {string} data.person.identificationType - The type of identification.
 * @property {string} data.person.personType - The type of person (e.g., student, teacher).
 * @property {string} data.person.firstName - The first name of the participant.
 * @property {string} data.person.lastName - The last name of the participant.
 * @property {string} data.person.identification - The identification number of the participant.
 * @property {string} data.person.email - The email address of the participant.
 *
 * @param {string} formId - The ID of the form retrieved from the URL parameters.
 *
 * @function getId
 * Fetches mobility data by ID from the backend.
 *
 * @function calcDays
 * Calculates the number of days between two dates.
 *
 * @function checkDirection
 * Determines the mobility direction ("IN" or "OUT").
 */

function ShowMovPage() {
  const [days, setDays] = useState(0);
  const [direction, setDirection] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const [data, setData] = useState({
    id: "",
    orii: false,
    direction: "",
    gender: "",
    cta: "",
    entryDate: "",
    exitDate: "",
    originProgram: "",
    destinationProgram: "",
    city: "",
    country: "",
    teacher: "",
    faculty: "",
    funding: "",
    fundingSource: "",
    destination: "",
    origin: "",
    agreement: {
      agreementId: "",
      institution: "",
      agreementNumber: "",
      country: "",
      description: "",
      scope: "",
      startDate: "",
    },
    event: {
      eventId: "",
      description: "",
      eventType: {
        eventTypeId: "",
        name: "",
      },
    },
    person: {
      identificationType: "",
      personType: "",
      firstName: "",
      lastName: "",
      identification: "",
      email: "",
    },
  });
  const { formId } = useParams();

  //Obtener el tipo de movilidad (Sentido)
  useEffect(() => {
    getId(formId).then((res) => {
      setDirection(checkDirection(res.data.direction));
      let entryDate = new Date(res.data.entryDate);
      let exitDate = new Date(res.data.exitDate);
      let olderDate = entryDate<exitDate ? entryDate : exitDate;
      setYear(olderDate.getFullYear()) 
    });
  }, [formId]);

  //Setear los días de estancia y la información del formulario
  useEffect(() => {
    getId(formId).then((res) => {
      setDays(
        direction === "IN"
          ? calcDays(res.data.entryDate, res.data.exitDate)
          : calcDays(res.data.exitDate, res.data.entryDate)
      );
      setData(res.data);
    });
  }, [formId, direction]);

  return (
    <AdminLayout>
      <main className="flex flex-col my-5 gap-y-5">
        <section className="flex flex-col w-full pl-5 md:items-center md:flex-row">
          <MainButton
            text="Volver a Movilidades"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            onClick={() => navigate("/admin/movilidad")}
          />
        </section>
        <DataContainer title="Datos de la persona movilizada">
          <ShowMovilityField
            title="Nombre"
            data={data.person.firstName}
            bblInf={MoveInfo.nombre}
          />

          <ShowMovilityField
            title="Apellidos"
            data={data.person.lastName}
            bblInf={MoveInfo.apellidos}
          />

          <ShowMovilityField
            title="Género"
            data={FormDict[data.gender]}
            bblInf={MoveInfo.genero}
          />
          <ShowMovilityField
            title="Rol en la movilidad"
            data={FormDict[data.person.personType]}
            bblInf={MoveInfo.tipo}
          />
          <ShowMovilityField
            title="Tipo de documento"
            data={data.person.identificationType}
            bblInf={MoveInfo.tipoDocumento}
          />
          <ShowMovilityField
            title="Número de identificación"
            data={data.person.identification}
            bblInf={MoveInfo.numID}
          />
        </DataContainer>

        <DataContainer title="Información general de la movilidad">
          <ShowMovilityField
            title="Tipo de movilidad"
            data={FormDict[data.direction]}
            bblInf={MoveInfo.sentido}
          />

          <ShowMovilityField
            title={
              direction === "IN" ? "Facultad de acogida" : "Facultad de origen"
            }
            data={
              facultyOptions.find((option) => option.value === data.faculty)
                ?.text || "No disponible"
            }
            bblInf={MoveInfo.facultad}
          />
          <ShowMovilityField
            title="Tipo de evento"
            data={FormDict[data.event.eventType.eventTypeId]}
            bblInf={MoveInfo.tipoEvento}
          />
          <ShowMovilityField
            title="Descripción del evento"
            data={data.event.description}
            bblInf={MoveInfo.descEvento}
          />
        </DataContainer>

        <DataContainer title="Detalles de la Movilidad">
          <ShowMovilityField
            title="Universidad de origen"
            data={data.origin}
            bblInf={MoveInfo.uniOrigen}
          />

          <ShowMovilityField
            title="Universidad de destino"
            data={data.destination}
            bblInf={MoveInfo.uniDestino}
          />

          <ShowMovilityField
            title="País"
            data={data.country}
            bblInf={MoveInfo.pais}
          />

          <ShowMovilityField
            title="Ciudad"
            data={data.city}
            bblInf={MoveInfo.ciudad}
          />
        </DataContainer>

        <DataContainer title="Detalles académicos">
          <ShowMovilityField
            title="Programa de origen"
            data={data.originProgram}
            bblInf={MoveInfo.programaOrigen}
          />
          <ShowMovilityField
            title="Programa de acogida"
            data={data.destinationProgram}
            bblInf={MoveInfo.programaAcogida}
          />

          <ShowMovilityField
            title="Tutor académico"
            data={data.teacher}
            bblInf={MoveInfo.profPres}
          />
        </DataContainer>

        <DataContainer title="Convenios y patrocinios">
          <ShowMovilityField
            title="Número de convenio"
            data={(data.agreement && data.agreement.agreementNumber) || "N.A."}
            bblInf={MoveInfo.numConvenio}
          />

          <ShowMovilityField
            title="Financiación"
            data={data.funding}
            bblInf={MoveInfo.financiacion}
          />
          <ShowMovilityField
            title="Fuente de financiación"
            data={data.fundingSource}
            bblInf={MoveInfo.fuenteFinanciacion}
          />
        </DataContainer>

        <DataContainer title="Tiempo de la estancia">
          <ShowMovilityField
            title={direction === "IN" ? "Fecha de entrada" : "Fecha de salida"}
            data={formatDateToDDMMYYYYView(direction === "IN" ? data.entryDate : data.exitDate)}
            bblInf={direction === "IN" ? MoveInfo.fechaEntrada : MoveInfo.fechaSalida}
          />
          <ShowMovilityField
            title={direction === "IN" ? "Fecha de salida" : "Fecha de retorno"}
            data={formatDateToDDMMYYYYView(direction === "IN" ? data.exitDate : data.entryDate)}
            bblInf={direction === "IN" ? MoveInfo.fechaSalida : MoveInfo.fechaEntrada}
          />
          <ShowMovilityField
            title="Días de estancia"
            data={days}
            bblInf={MoveInfo.diasEstancia}
          />
          <ShowMovilityField
            title="Año"
            data={year}
            bblInf={MoveInfo.anio}
          />
        </DataContainer>
      </main>
    </AdminLayout>
  );
}

export default ShowMovPage;
