import { TextField, Button, Typography, Container, Box, Paper, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#bb86fc", // Light purple accent
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

const Login = () => {
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
                            Login
                        </Typography>
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
                        <Button fullWidth variant="contained" sx={{ mt: 2 }} color="primary">
                            Login
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Link href="#" color="secondary" underline="hover">
                                Forgot Password?
                            </Link>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;