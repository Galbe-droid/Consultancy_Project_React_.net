import type {CategoryDto, ReturnCategory} from "../../types/category.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createCategory, updateCategory} from "../../services/categoryService.tsx";
import AlertSnackBar from "../alertSnackBar.tsx";

type Props = {
    open: boolean,
    onClose: () => void,
    update: ReturnCategory | null,
    reloadCategories: () => Promise<void> | null,
};

export default function CreateCategoryModal({open, onClose, update, reloadCategories}: Props) {
    const [categoryForm, setCategoryForm] = useState<CategoryDto>(!update ? {
        name: '',
        description: '',
        categoryType: 0,
    } : {
        name: update.name,
        description: update.description,
        categoryType: update.categoryType,
    });

    //loading
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState({name: "", description: ""});

    //Snackbar de aviso
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState<"success" | "error">("success");

    const cleanInputOInExit = () => {
        setCategoryForm({
            name: '',
            description: '',
            categoryType: 0,
        });
        setFormError({
            name: '',
            description: '',
        });
    }

    useEffect(() => {
        if (update) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCategoryForm({
                name: update.name,
                description: update.description,
                categoryType: update.categoryType,

            });
        }
    }, [update]);


    const validateForm = () => {
        const newErrors = {name: '', description: ''}

        if (!categoryForm?.name) newErrors.name = "O nome é obrigatório";
        if (categoryForm.name.length < 3) newErrors.name = "O nome deve conter ao menos 3 caracteres";
        if (categoryForm.name.length > 18) newErrors.name = "O nome deve conter no máximo 18 caracteres";
        if (categoryForm.description.length > 400) newErrors.description = "A descrição deve conter no máximo 400 caracteres";

        setFormError(newErrors);

        return Object.values(newErrors).every((e) => e === "");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryForm((prev) => ({...prev, [name]: value}));
        setFormError((prev) => ({...prev, [name]: ""}));
    }

    const handleSubmit =  async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            if(!validateForm()){
                setLoading(false);
                return;
            }
            if(update != null){
                await updateCategory(categoryForm, update.id);
                await reloadCategories();
                setSnackMessage("Categoria atualizada com sucesso!");
                setSnackType("success");
                setSnackOpen(true);
            }
            else{
                await createCategory(categoryForm)
                setSnackMessage("Categoria criada com sucesso!");
                setSnackType("success");
                setSnackOpen(true);
            }

            cleanInputOInExit();
            setTimeout(() => {
                onClose();
            }, 700);
        }catch (err){
            setSnackMessage("Erro ao criar/atualizar categoria.");
            setSnackType("error");
            setSnackOpen(true);
        }finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{update ? "Atualizar" : "Criar" } categoria</DialogTitle>
            {loading && <p>Carregando...</p>}
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="name"
                        margin="normal"
                        value={categoryForm?.name || ""}
                        onChange={handleInputChange}
                        error={!!formError.name}
                        helperText={formError.name}
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        name="description"
                        margin="normal"
                        value={categoryForm?.description || ""}
                        onChange={handleInputChange}
                        error={!!formError.description}
                        helperText={formError.description}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Tipo"
                        margin="normal"
                        name="categoryType"
                        value={categoryForm?.categoryType || 0}
                        onChange={handleInputChange}
                    >
                        <MenuItem value={0}>Receita</MenuItem>
                        <MenuItem value={1}>Despesa</MenuItem>
                        <MenuItem value={2}>Ambos</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" type="submit">
                        Salvar
                    </Button>
                </DialogActions>
            </form>
            <AlertSnackBar open={snackOpen} onClose={() => setSnackOpen(false)} severity={snackType} alertMessage={snackMessage}/>
        </Dialog>
    )
}