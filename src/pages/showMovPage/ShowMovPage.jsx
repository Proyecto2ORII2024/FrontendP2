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
