import InfoBubble from "../infoBubble/InfoBubble";
import PropTypes from "prop-types";
import arrow from '../../assets/icons/arrowIcon.svg'
import { useState } from "react";

function CustomSelect({bubbleInf, inputInf, errors, register, options}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  return (
    <label className="relative w-11/12">
      <div className="flex items-center gap-2">
        <InfoBubble info={bubbleInf}/>
        <p>{inputInf.text}</p>
      </div>
      <article className='relative flex items-center w-full py-1 border-b-2 ml-7 border-neutral-hover' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <input type="text" hidden value={inputValue} id={inputInf.id}
          {...register(inputInf.id, { required: inputInf.required })}
        />
        <input
          type="search"
          id="srch"
          className={`w-11/12 outline-none ${inputValue ? 'placeholder:text-black': 'placeholder:text-gray-500'}`}
          autoComplete="off"
          onChange={(e) =>{ setSearchValue(e.target.value.toLowerCase()); setIsMenuOpen(true) }}
          placeholder={inputValue ? options[inputValue] : inputInf.text}
          {...register("srch", {
            shouldUnregister: true,
          })}
        />
        <button
          type="button"
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 size-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src={arrow} />
        </button>
      </article>
      {isMenuOpen && (
          <ul className="absolute w-full overflow-auto bg-white border-2 rounded-lg ml-7 border-primary-dark max-h-60 scrollbar-webkit">
          {Object.entries(options).map(([key, value]) => (
            <li key={key} className={`p-2 duration-150 cursor-pointer hover:bg-grays ${value.toLowerCase().includes(searchValue) ? "block" : "hidden"} ${inputValue === key ? 'bg-grays-dark': ''}`}
              onClick={() => {
                setInputValue(key);
                setSearchValue("");
              }}
            >
              {value}
            </li>
          ))}
          </ul>
        )
      }
      {errors[inputInf.id] && (
        <span className="text-sm text-red-400 border-b-2 border-red-400 ml-7">
          Escoja una opción
        </span>
      )}
    </label>
  );
}

export default CustomSelect;

CustomSelect.propTypes = {
  bubbleInf: PropTypes.shape({
    title: PropTypes.string.isRequired,
    shortInfo: PropTypes.string,
    longInfo: PropTypes.shape({
      text: PropTypes.array,
      list: PropTypes.object,
    }),
  }).isRequired,
  inputInf: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    required: PropTypes.bool,
  }),
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};