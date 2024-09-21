import FloatingContainer from "../floatingContainer/FloatingContainer";
import MainButton from "../../components/buttons/MainButton";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function DeleteConvenio({ open, setOpen, agreementId }) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    console.log(agreementId);
    setIsOpened(open);
  }, [open, agreementId]);

  return (
    <FloatingContainer open={isOpened} setOpen={() => setOpen(false)}>
      <div>
        <h2 className="w-full font-semibold text-2xl p-5 text-center">
          ¿Desea eliminar el convenio?
        </h2>
        <section className="w-full flex justify-center gap-4">
          <MainButton
            text="Cancelar"
            bgColor="primary-dark"
            hoverBg="primary-light"
            textColor="white"
            onClick={() => setOpen(false)}
          />

          <MainButton
            text="Aceptar"
            bgColor="primary"
            hoverBg="primary-light"
            textColor="white"
          />
        </section>
      </div>
    </FloatingContainer>
  );
}

DeleteConvenio.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  agreementId: PropTypes.string,
};

export default DeleteConvenio;
