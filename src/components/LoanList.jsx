import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loanService from "../services/loan.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LoanList = () => {
    const [loans, setLoans] = useState([]);
    
    const navigate = useNavigate();

    const stateOrder = {
        "En Revisión Inicial": 1,
        "Pendiente de Documentación": 2,
        "En Evaluación": 3,
        "Pre-Aprobada": 4,
        "En Aprobación Final": 5,
        "Aprobada": 6,
        "Rechazada": 7,
        "Cancelada por el Cliente": 8,
        "En Desembolso": 9,
    };
    
    const init = () => {
        loanService
        .getAll()
        .then((response) => {
            const sortedLoans = response.data.sort((a, b) => 
                stateOrder[a.state] - stateOrder[b.state]
            );
            setLoans(sortedLoans);
        })
        .catch((error) => {
            console.log(
            "Se ha producido un error al intentar mostrar listado de todos los restamos.",
            error
            );
        });
    };
    
    useEffect(() => {
        init();
    }, []);
    
    const handleDelete = (id) => {
        console.log("Printing id", id);
        const confirmDelete = window.confirm(
        "¿Esta seguro que desea borrar este prestamo?"
        );
        if (confirmDelete) {
        loanService
            .remove(id)
            .then((response) => {
            console.log("Prestamo ha sido eliminado.", response.data);
            init();
            })
            .catch((error) => {
            console.log(
                "Se ha producido un error al intentar eliminar al usuario",
                error
            );
            });
        }
    };

    const handleEdit = (id) => {
        console.log("Printing id", id);
        navigate(`/loan/edit/${id}`);
    };

    return (
        <TableContainer component={Paper}>
          <br />
          <Link
            to="/loan/add"
            style={{ textDecoration: "none", marginBottom: "1rem" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
            >
              Añadir Prestamo
            </Button>
          </Link>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Rut
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Tipo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Precio de la propiedad
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Cantidad
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Plazo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Tasa de interés
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Ingresos
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Tiempo de trabajo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Edad
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Estado
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Operaciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => (
                <TableRow
                  key={loan.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{loan.rut}</TableCell>
                  <TableCell align="center">{loan.type}</TableCell>
                  <TableCell align="center">{loan.property_price}</TableCell>
                  <TableCell align="center">{loan.amount}</TableCell>
                  <TableCell align="center">{loan.term}</TableCell>
                  <TableCell align="center">{loan.interest_rate}</TableCell>
                  <TableCell align="center">{loan.income}</TableCell>
                  <TableCell align="center">{loan.working_time}</TableCell>
                  <TableCell align="center">{loan.age}</TableCell>
                  <TableCell align="center">{loan.state}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(loan.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
    
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(loan.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
};

export default LoanList;