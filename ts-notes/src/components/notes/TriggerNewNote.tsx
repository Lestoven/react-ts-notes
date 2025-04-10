import { TextField, Paper, InputAdornment, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AddState } from "../../pages/Add";
import { NoteType } from "../../types/noteType";

const TriggerNewNote = ({handleAddStateChange} : {handleAddStateChange: (newAddState: AddState) => void}) => {
    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "10px",
                width: "500px",
            }}
            elevation={3}
        >
            <TextField
                variant="standard"
                placeholder="Jegyzet..."
                fullWidth
                InputProps={{
                    disableUnderline: true,
                }}
                onFocus={() => handleAddStateChange(NoteType.Text)}
            />
            <InputAdornment position="end">
                <IconButton onClick={() => handleAddStateChange(NoteType.Checklist)}>
                    <CheckBoxIcon />
                </IconButton>
            </InputAdornment>
        </Paper>
    )
};

export default TriggerNewNote;