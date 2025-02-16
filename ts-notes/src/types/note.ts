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

export interface TextNote extends BaseNote {
    type: NoteType.Text,
    content: string
}

export interface ChecklistNote extends BaseNote {
    type: NoteType.Checklist,
    content: Checklist
}

export type Note = TextNote | ChecklistNote;
