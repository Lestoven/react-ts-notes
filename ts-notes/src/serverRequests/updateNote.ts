import { Note } from "../types/note";

// updated the note
export async function updateNote(newNoteData: Note) {
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