import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from "prop-types";

/**
 * Form input component that includes a text field, an informational tooltip, and validation error handling.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {Object} props.bubbleInf - Information to be displayed in the `InfoBubble` component.
 * @param {string} props.bubbleInf.title - The title of the tooltip.
 * @param {string} [props.bubbleInf.shortInfo] - Short information to display in the tooltip.
 * @param {Object} [props.bubbleInf.longInfo] - Detailed information, including text and list options for the tooltip.
 * @param {Object} props.inputInf - Information about the input field.
 * @param {string} props.inputInf.id - Unique ID of the input field.
 * @param {string} props.inputInf.text - Label for the input field.
 * @param {string} props.inputInf.type - The type of the input field (e.g., "text", "email", "password").
 * @param {boolean} props.inputInf.required - Indicates if the field is required.
 * @param {string|RegExp} [props.inputInf.pattern] - Regular expression or pattern to validate the field's value.
 * @param {string} [props.inputInf.message] - Custom error message for pattern validation.
 * @param {Function} props.register - The `react-hook-form` register function to bind the input to the form.
 * @param {Object} props.errors - The validation error object generated by `react-hook-form`.
 * @param {boolean} [props.isDisable=false] - Determines whether the input field is disabled.
 * @returns {JSX.Element} The form input component with validation and informational tooltip.
 */
function CustomInput({ bubbleInf, inputInf, register, errors, isDisable = false }) {

  return (
    <label className={`"flex flex-col`}>
      <div className="flex items-center gap-2">
        <InfoBubble info={bubbleInf} />
        <p>{inputInf.text}</p>
        {inputInf.required && <span className="text-xl font-semibold text-red-400">*</span>}
      </div>
      <input
        id={inputInf.id}
        autoComplete="off"
        disabled = {isDisable}
        className="w-11/12 py-1 border-b-2 outline-none ml-7 border-neutral-hover"
        type={inputInf.type}
        placeholder={inputInf.text}
        {...register(inputInf.id, { required: inputInf.required, pattern: inputInf.pattern ? { value: inputInf.pattern, message: inputInf.message || 'Formato inválido'} : undefined,})}
      />
      {errors[inputInf.id] && (
        <span className="text-sm text-justify text-red-400 border-b-2 border-red-400 ml-7">{errors[inputInf.id].message || 'Este campo es requerido'}</span>
      )}
    </label>
  );
}

export default CustomInput;

CustomInput.propTypes = {
  bubbleInf: PropTypes.shape({
    title: PropTypes.string.isRequired,
    shortInfo: PropTypes.string,
    longInfo: PropTypes.shape({
      text: PropTypes.array,
      list: PropTypes.object,
    }),
  }).isRequired,
  inputInf: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    pattern: PropTypes.oneOfType([
      PropTypes.string,   
      PropTypes.instanceOf(RegExp) 
    ]),
    message: PropTypes.string,
  }).isRequired,
  register: PropTypes.func.isRequired, // register as prop
  errors: PropTypes.object.isRequired, // errors as prop
  isDisable: PropTypes.bool,
};
