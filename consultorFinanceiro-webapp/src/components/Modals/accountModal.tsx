import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useAuth} from "../../hooks/useAuth.ts";


type Props = {
    open: boolean,
    onClose: () => void,
};

export function AccountModal({open, onClose}: Props) {
    const {deleteAccount, user} = useAuth();

    const deleteAccountSequence = async (id: string) => {
        deleteAccount(id);
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle><strong>Deletar Conta:</strong> </DialogTitle>
            <DialogContent>
                <Button onClick={() => (!confirm("Tem certeza que deseja deletar essa conta?") ? null : deleteAccountSequence(user?.id as string))} sx={(theme) => ({backgroundColor: theme.palette.error.main, color: theme.palette.common.black})}>Deletar</Button>
            </DialogContent>
        </Dialog>
    )
}