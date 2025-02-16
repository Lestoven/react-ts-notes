import { TextField, Paper, InputAdornment, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const TriggerNewNote = ({onTrigger} : {onTrigger: (newNoteCreationState: NoteCreationState) => void}) => {
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
                onFocus={() => onTrigger("noteWithDescription")}
            />
            <InputAdornment position="end">
                <IconButton onClick={() => onTrigger("noteWithChecklist")}>
                    <CheckBoxIcon />
                </IconButton>

            </InputAdornment>
        </Paper>
    )
};

export default TriggerNewNote;