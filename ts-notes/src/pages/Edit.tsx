import { Note } from "../types/note";
import { useModalDispatch } from "../contexts/ModalContext";
import { useNotesDispatch, handleNoteUpdate } from "../contexts/NotesContext";
import NoteEditor from "../components/notes/NoteEditor";
import { Container } from "@mui/material";

const Edit = ({ defaultNoteData }: { defaultNoteData: Note }) => {
    const modalDispatch = useModalDispatch();
    const notesDispatch = useNotesDispatch();

    const handleSave = (noteData: Note) => {
        if (notesDispatch) {
            handleClose();
            handleNoteUpdate(noteData, notesDispatch);
        }
    };

    const handleClose = () => {
        if (modalDispatch) {
            modalDispatch({ type: "close" });
        }
    };
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <NoteEditor defaultNoteData={defaultNoteData} onSave={handleSave} onClose={handleClose} />
        </Container>
    );
};

export default Edit;