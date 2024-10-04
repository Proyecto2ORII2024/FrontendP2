import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import FormPage from "../pages/formPage/FormPage";
import ShowMovPage from "../pages/showMovPage/ShowMovPage";
import AgreementAdminPage from "../pages/agreementAdminPage/AgreementAdminPage";
import CreateAgreementPage from "../pages/createAgreementPage/CreateAgreementPage";
import AgreementUserPage from "../pages/agreementUserPage/AgreementUserPage";
import RegistrarUsuarioPage from "../pages/registrarUsuario/RegistrarUsuarioPage";
import StatisticsPage from "../pages/statisticsPage/StatisticsPage";
import AsideUser from "../components/asideUser/AsideUser";
import AsideAdmin from "../components/asideAdmin/AsideAdmin";
import NavbarUser from "../components/navbarUser/NavbarUser";
import NavbarAdmin from "../components/navbarAdmin/NavbarAdmin";


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/estudiante" element={<ListaEstudiante />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/user/registrar" element={<RegistrarUsuarioPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/show" element={<ShowMovPage />} />
            <Route path="/admin/agreement" element={<AgreementAdminPage />} />
            <Route path="/admin/agreement/create" element={<CreateAgreementPage />} />
            <Route path="/user/agreement" element={<AgreementUserPage />} />
            <Route path="/navbarUser" element={<NavbarUser/>} />
            <Route path="/navbarAdmin" element={<NavbarAdmin/>} />
            <Route path="/asideUser" element={<AsideUser/>} />
            <Route path="/asideAdmin" element={<AsideAdmin/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default Router;
