import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const AddEditUser = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState(null);
  const { id } = useParams();
  const [titleUserForm, setTitleUserForm] = useState("");
  const navigate = useNavigate();

  const saveuser = (e) => {
    e.preventDefault();

    // Crear un nuevo FormData
    const formData = new FormData();
    formData.append("rut", rut);
    formData.append("name", name);
    formData.append("email", email);

    // Si hay un documento, agregarlo al FormData
    if (document) {
      formData.append("document", document);
    }

    // Verificar si estamos actualizando o creando un nuevo usuario
    if (id) {
      // Actualizar datos del usuario
      userService
        .update(id, formData)
        .then((response) => {
          console.log("Usuario ha sido actualizado.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del usuario.",
            error
          );
        });
    } else {
      // Crear nuevo usuario
      userService
        .create(formData)
        .then((response) => {
          console.log("Usuario ha sido añadido.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo usuario.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleUserForm("Editar Usuario");
      userService
        .get(id)
        .then((user) => {
          setRut(user.data.rut);
          setName(user.data.name);
          setEmail(user.data.email);
          setDocument(user.data.document);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleUserForm("Nuevo Usuario");
    }
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleUserForm} </h3>
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
            id="name"
            label="Name"
            value={name}
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            helperText="Email de usuario"
          />
        </FormControl>

        <FormControl fullWidth>
          <input
            id="document"
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => saveuser(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/user/list">Back to List</Link>
    </Box>
  );
};

export default AddEditUser;