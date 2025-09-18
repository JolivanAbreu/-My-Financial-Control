// frontend/src/components/TransactionForm.jsx

import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function TransactionForm({ onSuccess, initialData }) {
  const [tipo, setTipo] = useState("despesa");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    // Reseta o formulário quando o modal é aberto para uma nova transação
    if (initialData) {
      setTipo(initialData.tipo);
      setValor(initialData.valor);
      setCategoria(initialData.categoria);
      setData(new Date(initialData.data).toISOString().split("T")[0]);
      setDescricao(initialData.descricao || "");
    } else {
      setTipo("despesa");
      setValor("");
      setCategoria("");
      setData(new Date().toISOString().split("T")[0]);
      setDescricao("");
    }
  }, [initialData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const transactionData = {
      tipo,
      valor: Number(valor),
      categoria,
      data,
      descricao,
    };

    const promise = initialData
      ? api.put(`/transactions/${initialData.id}`, transactionData)
      : api.post("/transactions", transactionData);

    try {
      await toast.promise(promise, {
        loading: "Salvando...",
        success: "Transação salva com sucesso!",
        error: (err) =>
          err.response?.data?.error || "Falha ao salvar a transação.",
      });

      const response = await promise;
      onSuccess(response.data);
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Valor (R$)
        </label>
        <input
          type="number"
          step="0.01"
          required
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <input
          type="text"
          required
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Ex: Supermercado"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          required
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição (Opcional)
        </label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Compras do mês"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialData ? "Atualizar Transação" : "Salvar Transação"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
