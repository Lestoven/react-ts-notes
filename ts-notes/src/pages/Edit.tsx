import NoteSkeleton from "../components/notes/NoteSkeleton";
import { Note } from "../types/note";
import { ReactNode, useState } from "react";
import { Checklist } from "../types/list";
import ChecklistPanel from "../components/ChecklistPanel";
import { Container } from "@mui/material";
import NoteDescription from "../components/notes/NoteDescription";
import { ChangeEvent } from "react";
import { useModalDispatch } from "../contexts/ModalContext";
import { handleNoteUpdate } from "../contexts/NotesContext";
import { useNotesDispatch } from "../contexts/NotesContext";

const Edit = ({ originalNoteData }: { originalNoteData: Note }) => {
    const [noteData, setNoteData] = useState(originalNoteData);
    const modalDispatch = useModalDispatch();
    const notesDispatch = useNotesDispatch();

    const handleReset = () => setNoteData(originalNoteData);
    const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNoteData({ ...noteData, title: e.target.value });
    const handlePinChange = () => setNoteData({ ...noteData, isPinned: !noteData.isPinned });
    const handleClose = () => {
        if (modalDispatch) {
            modalDispatch({ type: "close" });
        }
    };

    const handleSave = () => {
        if (notesDispatch) {
            handleClose();
            handleNoteUpdate(noteData, notesDispatch);
        }
    };

    /* Utility function to convert the content of a Checklist to description*/
    const convertChecklistToDescription = () => {
        return (noteData.content as Checklist).map(c => c["content"]).join("\n");
    };
    /* Utility function to convert the content of a description to a Checklist*/
    const convertDescriptionToChecklist = () => {
        return (noteData.content as string).split("\n").map(
            txt => {
                return {
                    id: crypto.randomUUID(),
                    content: txt,
                    isChecked: false
                }
            });
    }

    const onNoteTypeChange = (newNoteType: NoteType) => {
        let content = noteData.content; // use the previous value by default

        if (noteData.content.length > 0) { // if content was previously entered
            if (isNoteContentList(noteData) && newNoteType === "noteWithDescription") {
                content = convertChecklistToDescription();
            } else if (!isNoteContentList(noteData) && newNoteType === "noteWithChecklist") {
                content = convertDescriptionToChecklist();
            }
        } else {
            content = newNoteType === "noteWithDescription" ? "" : []; // set content to the default empty (depeding on the type of the note)
        }

        setNoteData({ ...noteData, content: content }); // set the new noteData with the updated content
    };

    function handleContentChange(newContent: ChangeEvent<HTMLInputElement>): void
    function handleContentChange(newContent: Checklist): void
    function handleContentChange(newContent: ChangeEvent<HTMLInputElement> | Checklist) {
        if ('target' in newContent) {
            setNoteData({ ...noteData, content: newContent.target.value });
        } else {
            setNoteData({ ...noteData, content: newContent });
        }
    }

    const getContent = (): ReactNode => {
        let noteContent;
        if (!isNoteContentList(noteData)) {
            noteContent = <NoteDescription content={noteData.content as string} onContentChange={handleContentChange} />
        } else if (isNoteContentList(noteData)) {
            noteContent = <ChecklistPanel checklistElements={noteData.content as Checklist} onChecklistChange={handleContentChange} />;
        } else {
            const _exhaustiveCheck: never = noteData;
            return _exhaustiveCheck;
        }

        return (
            <NoteSkeleton
                noteData={noteData}
                onReset={handleReset}
                onNoteTypeChange={onNoteTypeChange}
                onNoteTitleChange={handleNoteTitleChange}
                onPinChange={handlePinChange}
                onClose={handleClose}
                onSave={handleSave}
            >
                {noteContent}
            </NoteSkeleton>
        );
    };

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

export default Edit;