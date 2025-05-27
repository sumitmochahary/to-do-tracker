import { Box, Container, Paper, Typography, IconButton, Divider } from "@mui/material";

import { useState } from "react";
import LoadingEffect from "../components/LoadingEffect";
import RegisterForm from "../components/RegisterForm";

function SignUpPage() {

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
                    maxWidth="sm"
                    disableGutters
                    sx={{
                        minHeight: "100vh",
                        gap: { md: 4 },
                    }}
                >
                    {/* Left side: Login Form */}
                    <Box
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
                                Register
                            </Typography>

                            <RegisterForm onLoadingChange={setLoading} />

                            <Typography mt={3} align="center" gutterBottom>
                                Have an account? Sign In
                            </Typography>
                        </Paper>
                    </Box>
                </Container>
            </Container>
        </>
    );
}

export default SignUpPage;
