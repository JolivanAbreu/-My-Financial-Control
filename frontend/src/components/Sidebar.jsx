// frontend/src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaWallet,
  FaBullseye,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-5 text-2xl font-bold border-b border-gray-700">
        Meu Controle
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{user?.nome}</h3>
        <p className="text-sm text-gray-400">{user?.email}</p>
      </div>
      <nav className="flex-grow">
        <ul>
          <li className="p-1">
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-gray-700"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          {/* Adicionar os links para Orçamentos e Metas aqui */}
        </ul>
      </nav>
      <div className="p-5 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700"
        >
          <FaSignOutAlt className="mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
