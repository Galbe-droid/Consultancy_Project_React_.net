import DashboardLayout from "../layout/DashboardLayout.tsx";
import TransactionList from "../../components/transactionList.tsx";
import {getAllTransactions} from "../../services/transactionService.tsx";
import type {ReturnTransaction} from "../../types/transaction.ts";
import {useEffect, useState} from "react";

export default function Transacoes() {
    const [trasactionList, setTransactionList] = useState<ReturnTransaction[]>([]);

    const getList = async() => {
        const list = await getAllTransactions();
        setTransactionList(list);
        return trasactionList;
    }

    const reloadTransactions = async () => {
        const data = await getAllTransactions();
        setTransactionList(data);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getList();
    }, []);

    return (
        <DashboardLayout>
            <TransactionList transactions={trasactionList} reloadTransactions={reloadTransactions} />
        </DashboardLayout>
    )
}