import { NoteData } from "../interfaces/NoteData";
import Notes from "../components/notes/Notes";
import { Container } from "@mui/material";
import { useNotes } from "../contexts/NotesContext";

const Home = () => {    
    const {notes: notesData, isLoading}: {notes: NoteData[], isLoading: boolean} = useNotes()!;
    if (isLoading) {
        return <p>Loading...</p>
    }
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