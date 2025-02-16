import { Note, TextNote, ChecklistNote } from './note';
import { NoteType } from './noteType';

export function isTextNote(note: Note): note is TextNote {
    return note.type === NoteType.Text;
}

export function isChecklistNote(note: Note): note is ChecklistNote {
    return note.type === NoteType.Checklist;
}