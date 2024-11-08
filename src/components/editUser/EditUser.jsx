import FloatingContainer from "../floatingContainer/FloatingContainer.jsx";
import MainButton from "../buttons/MainButton.jsx";
import InfoBubble from "../infoBubble/InfoBubble.jsx";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function EditUser({ user, open, setOpen, setUpdated, updateData }) {
    const [isOpened, setIsOpened] = useState(false);
    const oriRol = user.rol;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const role = [
        'ADMIN',
        'USER'
    ];

    const faculties = [
        'FIET',
        'FIC',
        'FACNED'
    ]

    useEffect(() => {
        if (open) {
            setValue("correo", user.email);
            setValue("role", user.role);
            setValue("faculty", user.faculty);
        }
        setIsOpened(open);
    }, [open, setValue, user]);

    const onSubmit = (data) => {
        setIsOpened(false);
        setOpen(false);
        setUpdated("success");
        updateData(user.userId, data);
        console.log(data);
    };

    return (
        <FloatingContainer open={isOpened} setOpen={() => setOpen(false)}>
            <main>
                <h2 className="w-full mt-5 p-5 text-lg text-center">
                    Se puede modificar el correo o la contraseña o ambos.
                </h2>

                <section className="w-full flex justify-center">
                    <form
                        className="flex flex-col gap-3 w-[300px] md:w-[500px]"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <section className="flex">
                            <label className="flex flex-col w-full">
                                <div className="flex gap-2 items-center">
                                    <InfoBubble info={{ title: "Correo", shortInfo: "Correo" }} />
                                    <p>Correo</p>
                                </div>
                                <input id="correo"
                                    className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                                    type="text"
                                    placeholder="Correo"
                                    disabled
                                    {...register("correo", {
                                        required: true, pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Correo no valido",
                                        },
                                    })} />
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
                                    <InfoBubble info={{ title: "Correo", shortInfo: "Correo" }} />
                                    <p>Rol</p>
                                </div>
                                <select id="rol"
                                    className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                                    type="text"
                                    placeholder="role"
                                    {...register("role", {
                                        required: true,
                                    })}>
                                    {role.map((role, index) => (
                                        <option key={index} value={role}>{role}</option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <span className="text-sm text-red-400">
                                        {errors.role.message}
                                    </span>

                                )}
                            </label>
                            <label className="flex flex-col w-full">
                                <div className="flex gap-2 items-center">
                                    <InfoBubble info={{ title: "Correo", shortInfo: "Correo" }} />
                                    <p>Facultad</p>
                                </div>
                                <select id="faculty"
                                    className="border-b-2 ml-7 border-neutral-hover outline-none py-1"
                                    type="text"
                                    placeholder="Facultad"
                                    {...register("faculty", {
                                        required: true,
                                    })}>
                                    {faculties.map((faculty, index) => (
                                        <option key={index} value={faculty}>{faculty}</option>
                                    ))}
                                </select>
                                {errors.faculty && (
                                    <span className="text-sm text-red-400">
                                        {errors.faculty.message}
                                    </span>

                                )}
                            </label>
                        </section>
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

EditUser.propTypes = {
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    setUpdated: PropTypes.func.isRequired
};

export default EditUser;