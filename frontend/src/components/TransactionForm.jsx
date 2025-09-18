// frontend/src/components/TransactionForm.jsx

import { useState } from "react";
import api from "../services/api";

function TransactionForm({ onSuccess }) {
  const [tipo, setTipo] = useState("despesa");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/transactions", {
        tipo,
        valor,
        categoria,
        data,
        descricao,
      });
      alert("Transação salva com sucesso!");
      onSuccess(response.data);
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      alert(
        `Erro ao salvar: ${error.response?.data?.error || "Tente novamente"}`
      );
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
          Descrição
        </label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Salvar Transação
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
