import { NoteData } from "../interfaces/NoteData";

export async function getNotes(): Promise<NoteData[]> {
    await getNotesData(2000);
    return [{
        id: 0,
        title: "New Note",
        content: "ye is crazy",
        shared_with: [], // userids
        color: "white",
        isPinned: false,
        dateCreated: new Date(),
        dateUpdated: null,
        owner: 1
    },
    {
        id: 1,
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