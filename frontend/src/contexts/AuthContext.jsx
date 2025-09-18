// frontend/src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 1. Adicione o estado de loading

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem("@MeuControleFinanceiro:user");
      const storagedToken = localStorage.getItem(
        "@MeuControleFinanceiro:token"
      );

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.authorization = `Bearer ${storagedToken}`;
      }

      setLoading(false); // 2. Finaliza o loading após a verificação
    }

    loadStoragedData();
  }, []);
  async function login({ email, senha }) {
    try {
      const response = await api.post("/login", { email, senha });
      const { user, token } = response.data;

      // Guarda os dados no localStorage
      localStorage.setItem("@MeuControleFinanceiro:user", JSON.stringify(user));
      localStorage.setItem("@MeuControleFinanceiro:token", token);

      // Define o token no cabeçalho de todas as futuras requisições do Axios
      api.defaults.headers.authorization = `Bearer ${token}`;

      // Atualiza o estado do usuário
      setUser(user);
    } catch (error) {
      // Relança o erro para que a página de login possa tratá-lo
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("@MeuControleFinanceiro:user");
    localStorage.removeItem("@MeuControleFinanceiro:token");
    setUser(null);
  }

  //...
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
  //...
}

// 3. Cria um Hook customizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
