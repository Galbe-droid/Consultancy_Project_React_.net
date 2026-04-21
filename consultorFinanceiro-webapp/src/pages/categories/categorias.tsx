import DashboardLayout from "../layout/DashboardLayout.tsx";
import {useEffect, useState} from "react";
import type {ReturnCategory} from "../../types/category.ts";
import {getAllCategories} from "../../services/categoryService.tsx";
import CategoryList from "../../components/categoryList.tsx";
import {Typography} from "@mui/material";

export default function Categorias() {
    const [categories, setCategories] = useState<ReturnCategory[]>([]);

    const loadCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <DashboardLayout>
            <Typography color="error">Atenção ! Modificar o tipo de categoria podera remover transação que não estão nos conformes</Typography>
            <CategoryList categories={categories} reloadCategories={loadCategories}/>
        </DashboardLayout>
    )
}