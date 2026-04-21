export interface TransactionDto{
    title:string;
    description:string;
    amount:number;
    transactionType: 0 | 1;
    categoryId:string | null;
}

export interface MinimalTransaction{
    id:string;
    title:string;
    description:string;
    amount:number;
    transactionType: 0 | 1;
}

export interface ReturnTransaction{
    id:string;
    title:string;
    description:string;
    createdDate:string;
    amount:number;
    transactionType: 0 | 1;
    categoryId:string;
}