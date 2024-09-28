import InfoBubble from "../../components/infoBubble/InfoBubble";
import MainButton from "../../components/buttons/MainButton.jsx";
import { Info, inputInfo } from "./Information.js";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/customInput/CustomInput.jsx";
import CustomSelect from "../../components/customSelect/CustomSelect.jsx";
//import NotificationBox from "../../components/notificationBox/NotificationBox.jsx";
//import { useState } from "react";

function FormPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const errorStyle =
    "rounded-xl outline-red-400 outline outline-2 outline-offset-8";

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
    <>
      <main className="flex flex-col gap-32">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 mx-8 mt-10 md:grid-cols-2 lg:grid-cols-4 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16">
            <div>

              <Controller
                name="sentido"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomSelect
                    inputInf={{ text: "Sentido" }}
                    options={inputInfo.sentido.options}
                    value={field.value}
                    onChange={field.onChange}
                    info={Info.sentido}
                  />
                )}
              />

              {errors.sentido && (
                <span className="text-sm text-red-400">
                  Este campo es requerido
                  </span>
                  )}
            </div>

            <label
              className={`flex flex-col w-full ${
                errors.personType ? errorStyle : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.tipo} />
                <p>Tipo</p>
              </div>
              <select
                id="personType"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                {...register("personType", { required: true })}
              >
                <option value="" hidden>
                  Tipo
                </option>
                <option value="teacher">Profesor</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Administrativo">Administrativo</option>
              </select>
              {errors.personType && (
                <span className="text-sm text-red-400">
                  Este campo es requerido
                </span>
              )}
            </label>
            <label
              className={`flex flex-col w-full ${
                errors.identificationType ? errorStyle : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.tipoDocumento} />
                <p>Tipo de documento</p>
              </div>
              <select
                id="identificationType"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                {...register("identificationType", { required: true })}
              >
                <option value="" hidden>
                  Tipo de documento
                </option>
                <option value="CC">CC</option>
                <option value="PS">PASAPORTE</option>
                <option value="CE">CE</option>
                <option value="DE">DE</option>
                <option value="V">V</option>
              </select>
              {errors.identificationType && (
                <span className="text-sm text-red-400">
                  Este campo es requerido
                </span>
              )}
            </label>
            <CustomInput
              bubbleInf={Info.numID}
              inputInf={inputInfo.numID}
              register={register}
              errors={errors}
            />
            <CustomInput
              bubbleInf={Info.nombre}
              inputInf={inputInfo.name}
              register={register}
              errors={errors}
            />

            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.genero} />
                <p>Género</p>
              </div>
              <select
                id="gender"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
              >
                <option value="" hidden>
                  Género
                </option>
                <option value="O">Otro</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.fechaSalida} />
                <p>Fecha de salida</p>
              </div>
              <input
                id="outDate"
                autoComplete="off"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                type="date"
                placeholder="Fecha de salida"
              />
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.fechaEntrada} />
                <p>Fecha de entrada</p>
              </div>
              <input
                id="inDate"
                autoComplete="off"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                type="date"
                placeholder="Fecha de entrada"
              />
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.diasEstancia} />
                <p>Días de estancia</p>
              </div>
              <p className="py-1 border-b-2 outline-none ml-7 border-neutral-hover">
                Días de estancia
              </p>
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.anio} />
                <p>Año</p>
              </div>
              <p className="py-1 border-b-2 outline-none ml-7 border-neutral-hover">
                Año
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
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.convenio} />
                <p>¿Existe convenio?</p>
              </div>
              <select
                id="docType"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
              >
                <option value="N">No</option>
                <option value="Y">Sí</option>
              </select>
            </label>
            <CustomInput
              bubbleInf={Info.numConvenio}
              inputInf={inputInfo.numConvenio}
              errors={errors}
              register={register}
            />
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.tipoEvento} />
                <p>Tipo de evento</p>
              </div>
              <input
                id="eventType"
                autoComplete="off"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                type="text"
                placeholder="Evento"
              />
            </label>
            <label className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <InfoBubble info={Info.descEvento} />
                <p>Descripción del evento</p>
              </div>
              <input
                id="eventDesc"
                autoComplete="off"
                className="py-1 border-b-2 outline-none ml-7 border-neutral-hover"
                type="text"
                placeholder="Descripción del evento"
              />
            </label>
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
