import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import TransactionForm from '../components/TransactionForm';
import ExpensesChart from '../components/ExpensesChart';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Falha ao buscar transações:', error);
      alert('Não foi possível carregar as transações.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (transactionId) => {
    const isConfirmed = window.confirm(
      'Tem certeza que deseja apagar esta transação?'
    );
    if (isConfirmed) {
      try {
        await api.delete(`/transactions/${transactionId}`);
        setTransactions((current) =>
          current.filter((t) => t.id !== transactionId)
        );
        alert('Transação apagada com sucesso!');
      } catch (error) {
        console.error('Erro ao apagar transação:', error);
        alert('Não foi possível apagar a transação.');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleTransactionSuccess = (updatedOrNewTransaction) => {
    if (editingTransaction) {
      setTransactions((current) =>
        current.map((t) =>
          t.id === updatedOrNewTransaction.id ? updatedOrNewTransaction : t
        )
      );
    } else {
      setTransactions((current) => [updatedOrNewTransaction, ...current]);
    }
    closeModal();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
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
      {}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Nova Transação
        </button>
      </div>

      {/* MODAL (fica aqui mas só aparece quando clicamos no botão) */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          editingTransaction ? 'Editar Transação' : 'Adicionar Nova Transação'
        }
      >
        <TransactionForm
          onSuccess={handleTransactionSuccess}
          initialData={editingTransaction}
        />
      </Modal>

      {/* GRÁFICO DE DESPESAS */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <ExpensesChart transactions={transactions} />
      </div>

      {/* TABELA DE TRANSAÇÕES */}
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
                <th className="py-2 px-3 text-center">Ações</th>
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
                      t.tipo === 'receita'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {t.tipo === 'receita' ? '+' : '-'} {formatCurrency(t.valor)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleEdit(t)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
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