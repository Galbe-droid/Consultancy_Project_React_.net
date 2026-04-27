import {Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {mapDecimals, mapFormatDate} from "../mapper/mapper.tsx";
import type { ReturnTransaction } from "../types/transaction";
import {deleteTransaction, getTransactionById} from "../services/transactionService.tsx";
import CreateTransactionModal from "./Modals/createTransactionModal.tsx";
import {useState} from "react";

type Props = {
    transactions: ReturnTransaction[];
    reloadTransactions: () => Promise<void>;
};

export default function TransactionList({ transactions, reloadTransactions }: Props) {
    const[open, setOpen] = useState(false);
    const[transactionsSelected, setTransactionsSelected] = useState<ReturnTransaction>();

    const getTransaction = async (id: string) => {
        const data = await getTransactionById(id);

        setTransactionsSelected(data);
        setOpen(true);
    };

    return (
        <Paper sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Título</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transactions.map((t, index) => (
                        <TableRow key={index}>
                            <TableCell>{t.title}</TableCell>
                            <TableCell>{t.description}</TableCell>
                            <TableCell>{mapFormatDate(t.createdDate)}</TableCell>
                            <TableCell>
                                {mapDecimals(t.amount)}
                            </TableCell>
                            <TableCell>
                                {t.transactionType === 0 ? (
                                    <Chip
                                        label="Receita"
                                        color="success"
                                    />
                                ) : (
                                    <Chip
                                        label="Despesa"
                                        color="error"
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                <Button
                                    sx={{
                                        border: "0px"
                                    }}
                                    variant="outlined"
                                    color="#fff"
                                    onClick={() => {getTransaction(t.id);}}
                                >
                                    Atualizar
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    sx={{
                                        border: "0px"
                                    }}
                                    variant="outlined"
                                    color="#ff162a"
                                    onClick={async() => {if (!window.confirm(`Excluir "${t.title}"?`)) return;
                                                    await deleteTransaction(t.id);
                                                    await reloadTransactions();}}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CreateTransactionModal open={open} onClose={() => setOpen(false)} update={transactionsSelected as ReturnTransaction} reloadTransaction={reloadTransactions} />
        </Paper>
    );
}