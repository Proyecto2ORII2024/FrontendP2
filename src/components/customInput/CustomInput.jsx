import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from "prop-types";

function CustomInput({ bubbleInf, inputInf, register, errors }) {

  return (
    <label className={`"flex flex-col`}>
      <div className="flex items-center gap-2">
        <InfoBubble info={bubbleInf} />
        <p>{inputInf.text}</p>
      </div>
      <input
        id={inputInf.id}
        autoComplete="off"
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
      PropTypes.string,   // Permite una cadena de texto (para HTML pattern)
      PropTypes.instanceOf(RegExp) // Permite una expresión regular (RegExp)
    ]),
    message: PropTypes.string,
  }).isRequired,
  register: PropTypes.func.isRequired, // register como prop
  errors: PropTypes.object.isRequired, // errores como prop
};
