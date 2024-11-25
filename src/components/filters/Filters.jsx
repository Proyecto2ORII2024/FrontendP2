import FloatingContainer from "../floatingContainer/FloatingContainer";
import SimpleSelect from "../simpleSelect/SimpleSelect";
import { inputInfo } from "../../utils/FormInformation";
import PropTypes from "prop-types";

/**
 * Componente de filtros que muestra un conjunto de campos de selección y entrada de datos dentro de un contenedor flotante.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el contenedor flotante está abierto.
 * @param {function} props.setOpen - Función para actualizar el estado de apertura del contenedor flotante.
 * @returns {JSX.Element} Un elemento JSX que representa la interfaz de filtros.
 */
function Filters({open, setOpen}){

    return(
        <FloatingContainer open={open} setOpen={setOpen}>
            <section className="flex flex-col items-center w-full text-center">
                <h1 className="text-3xl font-semibold">Filtros</h1>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <SimpleSelect selectInfo={inputInfo.sentido}/>
                    <SimpleSelect selectInfo={inputInfo.tipo}/>
                    <SimpleSelect selectInfo={inputInfo.tipoDocumento}/>
                    <SimpleSelect selectInfo={inputInfo.genero}/>
                    <label className="w-11/12">
                        <input className="w-full border-b-2 outline-none placeholder:text-black" placeholder="F. Inicio de movilidad" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')}/>
                    </label>
                    <label className="w-11/12">
                        <input className="w-full border-b-2 outline-none placeholder:text-black" placeholder="F. Fin de movilidad" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')}/>
                    </label>
                    <SimpleSelect selectInfo={inputInfo.convenio}/>
                </div>
            </section>
        </FloatingContainer>
    )
}

export default Filters;

Filters.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}