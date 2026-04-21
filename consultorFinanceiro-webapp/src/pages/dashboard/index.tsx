import { Typography, Grid, Card, CardContent } from "@mui/material";
import DashboardLayout from "../layout/DashboardLayout";
import UsersTable from "./userTable";
import SmallCard from "../../components/cards";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState} from "react";
import type {MinimalTransaction} from "../../types/transaction.ts";
import {getMinimalTransactions} from "../../services/transactionService.tsx";
import {mapDecimals} from "../../mapper/mapper.tsx";

export default function Dashboard() {
  const [minimalTransactions, setMinimalTransactions] = useState<MinimalTransaction[]>([]);
  const [indexInfo, setIndexInfo] = useState({
    name: "",
    surName: "",
    profit: 0,
    expanses: 0,
    balance: 0,
  });
  const {isAuthenticated, user} = useAuth();


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndexInfo({
      name: user.name,
      surName: user.surName,
      profit: minimalTransactions.reduce((acc, t) => { return t.transactionType === 0 ? acc + t.amount : acc;}, 0),
      expanses: minimalTransactions.reduce((acc, t) => { return t.transactionType === 1 ? acc + t.amount : acc;}, 0),
      balance: minimalTransactions.reduce((acc, t) => { return t.transactionType === 0 ? acc + t.amount : acc - t.amount}, 0)
    });
    getMinimalTransactions().then(setMinimalTransactions);
  }, [minimalTransactions, user])

  return (
    <DashboardLayout>
      {!isAuthenticated ? <></> : 
      <Typography variant="h5" mb={2}>
        Bem-vindo {indexInfo.name + " " + indexInfo.surName} 👋
      </Typography>
      }

      <Grid container spacing={2}>

        <SmallCard title="Entradas" value={mapDecimals(indexInfo.profit)} />

        <SmallCard title="Saídas" value={mapDecimals(indexInfo.expanses)}/>

        <SmallCard title="Saldo" value={mapDecimals(indexInfo.balance)}/>

        <Grid item xs={12} md={4}>
          <Card sx={{ background: "#1e1e1e" }}>
            <CardContent>
              <UsersTable/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}