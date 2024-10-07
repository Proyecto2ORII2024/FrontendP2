import FloatingContainer from "../floatingContainer/FloatingContainer.jsx";
import MainButton from "../buttons/MainButton.jsx";
import InfoBubble from "../infoBubble/InfoBubble.jsx";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { updateAgreement } from "../../services/agreement.service.js";

import { formatDateToYYYYMMDD, formatDateToDDMMYYYY } from "../../utils/Date.js";

function EditAgreement({agreement, open, setOpen, setUpdated}) {
    const [isOpened, setIsOpened] = useState(false);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      if (open) {
        setValue("country", agreement.country);
        setValue("agreementNumber", agreement.agreementNumber);
        setValue("institution", agreement.institution);
        setValue("startDate", formatDateToYYYYMMDD(agreement.startDate));
        setValue("scope", agreement.scope);
        setValue("description", agreement.description);
      }
      setIsOpened(open);
    }, [open, setValue, agreement]);
    
      const onSubmit = (data) => {
        data.startDate = formatDateToDDMMYYYY(data.startDate);
        updateAgreement(data, agreement.agreementId).then((res) => {
          if (res.status === 200) {
            setIsOpened(false);
            setOpen(false);
            setUpdated("success");
          }else{
            setUpdated("error");
          }
        }).catch((error) => {
          console.log(error);
          setUpdated("error");
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
                  {...register("country", { required: true, pattern: { value: /^[A-Za-zÑñÁÉÍÓÚáéíóúÜü\s]+$/, message: "El pais solo puede contener letras" } })}
                />
                {errors.country && (
                  <span className="text-sm text-red-400">
                    {errors.country.message}
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
                  {...register("agreementNumber", { required: true, pattern: { value: /^[0-9.-]+$/, message: "El codigo solo puede contener numeros y (. -)" }, minLength: {
                    value: 4,
                    message: "El codigo debe tener al menos 4 caracteres"
                  } })}
                />
                {errors.agreementNumber && (
                  <span className="text-sm text-red-400">
                    {errors.agreementNumber.message}
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
                  {...register("institution", { required: true, pattern: { value: /^[A-Za-zÑñÁÉÍÓÚáéíóúÜü\s]+$/, message: "la institución solo puede contener letras" }  })}
                />
                {errors.institution && (
                  <span className="text-sm text-red-400">
                    {errors.institution.message}
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

EditAgreement.propTypes = {
    agreement: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    setUpdated: PropTypes.func.isRequired
};

export default EditAgreement;