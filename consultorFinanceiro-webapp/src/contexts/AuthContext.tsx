/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import api from "../api/api";
import type { RegisterUser } from "../models/User";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, userData: AuthUser) => void;
  user: AuthUser | null,
  logout: () => void;
  register: (registerUser: RegisterUser) => Promise<{ success: boolean; errors?: any }>;
  deleteAccount: (id: string) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState<AuthUser | null>(() => {
      const saved = localStorage.getItem("userInfo");
      return saved ? JSON.parse(saved) : null;
    });

    const login = (token: string, userInfo: AuthUser) => {
        try{            
            localStorage.setItem("userInfo", JSON.stringify(userInfo.data))
            localStorage.setItem("token", token);   
            setUser(userInfo)         
            setIsAuthenticated(true);
        }catch(err){
            console.error("Login error:", err);
        }        
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
    }

    const register = async (user: RegisterUser) => {
        try{
            await api.post("/Auth/register", user);
            return { success: true };
        }catch(err : any){
            console.error(err);
            return { success: false, errors: err.response?.data?.errors, };
        }
    }

    const deleteAccount = async(id: string) => {
        try{
            await api.delete(`/Auth/delete/${id}`);
            logout();
        }catch(err){
            console.error(err);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    )
}

