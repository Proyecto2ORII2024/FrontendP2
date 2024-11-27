import PropTypes from "prop-types";

/**
 * Component that renders an HTML select with dynamic options, sorted alphabetically.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {Object} props.selectInfo - Information required to render the select.
 * @param {string} props.selectInfo.id - A unique identifier for the select.
 * @param {Array<{value: string|number, text: string}>} props.selectInfo.options - A list of options for the select, each with a `value` and a `text`.
 * @param {string} props.selectInfo.text - Text to display as the select's placeholder or label.
 * @returns {JSX.Element} A JSX element representing a select field with its options.
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