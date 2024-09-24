import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import { Info } from "./Information.js";
//import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
//import { useState } from "react";

function FormPage() {

  //const [openNoti, setOpenNoti] = useState(false);

  /*function calcDays(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
  
    const diferenciaMilisegundos = fin - inicio;
  
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = diferenciaMilisegundos / milisegundosPorDia;
  
    return Math.abs(Math.floor(diferenciaDias)); // Redondear al número de días
  }*/

  return (
    <div className="flex flex-col gap-32">
      <form action="" className="flex flex-col">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-8 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16 mt-10">
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.sentido} />
              <p>Sentido</p>
            </div>
            <select
              id="scope"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
            >
              <option value="Saliente presencial">Saliente presencial</option>
              <option value="Entrante presencial">Entrante presencial</option>
              <option value="Saliente virtual">Saliente virtual</option>
              <option value="Entrante virtual">Entrante virtual</option>
            </select>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.tipo} />
              <p>Tipo</p>
            </div>
            <select
              id="type"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
            >
              <option value="teacher">Profesor</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Administrativo">Administrativo</option>
            </select>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.tipoDocumento} />
              <p>Tipo de documento</p>
            </div>
            <select
              id="docType"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
            >
              <option value="CC">CC</option>
              <option value="PASAPORTE">PASAPORTE</option>
              <option value="CE">CE</option>
              <option value="DE">DE</option>
              <option value="V">V</option>
            </select>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.numID} />
              <p>Número de identificación</p>
            </div>
            <input
              id="numID"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="number"
              placeholder="Número de identificación"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.nombre} />
              <p>Nombres y apellidos</p>
            </div>
            <input
              id="name"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Nombres y apellidos"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.genero} />
              <p>Género</p>
            </div>
            <select
              id="gender"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
            >
              <option value="O">Elefante guerrero mítico ancestral</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.fechaSalida} />
              <p>Fecha de salida</p>
            </div>
            <input
              id="outDate"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="date"
              placeholder="Fecha de salida"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.fechaEntrada} />
              <p>Fecha de entrada</p>
            </div>
            <input
              id="inDate"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="date"
              placeholder="Fecha de entrada"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.diasEstancia} />
              <p>Días de estancia</p>
            </div>
            <p className="border-b-2 ml-7 border-neutral-hover outline-none py-1">
              Días de estancia
            </p>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.anio} />
              <p>Año</p>
            </div>
            <p className="border-b-2 ml-7 border-neutral-hover outline-none py-1">
              Año
            </p>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.uniOrigen} />
              <p>Universidad de origen</p>
            </div>
            <input
              id="ogUni"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Universidad de origen"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.uniDestino} />
              <p>Universidad de destino</p>
            </div>
            <input
              id="dtUni"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Universidad de destino"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.convenio} />
              <p>¿Existe convenio?</p>
            </div>
            <select
              id="docType"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
            >
              <option value="N">No</option>
              <option value="Y">Sí</option>
            </select>
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.numConvenio} />
              <p>Número de convenio</p>
            </div>
            <input
              id="numConv"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="number"
              placeholder="Número de convenio"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.tipoEvento} />
              <p>Tipo de evento</p>
            </div>
            <input
              id="eventType"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Evento"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.descEvento} />
              <p>Descripción del evento</p>
            </div>
            <input
              id="eventDesc"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Descripción del evento"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.programaOrigen} />
              <p>Programa de origen</p>
            </div>
            <input
              id="ogProg"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Programa de origen"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.programaAcogida} />
              <p>Programa de acogida</p>
            </div>
            <input
              id="dtProg"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Programa de acogida"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.ciudad} />
              <p>Ciudad</p>
            </div>
            <input
              id="city"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Ciudad"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.pais} />
              <p>País</p>
            </div>
            <input
              id="country"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="País"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.profPres} />
              <p>Profesor presenta</p>
            </div>
            <input
              id="teacherPresents"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Profesor presenta"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.facultad} />
              <p>Facultad</p>
            </div>
            <input
              id="faculty"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Facultad"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.financiacion} />
              <p>Financiación</p>
            </div>
            <input
              id="funding"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="number"
              placeholder="Financiación"
            />
          </label>
          <label className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <InfoBubble info={Info.fuenteFinanciacion} />
              <p>Fuente de financiación</p>
            </div>
            <input
              id="fundSrc"
              autoComplete="off"
              className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
              type="text"
              placeholder="Fuente de financiación"
            />
          </label>
        </section>
        <div className="my-10 mx-auto">
          <MainButton text={'Confirmar'} bgColor={'primary-dark'} hoverBg={'primary-light'} type={'submit'} textColor={'white'} />
        </div>
      </form>
    </div>
  );
}

export default FormPage;
