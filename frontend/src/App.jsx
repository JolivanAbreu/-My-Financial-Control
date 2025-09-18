// frontend/src/App.jsx (versão com MainLayout)

import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rotas Privadas/Protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* 2. Envolva as páginas privadas com o MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Adicionaremos Orçamentos e Metas aqui */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
