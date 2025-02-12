import { NoteData } from "../interfaces/NoteData";

// saves the note and returns the NoteData with the generated "id" included
export async function saveNote(newNoteData: Omit<NoteData, "id">): Promise<NoteData> {
    // save noteData
    await saveNoteOnServer(2000);
    
    const noteFromDB = {...newNoteData, id: 2}; 
    //throw new Error("asdsd");
    return noteFromDB;
};

function saveNoteOnServer(responseTime: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("note saved!");
            resolve(true);
        }, responseTime);
    });
};