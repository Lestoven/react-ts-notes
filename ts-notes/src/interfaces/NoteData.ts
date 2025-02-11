import { NewNoteData } from "./NewNoteData"

export interface NoteData extends NewNoteData {
    readonly id: number,
    dateCreated: Date,
    dateUpdated: Date | null,
    owner: number, // userid
}