import {Button, Dialog, DialogTitle, Stack} from "@mui/material";
import {createModal} from "react-modal-promise";

const MuiDialog = ({isOpen, onResolve, onReject, title, op1, op2, op3}) => {
    return (
        <Dialog open={isOpen} onClose={onReject}>
            <DialogTitle>{title}</DialogTitle>
            <Stack>
                <Button onClick={() => onResolve(op1)}>{op1}</Button>
                <Button onClick={() => onResolve(op2)}>{op2}</Button>
                <Button onClick={() => onResolve(op3)}>{op3}</Button>
            </Stack>
        </Dialog>
    );
};

export const RouteOptionsDialog = createModal(MuiDialog);
