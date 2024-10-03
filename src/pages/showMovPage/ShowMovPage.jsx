//import { useEffect, useState } from "react";
import ShowMovilityField from "../../components/showMovilityField/ShowMovilityField";
import { MoveInfo } from "./MoveInfo";
//import { useParams } from "react-router-dom";

function ShowMovPage() {

    /*const [data, setData] = useState({});
    const { roomID } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(MoveInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [roomID])*/

    return (
        <>
            <main className="grid grid-cols-1 mx-8 mt-10 mb-16 sm:grid-cols-2 lg:grid-cols-4 md:mx-10 lg:mx-20 justify-evenly gap-x-16 gap-y-16">
                <ShowMovilityField title='Sentido' data='si' bblInf={MoveInfo.sentido}/>
                <ShowMovilityField title='Tipo' data='si' bblInf={MoveInfo.tipo}/>
                <ShowMovilityField title='Tipo de documento' data='si' bblInf={MoveInfo.tipoDocumento}/>
                <ShowMovilityField title='Número de identificación' data='si' bblInf={MoveInfo.numID}/>
                <ShowMovilityField title='Nombre' data='si' bblInf={MoveInfo.nombre}/>
                <ShowMovilityField title='Apellidos' data='si' bblInf={MoveInfo.apellidos}/>
                <ShowMovilityField title='Género' data='si' bblInf={MoveInfo.genero}/>
                <ShowMovilityField title='Fecha de salida' data='si' bblInf={MoveInfo.fechaSalida}/>
                <ShowMovilityField title='Fecha de entrada' data='si' bblInf={MoveInfo.fechaEntrada}/>
                <ShowMovilityField title='Días de estancia' data='si' bblInf={MoveInfo.diasEstancia}/>
                <ShowMovilityField title='Año' data='si' bblInf={MoveInfo.anio}/>
                <ShowMovilityField title='Universidad de origen' data='si' bblInf={MoveInfo.uniOrigen}/>
                <ShowMovilityField title='Universidad de destino' data='si' bblInf={MoveInfo.uniDestino}/>
                <ShowMovilityField title='Número de convenio' data='si' bblInf={MoveInfo.numConvenio}/>
                <ShowMovilityField title='Tipo de evento' data='si' bblInf={MoveInfo.tipoEvento}/>
                <ShowMovilityField title='Descripción del evento' data='si' bblInf={MoveInfo.descEvento}/>
                <ShowMovilityField title='Programa de origen' data='si' bblInf={MoveInfo.programaOrigen}/>
                <ShowMovilityField title='Programa de destino' data='si' bblInf={MoveInfo.programaAcogida}/>
                <ShowMovilityField title='Ciudad' data='si' bblInf={MoveInfo.ciudad}/>
                <ShowMovilityField title='Pais' data='si' bblInf={MoveInfo.pais}/>
                <ShowMovilityField title='Profesor presenta' data='si' bblInf={MoveInfo.profPres}/>
                <ShowMovilityField title='Facultad' data='si' bblInf={MoveInfo.facultad}/>
                <ShowMovilityField title='Financiación' data='si' bblInf={MoveInfo.financiacion}/>
                <ShowMovilityField title='Fuente de financiación' data='si' bblInf={MoveInfo.fuenteFinanciacion}/>
            </main>
        </>
    )
}

export default ShowMovPage;