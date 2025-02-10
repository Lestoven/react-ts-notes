import { TextField, Box, Checkbox, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";
import { Checklist } from "../types/Checklist";

const ChecklistPanel = ({ checklistElements, onChecklistChange }: { checklistElements: Checklist, onChecklistChange: (newContent: Checklist) => void }) => {

    const addListItem = () => {
        onChecklistChange([...checklistElements, { id: crypto.randomUUID(), content: "", isChecked: false }]);
    };

    const removeListItem = (id: string) => {
        onChecklistChange(checklistElements.filter(e => e.id !== id));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        onChecklistChange(checklistElements.map(
            element => element.id === id ? { ...element, content: e.target.value, isChecked: element.isChecked } : element)
        );
    }

    return (
        <Box sx={{ marginTop: 1 }}>
            {checklistElements.map(listItem => (
                <Box key={listItem.id} sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                    <Checkbox checked={listItem.isChecked} onChange={(e) => {
                        onChecklistChange(checklistElements.map(
                            element => element.id === listItem.id ? { ...listItem, isChecked: e.target.checked } : element)
                        );
                    }} />
                    <TextField
                        variant="standard"
                        fullWidth
                        value={listItem.content}
                        placeholder="Listaelem"
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => handleChange(e, listItem.id)}
                    />
                    <IconButton onClick={() => removeListItem(listItem.id)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            ))}
            <Typography sx={{ cursor: "pointer", color: "blue" }} onClick={addListItem}>+ Listaelem</Typography>
        </Box>
    );
};

export default ChecklistPanel;