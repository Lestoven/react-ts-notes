import { ReactNode, useState, MouseEvent } from "react";
import { TextField, Paper, IconButton, Box, Button, Menu, MenuItem } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useModalDispatch } from "../../contexts/ModalContext";
import { isChecklistNote, isTextNote } from "../../types/noteTypeGuards";
import NoteShare from "./NoteShare";
import { NoteType } from "../../types/noteType";
import { NoteData, NoteAction } from "../../types/noteAction";

const NoteSkeleton = ({ note, dispatch, onSave, onClose, children }:
    {
        note: NoteData,
        dispatch: React.Dispatch<NoteAction>,
        onSave: () => void,
        onClose: () => void,
        children: ReactNode
    }) => {
    const [optionsAnchor, setOptionsAnchor] = useState<null | HTMLElement>(null);
    const modalDispatch = useModalDispatch();

    const handleOptionsOpen = (event: MouseEvent<HTMLElement>) => {
        setOptionsAnchor(event.currentTarget);
    };
    const handleOptionsClose = () => {
        setOptionsAnchor(null);
    };

    const handleShareModalOpen = () => {
        if (modalDispatch) {
            modalDispatch({ type: "open", title: "Együttműködők", content: <NoteShare /> });
        }
    };

    const isNoteInputValid = (): boolean => {
        return note.title !== "" ||
            (
                (isTextNote(note) && note.content.length > 0) ||
                (isChecklistNote(note) && note.content.some(e => e.content.length > 0))
            );
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {dispatch({ type: "titleChange", newTitle: e.target.value })};
    const handlePin = () => { dispatch({ type: "pinChange" }); };
    const handleSwitchToTextNote = () => { dispatch({ type: "typeChange", newType: NoteType.Text }); handleOptionsClose() };
    const handleSwitchToChecklistNote = () => { dispatch({ type: "typeChange", newType: NoteType.Checklist }); handleOptionsClose() };
    //const onReset = () => { dispatch({type: "reset", }) }; 
    return (
        <>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px",
                    borderRadius: "12px",
                    width: "500px",
                }}
                elevation={3}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <TextField value={note.title} variant="standard" placeholder="Cím" autoComplete="off"
                        fullWidth InputProps={{ disableUnderline: true }} onChange={handleTitleChange} />
                    <IconButton onClick={handlePin}>
                        <PushPinIcon color={note.isPinned ? "primary" : "inherit"} />
                    </IconButton>
                </Box>

                {children}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                    <Box>
                        <IconButton onClick={handleShareModalOpen}>
                            <PersonAddIcon />
                        </IconButton>
                        <IconButton>
                            <PaletteIcon />
                        </IconButton>
                        <IconButton disabled>
                            <UndoIcon />
                        </IconButton>
                        <IconButton disabled>
                            <RedoIcon />
                        </IconButton>
                        <IconButton onClick={handleOptionsOpen}>
                            <MoreVertIcon />
                        </IconButton>

                        <Menu
                            anchorEl={optionsAnchor}
                            open={Boolean(optionsAnchor)}
                            onClose={handleOptionsClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            PaperProps={{
                                sx: {
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    minWidth: 200,
                                },
                            }}
                        >
                            <MenuItem onClick={() => console.log("not implemented yet")}>Címke hozzáadása</MenuItem>
                            {isChecklistNote(note)
                                ?
                                <MenuItem onClick={handleSwitchToTextNote}>Váltás szövegdobozra</MenuItem>
                                :
                                <MenuItem onClick={handleSwitchToChecklistNote}>Váltás listára</MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Box>
                        <Button variant="text" sx={{ color: "blue" }} onClick={() => console.log("yet to impplement")}>Alaphelyzet</Button>
                        <Button variant="text" sx={{ color: "black" }} onClick={onClose}>Bezárás</Button>
                        <Button variant="text" sx={{ color: "green" }} onClick={onSave}
                            disabled={!isNoteInputValid()}>Mentés</Button>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default NoteSkeleton;