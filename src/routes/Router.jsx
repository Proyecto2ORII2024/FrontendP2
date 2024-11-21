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
import Movility from "../pages/movility/Movility";
import UpdateForm from "../pages/updateForm/UpdateForm";
import UsersListPage from "../pages/usersListPage/UsersListPage";
import PasswordRecoveryEmailPage from "../pages/passwordRecoveryEmailPage/PasswordRecoveyEmailPage";
import { AuthProvider } from "../context/LoginContext";
import ChangePassword from "../pages/changePassword/ChangePassword";

import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import ProtectedRouteUser from "./ProtectedRouteUser";
import ProtectedRouteBoth from "./ProtectedRouteBoth";

function Router() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/passwordRecovery" element={<PasswordRecoveryEmailPage />} />

                    <Route element={<ProtectedRouteAdmin/>}>
                        <Route path="/admin" element={<MainAdmin />} />
                        <Route path="/user/list" element={<UsersListPage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/form/update/:elementId" element={<UpdateForm />} />
                        <Route path="/show/:formId" element={<ShowMovPage />} />
                        <Route path="/admin/agreement" element={<AgreementAdminPage />} />
                        <Route path="/admin/agreement/create" element={<CreateAgreementPage />} />
                        <Route path="/admin/movilidad" element={<Movility />} />
                        <Route path="/user/register" element={<UserRegisterPage />} />
                    </Route>

                    <Route element={<ProtectedRouteUser/>}>
                        <Route path="/user" element={<MainUser />} />
                        <Route path="/user/agreement" element={<AgreementUserPage />} />
                    </Route>

                    <Route element={<ProtectedRouteBoth/>}>
                        <Route path="/form" element={<FormPage />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider >
    );
}

export default Router;
