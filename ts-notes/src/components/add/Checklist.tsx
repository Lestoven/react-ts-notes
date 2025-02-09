import { Checklist as noteChecklist } from "../../types/Checklist";
import { TextField, Box, Checkbox, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";

const Checklist = ({ checklistElements, onChecklistChange }: { checklistElements: noteChecklist, onChecklistChange: (newContent: noteChecklist) => void }) => {

    const addListItem = () => {
        onChecklistChange([...checklistElements, { content: "", isChecked: false }]);
    };

    const removeListItem = (idx: number) => {
        onChecklistChange(checklistElements.filter((_, i) => i !== idx));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx: number) => {
        onChecklistChange(checklistElements.map(
            (item, i) => i === idx ? { content: e.target.value, isChecked: item.isChecked } : item)
        );
    }


    return (
        <Box sx={{ marginTop: 1 }}>
            {checklistElements.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                    <Checkbox checked={item.isChecked} onChange={(e) => {
                        onChecklistChange(checklistElements.map(
                            (item, i) => i === idx ? { content: item.content, isChecked: e.target.checked } : item)
                        );
                    }} />
                    <TextField
                        variant="standard"
                        fullWidth
                        value={item.content}
                        placeholder="Listaelem"
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => handleChange(e, idx)}
                    />
                    <IconButton onClick={() => removeListItem(idx)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            ))}
            <Typography sx={{ cursor: "pointer", color: "blue" }} onClick={addListItem}>+ Listaelem</Typography>
        </Box>
    );
};

export default Checklist;