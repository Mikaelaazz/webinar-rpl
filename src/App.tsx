import { Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
// USER
import DashboardPage from "@/pages/dashboard";
import DetailPage from "@/pages/detail";
import ProfilPage from "@/pages/profil";
import SertifikatUserPage from "./pages/sertifikat";
// 
import ProtectedRoute from "@/components/protectedroute";
import GuestOnlyRoute from "@/components/guestonlyroute";

// Admin 
import DasboardAdminPage from "@/pages/admin/index";
import ManageUserPage from "@/pages/admin/manageuser";
import WebinarPage from "@/pages/admin/webinar";
import DetailAdminPage from "@/pages/admin/detail";
import SertifikatAdminPage from "@/pages/admin/serfitikat"; 
import CreateSertifikatAdminPage from "@/pages/admin/add_sertifikat";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<IndexPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Hanya untuk tamu (belum login) */}
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute>
            <RegisterPage />
          </GuestOnlyRoute>
        }
      />

      {/* Hanya untuk user login */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/detail"
        element={
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        }
      />
      <Route element={
        <ProtectedRoute>
        <ProfilPage />
        </ProtectedRoute>
        } path="/profil" />

      <Route element={
        <ProtectedRoute>
        <SertifikatUserPage />
        </ProtectedRoute>
        } path="/sertifikat" />

      {/* Admin */}
      <Route element={<DasboardAdminPage />} path="/admin" />
      <Route element={<ManageUserPage />} path="/admin/user" />
      <Route element={<WebinarPage />} path="/admin/webinar" />
      <Route element={<DetailAdminPage />} path="/admin/detail" />
      <Route element={<WebinarPage />} path="/admin/webinar/create" />
      <Route element={<SertifikatAdminPage />} path="/admin/sertifikat" />
      <Route element={<CreateSertifikatAdminPage />} path="/admin/sertifikat/create" />

      {/* Redirect jika route tidak ditemukan */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

