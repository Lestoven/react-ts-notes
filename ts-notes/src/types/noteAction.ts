import { Note, NoteCreationData, TextNote, ChecklistNote } from "./note";
import { NoteType } from "./noteType";


export type NoteData = Note | NoteCreationData;

export type NoteAction =
    | { type: "reset", defaultNoteData: NoteData }
    | { type: "typeChange", newType: NoteType }
    | { type: "titleChange", newTitle: string }
    | { type: "contentChange"; newContent: TextNote["content"]; noteType: NoteType.Text }
    | { type: "contentChange"; newContent: ChecklistNote["content"]; noteType: NoteType.Checklist }
    | { type: "pinChange" };