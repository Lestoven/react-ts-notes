import { ReactNode, useState } from "react";
import { ChangeEvent, MouseEvent } from "react";
import { TextField, Paper, IconButton, Box, Button, Menu, MenuItem, InputAdornment } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PushPinIcon from "@mui/icons-material/PushPin";
import { List } from "../../types/List";
import { useModalDispatch } from "../../contexts/ModalContext";
import SearchIcon from "@mui/icons-material/Search";
import Typography from '@mui/material/Typography';
import { NoteData } from "../../interfaces/NoteData";
import { NoteType } from "../../types/NoteType";
import { NewNoteData } from "../../interfaces/NewNoteData";
import { isNoteContentList } from "../../utils/isNoteContentList";

const NoteSkeleton = ({ noteData, onReset, onNoteTypeChange, onNoteTitleChange, onPinChange, onSave, onClose, children }:
    {
        noteData: NoteData | NewNoteData,
        onReset: () => void,
        onNoteTypeChange: (newNoteType: NoteType) => void,
        onNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void,
        onPinChange: () => void,
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
            modalDispatch({
                type: "open", title: "Együttműködők", content:
                    <>
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            sx={{
                                backgroundColor: "#424242", // Dark gray background
                                borderRadius: "4px",
                                input: { color: "white" }, // White text color
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { border: "none" }, // Remove border
                                },
                                marginTop: "10px"
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </>
            });
        }
    };

    
    const isNoteInputValid = (): boolean => {
        return noteData.title !== "" ||
            (
                (!isNoteContentList(noteData) && noteData.content.length > 0) ||
                (isNoteContentList(noteData) && (noteData.content as unknown as List).some(e => e.content.length > 0))
            );
    };

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
                    <TextField value={noteData.title} variant="standard" placeholder="Cím" autoComplete="off"
                        fullWidth InputProps={{ disableUnderline: true }} onChange={onNoteTitleChange} />
                    <IconButton onClick={onPinChange}>
                        <PushPinIcon color={noteData.isPinned ? "primary" : "inherit"} />
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
                            {isNoteContentList(noteData) ?
                                <MenuItem onClick={() => { onNoteTypeChange("noteWithDescription"); handleOptionsClose() }}>Váltás szövegdobozra</MenuItem>
                                :
                                <MenuItem onClick={() => { onNoteTypeChange("noteWithChecklist"); handleOptionsClose() }}>Váltás listára</MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Box>
                        <Button variant="text" sx={{ color: "blue" }} onClick={onReset}>Alaphelyzet</Button>
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