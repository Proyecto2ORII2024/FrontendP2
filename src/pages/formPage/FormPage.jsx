import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import {
  Info,
  inputInfo,
  createAgreementOptions,
  calcDays,
  checkDirection,
  checkDates,
} from "../../utils/FormInformation.js";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/customInput/CustomInput.jsx";
import CustomSelect from "../../components/customSelect/CustomSelect.jsx";
import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import { useState, useEffect } from "react";
import { createForm } from "../../services/form.service.js";
import { getAgreements } from "../../services/agreement.service.js";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { formatDateToDDMMYYYY } from "../../utils/Date.js";

function FormPage() {
  const [days, setDays] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [agreements, setAgreements] = useState([]);
  const [dateError, setDateError] = useState("");
  const [yes, setYes] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isInOrOut, setIsInOrOut] = useState("");
  const [notification, setNotification] = useState("");
  const [notiOpen, setNotiOpen] = useState(false);

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
    options: [
      {value:"FIET", text: "Ingeniería Electrónica y Telecomunicaciones"},
      {value:"FIC", text: "Ingeniería Civil"},
      {value:"FCS", text: "Ciencias de la Salud"},
      {value:"FDCPS", text: "Derecho y Ciencias Políticas y Sociales"},
      {value:"FACNED", text: "Facultad de Ciencias Naturales, Exactas y de la Educación"},
      {value:"FCH", text: "Ciencias Humanas"},
      {value:"FA", text: "Artes"},
      {value:"FCA", text: "Ciencias Agropecuarias"},
      {value:"FCCEA", text: "Ciencias Contables, Económicas y Administrativas"},
    ]
  };

  const updateEntryDate = (e) => {
    setEntryDate(e.target.value);
  };

  const updateExitDate = (e) => {
    setExitDate(e.target.value);
  };

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

  const returnMov = () => {
    const mov = JSON.parse(sessionStorage.getItem("movility"));
    return Array.isArray(mov) ? mov : [];
  };

  const onSubmit = (data) => {
    const validDate = checkDates(isInOrOut, data.entryDate, data.exitDate);

    if (!validDate) {
      setDateError(
        isInOrOut === "IN"
          ? "La fecha de salida no puede ser mayor a la de entrada"
          : "La fecha de entrada no puede ser mayor a la de salida"
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
      faculty: data.faculty,
      funding: Number(data.funding),
      fundingSource: data.fundingSource,
      destination: data.destination,
      origin: data.origin,
      agreementId: yes ? data.agreementId : null,
      teacher:
        isStudent && isInOrOut === "IN" && data.teacher ? data.teacher : null,
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

    //Forma provicional para los datos de las estadisticas
    localStorage.setItem("userData", JSON.stringify(formData));

    const agreementsData =
      JSON.parse(localStorage.getItem("agreementsData")) || {};

    const selectedEventType = data.eventType;
    agreementsData[selectedEventType] =
      (agreementsData[selectedEventType] || 0) + 1;

    localStorage.setItem("agreementsData", JSON.stringify(agreementsData));

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
        console.log(err.response.data);
        setNotification("error");
        setNotiOpen(true);
      });
  };

  useEffect(() => {
    getAgreements()
      .then((res) => {
        createAgreementOptions(res.data, setAgreements);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    if (entryDate && exitDate) {
      setDays(calcDays(entryDate, exitDate));
    }
  }, [entryDate, exitDate]);

  return (
    <AdminLayout>
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
        <h3 className="mt-5 ml-8"><span className="font-medium">Nota: </span>Los campos con <span className="text-xl font-semibold text-red-400">*</span> son obligatorios</h3>
        <form
          className="flex flex-col my-5 gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
              Datos de la persona movilizada
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
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
            </article>
          </section>
          <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
              Información general de la movilidad
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
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
                  rules={{ required: inputInfo.tipoEvento.required }}
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
            </article>
          </section>
          <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
              Detalles de la Movilidad
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
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
            </article>
          </section>
          <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
              Detalles académicos
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
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
                  isStudent && isInOrOut === "IN" ? "" : "opacity-40 -z-50"
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
            </article>
          </section>
          <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
              Convenios y patrocinios
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
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
            </article>
          </section>
          <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
              Tiempo de la estancia
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
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
                      : "Fecha de entrada"}
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
                      : "Fecha de entrada"
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
            </article>
          </section>
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
        {returnMov().length > 0 && (
          <table className="w-5/6 mx-auto mb-10 text-center border-collapse table-auto text-primary-dark md:table">
            <thead className="hidden bg-neutral md:table-header-group">
              <tr className="rounded-t-xl">
                <th className="w-1/5 px-4 py-3 font-semibold text-center text-primary-dark">
                  Facultad
                </th>
                <th className="w-1/5 px-4 py-3 font-semibold text-center text-primary-dark">
                  Código de Convenio
                </th>
                <th className="px-4 py-3 font-semibold text-center text-primary-dark w-[15%]">
                  Tipo de Documento
                </th>
                <th className="w-1/4 px-4 py-3 font-semibold text-center text-primary-dark">
                  Documento Usuario
                </th>
              </tr>
            </thead>
            <tbody className="text-primary-dark">
              {returnMov().map((item, index) => (
                <tr key={index} className="flex flex-col border-b md:table-row">
                  <td className="px-4 py-2">
                    <span className="font-bold md:hidden">Facultad: </span>
                    {item.faculty}
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
    </AdminLayout>
  );
}

export default FormPage;
