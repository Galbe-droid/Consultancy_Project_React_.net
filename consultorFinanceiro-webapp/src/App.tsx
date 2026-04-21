import { Routes, Route } from 'react-router-dom'
import api from './api/api';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useAuth } from './hooks/useAuth'
import Login from './pages/auth/login'
import './App.css'
import { darkTheme } from './theme/theme'
import Dashboard from './pages/dashboard'
import PublicRoute from "./routers/publicRouter.tsx";
import PrivateRoute from "./routers/privateRouter.tsx";
import Categorias from "./pages/categories/categorias.tsx";
import Transacoes from "./pages/transactions/transacoes.tsx";

const token = localStorage.getItem("token");

if(token){
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
          <Route path="/" element={isAuthenticated ? <PrivateRoute><Dashboard /></PrivateRoute> : <PublicRoute><Login /></PublicRoute>} />
          <Route path="/categorias" element={<PrivateRoute><Categorias/></PrivateRoute>}/>
          <Route path="/transacoes" element={<PrivateRoute><Transacoes/></PrivateRoute>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
