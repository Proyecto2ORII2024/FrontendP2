import { useState } from "react";
import PropTypes from "prop-types";
import arrow from "../../assets/icons/arrow.svg";

const Accordeon = ({title, children}) =>{
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return(
        <article className={`${open ? "mb-2": ""} px-5 lg:px-20 `}>
            <button className={`flex bg-[#928F9A] justify-between items-center text-lg w-full hover:bg-[#838286] duration-150 p-3 border-b-2`} onClick={handleOpen} aria-expanded={open} aria-controls="accordion-contenido">
                <h2 className="font-bold">{title}</h2>
                <img src={arrow} className={`md:text-lg transition-all duration-300 ${open ? 'rotate-180':''}`}/>
            </button>
            <div className={`overflow-hidden pt-5 ${open ? 'max-h-full' : 'max-h-0'}`}>
                {children}
            </div>
        </article>
    );
}

export default Accordeon;

Accordeon.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}