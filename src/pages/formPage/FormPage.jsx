import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import {
  Info,
  inputInfo,
  createAgreementOptions,
  calcDays,
  checkDirection,
  checkDates,
  checkEventType,
} from "../../utils/FormInformation.js";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/customInput/CustomInput.jsx";
import CustomSelect from "../../components/customSelect/CustomSelect.jsx";
import DataContainer from "../../components/dataContainer/DataContainer.jsx";
import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import { useState, useEffect, useContext } from "react";
import { createForm } from "../../services/form.service.js";
import { getAgreements } from "../../services/agreement.service.js";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import UserLayout from "../../layouts/UserLayout.jsx";
import { formatDateToDDMMYYYY } from "../../utils/Date.js";
import facultyOptions from "../../utils/facultyOptions.js";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/LoginContext.jsx";

/**
 * FormPage component handles the creation and management of mobility forms.
 * It includes form validation, state management, and interaction with APIs 
 * to save and retrieve data.
 *
 * @component
 * @example
 * return (
 *   <FormPage />
 * )
 *
 * @returns {JSX.Element} The rendered FormPage component.
 *
 * @typedef {Object} FormData
 * @property {boolean} orii - Indicates if the form is for mobility within the institution.
 * @property {string} direction - The direction of mobility (e.g., "IN" or "OUT").
 * @property {string} gender - The gender of the individual.
 * @property {number} cta - The CTA value associated with the form.
 * @property {string} entryDate - The entry date in DD/MM/YYYY format.
 * @property {string} exitDate - The exit date in DD/MM/YYYY format.
 * @property {string} originProgram - The origin program of the individual.
 * @property {string} destinationProgram - The destination program.
 * @property {string} city - The destination city.
 * @property {string} country - The destination country.
 * @property {string} faculty - The associated faculty.
 * @property {number} funding - The funding amount.
 * @property {string} fundingSource - The source of the funding.
 * @property {string} destination - The destination details.
 * @property {string} origin - The origin details.
 * @property {string|null} agreementId - The ID of the agreement (if applicable).
 * @property {string|null} teacher - The assigned teacher (if applicable).
 * @property {Object} event - The event details.
 * @property {string} event.description - Description of the event.
 * @property {number} event.eventTypeId - The ID of the event type.
 * @property {Object} person - The person's details.
 * @property {string} person.identificationType - The identification type.
 * @property {string} person.personType - The type of person (e.g., "student").
 * @property {string} person.firstName - The first name of the person.
 * @property {string} person.lastName - The last name of the person.
 * @property {string} person.identification - The identification number.
 *
 * @typedef {Object} Notification
 * @property {string} type - The type of notification (e.g., "success", "error").
 * @property {string} message - The message to display in the notification.
 * @property {boolean} open - Whether the notification is open.
 *
 * @state {number} days - The number of days calculated between entry and exit dates.
 * @state {string} entryDate - The selected entry date.
 * @state {string} exitDate - The selected exit date.
 * @state {Array} agreements - List of agreements fetched from the API.
 * @state {string} dateError - Error message related to date validation.
 * @state {boolean} yes - Indicates if an agreement ID is required.
 * @state {boolean} isStudent - Indicates if the person is a student.
 * @state {string} isInOrOut - The mobility direction ("IN" or "OUT").
 * @state {boolean} isValidETForTutor - Indicates if the teacher is valid for tutoring.
 * @state {string} notification - The current notification type.
 * @state {boolean} notiOpen - Whether the notification is open.
 * @state {boolean} showTable - Whether to display the table of data.
 *
 * @function updateEntryDate - Updates the entry date state.
 * @param {Object} e - Event object from the input field.
 *
 * @function updateExitDate - Updates the exit date state.
 * @param {Object} e - Event object from the input field.
 *
 * @function getAgreementTextById - Retrieves the agreement text by ID.
 * @param {string} id - The ID of the agreement.
 * @param {Array} agreements - List of agreements.
 * @returns {string} The text of the agreement or "N/A" if not found.
 *
 * @function saveLocalStorage - Saves the form data to session storage.
 * @param {Object} object - The form data to save.
 *
 * @function returnMov - Retrieves recently created mobility data from session storage.
 * @returns {Array} An array of recent mobility data.
 *
 * @function onSubmit - Handles form submission, validates data, and saves to the backend.
 * @param {Object} data - The data submitted from the form.
 *
 * @function checkDates - Validates the relationship between entry and exit dates.
 * @param {string} isInOrOut - The direction of mobility.
 * @param {string} entryDate - The entry date.
 * @param {string} exitDate - The exit date.
 * @returns {boolean} Whether the dates are valid.
 *
 * @useEffect - Fetches agreements from the API on component mount.
 * @useEffect - Calculates the number of days between entry and exit dates when these values change.
 */

