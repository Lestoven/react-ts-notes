import SearchIcon from "@mui/icons-material/Search";
import Typography from '@mui/material/Typography';
import { TextField, InputAdornment } from "@mui/material";

const NoteShare = () => {
    return (
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
    );
};

export default NoteShare;