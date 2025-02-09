import { TextField, Button, Typography, Container, Box, Paper, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#bb86fc",
        },
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0b0b0",
        },
    },
});

const Register = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 2, width: "100%" }}>
                        <Typography variant="h5" gutterBottom align="center">
                            Register
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Full Name"
                            variant="outlined"
                            InputLabelProps={{ style: { color: "white" } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            InputLabelProps={{ style: { color: "white" } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            variant="outlined"
                            InputLabelProps={{ style: { color: "white" } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            InputLabelProps={{ style: { color: "white" } }}
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 2 }} color="primary">
                            Register
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                Already have an account?{" "}
                                <Link href="#" color="secondary" underline="hover">
                                    Login here
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};


export default Register;