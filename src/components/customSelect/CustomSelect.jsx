import PropTypes from "prop-types";
import arrow from "../../assets/icons/arrowIcon.svg";
import { useState, useRef, useEffect } from "react";
import InfoBubble from "../infoBubble/InfoBubble";

function CustomSelect({ inputInf, options, value, onChange, info }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const selectRef = useRef(null); // Referencia al select

  // Cerrar el menú cuando el usuario haga clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const selected = options.find((option) => option.value === value);
    if(selected) {setSelectedOption(selected.text || "")}
  }, [value, options]);

  return (
    <div ref={selectRef}>
      <div className="flex items-center gap-2 w-full">
        <InfoBubble info={info} />
        <p>Sentido</p>
      </div>
      <button
      type="button"
        className="w-full border-b-2 ml-7"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="flex items-center justify-between w-full p-2 rounded-lg">
          <div className="flex items-center">
            <label className="text-sm text-gray-600">
              {selectedOption || inputInf.text}
            </label>
          </div>
          <img
            src={arrow}
            alt="arrow"
            className={`w-4 h-4 transform duration-300 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isMenuOpen && (
        <div className="absolute w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] lg:w-[calc(25%-5rem)] z-10 mt-1 bg-white rounded-lg shadow-lg ml-7">
          <input
            type="text"
            className="w-full p-2 border-b-2"
            placeholder="Search..."
            value={searchValue}
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="max-h-40 overflow-y-auto flex flex-col">
            {options
              .filter((option) =>
                option.text.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((option) => (
                <button
                  key={option.value}
                  className="p-2 text-left hover:bg-gray-200"
                  onClick={() => {
                    onChange(option.value); // Actualizamos el valor en el formulario
                    setIsMenuOpen(false);
                  }}
                >
                  {option.text}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  inputInf: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    required: PropTypes.bool,
  }),
  options: PropTypes.array.isRequired,
  value: PropTypes.object,      // El valor del select
  onChange: PropTypes.func,      // La función para actualizar el valor
  info: PropTypes.string,
};

export default CustomSelect;