import { useState } from "react";
import PropTypes from "prop-types";
import arrow from "../../assets/icons/arrowIcon.svg";

/**
 * Accordeon component that displays a collapsible section with a title and content.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the accordion.
 * @param {React.ReactNode} props.children - The content to be displayed inside the accordion.
 *
 * @returns {JSX.Element} The rendered accordion component.
 */
const Accordeon = ({title, children}) =>{
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return(
        <article className={`${open ? "mb-2": ""} px-5 lg:px-20 `}>
            <button className={`flex bg-neutral-200 justify-between items-center text-lg w-full hover:bg-neutral-300 duration-150 p-3 border-b-2`} onClick={handleOpen} aria-expanded={open} aria-controls="accordion-contenido">
                <h2 className="font-bold">{title}</h2>
                <img src={arrow} alt="arrow" className={`md:text-lg transition-all duration-300 ${open ? 'rotate-180':''}`}/>
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