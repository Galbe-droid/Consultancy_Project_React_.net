import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import AuthLayout from "../../pages/layout/AuthLayout";
import RegisterModal from "../../components/registerModal";
import type { LoginUser } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/api";

export default function Login() {
  const [login, setLogin] = useState<LoginUser>({login: "", password: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [registerOpen, setRegisterOpen] = useState(false);
  const {login: signin} = useAuth();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", login);
      console.log(res);
      signin(res.data.data, res.data.userInfo);
      navigate("/");
    } catch (err) {
      setError("Email ou senha inválidos " + (err as Error).message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLogin((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <AuthLayout>
      <Box sx={{ width: 350 }}>
        <Typography sx={{
          mb:2
        }} variant="h5">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            name="login"
            value={login.login}
            margin="normal"
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            label="Senha"
            name="password"
            value={login.password}
            type="password"
            margin="normal"
            onChange={handleInputChange}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
          >
            Entrar
          </Button>
        </form>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setRegisterOpen(true)}
        >
          Registro
        </Button>
      </Box>
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)}/>
    </AuthLayout>
  );
}