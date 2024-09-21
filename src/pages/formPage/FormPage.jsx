import InfoBubble from "../../components/infoBubble/InfoBubble";

function FormPage(){
    const info = {
        convenio: {
            title: "¿Existe convenio con la universidad de origen o destino?",
            shortInfo: "Puede verificar si existe convenio, en el siguiente enlace:  http://www.unicauca.edu.co/orii/es/convenios",
        },
        uniOgDt:{
            title: "Sentido",
            longInfo: "Puede verificar si existe convenio, en el siguiente enlace:  http://www.unicauca.edu.co/orii/es/convenios",
        }
    }

    //Sigue en desarrollo, por ahora es un ejemplo de visualización de la burbuja
    return(
        <div className="flex flex-col gap-32">
            <InfoBubble info={info.convenio}/>
            <InfoBubble info={info.uniOgDt}/>
        </div>
    );
}

export default FormPage;