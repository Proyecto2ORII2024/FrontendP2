import PropTypes from "prop-types";

/**
 * Componente que renderiza un select HTML con opciones dinámicas, ordenadas alfabéticamente.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.selectInfo - Información necesaria para renderizar el select.
 * @param {string} props.selectInfo.id - Identificador único para el select.
 * @param {Array<{value: string|number, text: string}>} props.selectInfo.options - Lista de opciones para el select, cada una con un `value` y un `text`.
 * @param {string} props.selectInfo.text - Texto que se muestra como placeholder o etiqueta del select.
 * @returns {JSX.Element} Un elemento JSX que representa un campo select con sus opciones.
 */
function SimpleSelect({selectInfo}){

    const options = selectInfo.options.sort((a, b) => a.text.localeCompare(b.text));

    return(
        <label className="w-11/12">
            <select className="w-full border-b-2" id={selectInfo.id} defaultValue="">
                <option value="" disabled hidden>{selectInfo.text}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SimpleSelect;

SimpleSelect.propTypes = {
    selectInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        text: PropTypes.string.isRequired,
    })
}