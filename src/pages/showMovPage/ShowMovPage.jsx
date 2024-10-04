//import { useEffect, useState } from "react";
import ShowMovilityField from "../../components/showMovilityField/ShowMovilityField";
import { MoveInfo } from "./MoveInfo";
import { getId } from "../../services/movilidad.service.js";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";


function ShowMovPage() {

    const [data, setData] = useState({
     "id": 1,
    "orii": true,
    "direction": "INCOMING_VIRTUAL",
    "gender": "F",
    "cta": 1,
    "entryDate": "0024-04-13",
    "exitDate": "0017-04-13",
    "originProgram": "sdfs",
    "destinationProgram": "sdfsfd",
    "city": "sdfsdf",
    "country": "sdfsdf",
    "teacher": "sdfs",
    "faculty": "sdfs",
    "funding": 234234.00,
    "fundingSource": "sdfsdf",
    "destination": "sdfsdf",
    "origin": "sdfsdfs",
    "agreement": {
        "agreementId": 1,
        "institution": "Universidad de los Andes",
        "agreementNumber": "123",
        "country": "Colombia",
        "description": "Acuerdo de cooperación",
        "scope": "INTERNATIONAL",
        "startDate": "01-01-2020"
    },
    "event": {
        "eventId": 1,
        "description": "sdfsdf",
        "eventType": {
            "eventTypeId": 3,
            "name": "CURSO CORTO"
        }
    },
    "person": {
        "identificationType": "DE",
        "personType": "STUDENT",
        "firstName": "sdfsfd",
        "lastName": "sdfsfd",
        "identification": "34213424",
        "email": null
    }
    });
    const { formId } = useParams();

    useEffect(() => {
        getId(formId).then((res) => {
            console.log(res.data);
            console.log(res.data.person.identificationType);
            setData(res.data);

        })
    }, [])

    return (
        <>
            <main className="grid grid-cols-1 mx-8 mt-10 mb-16 sm:grid-cols-2 lg:grid-cols-4 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16">
                <ShowMovilityField title='Sentido' data={data.direction} bblInf={MoveInfo.sentido}/>
                <ShowMovilityField title='Tipo' data={data.person.personType} bblInf={MoveInfo.tipo}/>
                <ShowMovilityField title='Tipo de documento' data={data.person.identificationType} bblInf={MoveInfo.tipoDocumento}/>
                <ShowMovilityField title='Número de identificación' data={data.person.identification} bblInf={MoveInfo.numID}/> 
                <ShowMovilityField title='Nombre' data={data.person.firstName} bblInf={MoveInfo.nombre}/>
                <ShowMovilityField title='Apellidos' data={data.person.lastName} bblInf={MoveInfo.apellidos}/>
                <ShowMovilityField title='Género' data={data.gender} bblInf={MoveInfo.genero}/>
                <ShowMovilityField title='Fecha de salida' data={data.exitDate} bblInf={MoveInfo.fechaSalida}/> 
                <ShowMovilityField title='Fecha de entrada' data={data.entryDate} bblInf={MoveInfo.fechaEntrada}/>
                <ShowMovilityField title='Días de estancia' data={0} bblInf={MoveInfo.diasEstancia}/>
                <ShowMovilityField title='Año' data={2024} bblInf={MoveInfo.anio}/>
                <ShowMovilityField title='Universidad de origen' data={data.origin} bblInf={MoveInfo.uniOrigen}/>
                <ShowMovilityField title='Universidad de destino' data={data.destination} bblInf={MoveInfo.uniDestino}/>
                <ShowMovilityField title='Número de convenio' data={data.agreementId} bblInf={MoveInfo.numConvenio}/>
                <ShowMovilityField title='Tipo de evento' data={data.event.eventType.eventTypeId} bblInf={MoveInfo.tipoEvento}/>
                <ShowMovilityField title='Descripción del evento' data={data.event.description} bblInf={MoveInfo.descEvento}/>
                <ShowMovilityField title='Programa de origen' data={data.originProgram} bblInf={MoveInfo.programaOrigen}/>
                <ShowMovilityField title='Programa de destino' data={data.destinationProgram} bblInf={MoveInfo.programaAcogida}/>
                <ShowMovilityField title='Ciudad' data={data.city} bblInf={MoveInfo.ciudad}/>
                <ShowMovilityField title='Pais' data={data.country} bblInf={MoveInfo.pais}/>
                <ShowMovilityField title='Profesor presenta' data={data.teacher} bblInf={MoveInfo.profPres}/>
                <ShowMovilityField title='Facultad' data={data.faculty} bblInf={MoveInfo.facultad}/>
                <ShowMovilityField title='Financiación' data={data.funding} bblInf={MoveInfo.financiacion}/>
                <ShowMovilityField title='Fuente de financiación' data={data.fundingSource} bblInf={MoveInfo.fuenteFinanciacion}/>
            </main>
        </>
    )
}

export default ShowMovPage;