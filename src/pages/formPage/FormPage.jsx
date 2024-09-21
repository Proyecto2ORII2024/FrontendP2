import InfoBubble from "../../components/infoBubble/InfoBubble";
import { Info } from "./Information.js";

function FormPage(){
    //Sigue en desarrollo, por ahora es un ejemplo de visualización de la burbuja
    return(
        <div className="flex flex-col gap-32">
            <InfoBubble info={Info.sentido}/>
        </div>
    );
}

export default FormPage;