import { NoteData } from "../../interfaces/NoteData";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Note from "./Note";
import { Box } from "@mui/joy";

const Notes = ({ notesData }: { notesData: NoteData[] }) => {
    const pinnedNotes: NoteData[] = [];
    const otherNotes: NoteData[] = [];

    notesData.forEach(note => {
        if (note.isPinned) {
            pinnedNotes.push(note);
        } else {
            otherNotes.push(note);
        }
    });

    const renderNotes = (categoryTitle: string, notesToRender: NoteData[]) => {
        return (
            <>
                <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", textTransform: "uppercase", textAlign: "left", marginLeft: "8px", marginTop: "60px", marginBottom: 0 }}
                >
                    {categoryTitle}
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                    {notesToRender.map((note) => (
                        <Note key={note.id} note={note} />
                    ))}
                </Grid>
            </>
        );
    };

    if (notesData.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "75vh"
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        textTransform: "uppercase",
                        textAlign: "center",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        letterSpacing: "1.5px"
                    }}
                >
                    Nincsenek még jegyzeteid jelenleg
                </Typography>
            </Box>
        );
    }

    return (
        <>
            {pinnedNotes.length > 0 && (
                <>
                    {renderNotes("rögzítve", pinnedNotes)}
                </>
            )}

            {otherNotes.length > 0 && (
                <>
                    {renderNotes("egyéb", otherNotes)}
                </>
            )}
        </>
    );
};

export default Notes;