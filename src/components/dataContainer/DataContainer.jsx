import PropTypes from "prop-types";

/**
 * Componente contenedor para mostrar datos organizados en un formato de grilla.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Título que se mostrará en la parte superior del contenedor.
 * @param {React.ReactNode} props.children - Elementos secundarios que se mostrarán dentro del contenedor.
 * @returns {JSX.Element} Un elemento JSX que representa el contenedor de datos.
 */
function DataContainer({title, children}){
    return(
        <section className="p-4 mx-8 border-2 rounded-lg border-grays">
            <h1 className="mb-5 text-2xl font-semibold text-center text-primary-dark">
                {title}
            </h1>
            <article className="grid grid-cols-1 gap-16 p-3 justify-evenly md:grid-cols-2 lg:grid-cols-4">
                {children}
            </article>
        </section>
    )
    
}

DataContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

export default DataContainer;
