import FloatingContainer from "../floatingContainer/FloatingContainer";
import MainButton from "../buttons/MainButton";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { deleteAgreement } from "../../services/agreement.service";

function DeleteAgreement({ open, setOpen, agreementId, setDeleted }) {
  const [isOpened, setIsOpened] = useState(false);

  const onSubmit = () => {
    deleteAgreement(agreementId).then((res) => {
      console.log(res)
      if (res.status === 204){
        setIsOpened(false);
        setOpen(false);
        setDeleted('success');
      }else{
        setDeleted('error');}
    }).catch((error) => {
      console.log(error);
      setDeleted('error');
  });
  }

  useEffect(() => {
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
            onClick={onSubmit}
          />
        </section>
      </div>
    </FloatingContainer>
  );
}

DeleteAgreement.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  agreementId: PropTypes.string.isRequired,
  setDeleted: PropTypes.func.isRequired,
};

export default DeleteAgreement;
