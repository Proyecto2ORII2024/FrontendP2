import PropTypes from "prop-types";

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
