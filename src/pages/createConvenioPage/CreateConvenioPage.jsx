import MainButton from "../../components/buttons/MainButton";
import InfoBubble from "../../components/infoBubble/InfoBubble";
import NotificationBox from "../../components/notificationBox/NotificationBox";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { createAgreement } from "../../services/agreement.service";
function CreateConvenioPage() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    createAgreement(data).then(
      (response) => {
        console.log(response);
        setNotification(response.status === 201 ? "success" : "error");
        setOpen(true);
        reset();
      }
    )
  };

  return (
    <>
      <main>
        <NotificationBox
          type={notification}
          title={notification === "success" ? "Convenio creado" : "Error al crear convenio"}
          open={open}
          setOpen={setOpen}
        >
          {notification === "success" ? (
            <p>El convenio ha sido creado exitosamente</p>
          ) : (
            <p>Ha ocurrido un error al crear el convenio, por favor intente de nuevo</p>
          )}
        </NotificationBox>

        <h2 className="w-full mt-5 p-5 text-lg text-center">
          A continuación podrá crear un convenio, por favor verifique que la
          información ingresada es correcta e ingrese todos los campos.
        </h2>


        <section className="w-full flex justify-center">
          <form
            className="flex flex-col gap-3 w-[300px] md:w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="grid grid-cols-2 gap-5">
              <label className="flex flex-col w-full">
                <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "pais", shortInfo: "Pais"}} />
                  <p>Pais</p>
                </div>
                <input
                  id="country"
                  autoComplete="off"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="text"
                  placeholder="Pais"
                  {...register("country", { required: true })}
                />
                {errors.country && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Codigo", shortInfo: "Codigo"}} />
                  <p>Codigo</p>
                </div>
                <input id="agreementNumber"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="text"
                  placeholder="Codigo"
                  {...register("agreementNumber", { required: true })}
                />
                {errors.agreementNumber && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
            </section>
            <section className="flex">
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Institución", shortInfo: "Institución"}} />
                  <p>Institución</p>
                </div>
                <input
                  id="institution"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="text"
                  placeholder="Institución"
                  {...register("institution", { required: true })}
                />
                {errors.institution && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
            </section>
            <section className="grid grid-cols-2 gap-5">
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Fecha de inicio", shortInfo: "Fecha de inicio"}} />
                  <p>Fecha de inicio</p>
                </div>
                <input
                  id="startDate"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="date"
                  {...register("startDate", { required: true })}
                />
                {errors.startDate && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Ambito", shortInfo: "Ambito"}} />
                  <p>Ambito</p>
                </div>
                <select
                  id="scope"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  {...register("scope", { required: true })}
                >
                  <option value="NATIONAL">Nacional</option>
                  <option value="INTERNATIONAL">Internacional</option>
                </select>
                {errors.scope && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
            </section>
            <label htmlFor="description" className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Descripción", shortInfo: "Descripción"}} />
                  <p>Descripción</p>
                </div>
            </label>
            <textarea
              id="description"
              className="border-2 ml-7 border-neutral-hover outline-none p-2 rounded-md h-[120px]"
              placeholder="Descripción..."
              {...register("description", { required: true })}
            />

            {errors.description && (
              <span className="text-sm text-red-400">
                Este campo es requerido
              </span>
            )}
            <section className="flex justify-center">
              <MainButton
                type="submit"
                text="Crear Convenio"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
              />

            </section>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateConvenioPage;
