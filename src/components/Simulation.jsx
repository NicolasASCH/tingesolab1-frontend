import React, { useState } from "react";
import loanService from "../services/loan.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Simulation = () => {
    const [amount, setAmount] = useState("");
    const [interest_rate, setInterest_rate] = useState("");
    const [term, setTerm] = useState("");
    const [simulationResult, setSimulationResult] = useState(null);

    const handleSimulation = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("amount", amount);
        formData.append("interest_rate", interest_rate);
        formData.append("term", term);

        loanService.simulation(formData)
            .then((response) => {
                setSimulationResult(response.data);
            })
            .catch((error) => {
                console.error("Error en la simulación de crédito:", error);
            });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={handleSimulation}
        >
            <h3>Simulación de Crédito</h3>
            <TextField
                label="Monto"
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Tasa de Interés (%)"
                type="number"
                id="interest_rate"
                value={interest_rate}
                onChange={(e) => setInterest_rate(e.target.value)}
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Plazo (años)"
                type="number"
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                variant="outlined"
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Simular Cuota
            </Button>

            {simulationResult !== null && (
                <Box mt={3}>
                    <h4>Resultado de la Simulación:</h4>
                    <p>${simulationResult.toFixed(2)}</p>
                </Box>
            )}
        </Box>
    );
};

export default Simulation;