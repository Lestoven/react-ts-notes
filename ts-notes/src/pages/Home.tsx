import { useState } from "react";
import { NoteData } from "../interfaces/NoteData";
import Notes from "../components/notes/Notes";
import { Container } from "@mui/material";

const Home = () => {
    const [notesData, setNotesData] = useState<NoteData[]>([{
        id: "asd",
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
        id: "asd2",
        title: "Note Title",
        content: "I don't know what to write here",
        shared_with: [], // userids
        color: "black",
        isPinned: false,
        dateCreated: new Date(),
        dateUpdated: null,
        owner: 1
    }]
    );

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1 className="text-red">Home</h1>
                <Notes notesData={notesData} />
            </Container>

        </>
    )
};

export default Home;