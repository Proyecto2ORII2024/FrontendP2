import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from 'prop-types';

/**
 * Component that displays a mobility field with a title, an informational icon, and dynamic data.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {Object} props.bblInf - Information passed to the `InfoBubble` component.
 * @param {string} props.title - The title describing the mobility field.
 * @param {string} props.data - The data to be displayed within the field.
 * @returns {JSX.Element} A JSX element representing the mobility field with a title and data.
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