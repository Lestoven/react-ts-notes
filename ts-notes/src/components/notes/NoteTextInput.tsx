import { TextField } from "@mui/material";
import { NoteType } from "../../types/noteType";
import { NoteAction } from "../../types/noteAction";

const NoteTextInput = ({ content, dispatch }:
    {
        content: string,
        dispatch: React.Dispatch<NoteAction>
    }) => {
    return (
        <TextField
            value={content}
            variant="standard"
            placeholder="Jegyzet..."
            fullWidth
            multiline
            InputProps={{ disableUnderline: true }}
            sx={{ marginTop: 1 }}
            onChange={e => dispatch({ type: "contentChange", newContent: e.target.value, noteType: NoteType.Text })}
        />
    );
};

export default NoteTextInput;