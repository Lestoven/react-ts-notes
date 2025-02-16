import { TextNote, ChecklistNote, NoteCreationData } from './note';
import { NoteType } from './noteType';


export function isTextNote(note: NoteCreationData): note is TextNote {
    return note.type === NoteType.Text;
}

export function isChecklistNote(note: NoteCreationData): note is ChecklistNote {
    return note.type === NoteType.Checklist;
}