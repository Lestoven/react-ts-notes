import { useReducer, ReactNode, ChangeEvent } from "react";
import { Checklist } from "../../types/list";
import NoteDescription from "./NoteDescription";
import ChecklistPanel from "../ChecklistPanel";
import NoteSkeleton from "./NoteSkeleton";
import { NoteType } from "../../types/noteType";
import { convertChecklistToDescription, convertDescriptionToChecklist } from "../../utils/noteUtils";
import { isChecklistNote, isTextNote } from "../../types/noteTypeGuards";
import { Container } from "@mui/material";
import { NoteData, NoteAction } from "../../types/noteAction";


const NoteEditor = <T extends NoteData>({ defaultNoteData, onSave, onClose }:
    {
        defaultNoteData: T,
        onSave: (noteData: T) => void,
        onClose: () => void
    }) => {
    const [note, dispatch] = useReducer(noteReducer, defaultNoteData);

    const handleContentChange = (newContent: ChangeEvent<HTMLInputElement> | Checklist) => {
        if ("target" in newContent) {
            dispatch({ type: "contentChange", newContent: newContent.target.value, noteType: NoteType.Text });
        } else {
            dispatch({ type: "contentChange", newContent: newContent, noteType: NoteType.Checklist });
        }
    }

    const getContent = (): ReactNode => {
        let noteContent;
        if (isTextNote(note)) {
            noteContent = <NoteDescription content={note.content} onContentChange={handleContentChange} />
        } else if (isChecklistNote(note)) {
            noteContent = <ChecklistPanel checklistElements={note.content} onChecklistChange={handleContentChange} />;
        }

        return (
            <NoteSkeleton
                note={note}
                dispatch={dispatch}
                onSave={() => onSave(note as T)}
                onClose={onClose}
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



function noteReducer(note: NoteData, action: NoteAction): NoteData {
    switch (action.type) {
        case ("reset"): {
            return { ...action.defaultNoteData };
        }
        case ("typeChange"): {
            if (isTextNote(note) && action.newType === NoteType.Checklist) {
                return { ...note, type: NoteType.Checklist, content: convertDescriptionToChecklist(note.content) };
            } else if (isChecklistNote(note) && action.newType === NoteType.Text) {
                return { ...note, type: NoteType.Text, content: convertChecklistToDescription(note.content) };
            }
            return { ...note };
        }
        case ("titleChange"): {
            return { ...note, title: action.newTitle };
        }
        case ("contentChange"): {
            if (action.noteType === NoteType.Text) {
                // For TextNote, ensure content is a string
                return {
                    ...note,
                    type: NoteType.Text,
                    content: action.newContent, // newContent is a string
                };
            } else if (action.noteType === NoteType.Checklist) {
                // For ChecklistNote, ensure content is a Checklist
                return {
                    ...note,
                    type: NoteType.Checklist,
                    content: action.newContent, // newContent is a Checklist
                };
            }
            return note;
        }
        case ("pinChange"): {
            return { ...note, isPinned: !note.isPinned };
        }
        default: {
            const _exhaustiveCheck: never = action;
            return note;
        }
    }
}

export default NoteEditor;