import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import FormPage from "../pages/formPage/formPage";
import AgreementAdminPage from "../pages/agreementAdminPage/AgreementAdminPage";
import CreateAgreementPage from "../pages/createAgreementPage/CreateAgreementPage";
import AgreementUserPage from "../pages/agreementUserPage/AgreementUserPage";

function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/admin/convenio" element={<AgreementAdminPage />} />
            <Route path="/admin/convenio/create" element={<CreateAgreementPage />} />
            <Route path="/user/convenio" element={<AgreementUserPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;