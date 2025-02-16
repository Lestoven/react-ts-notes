import { Note } from "../types/note";
import { NoteType } from "../types/noteType";

export async function getNotes(): Promise<Note[]> {
    await getNotesData(200);
    return [{
        id: 0,
        type: NoteType.Text,
        title: "New Note",
        content: "this is crazy",
        shared_with: [], // userids
        color: "white",
        isPinned: false,
        dateCreated: new Date(),
        dateUpdated: null,
        owner: 1
    },
    {
        id: 1,
        type: NoteType.Checklist,
        title: "Note Title",
        content: [{ id: "id1", content: "item1", isChecked: true }, 
            { id: "id2", content: "item2", isChecked: true }, 
            { id: "id3", content: "item3", isChecked: false }],
        shared_with: [], // userids
        color: "black",
        isPinned: false,
        dateCreated: new Date(),
        dateUpdated: null,
        owner: 1
    },
    {
        id: 2,
        type: NoteType.Text,
        title: "Fresh Note",
        content: "wow!",
        shared_with: [], // userids
        color: "white",
        isPinned: true,
        dateCreated: new Date(),
        dateUpdated: null,
        owner: 1
    }];
};

function getNotesData(responseTime: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Note data obtained!");
            resolve(true);
        }, responseTime);
    });
};