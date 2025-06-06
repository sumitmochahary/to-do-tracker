import { Box, Container, Paper, Typography, Divider, Snackbar, Alert } from "@mui/material"
import { useState } from "react"
import { motion as Motion } from "framer-motion"
import LoadingEffect from "../components/LoadingEffect"
import LoginForm from "../components/LoginForm"
import { Link } from "react-router"
import { formAnimationVariant } from "../animations/MotionVariants"
import CommonHeader from "../components/CommonHeader"

function LoginPage() {
    const [loading, setLoading] = useState(false)

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info"
    })

    const showSnackbar = (message, severity = "info") => {
        setSnackbar({
            open: true,
            message,
            severity
        })
    }

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }))
    }

    return (

        <Box
            sx={{
                background: "linear-gradient(to top right, #ffa585, #ffeda0, #a0e7e5)",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <LoadingEffect loading={loading} />
            <CommonHeader />

            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    px: 2
                }}
            >
                {/* Animated Wrapper */}
                <Motion.div
                    variants={formAnimationVariant}
                    initial="hidden"
                    animate="visible"
                    style={{ width: "100%" }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            width: "100%",
                            maxWidth: { xs: "100%", md: "900px" },
                            margin: "0 auto",
                            borderRadius: 3,
                            overflow: "hidden",
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                            py: 6,
                            "@media (max-width:699px)": {
                                maxWidth: "500px"
                            }
                        }}
                    >
                        {/* Left Side: Login Form */}
                        <Box
                            flex={1}
                            p={{ xs: 3, sm: 4 }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }} mb={2}>
                                Welcome
                            </Typography>
                            <Typography align="center" mb={2}>
                                Every great journey begins with a single step — let’s take it together.
                            </Typography>

                            <LoginForm onLoadingChange={setLoading} onShowSnackbar={showSnackbar} />

                            <Typography mt={3} align="center">
                                Not a member?{" "}<Link to="/register" className="no-underline">Register now</Link>
                            </Typography>
                        </Box>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                display: { sm: "block" },
                                mx: 1,
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                "@media (max-width:699px)": {
                                    display: "none"
                                }
                            }}
                        />

                        {/* Right Side: Image */}
                        <Box
                            flex={1}
                            sx={{
                                backgroundImage: "url('/assets/work-in-progress.svg')",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                minHeight: 300,
                                "@media (max-width:699px)": {
                                    display: "none"
                                }
                            }}
                        />
                    </Paper>
                </Motion.div>
            </Container>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default LoginPage;
