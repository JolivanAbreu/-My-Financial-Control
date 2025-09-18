// frontend/src/pages/DashboardPage.jsx

import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleTransactionSuccess = (newTransaction) => {
    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
    setIsModalOpen(false);
  };

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
    return (
      <div className="flex justify-center items-center h-64">
        <p>Carregando transações...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Nova Transação
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Nova Transação"
      >
        <TransactionForm onSuccess={handleTransactionSuccess} />
      </Modal>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
        {transactions.length === 0 ? (
          <p>
            Nenhuma transação encontrada. Clique em "+ Nova Transação" para
            adicionar a primeira!
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-3">Data</th>
                <th className="py-2 px-3">Categoria</th>
                <th className="py-2 px-3">Descrição</th>
                <th className="py-2 px-3 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3">{formatDate(t.data)}</td>
                  <td className="py-3 px-3">{t.categoria}</td>
                  <td className="py-3 px-3">{t.descricao}</td>
                  <td
                    className={`py-3 px-3 text-right font-semibold ${
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
