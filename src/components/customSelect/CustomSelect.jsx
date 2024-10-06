import PropTypes from "prop-types";
import arrow from "../../assets/icons/arrowIcon.svg";
import { useState, useRef, useEffect } from "react";
import InfoBubble from "../infoBubble/InfoBubble";

function CustomSelect({ inputInf, options, value, onChange, bblInfo, isDisable = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef(null); // Referencia al select

  options = options.sort((a, b) => a.text.localeCompare(b.text));

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

  // Encontrar el texto de la opción seleccionada en base al `value`
  const selectedOptionText = options.find((option) => option.value === value)?.text || "";

  return (
    <div ref={selectRef} className="relative w-11/12">
      <div className="flex items-center w-full gap-2">
        <InfoBubble info={bblInfo} />
        <p>{inputInf.text}</p>
      </div>
      <button
        type="button"
        className="w-full border-b-2 ml-7"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        disabled={isDisable}
      >
        <div className="flex items-center justify-between w-full p-1 rounded-lg">
          <label className={`cursor-pointer ${selectedOptionText ? 'text-black' : 'text-gray-400'} `}>
            {selectedOptionText || inputInf.text}
          </label>
          <img
            src={arrow}
            alt="arrow"
            className={`size-5 transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {isMenuOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 rounded-lg shadow-lg border-primary-dark ml-7">
          <label htmlFor="search">
            <input
              id="search"
              type="text"
              autoComplete="off"
              className="w-full p-2 border-b-2 rounded-t-lg outline-none"
              placeholder="Buscar..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>
          <div className="flex flex-col overflow-y-auto rounded-b-lg max-h-40 scrollbar-webkit">
            {options
              .filter((option) =>
                option.text.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((option) => (
                <button
                  key={option.value}
                  className={`p-2 text-left hover:bg-gray-200 ${
                    selectedOptionText === option.text ? 'bg-grays-dark' : 'bg-white'
                  }`}
                  onClick={() => {
                    onChange(option.value); // Actualizamos el valor en el formulario
                    setIsMenuOpen(false); // Cierra el menú después de seleccionar
                  }}
                >
                  {option.text || "Ups, no se hallaron items"}
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
  }),
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),      
  onChange: PropTypes.func,
  bblInfo: PropTypes.object,
  isDisable: PropTypes.bool,
};

export default CustomSelect;