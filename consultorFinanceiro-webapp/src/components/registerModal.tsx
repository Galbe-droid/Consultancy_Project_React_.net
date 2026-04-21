import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, } from "@mui/material";
import React, { useState } from "react";
import type {RegisterUser} from "../types/user.ts";
import {createTransaction} from "../services/transactionService.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import AlertSnackBar from "./alertSnackBar.tsx";

type Props = {
  open: boolean,
  onClose: () => void,
};

export default function RegisterModal({ open, onClose } : Props) {
  const [registerForm, setRegisterForm] = useState<RegisterUser>({
    username: '',
    password: '',
    email: '',
    name: '',
    surName: '',
  });

  //erro e loading
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({username: "", password: "", email: "", name: "", surName: ""});

  //Snackbar de aviso
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackType, setSnackType] = useState<"success" | "error">("success");

  //Contexto
  const {register} = useAuth();

  //Limpeza
  const cleanInputOInExit = () => {
    setRegisterForm({
      username: '',
      password: '',
      email: '',
      name: '',
      surName: '',
    });
    setFormError({
      username: '',
      password: '',
      email: '',
      name: '',
      surName: '',
    });
  }

  const validateForm = () => {
    const newErrors = {name: '', description: '', email: '', password: '', username: '', surName: ''};
    const regex = /^[a-zA-Z0-9_]+$/;

    if (!registerForm?.name) newErrors.name = "O nome é obrigatório";
    if (!regex.test(registerForm.name)) newErrors.name = "Nome deve possuir apenas letras e numeros.";
    if (registerForm.name.length < 5) newErrors.name = "O nome deve conter ao menos 5 caracteres";
    if (registerForm.name.length > 18) newErrors.name = "O nome deve conter no máximo 18 caracteres";

    if (!registerForm?.surName) newErrors.surName = "O sobrenome é obrigatório";
    if (!regex.test(registerForm.surName)) newErrors.surName = "Sobrenome deve possuir apenas letras e numeros.";
    if (registerForm.surName.length < 5) newErrors.surName = "O sobrenome deve conter ao menos 5 caracteres";
    if (registerForm.surName.length > 18) newErrors.surName = "O sobrenome deve conter no máximo 18 caracteres";

    if (!registerForm?.username) newErrors.username = "O Username é obrigatório";
    if (!regex.test(registerForm.username)) newErrors.username = "Username deve possuir apenas letras e numeros.";
    if (registerForm.username.length < 5) newErrors.username = "O Username deve conter ao menos 5 caracteres";
    if (registerForm.username.length > 18) newErrors.username = "O Username deve conter no máximo 18 caracteres";

    if(!registerForm.password) newErrors.password = "A Senha e obrigatoria";
    if(registerForm.password.length < 6) newErrors.password = "A Senha deve conter ao menos 6 caracteres";

    if(registerForm.email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === -1) newErrors.email = "Email Invalido";

    setFormError(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  }

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    try {
      if(!validateForm()){
        setLoading(false);
        return;
      }

      const result = await register(registerForm);
      console.log(result);
      if (!result.success) {
        const errors = result.errors;

        let message = "Erro ao criar conta.";

        if (errors?.email?.length) {
          setFormError((prev) => ({...prev, email: errors?.email}));
        }
        else if (errors?.username?.length) {
          setFormError((prev) => ({...prev, username: errors?.username}));
        }
        return;
      }

      setSnackMessage("Conta criada com sucesso!");
      setSnackType("success");
      setSnackOpen(true);

      cleanInputOInExit();

      setTimeout(() => {
        onClose();
      }, 700);
    } catch {
      setSnackMessage("Erro ao registrar a conta.");
      setSnackType("error");
      setSnackOpen(true);
    }
    finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setRegisterForm((prev) => ({...prev, [name]: value}));
    setFormError((prev) => ({...prev, [name]: ""}));
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar conta</DialogTitle>
      {loading && <p>Carregando...</p>}
      <form onSubmit={handleRegister}>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleInputChange}
            error={!!formError.email}
            helperText={formError.email}
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            name="password"
            margin="normal"
            onChange={handleInputChange}
            error={!!formError.password}
            helperText={formError.password}
          />
          <TextField
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              onChange={handleInputChange}
              error={!!formError.username}
              helperText={formError.username}
          />
          <TextField
              fullWidth
              label="Nome"
              name="name"
              margin="normal"
              onChange={handleInputChange}
              error={!!formError.name}
              helperText={formError.name}
          />
          <TextField
              fullWidth
              label="Sobrenome"
              name="surName"
              margin="normal"
              onChange={handleInputChange}
              error={!!formError.surName}
              helperText={formError.surName}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {cleanInputOInExit(); onClose()}}>Cancelar</Button>
          <Button variant="contained" type="submit">
            Registrar
          </Button>
        </DialogActions>
      </form>
      <AlertSnackBar open={snackOpen} onClose={() => setSnackOpen(false)} severity={snackType} alertMessage={snackMessage}/>
    </Dialog>
  );
}