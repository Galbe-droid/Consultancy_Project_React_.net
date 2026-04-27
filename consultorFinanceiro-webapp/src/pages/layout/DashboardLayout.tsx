import { Box, AppBar, Toolbar, Typography, Drawer, Button, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../hooks/useAuth";
import CreateCategoryModal from "../../components/Modals/createCategoryModal.tsx";
import CreateTransactionModal from "../../components/Modals/createTransactionModal.tsx";
import {type ReactNode, useState} from "react";
import {AccountModal} from "../../components/Modals/accountModal.tsx";

type DashboardProps = {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardProps) {
  const {logout} = useAuth();
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  
  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#1e1e1e",
          borderRight: "1px solid #2a2a2a",
          display: "flex",
          flexDirection: "column",
        },
      }}
      >
        <Toolbar />
        <Typography sx={{ p: 2 }}>Menu</Typography>
        <Stack sx={{direction:"column", spacing:2, mb:3, gap:4 }}>
            <Button
                sx={{
                    border: "0px",
                    color: "#fff"
                }}
                variant="outlined"
                href={"/"}
            >
                Inicio
            </Button>
            <Button
                sx={{
                    border: "0px",
                    color: "#fff"
                }}
                variant="outlined"
                onClick={() => setOpenTransaction(true)}
            >
              + Nova Transação
            </Button>
            <Button
                sx={{
                    border: "0px",
                    color: "#fff"
                }}
                variant="outlined"
                onClick={() => setOpenCategory(true)}
            >
              + Nova Categoria
            </Button>
            <Button
                sx={{
                    border: "0px",
                    color: "#fff"
                }}
                variant="outlined"
                href={"/transacoes"}
            >
                Lista Transações
            </Button>
            <Button
                sx={{
                    border: "0px",
                    color: "#fff"
                }}
                variant="outlined"
                href={"/categorias"}
            >
                Lista Categorias
            </Button>
            <Button
                sx={{
                    border: "0px",
                    color: "#fff"
                }}
                variant="outlined"
                onClick={() => setOpenAccountModal(true)}
            >
                Conta
            </Button>
        </Stack>
        <AccountModal open={openAccountModal} onClose={() => setOpenAccountModal(false)}/>
        <CreateCategoryModal open={openCategory} onClose={() => setOpenCategory(false)} update={null} />
        <CreateTransactionModal open={openTransaction} onClose={() => setOpenTransaction(false)} update={null}/>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{
            mt: "auto",
            m: 2,
            borderRadius: 2,
            textTransform: "none",
            px: 3,
          }}
        >
          Sair
        </Button>
      </Drawer>

      {/* Conteúdo */}
      <Box sx={{ flexGrow: 1 }}>
        
        {/* Topbar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6">Dashboard</Typography>
          </Toolbar>
        </AppBar>

        {/* Página */}
        <Box sx={{ p: 3,  width:'100%', display: "flex", flexDirection: "column", alignItems: "space-between"}}>{children}</Box>
      </Box>
    </Box>
  );
}