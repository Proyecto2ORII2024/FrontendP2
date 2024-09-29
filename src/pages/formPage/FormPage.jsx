import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import { Info, inputInfo } from "./Information.js";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/customInput/CustomInput.jsx";
import CustomSelect from "../../components/customSelect/CustomSelect.jsx";
//import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
import { useState, useEffect } from "react";
import { createForm } from "../../services/form.service.js";

function FormPage() {
  const [days, setDays] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");

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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      orii: true,
      direction: data.direction,
      gender: data.gender,
      cta: 0,
      entryDate: data.entryDate,
      exitDate: data.exitDate,
      originProgram: data.originProgram,
      destinationProgram: data.destinationProgram,
      city: data.city,
      country: data.country,
      teacher: data.teacher,
      faculty: data.faculty,
      funding: Number(data.funding),
      fundingSource: data.fundingSource,
      destination: data.destination,
      origin: data.origin,
      agreementId: data.agreementId,
      event: {
        description: data.eventDescription,
        eventTypeId: data.eventType,
      },
      person: {
        identificationType: data.identificationType,
        personType: data.personType,
        firstName: "",
        lastName: "",
        identification: data.personId,
        email: "",
      },
    };

    createForm(formData).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.response.data);
    });
  };

  function calcDays(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const diferenciaMilisegundos = fin - inicio;

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = diferenciaMilisegundos / milisegundosPorDia;

    return Math.abs(Math.floor(diferenciaDias)); // Redondear al número de días
  }

  useEffect(() => {
    if (entryDate && exitDate) {
      setDays(calcDays(entryDate, exitDate));
    }
  }, [entryDate, exitDate]);

  //const [openNoti, setOpenNoti] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-32">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 mx-8 mt-10 md:grid-cols-2 lg:grid-cols-4 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16">
            <div>
              <Controller
                name={inputInfo.sentido.id}
                control={control}
                defaultValue=""
                rules={{ required: inputInfo.sentido.required }}
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
                rules={{ required: inputInfo.tipo.required }}
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

            <label className="flex flex-col w-full">
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
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </label>
            <label className="flex flex-col w-full">
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
                <span className="text-sm text-red-400 border-b-2 border-b-red-400 ml-7">
                  Este campo es requerido
                </span>
              )}
            </label>

            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.diasEstancia} />
                <p>Días de estancia</p>
              </div>
              <p className="py-1 border-b-2 outline-none ml-7 border-neutral-hover">
                {days ? days : "Días de estancia"}
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
                rules={{ required: inputInfo.convenio.required }}
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

            <CustomInput
              bubbleInf={Info.numConvenio}
              inputInf={inputInfo.numConvenio}
              errors={errors}
              register={register}
            />

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
            <CustomInput
              bubbleInf={Info.profPres}
              inputInf={inputInfo.profPres}
              errors={errors}
              register={register}
            />
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
          <div className="mx-auto my-10">
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
    </>
  );
}

export default FormPage;
