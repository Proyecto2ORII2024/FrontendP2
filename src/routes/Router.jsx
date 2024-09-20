import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import ConvenioAdminPage from "../pages/CovenioAdminPage/ConvenioAdminPage";
import ListaEstudiante from "../pages/ListaUsuarioPage/ListaUsuarioPage";
import FormPage from "../pages/formPage/formPage";
import CreateConvenioPage from "../pages/createConvenioPage/CreateConvenioPage";


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/admin/convenio" element={<ConvenioAdminPage />} />
            <Route path="/estudiante" element={<ListaEstudiante />} />
            <Route path="/admin/convenio/create" element={<CreateConvenioPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;