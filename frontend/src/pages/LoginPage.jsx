import { Box, Container, Paper, Typography, IconButton, Divider } from "@mui/material";

import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import LoadingEffect from "../components/LoadingEffect";
import LoginForm from "../components/LoginForm";

function LoginPage() {

    const [loading, setLoading] = useState(false);

    return (
        <>
            <LoadingEffect loading={loading} />

            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    background: "linear-gradient(to top right, #ffa585, #ffeda0, #a0e7e5)",
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "100vh",
                    width: "100%",
                    alignItems: "center"
                }}
            >
                <Container
                    maxWidth="md"
                    disableGutters
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        minHeight: "100vh",
                        gap: { md: 4 },
                    }}
                >
                    {/* Left side: Login Form */}
                    <Box
                        flex={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={2}
                    >
                        <Paper elevation={3} sx={{
                            padding: 4,

                            maxWidth: 400,
                            backgroundColor: "rgba(255, 255, 255, 0.85)", // semi-transparent white
                            borderRadius: 3,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",       // subtle shadow
                            backdropFilter: "blur(6px)",                   // adds a soft blur behind
                        }}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                                Welcome
                            </Typography>
                            <Typography align="center" mb={2} gutterBottom>
                                Every great journey begins with a single step — let’s take it together.
                            </Typography>

                            <LoginForm onLoadingChange={setLoading} />

                            <Divider sx={{ mt: 2 }}>or continue with</Divider>

                            <Box mt={3} display="flex" justifyContent="center" gap={2}>
                                <IconButton aria-label="Google login">
                                    <GoogleIcon />
                                </IconButton>
                                <IconButton aria-label="Apple login">
                                    <AppleIcon />
                                </IconButton>
                            </Box>

                            <Typography mt={3} align="center" gutterBottom>
                                Not a member? Register now
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Right side: Image */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'block',
                            '@media (max-width:700px)': {
                                display: 'none',
                            },
                            backgroundImage: "url('/assets/work-in-progress-animate.svg')",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '100vh',
                        }}
                    />
                </Container>
            </Container>
        </>
    );
}

export default LoginPage;
