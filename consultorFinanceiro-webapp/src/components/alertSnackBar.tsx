import {Alert, Snackbar } from "@mui/material";

type Props = {
    severity: "success" | "error",
    open: boolean,
    onClose: (open: boolean) => void,
    alertMessage: string,
};

export default function AlertSnackBar (Props: Props) {
    return(
        <Snackbar
            open={Props.open}
            autoHideDuration={3000}
            onClose={() => Props.onClose(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                severity={Props.severity}
                variant="filled"
                onClose={() => Props.onClose(false)}
            >
                {Props.alertMessage}
            </Alert>
        </Snackbar>
    )
}