import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from "prop-types";

function CustomInput({ bubbleInf, inputInf, register, errors }) {

  return (
    <label className={`"flex flex-col`}>
      <div className="flex gap-2 items-center">
        <InfoBubble info={bubbleInf} />
        <p>{inputInf.text}</p>
      </div>
      <input
        id={inputInf.id}
        autoComplete="off"
        className="border-b-2 ml-7 border-neutral-hover outline-none py-1 w-11/12"
        type={inputInf.type}
        placeholder={inputInf.text}
        {...register(inputInf.id, { required: inputInf.required })}
      />
      {errors[inputInf.id] && (
        <span className="text-red-400 text-sm ml-7 border-b-2 border-red-400">Este campo es requerido</span>
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
  }).isRequired,
  register: PropTypes.func.isRequired, // register como prop
  errors: PropTypes.object.isRequired, // errores como prop
};
