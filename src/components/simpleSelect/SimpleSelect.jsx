import PropTypes from "prop-types";

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