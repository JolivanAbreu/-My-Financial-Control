// frontend/src/pages/DashboardPage.jsx (versão final)
import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const response = await api.get("/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Falha ao buscar transações:", error);
        alert("Não foi possível carregar as transações.");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  if (loading) {
    return <div>Carregando transações...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
        {transactions.length === 0 ? (
          <p>Nenhuma transação encontrada.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Data</th>
                <th className="py-2">Categoria</th>
                <th className="py-2">Descrição</th>
                <th className="py-2 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-3">{formatDate(t.data)}</td>
                  <td className="py-3">{t.categoria}</td>
                  <td className="py-3">{t.descricao}</td>
                  <td
                    className={`py-3 text-right font-semibold ${
                      t.tipo === "receita" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.tipo === "receita" ? "+" : "-"} {formatCurrency(t.valor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
