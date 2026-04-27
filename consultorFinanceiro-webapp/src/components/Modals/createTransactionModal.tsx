import type {ReturnTransaction, TransactionDto} from "../../types/transaction.ts";
import React, { useEffect, useState} from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField,
    ToggleButton, ToggleButtonGroup
} from "@mui/material";
import {createTransaction, updateTransaction} from "../../services/transactionService.tsx";
import type {MinimalCategoryDto} from "../../types/category.ts";
import {getAllMinimalCategories} from "../../services/categoryService.tsx";
import AlertSnackBar from "../alertSnackBar.tsx";

type Props = {
    open: boolean,
    onClose: () => void,
    update: ReturnTransaction | null,
    reloadTransaction?: () => Promise<void>,
};

export default function CreateTransactionModal({open, onClose, update, reloadTransaction}: Props) {
    const [transactionForm, setTransactionForm] = useState<TransactionDto>({
        title: '',
        description: '',
        amount: 0,
        transactionType: 0,
        categoryId: null,
    });
    const [amountString, setAmountString] = useState<string>('');

    //carregar categorias
    const [choosenCategoryId, setChoosenCategoryId] = useState<string | null>(null);
    const [minimalCategories, setMinimalCategories] = useState<MinimalCategoryDto[]>([]);

    //erro e loading
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState({title: "", description: ""});

    //Snackbar de aviso
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState<"success" | "error">("success");

    useEffect(() => {
        if (open) {
            getAllMinimalCategories().then(setMinimalCategories);
        }
    }, [open]);

    useEffect(() => {
        if (update) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTransactionForm({
                title: update.title,
                description: update.description,
                amount: update.amount,
                transactionType: update.transactionType,
                categoryId: update.categoryId
            });
            setAmountString(String(update.amount));
            setChoosenCategoryId(update.categoryId);
        }
    }, [update]);

    useEffect(() => {
        if (!choosenCategoryId) return;
        const category = minimalCategories.find(
            m => m.id === choosenCategoryId
        );
        if (!category) return;
        if (category.categoryType === 2) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTransactionForm(prev => ({
            ...prev,
            transactionType: category.categoryType as 0 | 1
        }));
    }, [choosenCategoryId, minimalCategories]);

    const cleanInputOInExit = () => {
        setTransactionForm({
            title: '',
            description: '',
            amount: 0,
            transactionType: 0,
            categoryId: null,
        });
        setFormError({
            title: '',
            description: '',
        });
        setAmountString('');
        setChoosenCategoryId(null);
    }

    const getCategoryTypeNames = (categoryType: 0 | 1 | 2) => {
        if (categoryType === 0) {
            return "Receita";
        }
        if (categoryType === 1) {
            return "Despesa";
        }
        if (categoryType === 2) {
            return "Ambos";
        }
    }

    const validateForm = () => {
        const newErrors = {title: '', description: ''}

        if (!transactionForm?.title) newErrors.title = "O titulo é obrigatório";
        if (transactionForm.title.length < 3) newErrors.title = "O titulo deve conter ao menos 3 caracteres";
        if (transactionForm.title.length > 18) newErrors.title = "O titulo deve conter no máximo 18 caracteres";
        if (transactionForm.description.length > 400) newErrors.description = "A descrição deve conter no máximo 400 caracteres";

        setFormError(newErrors);

        return Object.values(newErrors).every((e) => e === "");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTransactionForm((prev) => ({...prev, [name]: value}));
        setFormError((prev) => ({...prev, [name]: ""}));
    }

    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value;

        // aceita números, vírgula e ponto
        value = value.replace(/[^0-9.,-]/g, "");

        setAmountString(value);
    };

    const handleMouseChange = (
        _: React.MouseEvent<HTMLElement>,
        newValue: 0 | 1 | null
    ) => {
        if (newValue !== null) {
            setTransactionForm(prev => ({
                ...prev,
                transactionType: newValue
            }));
        }
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            if(!validateForm()){
                setLoading(false);
                return;
            }
            if(update != null && reloadTransaction != undefined){
                const payload = {
                    ...transactionForm,
                    amount: Number(amountString.replace(",", ".")),
                    categoryId: choosenCategoryId,
                };

                await updateTransaction(payload, update.id);
                setSnackMessage("Transação atualizada com sucesso!");
                setSnackType("success");
                setSnackOpen(true);
                await reloadTransaction();
            }
            else{
                const payload = {
                    ...transactionForm,
                    amount: Number(amountString.replace(",", ".")),
                    categoryId: choosenCategoryId,
                };

                await createTransaction(payload)
                setSnackMessage("Transação criada com sucesso!");
                setSnackType("success");
                setSnackOpen(true);
            }
            cleanInputOInExit();
            setTimeout(() => {
                onClose();
            }, 700);
        }catch (err){
            setSnackMessage("Erro ao criar/atualizar transação.");
            setSnackType("error");
            setSnackOpen(true);
        }finally {
            setLoading(false);
        }
    }

    return (

        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{update ? "Atualizar" : "Criar" } Transação</DialogTitle>
            {loading && <p>Carregando...</p>}
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Titulo"
                        name="title"
                        margin="normal"
                        value={transactionForm?.title || ""}
                        onChange={handleInputChange}
                        error={!!formError.title}
                        helperText={formError.title}
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        name="description"
                        margin="normal"
                        value={transactionForm?.description || ""}
                        onChange={handleInputChange}
                        error={!!formError.description}
                        helperText={formError.description}
                    />
                    <TextField
                        fullWidth
                        label="Valor"
                        name="amountString"
                        margin="normal"
                        type="text"
                        inputMode="decimal"
                        value={amountString}
                        onChange={handleAmountChange}
                    />
                    {choosenCategoryId == null ||
                    minimalCategories.find(m => m.id === choosenCategoryId)?.categoryType === 2 ?
                        <Stack spacing={2}>
                            <ToggleButtonGroup
                                value={transactionForm?.transactionType}
                                exclusive
                                fullWidth
                                onChange={handleMouseChange}
                            >
                                <ToggleButton
                                    value={0}
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "success.main",
                                            color: "white"
                                        }
                                    }}
                                    disabled={minimalCategories.find(c => c.id === choosenCategoryId)?.categoryType === 1}
                                >
                                    Receita
                                </ToggleButton>

                                <ToggleButton
                                    value={1}
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "success.main",
                                            color: "white"
                                        }
                                    }}
                                    disabled={minimalCategories.find(c => c.id === choosenCategoryId)?.categoryType === 0}
                                >
                                    Despesa
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    : <></>}
                    {minimalCategories.length === 0 ? <></>
                    :
                        <TextField
                            select
                            fullWidth
                            label="Categoria"
                            margin="normal"
                            value={choosenCategoryId}
                            onChange={(e) => setChoosenCategoryId(e.target.value)}
                        >
                            <MenuItem key={0} value={null}>
                                Nenhuma categoria
                            </MenuItem>
                            {minimalCategories.map((cat: MinimalCategoryDto) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name} | {getCategoryTypeNames(cat.categoryType)}
                                </MenuItem>
                            ))}
                        </TextField>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {cleanInputOInExit(); onClose();}}>Cancelar</Button>
                    <Button variant="contained" type="submit">
                        Salvar
                    </Button>
                </DialogActions>
            </form>
            <AlertSnackBar open={snackOpen} onClose={() => setSnackOpen(false)} severity={snackType} alertMessage={snackMessage}/>
        </Dialog>
    )
}