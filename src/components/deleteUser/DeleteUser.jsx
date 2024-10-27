import FloatingContainer from "../floatingContainer/FloatingContainer";
import MainButton from "../buttons/MainButton";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function DeleteUser({ open, setOpen, userId, setDeleted, handleDelete }) {
    const [isOpened, setIsOpened] = useState(false);

    const onSubmit = () => {
        setIsOpened(false);
        setOpen(false);
        setDeleted('success');
        handleDelete(userId);
    }

    useEffect(() => {
        setIsOpened(open);
    }, [open, userId]);

    return (
        <FloatingContainer open={isOpened} setOpen={() => setOpen(false)}>
            <div>
                <h2 className="w-full font-semibold text-2xl p-5 text-center">
                    ¿Desea eliminar este usuario?
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

DeleteUser.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    setDeleted: PropTypes.func.isRequired,
};

export default DeleteUser;
