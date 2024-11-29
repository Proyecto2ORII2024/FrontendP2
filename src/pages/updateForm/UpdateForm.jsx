import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import {
  Info,
  inputInfo,
  createAgreementOptions,
  calcDays,
  checkDates,
  checkEventType,
  checkDirection
} from "../../utils/FormInformation.js";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/customInput/CustomInput.jsx";
import CustomSelect from "../../components/customSelect/CustomSelect.jsx";
import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import { useState, useEffect, useContext } from "react";
import { getAgreements } from "../../services/agreement.service.js";
import { updateForm, getId } from "../../services/movilidad.service.js";
import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { useNavigate } from "react-router-dom";
import DataContainer from "../../components/dataContainer/DataContainer.jsx";
import { AuthContext } from "../../context/LoginContext.jsx";
import facultyOptions from "../../utils/facultyOptions.js";

function UpdateForm() {
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

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

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

  const updateEntryDate = (e) => {
    setEntryDate(e.target.value);
  };

  const updateExitDate = (e) => {
    setExitDate(e.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { elementId } = useParams();

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
      entryDate: data.entryDate,
      exitDate: data.exitDate,
      originProgram: data.originProgram,
      destinationProgram: data.destinationProgram,
      city: data.city,
      country: data.country,
      faculty: data.faculty,
      funding: Number(data.funding),
      fundingSource: data.fundingSource,
      destination: data.destination,
      origin: data.origin,
      teacher: data.teacher ? data.teacher : "",
      agreementId: yes ? data.agreementId : null,
      event: {
        eventTypeId: Number(data.eventType),
        description: data.eventDescription,
      },

      person: {
        identificationType: data.identificationType,
        personType: data.personType,
        firstName: data.firstName,
        lastName: data.lastName,
        identification: data.personId,
      },
    };

    updateForm(formData, elementId)
      .then((res) => {
        setNotification(res.status === 200 ? "success" : "error");
        setNotiOpen(true);
        if (res.status === 200) {
          setTimeout(() => {
            navigate("/admin/movilidad");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getAgreements()
      .then((res) => {
        createAgreementOptions(res.data.content, setAgreements);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    getId(elementId)
      .then((res) => {
        console.log(res.data)
        setValue("direction", res.data.direction);
        setValue("personType", res.data.person.personType);
        setValue("identificationType", res.data.person.identificationType);
        setValue("personId", Number(res.data.person.identification));
        setValue("firstName", res.data.person.firstName);
        setValue("lastName", res.data.person.lastName);
        setValue("gender", res.data.gender);
        setValue("exitDate", res.data.exitDate);
        setValue("entryDate", res.data.entryDate);
        setValue("origin", res.data.origin);
        setValue("destination", res.data.destination);
        setValue("hasAgreement", res.data.agreement ? "Y" : "N");
        setValue(
          "agreementId",
          res.data.agreement && res.data.agreement.agreementId || ""
        );
        setValue("eventType", Number(res.data.event.eventType.eventTypeId));
        setValue("eventDescription", res.data.event.description);
        setValue("originProgram", res.data.originProgram);
        setValue("destinationProgram", res.data.destinationProgram);
        setValue("city", res.data.city);
        setValue("country", res.data.country);
        setValue("teacher", res.data.teacher ? res.data.teacher : "");
        setValue("faculty", res.data.faculty);
        setValue("funding", res.data.funding);
        setValue("fundingSource", res.data.fundingSource);

        setYes(res.data.agreement && res.data.agreement.agreementId ? true : false);

        setIsStudent(res.data.person.personType === "STUDENT");
        setIsInOrOut(checkDirection(res.data.direction));
        setIsValidETForTutor(checkEventType(res.data.event.eventType.eventTypeId));

      })
      .catch((err) => {
        console.log(err);
      });
  }, [elementId, setValue]);

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
    <AdminLayout>
      <main className="flex flex-col">
        <NotificationBox
          type={notification}
          title={
            notification === "success"
              ? "Formulario diligenciado correctamente"
              : "Error al actualizar el formulario"
          }
          open={notiOpen}
          setOpen={setNotiOpen}
        >
          {notification === "success" ? (
            <p>
              El formulario ha sido actualizado{" "}
              <span className="font-semibold">éxitosamente</span>
            </p>
          ) : (
            <p>
              Ha ocurrido un error al actualizar el convenio, por favor intente
              de nuevo
            </p>
          )}
        </NotificationBox>

        <section className="flex w-full p-5 pb-0 md:items-center flex-col md:flex-row">
          <MainButton
            text="Volver a Movilidades"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
            onClick={() => navigate("/admin/movilidad")}
          />
        </section>
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
                isInOrOut && isInOrOut === "IN" && isValidETForTutor
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
                  !(isInOrOut && isInOrOut === "IN" && isValidETForTutor)
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
      </main>
    </AdminLayout>
  );
}

export default UpdateForm;
