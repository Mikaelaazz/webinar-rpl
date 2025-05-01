import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
// USER
import DashboardPage from "@/pages/dashboard";
import DetailPage from "@/pages/detail";
import ProfilPage from "@/pages/profil";
import SertifikatUserPage from "./pages/sertifikat";
// ADMIN
import DasboardAdminPage from "@/pages/admin/index";
import ManageUserPage from "@/pages/admin/manageuser";
import WebinarPage from "@/pages/admin/webinar";
import DetailAdminPage from "@/pages/admin/detail";
import SertifikatAdminPage from "@/pages/admin/serfitikat"; 
import CreateSertifikatAdminPage from "@/pages/admin/add_sertifikat";



function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      {/* User */}
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<DetailPage />} path="/detail" />
      <Route element={<ProfilPage />} path="/profil" />
      <Route element={<SertifikatUserPage />} path="/sertifikat" />
      {/* Admin */}
      <Route element={<DasboardAdminPage />} path="/admin" />
      <Route element={<ManageUserPage />} path="/admin/user" />
      <Route element={<WebinarPage />} path="/admin/webinar" />
      <Route element={<DetailAdminPage />} path="/admin/detail" />
      <Route element={<WebinarPage />} path="/admin/webinar/create" />
      <Route element={<SertifikatAdminPage />} path="/admin/sertifikat" />
      <Route element={<CreateSertifikatAdminPage />} path="/admin/sertifikat/create" />
    </Routes>
  );
}

export default App;

