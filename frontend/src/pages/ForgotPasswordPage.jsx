import { Container, Paper, Typography, Snackbar, Alert } from "@mui/material"
import { useState } from "react"
import LoadingEffect from "../components/LoadingEffect"
import ForgotPasswordForm from "../components/ForgotPasswordForm"
import { Link } from "react-router"
import { motion as Motion } from "framer-motion"
import { formAnimationVariant } from "../animations/MotionVariants"

function ForgotPasswordPage() {

    const [loading, setLoading] = useState(false);

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
        <>
            <LoadingEffect loading={loading} />

            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    background: "linear-gradient(to top right, #ffa585, #ffeda0, #a0e7e5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    width: "100%",
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        p: 2
                    }}
                >
                    <Motion.div
                        variants={formAnimationVariant}
                        initial="hidden"
                        animate="visible"
                        style={{ width: '100%', display: "flex", justifyContent: "center" }}
                    >
                        <Paper elevation={4} sx={{
                            padding: { xs: 3, sm: 4, md: 4 },
                            maxWidth: 550,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 3,
                            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                            backdropFilter: "blur(6px)",
                        }}>
                            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
                                Forgot your password
                            </Typography>

                            <Typography mb={3}>Enter the email associated with your account and we'll send you password reset link.</Typography>

                            <ForgotPasswordForm onLoadingChange={setLoading} onShowSnackbar={showSnackbar} />

                            <Typography mt={3} align="center" gutterBottom>
                                <Link to="/login" className="no-underline">
                                    Back to login
                                </Link>
                            </Typography>
                        </Paper>
                    </Motion.div>
                </Container>
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
        </>
    );
}

export default ForgotPasswordPage;
