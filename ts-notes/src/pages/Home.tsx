import { Note } from "../types/note";
import Notes from "../components/notes/Notes";
import { Container } from "@mui/material";
import { useNotes } from "../contexts/NotesContext";
import { Box, CircularProgress } from '@mui/material';
import Add from "./Add";

const Home = () => {    
    const {notes: notesData, isLoading}: {notes: Note[], isLoading: boolean} = useNotes()!;
    if (isLoading) {
        return (
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="90vh"
          >
            <CircularProgress size={75}/>
          </Box>
        );
    }
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Add />
                <Notes notesData={notesData} />
            </Container>

        </>
    )
};

export default Home;