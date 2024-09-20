import MainButton from "../../components/buttons/MainButton";
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

        <section className="w-full flex items-center flex-col">
          <form className="flex flex-col gap-3 w-[300px] md:w-[450px]" onSubmit={handleSubmit(onSubmit)}>
            <section className="grid grid-cols-2 gap-5">
              <label className="flex flex-col w-full">
                Pais
                <input className="border-b-2 border-neutral-hover outline-none py-1" type="text" placeholder="Pais" {...register("pais", { required: true })}/>
                
              {errors.pais && <span className="text-sm text-red-400">Este campo es requerido</span>}
              </label>
              <label className="flex flex-col w-full">
                Codigo
                <input className="border-b-2 border-neutral-hover outline-none py-1" type="text" placeholder="Codigo" {...register("codigo", { required: true })}/>
                
              {errors.codigo && <span className="text-sm text-red-400">Este campo es requerido</span>}
              </label>
            </section>
            <section className="flex">
              <label className="flex flex-col w-full">
                Institución
                <input className="border-b-2 border-neutral-hover outline-none py-1" type="text" placeholder="Institución" {...register("institucion", { required: true })}/>
                
              {errors.institucion && <span className="text-sm text-red-400">Este campo es requerido</span>}
              </label>
            </section>
            <section className="grid grid-cols-2 gap-5">
              <label className="flex flex-col w-full">
                Fecha de inicio
                <input className="border-b-2 border-neutral-hover outline-none py-1" type="date" {...register("fechaInicio", { required: true })}/>
                
              {errors.fechaInicio && <span className="text-sm text-red-400">Este campo es requerido</span>}
              </label>
              <label className="flex flex-col w-full">
                Ámbito
                <select className="border-b-2 border-neutral-hover w-full outline-none py-1" name="" id="" {...register("ambito", { required: true })}>
                  <option value="Nacional">Nacional</option>
                  <option value="Internacional">Internacional</option>
                </select>
                
              {errors.ambito && <span className="text-sm text-red-400">Este campo es requerido</span>}
              </label>
            </section>
            <label className="flex flex-col w-full pl-2">Descripción</label>
            <textarea className="border-2 border-neutral-hover outline-none p-2 rounded-md h-[120px]" placeholder="Descripción..." {...register("descripcion", { required: true })}/>
            
            {errors.descripcion && <span className="text-sm text-red-400">Este campo es requerido</span>}
            <section className="flex justify-center">
            <MainButton type="submit" text="Crear Convenio" bgColor="primary" hoverBg="primary-light" textColor="white" />
            </section>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateConvenioPage;
