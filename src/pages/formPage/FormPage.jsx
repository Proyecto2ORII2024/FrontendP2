import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import {
  Info,
  inputInfo,
  createAgreementOptions,
  calcDays,
  checkDirection,
} from "./Information.js";
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
  const [yes, setYes] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isInOrOut, setIsInOrOut] = useState("");
  const [notification, setNotification] = useState("");
  const [notiOpen, setNotiOpen] = useState(false);

  const updateEntryDate = (e) => {
    setEntryDate(e.target.value);
  };

  const updateExitDate = (e) => {
    setExitDate(e.target.value);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const saveLocalStorage = (object) =>{
    // Verifica si ya existe el valor en sessionStorage
    const existingData = sessionStorage.getItem('movility');

    // Si no existe, crea un nuevo array con el nuevo valor
    if (!existingData) {
      sessionStorage.setItem('movility', JSON.stringify([object]));
    } else {
      // Si existe, obtiene el array, le hace push al nuevo valor y lo guarda de nuevo
      const dataArray = JSON.parse(existingData);
      dataArray.push(object);
      sessionStorage.setItem('movility', JSON.stringify(dataArray));
    }
  }

  const returnMov = () =>{
    return JSON.parse(sessionStorage.getItem('movility')) || [];
  }

  const onSubmit = (data) => {
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
      agreementId : yes ? data.agreementId : 1,
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

    if (yes) {
      formData = { ...formData, agreementId: data.agreementId };
    }
    if (isStudent) {
      formData = { ...formData, teacher: data.teacher };
    }

    createForm(formData)
      .then((res) => {
        if(res.status === 201) {
          saveLocalStorage(formData)
          setDays(0);
          reset();
        };
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
        createAgreementOptions(res.data.content, setAgreements);
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
      <main className="flex flex-col gap-10 pb-10">
        <NotificationBox
          type={notification}
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
          ) : (
            <p>Ha ocurrido un error al enviar el formulario</p>
          )}
        </NotificationBox>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 mx-8 mt-10 md:grid-cols-2 lg:grid-cols-4 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16">
            <div>
              <Controller
                name={inputInfo.sentido.id}
                control={control}
                defaultValue=""
                rules={{
                  required: inputInfo.sentido.required,
                  onChange: (e) => setIsInOrOut(checkDirection(e.target.value)),
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

            {isInOrOut === "OUT" && (
              <label
                className={`flex flex-col w-full ${
                  isInOrOut === "" ? "opacity-40 -z-50" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <InfoBubble info={Info.fechaSalida} />
                  <p>Fecha de salida</p>
                </div>
                <input
                  id="exitDate"
                  autoComplete="off"
                  className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                  type="date"
                  placeholder="Fecha de salida"
                  {...register("exitDate", {
                    required: true,
                    onChange: updateExitDate,
                  })}
                />
                {errors.exitDate && (
                  <span className="text-sm text-red-400 border-b-2 w-fit border-b-red-400 ml-7">
                    Este campo es requerido
                  </span>
                )}
              </label>
            )}

            {isInOrOut === "OUT" && (
              <label className={`flex flex-col w-full`}>
                <div className="flex items-center gap-2">
                  <InfoBubble info={Info.fechaEntrada} />
                  <p>Fecha de entrada</p>
                </div>
                <input
                  id="entryDate"
                  autoComplete="off"
                  className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                  type="date"
                  placeholder="Fecha de entrada"
                  {...register("entryDate", {
                    required: true,
                    onChange: updateEntryDate,
                  })}
                />
                {errors.entryDate && (
                  <span className="text-sm text-red-400 border-b-2 w-fit border-b-red-400 ml-7">
                    Este campo es requerido
                  </span>
                )}
              </label>
            )}

            {(isInOrOut === "" || isInOrOut === "IN") && (
              <label
                className={`flex flex-col w-full ${
                  isInOrOut === "" ? "opacity-40 -z-50" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <InfoBubble info={Info.fechaEntrada} />
                  <p>Fecha de entrada</p>
                </div>
                <input
                  id="entryDate"
                  autoComplete="off"
                  disabled={isInOrOut === ""}
                  className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                  type="date"
                  placeholder="Fecha de entrada"
                  {...register("entryDate", {
                    required: true,
                    onChange: updateEntryDate,
                  })}
                />
                {errors.entryDate && (
                  <span className="text-sm text-red-400 border-b-2 w-fit border-b-red-400 ml-7">
                    Este campo es requerido
                  </span>
                )}
              </label>
            )}

            {(isInOrOut === "" || isInOrOut === "IN") && (
              <label
                className={`flex flex-col w-full ${
                  isInOrOut === "" ? "opacity-40 -z-50" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <InfoBubble info={Info.fechaSalida} />
                  <p>Fecha de salida</p>
                </div>
                <input
                  id="exitDate"
                  autoComplete="off"
                  disabled={isInOrOut === ""}
                  className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                  type="date"
                  placeholder="Fecha de salida"
                  {...register("exitDate", {
                    required: true,
                    onChange: updateExitDate,
                  })}
                />
                {errors.exitDate && (
                  <span className="text-sm text-red-400 border-b-2 w-fit border-b-red-400 ml-7">
                    Este campo es requerido
                  </span>
                )}
              </label>
            )}

            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.diasEstancia} />
                <p>Días de estancia</p>
              </div>
              <p className="py-1 border-b-2 outline-none ml-7 border-neutral-hover">
                {days}
              </p>
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.anio} />
                <p>Año</p>
              </div>
              <p className="py-1 border-b-2 outline-none ml-7 border-neutral-hover">
                {new Date().getFullYear()}{" "}
                {/**Verificar la forma de enviarlo al backend */}
              </p>
            </label>

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
                    inputInf={inputInfo.numConvenio}
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

            <CustomInput
              bubbleInf={Info.ciudad}
              inputInf={inputInfo.ciudad}
              errors={errors}
              register={register}
            />

            <CustomInput
              bubbleInf={Info.pais}
              inputInf={inputInfo.pais}
              errors={errors}
              register={register}
            />

            <div className={`${isStudent ? "" : "opacity-40 -z-50"}`}>
              <CustomInput
                bubbleInf={Info.profPres}
                inputInf={inputInfo.profPres}
                errors={errors}
                register={register}
                isDisable={!isStudent}
              />
            </div>

            <CustomInput
              bubbleInf={Info.facultad}
              inputInf={inputInfo.facultad}
              errors={errors}
              register={register}
            />

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
          </section>
          <div className="mx-auto mt-10">
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
                <th className="w-1/5 px-4 py-3 font-semibold text-center text-primary-dark" >
                  Facultad
                </th>
                <th className="w-1/5 px-4 py-3 font-semibold text-center text-primary-dark" >
                  Codigo de Convenio
                </th>
                <th className="px-4 py-3 font-semibold text-center text-primary-dark w-[15%]" >
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
                    <td className="px-4 py-2"><span className="font-bold md:hidden">Facultad: </span>{item.faculty}</td>
                    <td className="px-4 py-2"><span className="font-bold md:hidden">Código de convenio: </span>{item.agreementId || "N/A" }</td>
                    <td className="px-4 py-2"><span className="font-bold md:hidden">Tipo de ID: </span>{item.person.identificationType}</td>
                    <td className="px-4 py-2"><span className="font-bold md:hidden">Número de ID: </span>{item.person.identification}</td>
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
