import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/loginPage/Login";
import MainAdmin from "../pages/mainAdminPage/MainAdmin";
import MainUser from "../pages/mainUserPage/MainUser";
import AsideUser from "../components/asideUser/AsideUser";
import AsideAdmin from "../components/asideAdmin/AsideAdmin";
import NavbarUser from "../components/navbar/NavbarUser";

function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/user" element={<MainUser />} />
            <Route path="/navbarUser" element={<NavbarUser/>} />
            <Route path="/asideUser" element={<AsideUser/>} />
            <Route path="/asideAdmin" element={<AsideAdmin/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default Router;