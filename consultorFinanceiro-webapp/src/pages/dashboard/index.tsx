import {Typography, Grid, Card, CardContent, Box} from "@mui/material";
import DashboardLayout from "../layout/DashboardLayout";
import UsersTable from "./userTable";
import SmallCard from "../../components/cards";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState} from "react";
import type {MinimalTransaction} from "../../types/transaction.ts";
import {getMinimalTransactions} from "../../services/transactionService.tsx";
import {mapDecimals} from "../../mapper/mapper.tsx";

export default function Dashboard() {
  const {isAuthenticated, user} = useAuth();
  const [minimalTransactions, setMinimalTransactions] = useState<MinimalTransaction[]>([]);
  const [indexInfo, setIndexInfo] = useState(!user ? {
    name: "",
    surName: "",
    profit: 0,
    expanses: 0,
    balance: 0,
  }: {
    name: user.name,
    surName: user.surName,
    profit: minimalTransactions.reduce((acc, t) => { return t.transactionType === 0 ? acc + t.amount : acc;}, 0),
    expanses: minimalTransactions.reduce((acc, t) => { return t.transactionType === 1 ? acc + t.amount : acc;}, 0),
    balance: minimalTransactions.reduce((acc, t) => { return t.transactionType === 0 ? acc + t.amount : acc - t.amount},0)
  });



  useEffect(() => {
    if(!user){
      return;
    }
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
        <Typography sx={{
          mb:2
        }} variant="h5">
          Bem-vindo {indexInfo.name + " " + indexInfo.surName} 👋
        </Typography>
      }
      <Box sx={{
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Grid container spacing={2}>

          <SmallCard title="Entradas" value={mapDecimals(indexInfo.profit)} />

          <SmallCard title="Saídas" value={mapDecimals(indexInfo.expanses)}/>

          <SmallCard title="Saldo" value={mapDecimals(indexInfo.balance)}/>
        </Grid>
        <Grid container spacing={2} sx={{mt:4}}>
            <Card sx={{ background: "#1e1e1e", width: "100%" }}>
              <CardContent>
                <UsersTable/>
              </CardContent>
            </Card>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}