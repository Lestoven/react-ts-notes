import { NoteData } from "../interfaces/NoteData";
import { NewNoteData } from "../interfaces/NewNoteData";
import { List } from "../types/List";

export const isNoteContentList = (noteData: NoteData | NewNoteData): noteData is NoteData & { content: List } => {
    return typeof noteData.content !== "string";
};