import { NewNoteData } from "../interfaces/NewNoteData";
import { NoteCreationState } from "./NoteCreationState";

export interface NoteCreationData extends NewNoteData {
    noteCreationState: NoteCreationState
}