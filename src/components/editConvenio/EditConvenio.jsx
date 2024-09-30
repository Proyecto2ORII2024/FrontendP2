import FloatingContainer from "../floatingContainer/FloatingContainer";
import MainButton from "../../components/buttons/MainButton";
import InfoBubble from "../../components/infoBubble/InfoBubble";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getAgreement, updateAgreement } from "../../services/agreement.service.js";

function EditConvenio({agreementId, open, setOpen, setUpdated}) {
    const [isOpened, setIsOpened] = useState(false);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      if (open) {
        getAgreement(agreementId).then((response) => {
          const { data } = response;
          setValue("country", data.country);
          setValue("agreementNumber", data.agreementNumber);
          setValue("institution", data.institution);
          setValue("startDate", data.startDate);
          setValue("scope", data.scope);
          setValue("description", data.description);
        });
      }
      setIsOpened(open);
    }, [open, agreementId, setValue]);
    
      const onSubmit = (data) => {
        updateAgreement(data, agreementId).then((res) => {
          if (res.status === 200) {
            setIsOpened(false);
            setOpen(false);
            setUpdated("success");
          }else{
            setUpdated("error");
          }
        });
      };

  return (
    <FloatingContainer open={isOpened} setOpen={() => setOpen(false)}>
      <main>
        <h2 className="w-full mt-5 p-5 text-lg text-center">
        A continuación edite los campos que considere prudente sin dejar campos vacios.
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
                <input id="country"
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
                  <InfoBubble info={{ title: "Codigo", shortInfo: "Codigo", longInfo: "" }} />
                  <p>Codigo</p>
                </div>
                <input id="code"
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
                  <InfoBubble info={{ title: "Institución", shortInfo: "Institución", longInfo: "" }} />
                  <p>Institución</p>
                </div>
                <input id="institution"
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
                  <InfoBubble info={{ title: "Fecha de inicio", shortInfo: "Fecha de inicio", longInfo: "" }} />
                  <p>Fecha de inicio</p>
                </div>
                <input id="startDate"
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
                  <InfoBubble info={{ title: "Ambito", shortInfo: "Ambito", longInfo: "" }} />
                  <p>Ambito</p>
                </div>
                <select id="scope"
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
            <div  className="flex gap-2 items-center">
                  <InfoBubble info={{ title: "Descripción", shortInfo: "Descripción", longInfo: "" }} />
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
                text="Guardar"
                bgColor="primary"
                hoverBg="primary-light"
                textColor="white"
              />
            </section>
          </form>
        </section>
      </main>
    </FloatingContainer>
  );
}

EditConvenio.propTypes = {
    agreementId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    setUpdated: PropTypes.func.isRequired
};

export default EditConvenio;