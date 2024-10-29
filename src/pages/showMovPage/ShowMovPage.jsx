//import { useEffect, useState } from "react";
import ShowMovilityField from "../../components/showMovilityField/ShowMovilityField";
import { MoveInfo } from "./MoveInfo";
import { getId } from "../../services/movilidad.service.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { FormDict } from "../../utils/FormDict.js";
import { calcDays } from "../updateForm/Information.js";


function ShowMovPage() {
  
  const [days, setDays] = useState(0);


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

  useEffect(() => {
    getId(formId).then((res) => {
      setDays(calcDays(res.data.entryDate, res.data.exitDate));
      setData(res.data);
    });
  }, [formId]);

  return (
    <AdminLayout>
      <main className="grid grid-cols-1 mx-8 mt-10 mb-16 sm:grid-cols-2 lg:grid-cols-4 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16">
        <ShowMovilityField
          title="Sentido"
          data={FormDict[data.direction]}
          bblInf={MoveInfo.sentido}
        />
        <ShowMovilityField
          title="Tipo"
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
          title="Fecha de salida"
          data={data.exitDate}
          bblInf={MoveInfo.fechaSalida}
        />
        <ShowMovilityField
          title="Fecha de entrada"
          data={data.entryDate}
          bblInf={MoveInfo.fechaEntrada}
        />
        <ShowMovilityField
          title="Días de estancia"
          data={days}
          bblInf={MoveInfo.diasEstancia}
        />
        <ShowMovilityField title="Año" data={new Date().getFullYear()} bblInf={MoveInfo.anio} />
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
          title="Número de convenio"
          data={data.agreement && data.agreement.agreementNumber || 'N.A.'}
          bblInf={MoveInfo.numConvenio}
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
        <ShowMovilityField
          title="Programa de origen"
          data={data.originProgram}
          bblInf={MoveInfo.programaOrigen}
        />
        <ShowMovilityField
          title="Programa de destino"
          data={data.destinationProgram}
          bblInf={MoveInfo.programaAcogida}
        />
        <ShowMovilityField
          title="Ciudad"
          data={data.city}
          bblInf={MoveInfo.ciudad}
        />
        <ShowMovilityField
          title="Pais"
          data={data.country}
          bblInf={MoveInfo.pais}
        />
        <ShowMovilityField
          title="Profesor presenta"
          data={data.teacher}
          bblInf={MoveInfo.profPres}
        />
        <ShowMovilityField
          title="Facultad"
          data={data.faculty}
          bblInf={MoveInfo.facultad}
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
      </main>
    </AdminLayout>
  );
}

export default ShowMovPage;
