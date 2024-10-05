import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import ConvenioAdminPage from "../pages/agreementAdminPage/AgreementAdminPage";
import UserList from "../pages/usersListPage/UsersListPage.jsx";
import FormPage from "../pages/formPage/formPage";
import CreateConvenioPage from "../pages/createAgreementPage/CreateAgreementPage";
import UserRegisterPage from "../pages/userRegisterPage/UserRegisterPage.jsx";

import ConvenioUserPage from "../pages/convenioUserPage/ConvenioUserPage";

function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/user/register" element={<UserRegisterPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/admin/convenio" element={<ConvenioAdminPage />} />
            <Route path="/user/list" element={<UserList />} />
            <Route path="/admin/convenio/create" element={<CreateConvenioPage />} />
            <Route path="/user/convenio" element={<ConvenioUserPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;