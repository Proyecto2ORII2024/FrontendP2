import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import StatisticsPage from "../pages/statisticsPage/StatisticsPage";
import FormPage from "../pages/formPage/formPage";
import ConvenioAdminPage from "../pages/convenioAdminPage/ConvenioAdminPage";
import CreateConvenioPage from "../pages/createConvenioPage/CreateConvenioPage";


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/admin/convenio" element={<ConvenioAdminPage />} />
            <Route path="/admin/convenio/create" element={<CreateConvenioPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;