import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import FormPage from "../pages/formPage/formPage";
import ConvenioAdminPage from "../pages/convenioAdminPage/ConvenioAdminPage";
import CreateConvenioPage from "../pages/createConvenioPage/CreateConvenioPage";
import MainPage from "../pages/mainPage/MainPage";


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/admin/convenio" element={<ConvenioAdminPage />} />
            <Route path="/admin/convenio/create" element={<CreateConvenioPage />} />    
            <Route path="/main" element={<MainPage />} />    
        </Routes>
        </BrowserRouter>
    );
}

export default Router;