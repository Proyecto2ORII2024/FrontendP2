import Router from "./routes/Router";
import MainButton from "./components/buttons/MainButton.jsx";
import InfoBubble from "./components/infoBubble/InfoBubble.jsx";
/*<MainButton onclick={()=>{}} bgColor={"#000000"} hoverBg={} textColor text className />
  <InfoBubble info={info}></InfoBubble>
*/
const info =
{
  title: "Text",
  shortInfo: "Text",
  longInfo: "informacion larga",
};
function App() {

  return (
    <Router/>
  )
}

export default App
