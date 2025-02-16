import { Paper, IconButton, Box, Typography, Divider } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import ChecklistPanel from "../ChecklistPanel";
import { Checklist, Checklist as NodeChecklist } from "../../types/Checklist";
import Grid from "@mui/material/Grid";
import { NoteData } from "../../interfaces/NoteData";
import { useNotesDispatch } from "../../contexts/NotesContext";
import { handleNoteUpdate } from "../../contexts/NotesContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useModalDispatch } from "../../contexts/ModalContext";
import Edit from "../../pages/Edit";

const Note = ({ note }: { note: NoteData }) => {
    const notesDispatch = useNotesDispatch();
    const modalDispatch = useModalDispatch();

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

    const handleEditBtnClick = () => {
        if (modalDispatch) {
            modalDispatch({type: "open", title: "Jegyzet szerkeztése", content: <Edit originalNoteData={note}/>});
        }
    };

    const handleDeleteBtnClick = () => {

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
                    position: "relative",
                    boxShadow: "4px 4px 12px rgba(245, 245, 245, 0.18)",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: "6px 6px 16px rgba(165, 165, 165, 0.57)",
                    },
                }}
                elevation={3}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" component="h2">
                        {note.title}
                    </Typography>
                    <IconButton onClick={handlePinClick}>
                        <PushPinIcon color={note.isPinned ? "primary" : "inherit"} />
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

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        display: "flex",
                        gap: 1
                    }}
                >
                    <IconButton onClick={handleEditBtnClick} sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                        <EditIcon color="secondary" />
                    </IconButton>

                    <IconButton onClick={handleDeleteBtnClick} sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            </Paper>
        </Grid>
    )
};

export default Note;