import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import FormPage from "../pages/formPage/FormPage";
import AgreementAdminPage from "../pages/agreementAdminPage/AgreementAdminPage";
import CreateAgreementPage from "../pages/createAgreementPage/CreateAgreementPage";
import AgreementUserPage from "../pages/agreementUserPage/AgreementUserPage";
import ListaEstudiante from "../pages/listaUsuarioPage/ListaUsuarioPage.jsx";
import RegistrarUsuarioPage from "../pages/registrarUsuario/RegistrarUsuarioPage";


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/user/registrar" element={<RegistrarUsuarioPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/admin/agreement" element={<AgreementAdminPage />} />
            <Route path="/admin/agreement/create" element={<CreateAgreementPage />} />
            <Route path="/user/agreement" element={<AgreementUserPage />} />
            <Route path="/estudiante" element={<ListaEstudiante />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;