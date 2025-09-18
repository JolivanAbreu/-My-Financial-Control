// frontend/src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute() {
  const { signed, loading } = useAuth(); // 1. Pegue o estado de loading

  // 2. Se estiver carregando, mostre uma mensagem (ou um spinner no futuro)
  if (loading) {
    return <div>Carregando...</div>;
  }

  // 3. Se não estiver carregando, tome a decisão normal
  return signed ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
