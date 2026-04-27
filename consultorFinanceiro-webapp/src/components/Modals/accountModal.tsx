import {Box, Button, Dialog, Typography} from "@mui/material";
import {useAuth} from "../../hooks/useAuth.ts";


type Props = {
    open: boolean,
    onClose: () => void,
};

export function AccountModal({open, onClose}: Props) {
    const {logout, deleteAccount, user} = useAuth();

    const deleteAccountSequence = async (id: string) => {
        deleteAccount(id);
        logout()
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <Box sx={{display: "flex", flexDirection: "row", mb:4,gap: 2, ml:2, alignItems:"center",}}>
                <Typography><strong>Deletar Conta:</strong> </Typography>
                <Button onClick={() => (!confirm("Tem certeza que deseja deletar essa conta?") ? null : deleteAccountSequence(user?.id as string))} sx={(theme) => ({backgroundColor: theme.palette.error.main, color: theme.palette.common.black})}>Deletar</Button>
            </Box>
        </Dialog>
    )
}