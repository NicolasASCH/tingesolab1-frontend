import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import loanService from "../services/loan.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const AddEditLoan = () => {
    const [rut, setRut] = useState("");
    const [type, setType] = useState("");
    const [property_price, setProperty_price] = useState("");
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [interest_rate, setInterest_rate] = useState("");
    const [income, setIncome] = useState("");
    const [working_time, setWorking_time] = useState("");
    const [age, setAge] = useState("");
    const [state, setState] = useState("Revisión inicial");
    const [document1, setDocument1] = useState(null);
    const [document2, setDocument2] = useState(null);
    const [document3, setDocument3] = useState(null);
    const [document4, setDocument4] = useState(null);
    const { id } = useParams();
    const [titleloanForm, setTitleloanForm] = useState("");
    const navigate = useNavigate();
  
    const maxDocuments = {
        "Primera Vivienda": 3,
        "Segunda Vivienda": 4,
        "Propiedades Comerciales": 4,
        "Remodelaciones": 3,
    };

    const saveloan = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("rut", rut);
      formData.append("type", type);
      formData.append("property_price", property_price);
      formData.append("amount", amount);
      formData.append("term", term);
      formData.append("interest_rate", interest_rate);
      formData.append("income", income);
      formData.append("working_time", working_time);
      formData.append("age", age);
      formData.append("state", state);

      if (document1) {
        formData.append("document1", document1);
      }
      if (document2) {
        formData.append("document2", document2);
      }
      if (document3) {
        formData.append("document3", document3);
      }
      if (document4) {
        formData.append("document4", document4);
      }

      if (id) {
        //Actualizar Datos Prestamo
        loanService
          .update(id, formData)
          .then((response) => {
            console.log("Prestamo ha sido actualizado.", response.data);
            navigate("/loan/list");
          })
          .catch((error) => {
            console.log(
              "Ha ocurrido un error al intentar actualizar datos del Prestamo.",
              error
            );
          });
      } else {
        //Crear nuevo Prestamo
        loanService
          .create(formData)
          .then((response) => {
            console.log("Prestamo ha sido añadido.", response.data);
            navigate("/loan/list");
          })
          .catch((error) => {
            console.log(
              "Ha ocurrido un error al intentar crear nuevo Prestamo.",
              error
            );
          });
      }
    };
  
    useEffect(() => {
      if (id) {
        setTitleloanForm("Editar Prestamo");
        loanService
          .get(id)
          .then((loan) => {
            setRut(loan.data.rut);
            setType(loan.data.type);
            setProperty_price(loan.data.property_price);
            setAmount(loan.data.amount);
            setTerm(loan.data.term);
            setInterest_rate(loan.data.interest_rate);
            setIncome(loan.data.income);
            setWorking_time(loan.data.working_time);
            setAge(loan.data.age);
            setState(loan.data.state);
            setDocument1(loan.data.document1);
            setDocument2(loan.data.document2);
            setDocument3(loan.data.document3);
            setDocument4(loan.data.document4);
          })
          .catch((error) => {
            console.log("Se ha producido un error.", error);
          });
      } else {
        setTitleloanForm("Solicitud de Credito");
      }
    }, []);
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
      >
        <h3> {titleloanForm} </h3>
        <hr />
        <form>
          <FormControl fullWidth>
            <TextField
              id="rut"
              label="Rut"
              value={rut}
              variant="standard"
              onChange={(e) => setRut(e.target.value)}
              helperText="Ej. 12.587.698-8"
            />
          </FormControl>
  
          <FormControl fullWidth>
            <TextField
              id="type"
              label="Type"
              value={type}
              variant="standard"
              onChange={(e) => setType(e.target.value)}
              helperText="Elegir entre: Primera Vivienda, Segunda Vivienda, Propiedades Comerciales, Remodelaciones"
            />
          </FormControl>
  
          <FormControl fullWidth>
            <TextField
              id="property_price"
              label="Property Price"
              type="number"
              value={property_price}
              variant="standard"
              onChange={(e) => setProperty_price(e.target.value)}
              helperText="Precio de la propiedad"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="amount"
              label="Amount"
              type="number"
              value={amount}
              variant="standard"
              onChange={(e) => setAmount(e.target.value)}
              helperText="Monto solicitado"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="term"
              label="Term"
              type="number"
              value={term}
              variant="standard"
              onChange={(e) => setTerm(e.target.value)}
              helperText="Plazo en años"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="interest_rate"
              label="Interest Rate"
              type="number"
              value={interest_rate}
              variant="standard"
              onChange={(e) => setInterest_rate(e.target.value)}
              helperText="Tasa de interes"
            />
          </FormControl>
  
          <FormControl fullWidth>
            <TextField
              id="income"
              label="Income"
              type="number"
              value={income}
              variant="standard"
              onChange={(e) => setIncome(e.target.value)}
              helperText="Ingreso mensual"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="working_time"
              label="Working Time"
              type="number"
              value={working_time}
              variant="standard"
              onChange={(e) => setWorking_time(e.target.value)}
              helperText="Tiempo de trabajo en años"
            />
          </FormControl>
          
          <FormControl fullWidth>
            <TextField
              id="age"
              label="Age"
              type="number"
              value={age}
              variant="standard"
              onChange={(e) => setAge(e.target.value)}
              helperText="Edad"
            />
          </FormControl>

                {maxDocuments[type] >= 1 && (
                    <FormControl fullWidth>
                        <input
                            id="document1"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setDocument1(e.target.files[0])}
                        />
                    </FormControl>
                )}
                {maxDocuments[type] >= 2 && (
                    <FormControl fullWidth>
                        <input
                            id="document2"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setDocument2(e.target.files[0])}
                        />
                    </FormControl>
                )}
                {maxDocuments[type] >= 3 && (
                    <FormControl fullWidth>
                        <input
                            id="document3"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setDocument3(e.target.files[0])}
                        />
                    </FormControl>
                )}
                {maxDocuments[type] >= 4 && (
                    <FormControl fullWidth>
                        <input
                            id="document4"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setDocument4(e.target.files[0])}
                        />
                    </FormControl>
                )}
  
          <FormControl>
            <br />
            <Button
              variant="contained"
              color="info"
              onClick={(e) => saveloan(e)}
              style={{ marginLeft: "0.5rem" }}
              startIcon={<SaveIcon />}
            >
              Grabar
            </Button>
          </FormControl>
        </form>
        <hr />
        <Link to="/loan/list">Back to List</Link>
      </Box>
    );
  };
  
  export default AddEditLoan;