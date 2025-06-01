import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Grid,
    Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router";

function ToDoLandingPage() {
    return (
        <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
            {/* Navbar */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                        LOGO
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {["Home", "About", "History", "Blog", "Contact"].map((item) => (
                            <Button key={item} color="inherit">
                                {item}
                            </Button>
                        ))}
                        <Button
                            variant="outlined"
                            color="warning"
                            component={Link}
                            to="/login"
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            component={Link}
                            to="/register"
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Container sx={{ mt: 8 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Left Side Text */}
                    <Grid>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            TO DO LIST
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                        <Button variant="contained" size="large" sx={{ mt: 2 }}>
                            Learn More
                        </Button>
                    </Grid>

                    {/* Right Side Image Placeholder */}
                    <Grid>
                        <Box
                            component="img"
                            src="https://img.freepik.com/free-vector/tiny-people-analyzing-clipboard-with-checklist_74855-5833.jpg"
                            alt="To Do Illustration"
                            sx={{ width: "100%", maxWidth: 500 }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ToDoLandingPage