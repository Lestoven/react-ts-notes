import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

const NoteDescription = ({content, onContentChange} : {content: string, onContentChange(newContent: ChangeEvent<HTMLInputElement>): void}) => {
    return (
        <TextField
                value={content}
                variant="standard"
                placeholder="Jegyzet..."
                fullWidth
                multiline
                InputProps={{ disableUnderline: true }}
                sx={{ marginTop: 1 }}
                onChange={onContentChange}
            />
    );
};

export default NoteDescription;