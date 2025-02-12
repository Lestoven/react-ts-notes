import { NoteData } from "../interfaces/NoteData";

// saves the note and returns the NoteData with the generated "id" included
export async function updateNote(newNoteData: NoteData) {
    const noteId: number = newNoteData.id;
    // save noteData    
    await updateNoteOnServer(2000);
    //throw new Error("asdsd");
};

function updateNoteOnServer(responseTime: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("note saved!");
            resolve(true);
        }, responseTime);
    });
};