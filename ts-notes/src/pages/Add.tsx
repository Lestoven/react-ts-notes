import { handleNoteSave, useNotesDispatch } from "../contexts/NotesContext";
import { NoteCreationData } from "../types/note";
import { NoteType } from "../types/noteType";
import { Container } from "@mui/material";
import NoteEditor from "../components/notes/NoteEditor";
import { ReactNode, useState } from "react";
import TriggerNewNote from "../components/notes/TriggerNewNote";

export type AddState = "idle" | NoteType.Text | NoteType.Checklist;
const Add = () => {
    const defaultNoteDataTemplate: NoteCreationData & { addState: AddState } = {
        addState: "idle",
        title: "",
        type: NoteType.Text,
        content: "",
        shared_with: [], // userids
        color: "white",
        isPinned: false
    };

    const [defaultNoteData, setDefaultNoteData] = useState<NoteCreationData & { addState: AddState }>(defaultNoteDataTemplate);
    const notesDispatch = useNotesDispatch();

    const handleAddStateChange = (newAddState: AddState) => {
        if (newAddState === "idle") {
            setDefaultNoteData(defaultNoteDataTemplate);
        } else if (newAddState === NoteType.Text) {
            setDefaultNoteData({ ...defaultNoteData, addState: newAddState, type: NoteType.Text, content: "" });
        } else {
            setDefaultNoteData({ ...defaultNoteData, addState: newAddState, type: NoteType.Checklist, content: [] });
        }
    }

    async function handleSave(noteData: NoteCreationData) {
        if (notesDispatch) {
            // reset the Note input
            handleAddStateChange("idle");

            await handleNoteSave(noteData, notesDispatch);
        }
    };

    const handleClose = () => {
        handleAddStateChange("idle");
    };

    const getContent = (): ReactNode => {
        if (defaultNoteData.addState === "idle") {
            return (
                <TriggerNewNote handleAddStateChange={handleAddStateChange} />
            );
        } else {
            return (
                <NoteEditor defaultNoteData={defaultNoteData} onSave={handleSave} onClose={handleClose} />
            );
        }
    }

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px"
            }}
        >
            {getContent()}
        </Container>
    );
};

export default Add;