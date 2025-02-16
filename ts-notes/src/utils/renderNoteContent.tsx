import { ReactNode } from "react";
import { Note } from "../types/note";
import { NoteType } from "../types/noteType";
import ChecklistPanel from "../components/ChecklistPanel";
import { Typography } from "@mui/material";
import { Checklist } from "../types/list";

export const renderNoteContent = (note: Note, handleCheckListChange: (updatedList: Checklist) => void): ReactNode => {
    if (note.type === NoteType.Text) {
        return (
            <Typography variant="body2">{note.content}</Typography>
        );
    } else if (note.type === NoteType.Checklist) {
        return (
            <ChecklistPanel checklistElements={note.content} onChecklistChange={handleCheckListChange} />
        );
    } else {
        const _exhaustiveCheck: never = note;
        return _exhaustiveCheck;
    }
};