import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import FormPage from "../pages/formPage/FormPage";
import ShowMovPage from "../pages/showMovPage/ShowMovPage";
import AgreementAdminPage from "../pages/agreementAdminPage/AgreementAdminPage";
import CreateAgreementPage from "../pages/createAgreementPage/CreateAgreementPage";
import AgreementUserPage from "../pages/agreementUserPage/AgreementUserPage";
import UserRegisterPage from "../pages/userRegisterPage/UserRegisterPage";
import StatisticsPage from "../pages/statisticsPage/StatisticsPage";
import AsideUser from "../components/asideUser/AsideUser";
import AsideAdmin from "../components/asideAdmin/AsideAdmin";
import NavbarUser from "../components/navbarUser/NavbarUser";
import NavbarAdmin from "../components/navbarAdmin/NavbarAdmin";
import Movility from "../pages/movility/Movility";
import UpdateForm from "../pages/updateForm/UpdateForm";
import UsersListPage from "../pages/usersListPage/UsersListPage";
import PasswordRecoveryEmailPage from "../pages/passwordRecoveryEmailPage/PasswordRecoveyEmailPage";
import { AuthProvider } from "../context/LoginContext";
import ChangePassword from "../pages/changePassword/ChangePassword";

function Router() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin" element={<MainAdmin />} />
                    <Route path="/user" element={<MainUser />} />
                    <Route path="/user/list" element={<UsersListPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/user/register" element={<UserRegisterPage />} />
                    <Route path="/form" element={<FormPage />} />
                    <Route path="/form/update/:elementId" element={<UpdateForm />} />
                    <Route path="/show/:formId" element={<ShowMovPage />} />
                    <Route path="/admin/agreement" element={<AgreementAdminPage />} />
                    <Route path="/admin/agreement/create" element={<CreateAgreementPage />} />
                    <Route path="/user/agreement" element={<AgreementUserPage />} />
                    <Route path="/navbarUser" element={<NavbarUser />} />
                    <Route path="/navbarAdmin" element={<NavbarAdmin />} />
                    <Route path="/asideUser" element={<AsideUser />} />
                    <Route path="/asideAdmin" element={<AsideAdmin />} />
                    <Route path="/admin/movilidad" element={<Movility />} />
                    <Route path="/passwordRecovery" element={<PasswordRecoveryEmailPage />} />
                    <Route path="/changePassword" element={<ChangePassword />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider >
    );
}

export default Router;
