import React, { useState } from "react";
import loanService from "../services/loan.service";

const CostCalculation = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [desgravament, setDesgravament] = useState("");
  const [adminCorPor, setAdminCorPor] = useState("");
  const [secure, setSecure] = useState("");
  const [totalCost, setTotalCost] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loanService.costCalculation(
        amount,
        interestRate,
        term,
        desgravament,
        adminCorPor,
        secure || undefined
      );
      setTotalCost(response.data);
    } catch (error) {
      console.error("Error en el cálculo del costo total", error);
    }
  };

  return (
    <div>
      <h2>Calcular Costo Total del Préstamo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tasa de Interés:</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Plazo:</label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Desgravamen:</label>
          <input
            type="number"
            step="0.01"
            value={desgravament}
            onChange={(e) => setDesgravament(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Administración Corporativa (%):</label>
          <input
            type="number"
            step="0.01"
            value={adminCorPor}
            onChange={(e) => setAdminCorPor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seguro (opcional):</label>
          <input
            type="number"
            step="1"
            value={secure}
            onChange={(e) => setSecure(e.target.value)}
          />
        </div>
        <button type="submit">Calcular Costo Total</button>
      </form>
      {totalCost !== null && (
        <div>
          <h3>Costo Total del Préstamo: {totalCost}</h3>
        </div>
      )}
    </div>
  );
};

export default CostCalculation;