import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from "prop-types";

/**
 * Componente de entrada de formulario que incluye un campo de texto, un tooltip informativo y manejo de errores de validación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.bubbleInf - Información para mostrar en el componente `InfoBubble`.
 * @param {string} props.bubbleInf.title - Título del tooltip.
 * @param {string} [props.bubbleInf.shortInfo] - Información corta para mostrar en el tooltip.
 * @param {Object} [props.bubbleInf.longInfo] - Información larga, con opciones de texto y lista para el tooltip.
 * @param {Object} props.inputInf - Información sobre el campo de entrada.
 * @param {string} props.inputInf.id - ID único del campo de entrada.
 * @param {string} props.inputInf.text - Etiqueta del campo de entrada.
 * @param {string} props.inputInf.type - Tipo del campo de entrada (ej. "text", "email", "password").
 * @param {boolean} props.inputInf.required - Indica si el campo es obligatorio.
 * @param {string|RegExp} [props.inputInf.pattern] - Expresión regular o patrón para validar el valor del campo.
 * @param {string} [props.inputInf.message] - Mensaje de error personalizado para la validación del patrón.
 * @param {Function} props.register - Función de registro de `react-hook-form` para vincular el input al formulario.
 * @param {Object} props.errors - Objeto de errores de validación generados por `react-hook-form`.
 * @param {boolean} [props.isDisable=false] - Determina si el campo de entrada está deshabilitado.
 * @returns {JSX.Element} El componente de entrada de formulario con validación y tooltip informativo.
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
      PropTypes.string,   // Permite una cadena de texto (para HTML pattern)
      PropTypes.instanceOf(RegExp) // Permite una expresión regular (RegExp)
    ]),
    message: PropTypes.string,
  }).isRequired,
  register: PropTypes.func.isRequired, // register como prop
  errors: PropTypes.object.isRequired, // errores como prop
  isDisable: PropTypes.bool,
};
