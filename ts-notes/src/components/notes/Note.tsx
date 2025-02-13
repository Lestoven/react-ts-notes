import { Paper, IconButton, Box, Typography, Divider } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import ChecklistPanel from "../ChecklistPanel";
import { Checklist, Checklist as NodeChecklist } from "../../types/Checklist";
import Grid from "@mui/material/Grid";
import { NoteData } from "../../interfaces/NoteData";
import { useNotesDispatch } from "../../contexts/NotesContext";
import { handleNoteUpdate } from "../../contexts/NotesContext";

const Note = ({ note }: { note: NoteData }) => {
    const notesDispatch = useNotesDispatch();

    const handleCheckListChange = (updatedList: Checklist) => {
        if (notesDispatch) {
            const updatedNote = { ...note, content: updatedList };
            handleNoteUpdate(updatedNote, notesDispatch);
        }
    };

    const handlePinClick = () => {
        if (notesDispatch) {
            const updatedNote = { ...note, isPinned: !note.isPinned };
            handleNoteUpdate(updatedNote, notesDispatch);
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                    borderRadius: 2,
                    width: "100%",
                    minHeight: "150px",
                    boxSizing: "border-box",
                }}
                elevation={3}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" component="h2">
                        {note.title}
                    </Typography>
                    <IconButton onClick={handlePinClick}>
                        <PushPinIcon color={note.isPinned ? "primary" : "inherit"}/>
                    </IconButton>
                </Box>
                <Divider sx={{ marginY: 1 }} />
                <Box sx={{ marginTop: 1 }}>
                    {typeof note.content === "string" ? (
                        <Typography variant="body2">{note.content}</Typography>
                    ) : (
                        <ChecklistPanel checklistElements={note.content as NodeChecklist} onChecklistChange={handleCheckListChange} />
                    )}
                </Box>
            </Paper>
        </Grid>
    )
};

export default Note;