function FormPage() {
  const [days, setDays] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [agreements, setAgreements] = useState([]);
  const [dateError, setDateError] = useState("");
  const [yes, setYes] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isInOrOut, setIsInOrOut] = useState("");
  const [isValidETForTutor, setIsValidETForTutor] = useState(false);
  const [notification, setNotification] = useState("");
  const [notiOpen, setNotiOpen] = useState(false);
  const [showTable, setShowTable] = useState(false)

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const Layout = user.role === "ADMIN" ? AdminLayout : UserLayout;

  const numConvenio = {
    id: "agreementId",
    text: "Número de convenio",
    type: "text",
    required: yes,
  };

  let facultad = {
    id: "faculty",
    text:
      isInOrOut === "" || isInOrOut === "IN"
        ? "Facultad de acogida"
        : "Facultad de origen",
    required: true,

    options: facultyOptions,
  };

  //Actualizar la fecha de entrada/retorno
  const updateEntryDate = (e) => {
    setEntryDate(e.target.value);
  };

  //Actualizar la fecha de salida
  const updateExitDate = (e) => {
    setExitDate(e.target.value);
  };

  //Obtener el text del convenio por ID
  const getAgreementTextById = (id, agreements) => {
    const agreement = agreements.find((ag) => ag.value === id);
    return agreement ? agreement.text : "N/A"; // Si no se encuentra, muestra "N/A"
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  //Guardar los datos de formularios creados recientemente
  const saveLocalStorage = (object) => {
    // Verifica si ya existe el valor en sessionStorage
    const existingData = sessionStorage.getItem("movility");

    // Si no existe, crea un nuevo array con el nuevo valor
    if (!existingData) {
      sessionStorage.setItem("movility", JSON.stringify([object]));
    } else {
      // Si existe, obtiene el array, le hace push al nuevo valor y lo guarda de nuevo
      const dataArray = JSON.parse(existingData);
      dataArray.push(object);
      sessionStorage.setItem("movility", JSON.stringify(dataArray));
    }
  };

  //Retorno de las movilidades recientes
  const returnMov = () => {
    const mov = JSON.parse(sessionStorage.getItem("movility"));
    return Array.isArray(mov) ? mov : [];
  };

  //Subida de datos
  const onSubmit = (data) => {
    const validDate = checkDates(isInOrOut, data.entryDate, data.exitDate);

    //Validar fechas
    if (!validDate) {
      setDateError(
        isInOrOut === "IN"
          ? "La fecha de salida no puede ser mayor a la de entrada"
          : "La fecha de retorno no puede ser mayor a la de salida"
      );
      setNotification("errorDate");
      setNotiOpen(true);
      return;
    }

    let formData = {
      orii: true,
      direction: data.direction,
      gender: data.gender,
      cta: 1,
      entryDate: formatDateToDDMMYYYY(data.entryDate),
      exitDate: formatDateToDDMMYYYY(data.exitDate),
      originProgram: data.originProgram,
      destinationProgram: data.destinationProgram,
      city: data.city,
      country: data.country,
      faculty: data.faculty || facultad.options.find(
        (option) => option.text === user.faculty
      )?.value,
      funding: Number(data.funding),
      fundingSource: data.fundingSource,
      destination: data.destination,
      origin: data.origin,
      agreementId: yes ? data.agreementId : null,
      teacher:
        isStudent && isInOrOut === "IN" && data.teacher && isValidETForTutor
          ? data.teacher
          : null,
      event: {
        description: data.eventDescription,
        eventTypeId: data.eventType,
      },
      person: {
        identificationType: data.identificationType,
        personType: data.personType,
        firstName: data.firstName,
        lastName: data.lastName,
        identification: data.personId,
      },
    };

    createForm(formData)
      .then((res) => {
        if (res.status === 201) {
          saveLocalStorage(formData);
          setDays(0);
          setYes(false);
          setIsInOrOut("");
          setIsStudent(false);
          setEntryDate("");
          setExitDate("");
          setDateError("");
          reset();
        }
        setNotification(res.status === 201 ? "success" : "error");
        setNotiOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setNotification("error");
        setNotiOpen(true);
      });
  };

  //Obtener los convenios creados
  useEffect(() => {
    getAgreements()
      .then((res) => {
        createAgreementOptions(res.data, setAgreements);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  //Calcular los días de estancia
  useEffect(() => {
    if (entryDate && exitDate) {
      setDays(
        isInOrOut === "IN" || isInOrOut === ""
          ? calcDays(entryDate, exitDate)
          : calcDays(exitDate, entryDate)
      );
    }
  }, [entryDate, exitDate, isInOrOut]);

  return (
    <Layout>
      <main className="flex flex-col">
        <NotificationBox
          type={notification === "errorDate" ? "error" : notification}
          title={
            notification === "success"
              ? "Enviado con éxito"
              : "Error al enviar el formulario"
          }
          open={notiOpen}
          setOpen={setNotiOpen}
        >
          {notification === "success" ? (
            <p>
              El formulario ha sido enviado{" "}
              <span className="font-semibold">éxitosamente</span>
            </p>
          ) : notification === "errorDate" ? (
            <p>{dateError}</p>
          ) : (
            <p>Ha ocurrido un error al enviar el formulario</p>
          )}
        </NotificationBox>
        {user.role === "ADMIN" && (
          <section className="flex flex-col w-full p-5 pb-0 md:items-center md:flex-row">
          <MainButton
            text="Volver a Movilidades"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            onClick={() => navigate("/admin/movilidad")}
          />
        </section>
        )}
        <h3 className="mt-5 ml-8">
          <span className="font-semibold">Nota: </span>Los campos con{" "}
          <span className="text-xl font-semibold text-red-400">*</span> son
          obligatorios
        </h3>

        <form
          className="flex flex-col my-5 gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DataContainer title="Datos de la persona movilizada">
            <CustomInput
              bubbleInf={Info.nombre}
              inputInf={inputInfo.nombre}
              register={register}
              errors={errors}
            />

            <CustomInput
              bubbleInf={Info.apellidos}
              inputInf={inputInfo.apellidos}
              register={register}
              errors={errors}
            />

            <div>
              <Controller
                name={inputInfo.genero.id}
                control={control}
                defaultValue=""
                rules={{ required: inputInfo.genero.required }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={inputInfo.genero}
                    options={inputInfo.genero.options}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.genero}
                  />
                )}
              />
              {errors[inputInfo.genero.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <div>
              <Controller
                name={inputInfo.tipo.id}
                control={control}
                defaultValue=""
                rules={{
                  required: inputInfo.tipo.required,
                  onChange: (e) => setIsStudent(e.target.value === "STUDENT"),
                }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={inputInfo.tipo}
                    options={inputInfo.tipo.options}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.tipo}
                  />
                )}
              />
              {errors[inputInfo.tipo.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <div>
              <Controller
                name={inputInfo.tipoDocumento.id}
                control={control}
                defaultValue=""
                rules={{ required: inputInfo.tipoDocumento.required }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={inputInfo.tipoDocumento}
                    options={inputInfo.tipoDocumento.options}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.tipoDocumento}
                  />
                )}
              />
              {errors[inputInfo.tipoDocumento.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <CustomInput
              bubbleInf={Info.numID}
              inputInf={inputInfo.numID}
              register={register}
              errors={errors}
            />
          </DataContainer>
          <DataContainer title="Información general de la movilidad">
            <div>
              <Controller
                name={inputInfo.sentido.id}
                control={control}
                defaultValue=""
                rules={{
                  required: inputInfo.sentido.required,
                  onChange: (e) => {
                    setIsInOrOut(checkDirection(e.target.value));
                  },
                }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={inputInfo.sentido}
                    options={inputInfo.sentido.options}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.sentido}
                  />
                )}
              />
              {errors[inputInfo.sentido.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <div>
              {user.role === "ADMIN" ? (
                <Controller
                  name={inputInfo.facultad.id}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: facultad.required,
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      inputInf={facultad}
                      options={facultad.options}
                      value={field.value}
                      onChange={field.onChange}
                      bblInfo={Info.sentido}
                    />
                  )}
                />
              ) : (
                <label className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <InfoBubble info={Info.sentido} />
                    <p>{facultad.text}</p>
                  </div>
                  <p className="py-1 text-left border-b-2 outline-none ml-7 border-neutral-hover">
                    {facultad.options.find(
                      (option) => option.text === user.faculty
                    )?.text || "No disponible"}
                  </p>
                </label>
              )}
              {errors[facultad.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <div>
              <Controller
                name={inputInfo.tipoEvento.id}
                control={control}
                defaultValue=""
                rules={{
                  required: inputInfo.tipoEvento.required,
                  onChange: (e) => {
                    setIsValidETForTutor(checkEventType(e.target.value));
                  },
                }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={inputInfo.tipoEvento}
                    options={inputInfo.tipoEvento.options}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.tipoEvento}
                  />
                )}
              />
              {errors[inputInfo.tipoEvento.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <CustomInput
              bubbleInf={Info.descEvento}
              inputInf={inputInfo.descEvento}
              errors={errors}
              register={register}
            />
          </DataContainer>
          <DataContainer title="Detalles de la Movilidad">
            <CustomInput
              bubbleInf={Info.uniOrigen}
              inputInf={inputInfo.uniOrigen}
              errors={errors}
              register={register}
            />

            <CustomInput
              bubbleInf={Info.uniDestino}
              inputInf={inputInfo.uniDestino}
              errors={errors}
              register={register}
            />

            <CustomInput
              bubbleInf={Info.pais}
              inputInf={inputInfo.pais}
              errors={errors}
              register={register}
            />

            <CustomInput
              bubbleInf={Info.ciudad}
              inputInf={inputInfo.ciudad}
              errors={errors}
              register={register}
            />
          </DataContainer>
          <DataContainer title="Detalles académicos">
            <CustomInput
              bubbleInf={Info.programaOrigen}
              inputInf={inputInfo.programaOrigen}
              errors={errors}
              register={register}
            />

            <CustomInput
              bubbleInf={Info.programaAcogida}
              inputInf={inputInfo.programaAcogida}
              errors={errors}
              register={register}
            />

            <div
              className={`${
                isStudent && isInOrOut === "IN" && isValidETForTutor
                  ? ""
                  : "opacity-40 -z-50"
              }`}
            >
              <CustomInput
                bubbleInf={Info.profPres}
                inputInf={inputInfo.profPres}
                errors={errors}
                register={register}
                isDisable={
                  !isStudent && (isInOrOut === "OUT" || isInOrOut === "")
                }
              />
            </div>
          </DataContainer>
          <DataContainer title="Convenios y patrocinios">
            <div>
              <Controller
                name={inputInfo.convenio.id}
                control={control}
                defaultValue=""
                rules={{
                  required: inputInfo.convenio.required,
                  onChange: (e) => setYes(e.target.value === "Y"),
                }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={inputInfo.convenio}
                    options={inputInfo.convenio.options}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.convenio}
                  />
                )}
              />
              {errors[inputInfo.convenio.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>

            <div className={`${yes ? "" : "opacity-40 -z-50"}`}>
              <Controller
                name={inputInfo.numConvenio.id}
                control={control}
                defaultValue=""
                rules={{ required: yes }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={numConvenio}
                    options={agreements}
                    value={field.value}
                    onChange={field.onChange}
                    bblInfo={Info.numConvenio}
                    isDisable={!yes}
                  />
                )}
              />
              {errors[inputInfo.numConvenio.id] && (
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </div>
            <CustomInput
              bubbleInf={Info.financiacion}
              inputInf={inputInfo.financiacion}
              errors={errors}
              register={register}
            />

            <CustomInput
              bubbleInf={Info.fuenteFinanciacion}
              inputInf={inputInfo.fuenteFinanciacion}
              errors={errors}
              register={register}
            />
          </DataContainer>

          <DataContainer title="Tiempo de la estancia">
            {/**Fecha de entrada por defecto */}

            <label
              className={`flex flex-col w-full ${
                isInOrOut === "" ? "opacity-40 -z-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <InfoBubble
                  info={
                    isInOrOut === "IN" || isInOrOut === ""
                      ? Info.fechaEntrada
                      : Info.fechaSalida
                  }
                />
                <p>
                  {isInOrOut === "IN" || isInOrOut === ""
                    ? "Fecha de entrada"
                    : "Fecha de salida"}
                </p>
                <span className="text-xl font-semibold text-red-400">*</span>
              </div>
              <input
                id={
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "entryDate"
                    : "exitDate"
                }
                autoComplete="off"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                type="date"
                disabled={isInOrOut === ""}
                placeholder={
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "Fecha de entrada"
                    : "Fecha de salida"
                }
                {...register(
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "entryDate"
                    : "exitDate",
                  {
                    required: true,
                    onChange:
                      isInOrOut === "IN" || isInOrOut === ""
                        ? updateEntryDate
                        : updateExitDate,
                  }
                )}
              />
              {errors[
                isInOrOut === "IN" || isInOrOut === ""
                  ? "entryDate"
                  : "exitDate"
              ] && (
                <span className="text-sm text-red-400 border-b-2 w-fit border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </label>

            {/**Fecha de salida por defecto */}
            <label
              className={`flex flex-col w-full ${
                isInOrOut === "" ? "opacity-40 -z-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <InfoBubble
                  info={
                    isInOrOut === "IN" || isInOrOut === ""
                      ? Info.fechaSalida
                      : Info.fechaEntrada
                  }
                />

                <p>
                  {isInOrOut === "IN" || isInOrOut === ""
                    ? "Fecha de salida"
                    : "Fecha de retorno"}
                </p>
                <span className="text-xl font-semibold text-red-400">*</span>
              </div>
              <input
                id={
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "exitDate"
                    : "entryDate"
                }
                autoComplete="off"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                type="date"
                disabled={isInOrOut === ""}
                placeholder={
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "Fecha de salida"
                    : "Fecha de retorno"
                }
                {...register(
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "exitDate"
                    : "entryDate",
                  {
                    required: true,
                    onChange: (e) => {
                      isInOrOut === "IN" || isInOrOut === ""
                        ? updateExitDate(e)
                        : updateEntryDate(e);
                      setDateError("");
                    },
                  }
                )}
              />
              {(dateError ||
                errors[
                  isInOrOut === "IN" || isInOrOut === ""
                    ? "exitDate"
                    : "entryDate"
                ]) && (
                <span className="text-sm text-red-400 border-b-2 w-fit border-b-red-400 ml-7">
                  {dateError ? dateError : "Este campo es requerido"}
                </span>
              )}
            </label>

            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.diasEstancia} />
                <p>Días de estancia</p>
              </div>
              <p className="py-1 text-left border-b-2 outline-none ml-7 border-neutral-hover">
                {days}
              </p>
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.anio} />
                <p>Año de movilidad</p>
              </div>
              <p className="py-1 text-left border-b-2 outline-none ml-7 border-neutral-hover">
                {new Date().getFullYear()}{" "}
                {/**Verificar la forma de enviarlo al backend */}
              </p>
            </label>
          </DataContainer>

          <div className="mx-auto">
            <MainButton
              text={"Confirmar"}
              bgColor={"primary-dark"}
              hoverBg={"primary-light"}
              type={"submit"}
              textColor={"white"}
            />
          </div>
        </form>
        <button className="mb-5 font-semibold underline duration-150 text-primary hover:text-primary-light" onClick={() => setShowTable(!showTable)} type="button">{!showTable ? "Mostrar movilidades recientes" : "Ocultar movilidades recientes"}</button>
        {showTable && returnMov().length > 0 && (
          <table className="w-5/6 mx-auto mb-10 text-center border-collapse table-auto text-primary-dark md:table">
            <thead className="hidden bg-neutral md:table-header-group">
              <tr className="rounded-t-xl">
                <th className="w-1/5 px-4 py-3 font-semibold text-center text-primary-dark rounded-tl-xl">
                  Facultad
                </th>
                <th className="w-1/5 px-4 py-3 font-semibold text-center text-primary-dark">
                  Código de Convenio
                </th>
                <th className="px-4 py-3 font-semibold text-center text-primary-dark w-[15%]">
                  Tipo de Documento
                </th>
                <th className="w-1/4 px-4 py-3 font-semibold text-center text-primary-dark rounded-tr-xl">
                  Documento Usuario
                </th>
              </tr>
            </thead>
            <tbody className="text-primary-dark">
              {returnMov().map((item, index) => (
                <tr key={index} className="flex flex-col border-b md:table-row">
                  <td className="px-4 py-2">
                    <span className="font-bold md:hidden">Facultad: </span>

                    {facultad.options.find(
                      (option) => option.value === item.faculty
                    )?.text || "No disponible"}
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-bold md:hidden">
                      Código de convenio:{" "}
                    </span>
                    {getAgreementTextById(item.agreementId, agreements)}
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-bold md:hidden">Tipo de ID: </span>
                    {item.person.identificationType}
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-bold md:hidden">Número de ID: </span>
                    {item.person.identification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </Layout>
  );
}

export default FormPage;
