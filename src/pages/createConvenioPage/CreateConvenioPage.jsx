import MainButton from "../../components/buttons/MainButton";
import InfoBubble from "../../components/infoBubble/InfoBubble";
import { useForm } from "react-hook-form";
function CreateConvenioPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <main>
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
                  <InfoBubble info={{ title: "pais", shortInfo: "Pais", longInfo: "" }} />
                  <p>Pais</p>
                </div>
                <input
                  id="country"
                  autoComplete="off"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="text"
                  placeholder="Pais"
                  {...register("pais", { required: true })}
                />
                {errors.pais && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Codigo", shortInfo: "Codigo", longInfo: "" }} />
                  <p>Codigo</p>
                </div>
                <input id="code"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="text"
                  placeholder="Codigo"
                  {...register("codigo", { required: true })}
                />
                {errors.codigo && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
            </section>
            <section className="flex">
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Institución", shortInfo: "Institución", longInfo: "" }} />
                  <p>Institución</p>
                </div>
                <input
                  id="institution"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="text"
                  placeholder="Institución"
                  {...register("institucion", { required: true })}
                />
                {errors.institucion && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
            </section>
            <section className="grid grid-cols-2 gap-5">
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Fecha de inicio", shortInfo: "Fecha de inicio", longInfo: "" }} />
                  <p>Fecha de inicio</p>
                </div>
                <input
                  id="startDate"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  type="date"
                  {...register("fechaInicio", { required: true })}
                />
                {errors.fechaInicio && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
              <label className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Ambito", shortInfo: "Ambito", longInfo: "" }} />
                  <p>Ambito</p>
                </div>
                <select
                  id="scope"
                  className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                  {...register("ambito", { required: true })}
                >
                  <option value="Nacional">Nacional</option>
                  <option value="Internacional">Internacional</option>
                </select>
                {errors.ambito && (
                  <span className="text-sm text-red-400">
                    Este campo es requerido
                  </span>
                )}
              </label>
            </section>
            <label htmlFor="description" className="flex flex-col w-full">
            <div className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Descripción", shortInfo: "Descripción", longInfo: "" }} />
                  <p>Descripción</p>
                </div>
            </label>
            <textarea
              id="description"
              className="border-2 ml-7 border-neutral-hover outline-none p-2 rounded-md h-[120px]"
              placeholder="Descripción..."
              {...register("descripcion", { required: true })}
            />

            {errors.descripcion && (
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
