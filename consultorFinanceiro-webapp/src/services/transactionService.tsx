import type {MinimalTransaction, ReturnTransaction, TransactionDto} from "../types/transaction.ts";
import api from "../api/api.ts";

export const getAllTransactions = async (): Promise<ReturnTransaction[]> => {
    const response = await api.get(`/Transaction`);
    return response.data.data;
}

export const getTransactionById = async (id: string): Promise<ReturnTransaction> => {
    const response = await api.get(`/Transaction/${id}`);
    return response.data.data;
}

export const getMinimalTransactions = async (): Promise<MinimalTransaction[]> => {
    const response = await api.get(`/Transaction/minimal`);
    return response.data.data;
}

export const createTransaction = async(createTransaction: TransactionDto): Promise<ReturnTransaction> => {
    const response = await api.post(`/Transaction/create`, createTransaction);
    return response.data.data;
}

export const updateTransaction = async(update: TransactionDto, id:string): Promise<ReturnTransaction> => {
    const response = await api.put(`/Transaction/update/${id}`, update);
    return response.data.data;
}

export const deleteTransaction = async(id: string): Promise<boolean> => {
    const response = await api.delete(`/Transaction/delete/${id}`);
    return response.data.data;
}