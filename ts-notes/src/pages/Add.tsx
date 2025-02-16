import { ChangeEvent, ReactNode, useState } from "react";
import ChecklistPanel from "../components/ChecklistPanel";
import { Container } from "@mui/material";
import TriggerNewNote from "../components/add/TriggerNewNote";
import NewNoteSkeleton from "../components/add/NewNoteSkeleton";
import { NoteCreationState } from "../types/NoteCreationState";
import { Checklist } from "../types/Checklist";
import { NoteCreationData } from "../types/NoteCreationData";
import { handleNoteSave, useNotesDispatch } from "../contexts/NotesContext";
import NoteDescription from "../components/notes/NoteDescription";

/* The invariant of the component:
    * noteCreationState === "noteWithDescription" --> content is string
    * noteCreationState === "noteWithChecklist" --> content is Checklist (array of ChecklistElement)
*/
const Add = () => {
    const defaultNewNoteData: NoteCreationData = {
        noteCreationState: "choosingType",
        title: "",
        content: "",
        shared_with: [], // userids
        color: "white",
        isPinned: false
    };

    const [newNoteData, setNewNoteData] = useState<NoteCreationData>(defaultNewNoteData);
    const notesDispatch = useNotesDispatch();

    /* Utility function to convert the content of a Checklist to description*/
    const convertChecklistToDescription = () => {
        return (newNoteData.content as Checklist).map(c => c["content"]).join("\n");
    };
    /* Utility function to convert the content of a description to a Checklist*/
    const convertDescriptionToChecklist = () => {
        return (newNoteData.content as string).split("\n").map(
            txt => {
                return {
                    id: crypto.randomUUID(),
                    content: txt,
                    isChecked: false
                }
            });
    }

    const handleNoteCreationStateChange = (newNoteCreationState: NoteCreationState) => {
        let content: NoteCreationData["content"] = newNoteData.content; // use the previous value by default

        if (newNoteData.content.length > 0) { // if content was previously entered
            if (newNoteData.noteCreationState === "choosingType") {
                if (newNoteCreationState === "noteWithDescription" && Array.isArray(newNoteData.content)) {
                    content = convertChecklistToDescription();
                } else if (newNoteCreationState === "noteWithChecklist" && !Array.isArray(newNoteData.content)) {
                    content = convertDescriptionToChecklist();
                }
            } else if (newNoteData.noteCreationState === "noteWithChecklist" && newNoteCreationState === "noteWithDescription") {
                content = convertChecklistToDescription();
            } else if (newNoteData.noteCreationState === "noteWithDescription" && newNoteCreationState === "noteWithChecklist") {
                content = convertDescriptionToChecklist();
            }
        } else {
            content = newNoteCreationState === "noteWithDescription" ? "" : []; // set content to the default empty (depeding on the type of the note)
        }

        setNewNoteData({ ...newNoteData, content: content, noteCreationState: newNoteCreationState }); // set the new noteState with the updated content
    };

    const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNoteData({ ...newNoteData, title: e.target.value });
    }

    function handleContentChange(newContent: ChangeEvent<HTMLInputElement>): void
    function handleContentChange(newContent: Checklist): void
    function handleContentChange(newContent: ChangeEvent<HTMLInputElement> | Checklist) {
        if ('target' in newContent) {
            setNewNoteData({ ...newNoteData, content: newContent.target.value });
        } else {
            setNewNoteData({ ...newNoteData, content: newContent });
        }
    }

    const handlePinChange = () => {
        setNewNoteData({ ...newNoteData, isPinned: !newNoteData.isPinned });
    }

    const handleNoteDataReset = () => {
        if (newNoteData.noteCreationState === "noteWithDescription") {
            setNewNoteData({ ...defaultNewNoteData, noteCreationState: "noteWithDescription", content: "" });
        } else if (newNoteData.noteCreationState === "noteWithChecklist") {
            setNewNoteData({ ...defaultNewNoteData, noteCreationState: "noteWithChecklist", content: [] });
        } else {
            throw new Error(`Unexpected noteCreationState: ${newNoteData.noteCreationState}`)
        }
    };

    async function handleSave() {
        if (notesDispatch) {
            // reset the Note input
            setNewNoteData(defaultNewNoteData);

            await handleNoteSave(newNoteData, notesDispatch);
        }
    };

    const getContent = (): ReactNode => {
        if (newNoteData.noteCreationState === "choosingType") {
            return (
                <TriggerNewNote onTrigger={handleNoteCreationStateChange} />
            );
        }

        let noteContent;
        if (newNoteData.noteCreationState === "noteWithDescription") {
            noteContent = <NoteDescription content={newNoteData.content as string} onContentChange={handleContentChange} />
        } else if (newNoteData.noteCreationState === "noteWithChecklist") {
            noteContent = <ChecklistPanel checklistElements={newNoteData.content as Checklist} onChecklistChange={handleContentChange} />;
        } else {
            const _exhaustiveCheck: never = newNoteData.noteCreationState;
            return _exhaustiveCheck;
        }

        return (
            <NewNoteSkeleton
                newNoteData={newNoteData}
                onReset={handleNoteDataReset}
                onNoteCreationStateChange={handleNoteCreationStateChange}
                onNoteTitleChange={handleNoteTitleChange}
                onPinChange={handlePinChange}
                onSave={handleSave}
            >
                {noteContent}
            </NewNoteSkeleton>
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

export default Add;