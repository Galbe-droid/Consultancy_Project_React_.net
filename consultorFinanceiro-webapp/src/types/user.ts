export interface LoginUser{
    login:string;
    password:string;
}

export interface RegisterUser{
    username:string;
    password:string;
    email:string;
    name:string;
    surName:string; 
}

export interface AuthUser{
    id:string;
    username:string;
    email:string;
    name:string;
    surName:string;
}

export interface userList{
    id:string;
    name:string;
    surname:string;
    income:number;
    expense:number;
    balance:number;
}