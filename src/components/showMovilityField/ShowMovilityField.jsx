import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from 'prop-types';

/**
 * Componente que muestra un campo de movilidad con un título, un ícono informativo, y datos dinámicos.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.bblInf - Información que se pasa al componente `InfoBubble`.
 * @param {string} props.title - Título que describe el campo de movilidad.
 * @param {string} props.data - Datos que se mostrarán dentro del campo.
 * @returns {JSX.Element} Un elemento JSX que representa el campo de movilidad con título y datos.
 */
function showMovilityField({ bblInf, title, data }) {
    return(
        <article className="flex flex-col">
            <div className="flex items-center w-full gap-2">
                <InfoBubble info={bblInf} />
                <p>{title}</p>
            </div>
            <p className="w-11/12 py-1 break-words border-b-2 outline-none ml-7 border-neutral-hover">
                {data}
            </p>
        </article>
    )
}

export default showMovilityField;

showMovilityField.propTypes = {
    bblInf: PropTypes.object,
    title: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
}