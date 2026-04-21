import {Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import type {ReturnCategory} from "../types/category.ts";
import {useState} from "react";
import {mapFormatDate} from "../mapper/mapper.tsx";
import {deleteCategory, getCategoryById, updateCategory} from "../services/categoryService.tsx";
import CreateCategoryModal from "./Modals/createCategoryModal.tsx";

type Props = {
    categories: ReturnCategory[];
    reloadCategories: () => Promise<void>;
};

export default function CategoryList({ categories, reloadCategories }: Props) {
    const[open, setOpen] = useState(false);
    const[categorySelected, setCategorySelected] = useState<ReturnCategory>();
    const getType = (type: 0 | 1 | 2) => {
        if (type === 0) return "Receita";
        if (type === 1) return "Despesa";
        return "Ambos";
    };

    const getCategories = async (id: string) => {
        const data = await getCategoryById(id);

        setCategorySelected(data);
        setOpen(true);
    };

    return (
        <Paper sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {categories.map((c) => (
                        <TableRow key={c.id}>
                            <TableCell>{c.name}</TableCell>

                            <TableCell>
                                {c.description}
                            </TableCell>

                            <TableCell>
                                {mapFormatDate(c.createDate)}
                            </TableCell>

                            <TableCell>
                                <Chip
                                    label={getType(c.categoryType)}
                                    color={
                                        c.categoryType === 0
                                            ? "success"
                                            : c.categoryType === 1
                                                ? "error"
                                                : "primary"
                                    }
                                />
                            </TableCell>

                            <TableCell>
                                <Button color="primary" onClick={() => {getCategories(c.id);}}>
                                    Atualizar
                                </Button>
                            </TableCell>

                            <TableCell>
                                <Button color="error" onClick={async() => {if (!window.confirm(`Excluir "${c.name}"?`)) return;
                                                                await deleteCategory(c.id);
                                                                await reloadCategories();}}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CreateCategoryModal open={open} onClose={() => {setOpen(false)}} update={categorySelected as ReturnCategory} reloadCategories={reloadCategories} />
        </Paper>
    );
}