import { ReactNode, useState } from "react";
import { ChangeEvent, MouseEvent } from "react";
import BasicModal from "../BasicModal";
import { NoteCreationState } from "../../types/NoteCreationState";
import { TextField, Paper, IconButton, Box, Button, InputAdornment, Menu, MenuItem } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PushPinIcon from "@mui/icons-material/PushPin";
import Typography from '@mui/material/Typography';
import { NoteCreationData } from "../../types/NoteCreationData";
import SearchIcon from "@mui/icons-material/Search";
import { Checklist } from "../../types/Checklist";

const NewNoteSkeleton = ({ newNoteData, onReset, onNoteCreationStateChange, onNoteTitleChange, onPinChange, onSave, children }:
    {
        newNoteData: NoteCreationData,
        onReset: () => void,
        onNoteCreationStateChange: (newNoteCreationState: NoteCreationState) => void,
        onNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void,
        onPinChange: () => void, onSave: () => void,
        children: ReactNode
    }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [optionsAnchor, setOptionsAnchor] = useState<null | HTMLElement>(null);

    const handleOptionsOpen = (event: MouseEvent<HTMLElement>) => {
        setOptionsAnchor(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setOptionsAnchor(null);
    };

    const isNoteInputValid = (): boolean => {
        return newNoteData.title !== "" ||
            (
                (newNoteData.noteCreationState === "noteWithDescription" && newNoteData.content.length > 0) || 
                (newNoteData.noteCreationState === "noteWithChecklist" && (newNoteData.content as Checklist).some(e => e.content.length > 0))
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
                    <TextField value={newNoteData.title} variant="standard" placeholder="Cím" fullWidth InputProps={{ disableUnderline: true }} onChange={onNoteTitleChange} />
                    <IconButton onClick={onPinChange}>
                        <PushPinIcon color={newNoteData.isPinned ? "primary" : "inherit"} />
                    </IconButton>
                </Box>

                {children}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                    <Box>
                        <IconButton onClick={() => setIsModalOpen(!isModalOpen)}>
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
                            {newNoteData.noteCreationState === "noteWithDescription" ?
                                <MenuItem onClick={() => { onNoteCreationStateChange("noteWithChecklist"); handleOptionsClose() }}>Váltás listára</MenuItem>
                                :
                                <MenuItem onClick={() => { onNoteCreationStateChange("noteWithDescription"); handleOptionsClose() }}>Váltás szövegdobozra</MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Box>
                        <Button variant="text" sx={{ color: "blue" }} onClick={() => onReset()}>Alaphelyzet</Button>
                        <Button variant="text" sx={{ color: "black" }} onClick={() => onNoteCreationStateChange("choosingType")}>Bezárás</Button>
                        <Button variant="text" sx={{ color: "green" }} onClick={onSave}
                            disabled={!isNoteInputValid()}>Mentés</Button>
                    </Box>
                </Box>
            </Paper>

            <BasicModal title={"Együttműködők"} isOpen={isModalOpen} setIsOpen={setIsModalOpen} >
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
            </BasicModal>
        </>
    );
};

export default NewNoteSkeleton;