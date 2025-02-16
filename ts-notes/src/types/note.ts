import { Checklist } from "./list"
import { NoteType } from "./noteType"

export interface BaseNote {
    readonly id: number,
    dateCreated: Date,
    dateUpdated: Date | null,
    owner: number, // userid
    title: string,
    shared_with: number[], // userids
    color: string,
    isPinned: boolean
}

interface TextNoteContent {
    type: NoteType.Text,
    content: string
}
interface ChecklistNoteContent {
    type: NoteType.Checklist,
    content: Checklist
}

export type TextNote = BaseNote & TextNoteContent;
export type ChecklistNote = BaseNote & ChecklistNoteContent;

export type Note = TextNote | ChecklistNote; // Describes a note that is complete (displayed on the UI or arrive from backend)
export type NoteCreationData 
    = Omit<BaseNote, 'id' | 'dateCreated' | 'dateUpdated' | 'owner'> & (TextNoteContent | ChecklistNoteContent); // Describes a note that is under construction