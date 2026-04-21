/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, } from "@mui/material";
import api from "../../api/api.ts";
import type {userList} from "../../types/user.ts";

export default function UsersTable() {
  const [users, setUsers] = useState<userList[]>([]);

  useEffect(() => {
    console.log("fetch rodou");
    const fetchUsers = async () => {
      const res = await api.get("/Dashboard");
      setUsers(res.data.data);
    };

    fetchUsers();
  }, []);

  return (
    <Paper sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Sobrenome</TableCell>
            <TableCell>Entradas</TableCell>
            <TableCell>Saídas</TableCell>
            <TableCell>Balanço</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u: any) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.surName}</TableCell>
              <TableCell>R$ {u.income}</TableCell>
              <TableCell>R$ {u.expense}</TableCell>
              <TableCell>R$ {u.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}